import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { Counter, Label, Reveal, SplitText } from "./ui";
import { LogoMark } from "./Logo";
import type { SiteContent } from "../content";

export function About({ content }: { content: SiteContent }) {
  const stats = content.about.stats;
  const points = content.about.points;
  const tags = content.about.tags;
  const { about, company } = content;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], [-200, 200]);
  const yImg = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section id="hakkimizda" ref={ref} className="relative overflow-hidden py-32">
      <motion.div
        style={{ x: x1 }}
        className="pointer-events-none absolute left-0 top-10 whitespace-nowrap text-[18vw] font-extrabold leading-none text-stroke opacity-30 select-none"
      >
        AKMEKANİK AKMEKANİK
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div style={{ y: yImg }} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/12 bg-gradient-to-br from-white/[0.09] via-white/[0.05] to-transparent p-8 md:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(240,78,35,0.35),transparent_36%),radial-gradient(circle_at_80%_84%,rgba(26,127,209,0.32),transparent_36%)]" />

              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="rounded-3xl border border-white/10 bg-white/6 p-4 backdrop-blur">
                        <LogoMark size={82} />
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-[0.35em] text-white/35">{about.cardCorporateLabel}</div>
                        <div className="mt-2 max-w-[15rem] text-lg font-semibold leading-snug text-white/88">
                          {about.cardCompanyText}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-right backdrop-blur">
                      <div className="text-[10px] uppercase tracking-[0.3em] text-white/35">{about.cardCenterLabel}</div>
                      <div className="mt-1 text-sm font-medium text-white/80">{company.city}</div>
                    </div>
                  </div>

                  <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-black/10 p-5 backdrop-blur">
                    <div className="text-[11px] uppercase tracking-[0.28em] text-white/35">{about.cardSpecialtiesLabel}</div>
                    <div className="mt-4 flex flex-wrap gap-2.5">
                      {tags.map((tag, i) => (
                        <span
                          key={tag}
                          className={`rounded-full border px-3.5 py-2 text-[11px] font-medium tracking-[0.14em] ${
                            i % 2 === 0 ? "border-fire/30 bg-fire/10 text-white/85" : "border-water/30 bg-water/10 text-white/85"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-white/40">{about.cardBottomLabel}</div>
                  <div className="mt-3 text-3xl font-bold leading-tight">
                    {about.cardMotto} <span className="gradient-text">{about.cardMottoAccent}</span>
                  </div>
                  <div className="mt-6 grid grid-cols-1 gap-3 text-[11px] text-white/50 sm:grid-cols-3">
                    {about.board.map((b) => (
                      <div key={b.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                        <div className="text-white/30">{b.label}</div>
                        <div className="mt-1 font-medium text-white/80">{b.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 top-10 rounded-2xl border border-white/10 bg-ink/85 px-5 py-4 backdrop-blur-xl md:-right-10"
            >
              <div className="text-3xl font-bold gradient-text">
                <Counter to={about.yearsBadge.value} suffix={about.yearsBadge.suffix} />
              </div>
              <div className="text-xs text-white/50">{about.yearsBadge.label}</div>
            </motion.div>
          </motion.div>

          <div>
            <Reveal>
              <Label>{about.label}</Label>
            </Reveal>
            <div className="relative overflow-hidden rounded-[2rem] mb-8 border border-white/10">
              <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop" alt={about.imageAlt} className="w-full h-72 object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1a23] via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-xs uppercase tracking-[0.25em] text-white/50">{about.imageCreditLabel}</div>
            </div>
            <h2 className="text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
              <SplitText text={about.titlePrimary} />
              <br />
              <SplitText text={about.titleSecondary} className="text-white/40" delay={0.2} />
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-8 leading-relaxed text-white/60">{about.intro}</p>
            </Reveal>
            <ul className="mt-8 space-y-4">
              {points.map((p, i) => (
                <Reveal key={p} delay={0.3 + i * 0.08}>
                  <li className="flex items-start gap-3 text-sm text-white/80">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-fire" />
                    {p}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-32 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className="group bg-ink p-8 transition-colors duration-500 hover:bg-white/[0.04] md:p-12"
            >
              <div className="text-4xl font-bold md:text-6xl">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-3 text-xs uppercase tracking-[0.25em] text-white/40 transition group-hover:text-white/70">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
