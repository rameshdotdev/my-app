import "@/env";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { convertToModelMessages, streamText } from "ai";
import { NextRequest } from "next/server";
import { geminiRatelimit } from "@/lib/ratelimit";
import { redis } from "@/lib/redis";

interface ProjectContext {
  title: string;
  excerpt: string;
  github: string;
}

const README_CACHE_TTL_SECONDS = 60 * 60 * 24;
const README_MISS_TTL_SECONDS = 60 * 30;
const README_MISS_SENTINEL = "__README_NOT_FOUND__";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

function parseGithubRepo(
  githubUrl: string,
): { owner: string; repo: string } | null {
  try {
    const pathname = new URL(githubUrl).pathname.replace(/^\/+|\/+$/g, "");
    const [owner, repoRaw] = pathname.split("/");
    if (!owner || !repoRaw) return null;
    const repo = repoRaw.replace(/\.git$/i, "");
    if (!repo) return null;
    return { owner, repo };
  } catch {
    return null;
  }
}

async function fetchReadmeFromGitHub(
  owner: string,
  repo: string,
): Promise<string | null> {
  for (const branch of ["main", "master"]) {
    const url = `https://raw.githubusercontent.com/${owner}/${repo}/refs/heads/${branch}/README.md`;
    const res = await fetch(url);
    if (res.ok) {
      return await res.text();
    }
  }
  return null;
}

async function fetchReadme(githubUrl: string): Promise<string | null> {
  try {
    const parsed = parseGithubRepo(githubUrl);
    if (!parsed) return null;

    const cacheKey = `cache:gemini:readme:${parsed.owner}:${parsed.repo}`;
    let cached;
    try {
      cached = await redis.get<string>(cacheKey);
    } catch {
      // Redis not available, skip cache
      cached = null;
    }

    if (cached === README_MISS_SENTINEL) return null;
    if (typeof cached === "string" && cached.length > 0) return cached;

    const readme = await fetchReadmeFromGitHub(parsed.owner, parsed.repo);
    if (!readme) {
      try {
        await redis.set(cacheKey, README_MISS_SENTINEL, {
          ex: README_MISS_TTL_SECONDS,
        });
      } catch {
        // Skip
      }
      return null;
    }

    try {
      await redis.set(cacheKey, readme, {
        ex: README_CACHE_TTL_SECONDS,
      });
    } catch {
      // Skip
    }
    return readme;
  } catch {
    return null;
  }
}

function buildSystemPrompt(
  project: ProjectContext | undefined,
  readme: string | null,
): string {
  const baseInstructions = `You are a project assistant for Ramesh Kumar's portfolio.  
- Answer directly and concisely; avoid repeating an intro sentence in every response.  
- If context is needed, mention the project only briefly once (no repeated self-intros).
- Keep tone friendly, factual, and professional.  
- Refuse personal contact info politely.  
`;

  if (!project) {
    return baseInstructions;
  }

  return `${baseInstructions}
You are discussing the project "${project.title}" and the work done by Ramesh Kumar on it.
Start with a friendly intro for this project when the first user question appears (e.g., "I am a helpful assistant for Ramesh Kumar's portfolio website. I can provide information about the \"${project.title}\" project.").

Project context:
- Title: ${project.title}
- Excerpt: ${project.excerpt}
- GitHub: ${project.github}

README content:
${readme ?? "README not available."}`;
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "anonymous";
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  try {
    const { success, reset } = await geminiRatelimit.limit(ip);

    if (!success) {
      const retryAfter = Math.ceil((reset - Date.now()) / 1000);
      return new Response(
        JSON.stringify({
          error: "Too many requests",
          message: "You have exceeded the rate limit. Please try again later.",
          retryAfter,
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": String(retryAfter),
          },
        },
      );
    }
  } catch {
    // Skip rate limit if Redis not available
  }

  if (!process.env.GEMINI_API_KEY) {
    return new Response(
      JSON.stringify({
        error: "Configuration error",
        message: "Gemini API key not configured.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const { messages, projectContext } = (await request.json()) as {
    messages: any[];
    projectContext?: ProjectContext;
  };

  if (!messages || messages.length === 0) {
    return new Response(JSON.stringify({ error: "Messages are required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const readme = projectContext
    ? await fetchReadme(projectContext.github)
    : null;

  const result = streamText({
    model: google("gemini-2.5-flash-lite"),
    system: buildSystemPrompt(projectContext, readme),
    messages: await convertToModelMessages(messages),
  });

  const stream = new ReadableStream({
    async start(controller) {
      controller.enqueue(`data: {"type":"start"}\n\n`);
      controller.enqueue(`data: {"type":"start-step"}\n\n`);
      controller.enqueue(`data: {"type":"text-start","id":"0"}\n\n`);

      for await (const delta of result.textStream) {
        controller.enqueue(
          `data: {"type":"text-delta","id":"0","delta":${JSON.stringify(delta)}}\n\n`,
        );
      }

      controller.enqueue(`data: {"type":"text-end","id":"0"}\n\n`);
      controller.enqueue(`data: {"type":"finish-step"}\n\n`);
      controller.enqueue(`data: {"type":"finish","finishReason":"stop"}\n\n`);
      controller.enqueue(`data: [DONE]\n\n`);
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
