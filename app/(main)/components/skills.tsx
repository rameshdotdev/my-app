"use client";
import { skillIconMap } from "@/lib/skill-icons";
import { useAppSelector } from "@/hooks/hooks";
import { getSkills } from "@/store/features/skillSlice";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SkillBoardPreview() {
  const skillsData = useAppSelector(getSkills);

  return (
    <div id="skills">
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
                      text-xl font-bold bg-linear-to-r from-foreground to-foreground/80
                      bg-clip-text text-transparent
                    "
                    >
                      {category.title}
                    </h3>
                    {category.subTitle && (
                      <Badge
                        variant="outline"
                        className="
                          mt-1 
                          text-xs font-normal
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
                {/* Skills Grid */}
                {category.skills.filter((s) => s.isVisible).length > 0 ? (
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
                ) : (
                  <div
                    className="
                    flex items-center justify-center
                    h-32 rounded-xl
                    bg-linear-to-br from-muted/20 to-muted/10
                    border border-dashed border-border/50
                  "
                  >
                    <p className="text-sm text-muted-foreground/70">
                      No skills added yet
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Global Empty State */}
        {skillsData.length === 0 && (
          <div
            className="
            col-span-full
            flex flex-col items-center justify-center
            p-12 rounded-2xl
            bg-linear-to-br from-background to-muted/10
            border border-dashed border-border/50
          "
          >
            <div className="h-16 w-16 rounded-full bg-muted/30 flex items-center justify-center mb-4">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground/80 mb-2">
              No skill categories
            </h3>
            <p className="text-sm text-muted-foreground/70 text-center max-w-sm">
              Add your first skill category to display your expertise here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
