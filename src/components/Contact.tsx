import { motion } from "framer-motion";
import { MapPin, Building2, FileText, Hash, Send, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Label, Reveal, SplitText, Magnetic } from "./ui";
import type { SiteContent } from "../content";

export function Contact({ content }: { content: SiteContent }) {
  const [sent, setSent] = useState(false);
  const info = content.contact.info;
  const services = content.contact.services;
  const form = content.contact.form;
  const input =
    "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-white placeholder-white/30 outline-none transition focus:border-fire focus:bg-white/[0.06]";

  return (
    <section id="iletisim" className="relative overflow-hidden py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-fire/20 to-water/20 blur-[160px]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <Reveal>
              <Label>{content.contact.label}</Label>
            </Reveal>
            <h2 className="text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              <SplitText text={content.contact.titlePrimary} />
              <br />
              <SplitText text={content.contact.titleSecondary} className="gradient-text" delay={0.15} />
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-md text-white/60">{content.contact.intro}</p>
            </Reveal>

            <div className="mt-12 space-y-4">
              {info.map((it, i) => {
                const Icon = [MapPin, FileText, Building2, Hash][i % 4];
                return (
                  <Reveal key={it.label} delay={0.1 * i}>
                    <div className="group flex items-start gap-4 rounded-2xl border border-white/10 p-5 transition hover:border-white/25 hover:bg-white/[0.03]">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-fire to-water text-white">
                        <Icon size={18} />
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-[0.2em] text-white/40">{it.label}</div>
                        <div className="mt-1 text-sm font-medium text-white/85">{it.value}</div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={0.4}>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(content.company.mapQuery)}`}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-white"
              >
                {content.contact.mapLabel} <ArrowUpRight size={16} />
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="relative rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 backdrop-blur md:p-10"
            >
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex min-h-[420px] flex-col items-center justify-center text-center"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-fire to-water">
                    <Send size={28} />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold">{form.successTitle}</h3>
                  <p className="mt-2 text-sm text-white/60">{form.successBody}</p>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input required className={input} placeholder={form.name} />
                    <input required className={input} type="tel" placeholder={form.phone} />
                  </div>
                  <input required className={input} type="email" placeholder={form.email} />
                  <select required defaultValue="" className={`${input} appearance-none`}>
                    <option value="" disabled className="bg-ink">
                      {form.servicePlaceholder}
                    </option>
                    {services.map((s) => (
                      <option key={s} className="bg-ink">
                        {s}
                      </option>
                    ))}
                  </select>
                  <textarea required rows={5} className={`${input} resize-none`} placeholder={form.message} />
                  <Magnetic className="inline-block w-full">
                    <button
                      type="submit"
                      className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-fire to-water py-4 text-sm font-semibold text-white transition hover:shadow-[0_0_50px_-10px_rgba(240,78,35,0.7)]"
                    >
                      {form.submit}
                      <Send size={16} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </button>
                  </Magnetic>
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
