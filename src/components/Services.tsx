import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Smartphone, Monitor, Server, Search, ArrowRight } from "lucide-react";
import { services } from "@/data/portfolio";

const iconMap: { [key: string]: React.ElementType } = {
  Smartphone,
  Monitor,
  Server,
  Search,
};

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="services" className="section-padding" ref={ref}>
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 section-title-underline">
            Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-6">
            I deliver cutting-edge digital solutions tailored to your needs: Full-stack web development,
            cross-platform mobile apps, responsive UI/UX design, and more.
          </p>
        </motion.div>

        {/* Services Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card rounded-3xl p-8 md:p-12 mb-12 text-center relative overflow-hidden"
        >
          <div className="blob-decoration blob-primary w-64 h-64 -top-32 -left-32" />
          <div className="blob-decoration blob-accent w-48 h-48 -bottom-24 -right-24" />
          
          <div className="relative z-10">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Crafting high-performance applications with React ecosystem, .NET, Bootstrap,
              and clean, elegant code tailored to your vision
            </h3>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Expert in full-stack web/mobile development (React.js, React Native), responsive UI/UX,
              custom dashboards, API integrations, and Photoshop design. Scalable solutions delivered.
            </p>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Monitor;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <div className="glass-card-hover rounded-2xl p-6 h-full group cursor-pointer">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Link */}
                  {/* <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </div> */}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
