"use client";
import { skillIconMap } from "@/lib/skill-icons";
import { useAppSelector } from "@/hooks/hooks";
import { getSkills } from "@/store/features/skillSlice";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BlurFade from "@/components/magicui/blur-fade";
import { BLUR_FADE_DELAY } from "@/lib/utils";
import BlurFadeText from "@/components/magicui/blur-fade-text";

export default function SkillBoardPreview() {
  const skillsData = useAppSelector(getSkills);

  return (
    <section id="skills" className="space-y-10">
      {/* ================= Section Header ================= */}
      <div className="max-w-3xl mx-auto md:text-center">
        <BlurFade delay={BLUR_FADE_DELAY * 1.5} className="inline-block">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight relative">
            <span className="bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Skills & Expertise
            </span>

            {/* Animated underline */}
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="
          absolute -bottom-2 left-0
          h-0.75 w-full
          origin-left
          rounded-full
          bg-linear-to-r from-primary to-primary/40
        "
            />
          </h2>
        </BlurFade>

        <BlurFadeText
          delay={BLUR_FADE_DELAY * 1.6}
          yOffset={8}
          className="mt-4 text-muted-foreground text-base sm:text-lg"
          text="A snapshot of the technologies, tools, and domains I work with —
          focused on building scalable, performant, and modern applications."
        />
      </div>

      {/* ================= Skills Grid ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        {skillsData.map((category, index) => (
          <motion.div
            key={category._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: "easeOut",
            }}
            className="h-full"
          >
            <Card
              className="
                h-full
                rounded-2xl
                bg-linear-to-br from-background via-background to-muted/20
                border border-border/50
                shadow-lg shadow-black/5
                hover:shadow-xl hover:shadow-primary/10
                hover:border-primary/30
                transition-all duration-300
                backdrop-blur-sm
                overflow-hidden
                group
              "
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-center gap-3">
                  <div
                    className="
                      h-10 w-10
                      rounded-xl
                      bg-linear-to-br from-primary/20 to-primary/5
                      border border-primary/20
                      flex items-center justify-center
                      group-hover:scale-110
                      transition-transform duration-300
                    "
                  >
                    <span className="text-primary font-bold text-lg">
                      {category.title.charAt(0)}
                    </span>
                  </div>

                  <div>
                    <h3
                      className="
                        text-xl font-bold
                        bg-linear-to-r from-foreground to-foreground/80
                        bg-clip-text text-transparent
                      "
                    >
                      {category.title}
                    </h3>

                    {category.subTitle && (
                      <Badge
                        variant="outline"
                        className="
                          mt-1 text-xs font-normal
                          bg-background/50
                          border-border/50
                        "
                      >
                        {category.subTitle}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {category.skills.filter((s) => s.isVisible).length > 0 && (
                  <div className="grid grid-cols-3 gap-4">
                    {category.skills
                      .filter((s) => s.isVisible)
                      .sort((a, b) => a.order - b.order)
                      .map((skill) => {
                        const Icon = skillIconMap[skill.iconKey];

                        return (
                          <motion.div
                            key={skill._id}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="
                              flex flex-col items-center
                              p-3 rounded-xl
                              bg-linear-to-b from-background to-muted/10
                              border border-border/30
                              hover:border-primary/40
                              hover:shadow-md hover:shadow-primary/10
                              transition-all duration-200
                              group/skill
                            "
                          >
                            <div
                              className="
                                h-12 w-12
                                rounded-lg
                                bg-linear-to-br from-primary/10 to-primary/5
                                flex items-center justify-center
                                mb-2
                                group-hover/skill:from-primary/20
                                transition-colors duration-200
                              "
                            >
                              <span className="text-2xl text-primary">
                                {Icon ? <Icon /> : "⚙️"}
                              </span>
                            </div>

                            <span
                              className="
                                text-xs font-medium text-center
                                text-foreground/80
                                group-hover/skill:text-foreground
                                transition-colors duration-200
                                line-clamp-1
                              "
                            >
                              {skill.name}
                            </span>
                          </motion.div>
                        );
                      })}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
