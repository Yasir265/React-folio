import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, MapPin, User, Flag, Briefcase } from "lucide-react";
import { personalInfo, aboutBio, skills } from "@/data/portfolio";

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const infoItems = [
    { icon: User, label: "Name", value: personalInfo.name },
    { icon: Phone, label: "Phone", value: personalInfo.phone },
    { icon: Mail, label: "Email", value: personalInfo.email },
    { icon: Briefcase, label: "Occupation", value: personalInfo.occupation },
    { icon: Flag, label: "Nationality", value: personalInfo.nationality },
    { icon: MapPin, label: "Location", value: personalInfo.location },
  ];

  return (
    <section id="about" className="section-padding bg-secondary/30" ref={ref}>
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 section-title-underline">
            About
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-6">
            Dynamic Computer Science graduate from BIIT, skilled in full-stack and mobile development
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left - Image and Info */}
          {/* <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl transform rotate-3" />
              <img
                src={personalInfo.aboutImage}
                alt={personalInfo.name}
                className="relative w-full max-w-md mx-auto rounded-3xl shadow-strong object-cover"
              />
            </div>

            <div className="glass-card p-6 rounded-2xl">
              <h3 className="font-display text-2xl font-bold mb-2">
                {personalInfo.subtitle}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {aboutBio}
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {infoItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">{item.label}</div>
                      <div className="text-sm font-medium text-foreground">{item.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div> */}
         <motion.div
  initial={{ opacity: 0, x: -30 }}
  animate={inView ? { opacity: 1, x: 0 } : {}}
  transition={{ duration: 0.6, delay: 0.2 }}
>
  {/* Image Section */}
  <div className="relative mb-10">
    <div className="absolute inset-0 bg-gradient-primary rounded-3xl transform rotate-3" />
    <img
      src={personalInfo.aboutImage}
      alt={personalInfo.name}
      className="relative w-full max-w-md mx-auto rounded-3xl shadow-strong object-cover"
    />
  </div>

  {/* About Card */}
  <div className="glass-card p-7 rounded-2xl">
    <h3 className="font-display text-2xl font-bold mb-3">
      {personalInfo.subtitle}
    </h3>

    <p className="text-muted-foreground leading-relaxed mb-8">
      {aboutBio}
    </p>

    {/* Info Grid */}
    <div className="grid sm:grid-cols-[1.4fr_1fr] gap-x-10 gap-y-5">
      {infoItems.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 + index * 0.1 }}
          className="flex items-start gap-3"
        >
          {/* Icon */}
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <item.icon className="w-5 h-5 text-primary" />
          </div>

          {/* Text */}
          <div>
            <div className="text-xs text-muted-foreground mb-0.5">
              {item.label}
            </div>
            <div className="text-sm font-medium text-foreground whitespace-nowrap">
              {item.value}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</motion.div>



          {/* Right - Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="font-display text-2xl font-bold mb-6">
              Technical Skills
            </h3>

            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="glass-card p-5 rounded-xl"
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-foreground">{skill.name}</h4>
                  <span className="text-primary font-bold">{skill.level}%</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {skill.description}
                </p>
                <div className="skill-bar">
                  <motion.div
                    className="skill-bar-fill"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: 0.6 + index * 0.1, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
