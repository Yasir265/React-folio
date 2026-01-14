import { useState, useMemo, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Eye } from "lucide-react";
import { portfolioItems } from "@/data/portfolio";

const categories = ["All Work", "Mobile App", "Web Design", "Branding"];

const Portfolio = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeCategory, setActiveCategory] = useState("All Work");

  const filteredItems = useMemo(() => {
    if (activeCategory === "All Work") return portfolioItems;
    return portfolioItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="portfolio" className="section-padding bg-secondary/30" ref={ref}>
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 section-title-underline">
            Portfolio
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-6">
            Explore my portfolio featuring standout projects: a food discovery app with ratings,
            a handyman booking platform, and sleek personal sites using React and Node.js.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-primary text-primary-foreground shadow-glow"
                  : "bg-card text-muted-foreground hover:text-foreground hover:bg-muted border border-border"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          layout
          className="portfolio-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group"
              >
                <div className="glass-card-hover rounded-2xl overflow-hidden">
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <div className="flex gap-3">
                        {/* <button
                          className="w-10 h-10 rounded-full bg-primary-foreground/90 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                          aria-label="View project"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          className="w-10 h-10 rounded-full bg-primary-foreground/90 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                          aria-label="External link"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </button> */}
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-background/90 backdrop-blur-sm text-xs font-medium text-foreground">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
