"use client";

import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import { AiOutlineGithub } from "react-icons/ai";
import { FaLink } from "react-icons/fa";

interface Project {
  _id: string;
  title: string;
  image: string;
  techStack: string;
  description: string | string[];
  links: {
    site?: string;
    github?: string;
  };
}

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get<Project[]>("/projects");
        setProjects(res.data);
      } catch (error) {
        console.error("Failed to load projects", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="text-white text-center py-20">
        Loading projects...
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="text-white max-w-full mb-24 md:mb-12 overflow-x-hidden"
    >
      <div className="container mx-auto text-center py-10 xl:px-20 max-w-max lg:max-w-[80%] xl:flex xl:flex-col xl:items-center">
        <h2 className="text-3xl font-bold text-gray-200 mb-8">Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10 xl:max-w-[900px]">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-dark/80 hover:bg-cuscol/20 rounded-xl border-2 border-cuscol/30 shadow-xl overflow-hidden flex flex-col"
            >
              {/* Image from backend */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
                loading="lazy"
              />

              <div className="p-4 flex flex-col flex-grow">
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-he mb-2">
                    {project.title}
                  </h3>

                  <p className="text-he text-sm whitespace-pre-wrap mb-4">
                    {project.techStack}
                  </p>

                  <div className="mb-4 hidden sm:block text-left text-sm text-he">
                    {Array.isArray(project.description) ? (
                      <ul className="list-disc space-y-1 pl-4">
                        {project.description.map((line, idx) => (
                          <li key={idx}>{line}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>{project.description}</p>
                    )}
                  </div>
                </div>

                <div className="flex space-x-4 flex-wrap mt-auto">
                  {project.links?.site && (
                    <a
                      href={project.links.site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-slate-50 text-slate-800 font-bold text-sm rounded-lg hover:bg-slate-400 transition flex items-center"
                    >
                      <FaLink className="mr-2" />
                      Live
                    </a>
                  )}

                  {project.links?.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-slate-700 text-gray-300 font-bold text-sm border-2 border-white rounded-lg hover:bg-slate-700 transition flex items-center"
                    >
                      <AiOutlineGithub className="mr-2" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
