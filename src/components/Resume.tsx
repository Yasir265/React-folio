import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";
import { workExperience, education } from "@/data/portfolio";

const Resume = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="resume" className="section-padding" ref={ref}>
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 section-title-underline">
            Resume
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-6">
            Innovative and deadline-driven Computer Science graduate with 2+ years of hands-on experience
            developing user-centered mobile and web applications.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Work Experience */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display text-2xl font-bold">Work Experience</h3>
            </div>

            <div className="relative pl-8">
              <div className="timeline-line" />

              {workExperience.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.15 }}
                  className="relative mb-8 last:mb-0"
                >
                  <div className="timeline-dot" style={{ top: "1.5rem" }} />
                  
                  <div className="glass-card-hover p-6 rounded-xl ml-4">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        <Calendar className="w-3 h-3" />
                        {job.period}
                      </span>
                    </div>
                    
                    <h4 className="font-display text-xl font-bold text-foreground mb-1">
                      {job.role}
                    </h4>
                    
                    <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
                      <MapPin className="w-4 h-4" />
                      {job.company}
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-4">
                      {job.description}
                    </p>
                    
                    {job.highlights.length > 0 && (
                      <ul className="space-y-2">
                        {job.highlights.map((highlight, hIndex) => (
                          <li key={hIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display text-2xl font-bold">My Education</h3>
            </div>

            <div className="relative pl-8">
              <div className="timeline-line" />

              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.15 }}
                  className="relative mb-8 last:mb-0"
                >
                  <div className="timeline-dot" style={{ top: "1.5rem" }} />
                  
                  <div className="glass-card-hover p-6 rounded-xl ml-4">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent/20 text-accent-foreground text-xs font-medium">
                        <Calendar className="w-3 h-3" />
                        {edu.period}
                      </span>
                    </div>
                    
                    <h4 className="font-display text-xl font-bold text-foreground mb-1">
                      {edu.degree}
                    </h4>
                    
                    <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
                      <GraduationCap className="w-4 h-4" />
                      {edu.institution}
                    </div>
                    
                    <p className="text-muted-foreground text-sm">
                      {edu.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
