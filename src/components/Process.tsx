import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Label, Reveal, SplitText } from "./ui";

const steps = [
  { n: "01", t: "Keşif & Analiz", d: "Sahada detaylı keşif yapar, ihtiyaçları ve mevcut altyapıyı analiz ederiz." },
  { n: "02", t: "Projelendirme", d: "Yönetmeliklere uygun mekanik proje ve maliyet planı hazırlarız." },
  { n: "03", t: "Uygulama", d: "Uzman ekiplerimizle montaj ve inşaat işlerini zamanında gerçekleştiririz." },
  { n: "04", t: "Test & Teslim", d: "Sistemleri test eder, devreye alır ve garantili olarak teslim ederiz." },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const h = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="surec" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <Reveal className="flex justify-center">
            <Label>Çalışma Sürecimiz</Label>
          </Reveal>
          <h2 className="text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            <SplitText text="Keşiften teslimata" />
            <br />
            <SplitText text="dört adımda." className="text-white/40" delay={0.15} />
          </h2>
        </div>

        <div ref={ref} className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 h-full w-px bg-white/10 md:left-1/2">
            <motion.div style={{ height: h }} className="w-full bg-gradient-to-b from-fire via-orange-400 to-water" />
          </div>

          <div className="space-y-16">
            {steps.map((s, i) => {
              const left = i % 2 === 0;
              return (
                <div key={s.n} className={`relative flex md:justify-between ${left ? "" : "md:flex-row-reverse"}`}>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, damping: 14 }}
                    className="absolute left-6 top-2 flex h-4 w-4 -translate-x-1/2 items-center justify-center md:left-1/2"
                  >
                    <span className={`h-4 w-4 rounded-full ${i % 2 ? "bg-water shadow-[0_0_20px_#1a7fd1]" : "bg-fire shadow-[0_0_20px_#f04e23]"}`} />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: left ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    data-hover
                    className={`ml-16 w-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition hover:border-white/25 md:ml-0 md:w-[calc(50%-3rem)]`}
                  >
                    <div className="text-5xl font-extrabold text-white/10">{s.n}</div>
                    <h3 className="mt-2 text-2xl font-semibold">{s.t}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/55">{s.d}</p>
                  </motion.div>
                  <div className="hidden md:block md:w-[calc(50%-3rem)]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
