import { motion } from "framer-motion";
import { Droplets, Flame, Snowflake, ShieldAlert, Wind, Thermometer, Building2, ArrowUpRight } from "lucide-react";
import { Label, Reveal, SplitText } from "./ui";

const services = [
  {
    icon: Droplets,
    title: "Sıhhi Tesisat",
    desc: "Temiz su, pis su ve atık su hatlarının projelendirilmesi, montajı ve bakımı.",
    tone: "water",
  },
  {
    icon: Flame,
    title: "Doğalgaz Tesisatı",
    desc: "İGDAŞ standartlarına uygun, sertifikalı ve güvenli doğalgaz iç tesisat çözümleri.",
    tone: "fire",
  },
  {
    icon: Snowflake,
    title: "Klima Tesisatı",
    desc: "VRF, split ve merkezi klima sistemlerinin keşfi, kurulumu ve devreye alınması.",
    tone: "water",
  },
  {
    icon: ShieldAlert,
    title: "Yangın Tesisatı",
    desc: "Sprinkler, yangın dolabı ve hidrant sistemleriyle can ve mal güvenliği.",
    tone: "fire",
  },
  {
    icon: Wind,
    title: "Havalandırma Tesisatı",
    desc: "Endüstriyel ve ticari alanlar için taze hava, egzoz ve kanal sistemleri.",
    tone: "water",
  },
  {
    icon: Thermometer,
    title: "Isıtma Tesisatı",
    desc: "Kazan dairesi, yerden ısıtma, radyatör ve kombi sistemleri kurulumu.",
    tone: "fire",
  },
  {
    icon: Building2,
    title: "İnşaat Taahhüt İşleri",
    desc: "Kaba inşaattan ince işçiliğe anahtar teslim yapı ve tadilat projeleri.",
    tone: "mix",
  },
];

export function Services() {
  return (
    <section id="hizmetler" className="relative py-32 bg-[#0b1a23]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <Reveal>
              <Label>Hizmetlerimiz</Label>
            </Reveal>
            <h2 className="text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              <SplitText text="Mekanik altyapının" />
              <br />
              <SplitText text="tüm disiplinleri tek çatı altında." className="text-white/40" delay={0.2} />
            </h2>
          </div>
          <Reveal delay={0.3}>
            <p className="max-w-md text-white/60 md:ml-auto">
              Yedi ana uzmanlık alanımızla konut, ticari ve endüstriyel projelerde keşiften teslimata kadar
              bütüncül mühendislik hizmeti sunuyoruz.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon;
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
                {/* hover glow */}
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
                      <span className="text-xs font-medium tracking-widest text-white/30">0{i + 1}</span>
                    </div>
                    <h3 className={`font-semibold ${isMix ? "text-3xl md:text-4xl" : "text-xl"}`}>{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/55">{s.desc}</p>
                  </div>
                  <a
                    href="#iletisim"
                    className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white/60 transition group-hover:text-white md:mt-0"
                  >
                    Detaylı Bilgi
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
  );
}
