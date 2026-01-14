import { lazy, Suspense } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { personalInfo } from "@/data/portfolio";

// Lazy load heavier sections for performance
const About = lazy(() => import("@/components/About"));
const Resume = lazy(() => import("@/components/Resume"));
const Portfolio = lazy(() => import("@/components/Portfolio"));
const Services = lazy(() => import("@/components/Services"));
const Contact = lazy(() => import("@/components/Contact"));

// Loading fallback
const SectionLoader = () => (
  <div className="section-padding flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{personalInfo.name} | Full-Stack Developer & Software Engineer</title>
        <meta
          name="description"
          content={`${personalInfo.name} - ${personalInfo.occupation}. ${personalInfo.description}`}
        />
        <meta name="keywords" content="React Developer, Full Stack Developer, React Native, Node.js, JavaScript, Software Engineer, Pakistan" />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${personalInfo.name} | Full-Stack Developer`} />
        <meta property="og:description" content={personalInfo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={personalInfo.profileImage} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${personalInfo.name} | Full-Stack Developer`} />
        <meta name="twitter:description" content={personalInfo.description} />
        
        {/* Canonical */}
        <link rel="canonical" href="https://softwareengineeryasir.vercel.app/" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main>
          <Hero />
          
          <Suspense fallback={<SectionLoader />}>
            <About />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Resume />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Portfolio />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Services />
          </Suspense>
          
          <Suspense fallback={<SectionLoader />}>
            <Contact />
          </Suspense>
        </main>
        
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default Index;
