import { motion } from "framer-motion";
import { Droplets, Flame, Snowflake, ShieldAlert, Wind, Thermometer, Building2, ArrowUpRight } from "lucide-react";
import { Label, Reveal, SplitText } from "./ui";
import type { SiteContent } from "../content";

const ICONS = [Droplets, Flame, Snowflake, ShieldAlert, Wind, Thermometer, Building2];

export function Services({ content }: { content: SiteContent }) {
  const services = content.services.items;
  const currentProjects = content.projects.current;
  const completedProjects = content.projects.completed;
  return (
    <>
      <section id="hizmetler" className="relative py-32 bg-[#0b1a23]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-20 grid gap-10 lg:grid-cols-2 lg:items-end">
            <div>
              <Reveal>
                <Label>{content.services.label}</Label>
              </Reveal>
              <h2 className="text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
                <SplitText text={content.services.titlePrimary} />
                <br />
                <SplitText text={content.services.titleSecondary} className="text-white/40" delay={0.2} />
              </h2>
            </div>
            <Reveal delay={0.3}>
              <p className="max-w-md text-white/60 md:ml-auto">{content.services.intro}</p>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const Icon = ICONS[i % ICONS.length];
              const isMix = s.tone === "mix";
              const accent = s.tone === "fire" ? "from-fire to-orange-400" : "from-water to-sky-400";
              return (
                <motion.div
                  key={s.title}
                  data-hover
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-colors duration-500 hover:border-white/20 ${
                    isMix ? "sm:col-span-2 lg:col-span-3" : ""
                  }`}
                >
                  <div
                    className={`pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gradient-to-br ${
                      isMix ? "from-fire to-water" : accent
                    } opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-30`}
                  />
                  <div className={`relative flex ${isMix ? "flex-col gap-8 md:flex-row md:items-center md:justify-between" : "flex-col"}`}>
                    <div className={isMix ? "md:max-w-xl" : ""}>
                      <div className="mb-8 flex items-center justify-between">
                        <div
                          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${
                            isMix ? "from-fire to-water" : accent
                          } text-white shadow-lg transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110`}
                        >
                          <Icon size={24} />
                        </div>
                        <span className="text-xs font-medium tracking-widest text-white/30">{s.number}</span>
                      </div>
                      <h3 className={`font-semibold ${isMix ? "text-3xl md:text-4xl" : "text-xl"}`}>{s.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-white/55">{s.desc}</p>
                    </div>
                    <a
                      href="#iletisim"
                      className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white/60 transition group-hover:text-white md:mt-0"
                    >
                      {content.services.detailCta}
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 transition group-hover:border-fire group-hover:bg-fire">
                        <ArrowUpRight size={14} />
                      </span>
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="projeler" className="relative py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-20 grid gap-10 lg:grid-cols-2 lg:items-end">
            <div>
              <Reveal>
                <Label>{content.projects.label}</Label>
              </Reveal>
              <h2 className="text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
                <SplitText text={content.projects.titlePrimary} />
                <br />
                <SplitText text={content.projects.titleSecondary} className="text-white/40" delay={0.2} />
              </h2>
            </div>
            <Reveal delay={0.3}>
              <p className="max-w-md text-white/60 md:ml-auto">{content.projects.intro}</p>
            </Reveal>
          </div>

          <div className="grid gap-10 xl:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-white/40">{content.projects.currentHeading}</div>
                  <div className="mt-2 text-2xl font-semibold text-white">{content.projects.currentSub}</div>
                </div>
                <div className="rounded-full border border-water/30 bg-water/10 px-4 py-2 text-sm font-medium text-water">
                  {content.projects.currentCountPrefix} {currentProjects.length} proje
                </div>
              </div>

              <div className="space-y-4">
                {currentProjects.map((project) => (
                  <div key={project.title} className="rounded-2xl border border-white/10 bg-black/10 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="text-lg font-semibold text-white">{project.title}</div>
                        <div className="mt-1 text-sm text-white/45">{project.location} · {project.type}</div>
                      </div>
                      <span className="rounded-full border border-fire/30 bg-fire/10 px-3 py-1 text-xs font-medium text-fire">
                        {project.status}
                      </span>
                    </div>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-fire to-water"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-white/45">
                      <span>{content.projects.currentProgressLabel}</span>
                      <span>{project.progress}%</span>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-white/60">{project.summary}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-white/40">{content.projects.completedHeading}</div>
                  <div className="mt-2 text-2xl font-semibold text-white">{content.projects.completedSub}</div>
                </div>
                <div className="rounded-full border border-fire/30 bg-fire/10 px-4 py-2 text-sm font-medium text-fire">
                  {content.projects.completedCountPrefix} {completedProjects.length} proje
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {completedProjects.map((project) => (
                  <div key={project.title} className="rounded-2xl border border-white/10 bg-black/10 p-5">
                    <div className="text-xs uppercase tracking-[0.28em] text-white/35">{project.year}</div>
                    <div className="mt-3 text-lg font-semibold text-white">{project.title}</div>
                    <div className="mt-2 text-sm text-white/45">{project.location}</div>
                    <div className="mt-4 inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-white/70">
                      {project.type}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
