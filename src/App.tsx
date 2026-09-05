import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Preloader } from "./components/Preloader";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { About } from "./components/About";
import { Process } from "./components/Process";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Cursor, ScrollProgress } from "./components/ui";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, [loading]);

  return (
    <div className="noise relative min-h-screen bg-[radial-gradient(circle_at_top,rgba(26,127,209,0.12),transparent_18%),radial-gradient(circle_at_20%_25%,rgba(240,78,35,0.09),transparent_22%),linear-gradient(180deg,#f7f7f5_0%,#f6f6f4_22%,#111723_22%,#0f1521_100%)] text-white">
      <AnimatePresence>{loading && <Preloader key="pre" />}</AnimatePresence>
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
