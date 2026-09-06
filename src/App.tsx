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
import { Admin } from "./admin/Admin";
import { mergeContent, useContent } from "./content";

const ADMIN_PASSWORD = "akmekanik-admin-2026";

function isAdminRoute() {
  const hash = window.location.hash;
  if (hash === "#admin" || hash === "#/admin" || hash.startsWith("#/admin")) return true;
  const segs = window.location.pathname.split("/").filter(Boolean);
  return segs[segs.length - 1] === "admin";
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(isAdminRoute);
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("akm_admin") === "1");
  const { data, loading: contentLoading } = useContent();
  const content = mergeContent(data);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, [loading]);

  useEffect(() => {
    const onHash = () => setIsAdmin(isAdminRoute());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  if (isAdmin) {
    return (
      <Admin
        initialContent={content}
        loading={!authed || contentLoading}
        authed={authed}
        onLogin={(ok) => {
          if (ok) {
            sessionStorage.setItem("akm_admin", "1");
            setAuthed(true);
          }
        }}
        password={ADMIN_PASSWORD}
        onLeave={() => {
          sessionStorage.removeItem("akm_admin");
          setAuthed(false);
          window.location.hash = "";
        }}
      />
    );
  }

  return (
    <div className="noise relative min-h-screen bg-[radial-gradient(circle_at_top,rgba(26,127,209,0.12),transparent_18%),radial-gradient(circle_at_20%_25%,rgba(240,78,35,0.09),transparent_22%),linear-gradient(180deg,#f7f7f5_0%,#f6f6f4_22%,#111723_22%,#0f1521_100%)] text-white">
      <AnimatePresence>{loading && <Preloader key="pre" />}</AnimatePresence>
      <Cursor />
      <ScrollProgress />
      <Navbar content={content} />
      <main>
        <Hero content={content} />
        <Services content={content} />
        <About content={content} />
        <Process content={content} />
        <Contact content={content} />
      </main>
      <Footer content={content} />
    </div>
  );
}
