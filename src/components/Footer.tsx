import { ArrowUp } from "lucide-react";
import { Magnetic } from "./ui";

const WHATSAPP_NUMBER = "905428002025";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function Footer() {
  const whatsappIcon = (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" aria-hidden="true">
      <path
        d="M16.04 4C9.4 4 4 9.36 4 15.94c0 2.09.55 4.13 1.6 5.94L4 28l6.3-1.64a12.1 12.1 0 0 0 5.74 1.45h.01c6.63 0 12.03-5.36 12.03-11.94 0-3.19-1.25-6.18-3.5-8.42A11.8 11.8 0 0 0 16.04 4Zm0 21.9a10 10 0 0 1-5.15-1.42l-.37-.22-3.74.98 1-3.65-.24-.37a9.9 9.9 0 0 1-1.53-5.27c0-5.5 4.5-9.98 10.04-9.98a10 10 0 0 1 7.05 2.91 9.85 9.85 0 0 1 2.91 7.03c0 5.5-4.51 9.98-10 9.98Zm5.5-7.47c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.23-.65.08-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.78-1.68-2.08-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.52.07-.8.37-.27.28-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35Z"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <footer className="relative border-t border-white/10 pt-20">
      {/* Floating WhatsApp button — sabit, her zaman görünür */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp ile iletişime geç"
        className="fixed bottom-6 right-6 z-[200] flex items-center justify-center rounded-full bg-[#25D366] p-4 text-white shadow-[0_12px_40px_-8px_rgba(37,211,102,0.7)] transition hover:scale-105"
      >
        {whatsappIcon}
      </a>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div>
              <div className="text-lg font-extrabold tracking-[0.2em]">AKMEKANİK</div>
              <div className="text-[9px] tracking-widest text-white/50">İnşaat San. ve Tic. Ltd. Şti.</div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/50">
              AKMEKANİK İnşaat Sanayi ve Ticaret Limited Şirketi. Mekanik tesisat ve inşaat taahhüt işlerinde
              güvenilir çözüm ortağınız.
            </p>
          </div>
          <div className="md:col-span-3">
            <div className="mb-5 text-xs uppercase tracking-[0.25em] text-white/40">Hizmetler</div>
            <ul className="space-y-2.5 text-sm text-white/70">
              {["Sıhhi Tesisat", "Doğalgaz Tesisatı", "Klima Tesisatı", "Yangın Tesisatı", "Havalandırma", "Isıtma Tesisatı", "İnşaat Taahhüt"].map(
                (s) => (
                  <li key={s}>
                    <a href="#hizmetler" className="transition hover:text-fire">
                      {s}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>
          <div className="md:col-span-4">
            <div className="mb-5 text-xs uppercase tracking-[0.25em] text-white/40">Kurumsal</div>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>Zafer Mah. Adile Naşit Blv. No:30-32 G Dükkan 324</li>
              <li>Esenyurt, İstanbul – Türkiye</li>
              <li className="pt-3 text-white/45">Vergi No: 0320284587 (Avcılar)</li>
              <li className="text-white/45">Ticaret Sicil No: 897265-0</li>
              <li className="text-white/45">Mersis No: 0032-0284-5870-0010</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 py-8 md:flex-row">
          <div className="text-xs text-white/40">
            © {new Date().getFullYear()} AKMEKANİK İnşaat San. ve Tic. Ltd. Şti. Tüm hakları saklıdır.
          </div>
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 text-center text-[16vw] font-extrabold leading-[0.8] text-white/[0.03] select-none">
          AKMEKANİK
        </div>
      </div>
    </footer>
  );
}
