import { motion, useMotionValue, useSpring, useInView, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* ---------- Custom cursor ---------- */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 35 });
  const sy = useSpring(y, { stiffness: 400, damping: 35 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a,button,[data-hover]"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-2 w-2 rounded-full bg-fire mix-blend-difference md:block"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden rounded-full border border-white/70 mix-blend-difference md:block"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: hover ? 56 : 32, height: hover ? 56 : 32, opacity: hover ? 1 : 0.6 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </>
  );
}

/* ---------- Scroll progress ---------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed left-0 top-0 z-[90] h-[3px] w-full origin-left bg-gradient-to-r from-fire via-orange-400 to-water"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

/* ---------- Reveal wrapper ---------- */
export function Reveal({
  children,
  delay = 0,
  className = "",
  y = 40,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Split text (word-by-word reveal) ---------- */
export function SplitText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ---------- Counter ---------- */
export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 2000, bounce: 0 });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, mv, to]);
  useMotionValueEvent(spring, "change", (v) => setVal(Math.round(v)));
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* ---------- Magnetic button ---------- */
export function Magnetic({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.3);
        y.set((e.clientY - r.top - r.height / 2) * 0.3);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Section label ---------- */
export function Label({ children }: { children: ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-white/50">
      <span className="h-px w-8 bg-gradient-to-r from-fire to-water" />
      {children}
    </div>
  );
}
