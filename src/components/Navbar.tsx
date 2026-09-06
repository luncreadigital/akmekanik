import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { FileDown, Menu, X } from "lucide-react";
import { LogoFull, LogoImage } from "./Logo";
import { Magnetic } from "./ui";
import type { SiteContent } from "../content";

function Links({ content }: { content: SiteContent }) {
  return content.navigation.links;
}

export function Navbar({ content }: { content: SiteContent }) {
  const links = Links({ content });
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 36));

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-0 top-0 z-[80] w-full"
      >
        <div className="mx-auto max-w-7xl px-4 pt-4 md:px-6">
          <div
            className={`flex items-center justify-between rounded-full border px-3 transition-all duration-500 md:px-7 ${
              scrolled
                ? "border-black/[0.06] bg-white py-2.5 shadow-lg backdrop-blur-xl"
                : "border-black/[0.06] bg-white py-3 shadow-md backdrop-blur-lg"
            }`}
          >
            <a href="#hero" className="flex items-center">
              <LogoImage />
            </a>

            <nav className="hidden items-center gap-10 md:flex">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="group relative text-sm font-medium text-ink/75 transition hover:text-ink"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-fire to-water transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            <div className="hidden md:block">
              <Magnetic>
                <a
                  href="/katalog.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-fire to-fire-dark px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
                >
                  <FileDown size={15} /> {content.navigation.catalogLabel}
                </a>
              </Magnetic>
            </div>

            <button onClick={() => setOpen(true)} className="text-ink md:hidden" aria-label="Menü">
              <Menu />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[150] flex flex-col bg-[#0b1a23] p-6 text-white"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center justify-between">
              <LogoFull light={false} />
              <button onClick={() => setOpen(false)} className="text-ink" aria-label="Kapat">
                <X />
              </button>
            </div>

            <div className="mt-16 flex flex-col gap-6">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-4xl font-bold text-ink"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                >
                  <span className="mr-4 text-sm text-fire">0{i + 1}</span>
                  {l.label}
                </motion.a>
              ))}
            </div>

            <div className="mt-auto rounded-3xl border border-black/[0.08] bg-white p-5 shadow-[0_20px_50px_-30px_rgba(11,15,23,0.35)]">
              <div className="text-xs uppercase tracking-[0.25em] text-ink/40">Merkez</div>
              <div className="mt-2 text-sm font-medium text-ink/80">{content.company.city}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
