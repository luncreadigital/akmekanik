import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Magnetic } from "./ui";

const services = [
  "SIHHİ TESİSAT",
  "DOĞALGAZ TESİSATI",
  "KLİMA TESİSATI",
  "YANGIN TESİSATI",
  "HAVALANDIRMA TESİSATI",
  "ISITMA TESİSATI",
  "İNŞAAT TAAHHÜT İŞLERİ",
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.82], [1, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-screen flex-col overflow-hidden bg-[linear-gradient(180deg,#fbfbf8_0%,#f4f5f2_72%,#0b0f17_100%)] pt-36 text-ink"
    >
      <motion.div
        className="pointer-events-none absolute -left-32 top-10 h-[520px] w-[520px] rounded-full bg-fire/18 blur-[120px]"
        animate={{ x: [0, 50, 0], y: [0, 35, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute right-0 top-16 h-[520px] w-[520px] rounded-full bg-water/18 blur-[120px]"
        animate={{ x: [0, -60, 0], y: [0, -25, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(11,15,23,.55) 1px, transparent 1px), linear-gradient(90deg, rgba(11,15,23,.55) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 42%, transparent 78%)",
        }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-6">
        <div className="flex-1">
          <div className="mx-auto flex max-w-3xl flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.8, ease }}
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/75 px-4 py-2 text-xs font-medium tracking-wider text-ink/70 shadow-[0_10px_30px_-20px_rgba(11,15,23,0.3)] backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fire opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-fire" />
              </span>
              AKMEKANİK İNŞAAT SANAYİ VE TİCARET LTD. ŞTİ.
            </motion.div>

            <h1 className="text-[13vw] font-bold leading-[0.9] tracking-tight text-ink sm:text-7xl lg:text-[6.8rem]">
              {["Mekanik", "Altyapıda", "Güvenilir İmza."].map((line, i) => (
                <span key={line} className="block overflow-hidden pb-2">
                  <motion.span
                    className={`block ${i === 2 ? "gradient-text" : ""}`}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 2.6 + i * 0.12, duration: 1, ease }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.1, duration: 0.8, ease }}
              className="mt-8 max-w-2xl text-base font-light leading-relaxed text-ink/65 md:text-lg"
            >
              Sıhhi tesisat, doğalgaz, klima, yangın, havalandırma ve ısıtma sistemlerinde; projelendirmeden saha
              uygulamasına, bakım süreçlerinden inşaat taahhüt işlerine kadar yüksek standartta çözüm sunuyoruz.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.25, duration: 0.8, ease }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {[
                "Esenyurt / İstanbul",
                "Vergi No: 0320284587",
                "Ticaret Sicil: 897265-0",
              ].map((item, i) => (
                <span
                  key={item}
                  className={`rounded-full border px-4 py-2 text-xs font-medium tracking-[0.18em] ${
                    i === 0
                      ? "border-water/20 bg-water/[0.08] text-ink/70"
                      : "border-black/[0.08] bg-white/70 text-ink/65"
                  }`}
                >
                  {item}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.35, duration: 0.8, ease }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Magnetic>
                <a
                  href="#hizmetler"
                  className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-fire to-fire-dark px-7 py-4 text-sm font-semibold text-white shadow-[0_16px_40px_-18px_rgba(240,78,35,0.7)] transition hover:shadow-[0_24px_60px_-18px_rgba(240,78,35,0.9)]"
                >
                  Hizmetlerimizi Keşfedin
                  <ArrowUpRight size={18} className="transition group-hover:rotate-45" />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#iletisim"
                  className="flex items-center gap-3 rounded-full border border-black/[0.12] bg-white/70 px-7 py-4 text-sm font-semibold text-ink transition hover:border-water hover:bg-white"
                >
                  Bize Ulaşın
                </a>
              </Magnetic>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.6 }}
          className="flex items-center justify-between py-10 text-xs uppercase tracking-[0.3em] text-ink/40"
        >
          <span className="flex items-center gap-2">
            <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
              <ArrowDown size={14} />
            </motion.span>
            Kaydır
          </span>
          <span className="hidden sm:block">Isıtma • Soğutma • Tesisat • İnşaat</span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.4 }}
        className="relative z-10 border-y border-black/[0.08] bg-white/80 py-5 text-ink shadow-[0_-20px_40px_-35px_rgba(11,15,23,0.35)] backdrop-blur"
      >
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {[...services, ...services].map((s, i) => (
            <span key={i} className="mx-8 flex items-center gap-8 text-sm font-semibold tracking-[0.25em] text-ink/70">
              {s}
              <span className={`h-1.5 w-1.5 rounded-full ${i % 2 ? "bg-water" : "bg-fire"}`} />
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
