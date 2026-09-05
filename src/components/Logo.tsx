import { motion } from "framer-motion";

export function LogoMark({ size = 48, animate = false }: { size?: number; animate?: boolean }) {
  const q = {
    hidden: { scale: 0, opacity: 0 },
    show: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: { delay: 0.15 * i, type: "spring" as const, stiffness: 200, damping: 16 },
    }),
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      initial={animate ? "hidden" : false}
      animate="show"
    >
      <defs>
        <linearGradient id="lg-fire" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff7a3d" />
          <stop offset="100%" stopColor="#e0341a" />
        </linearGradient>
        <linearGradient id="lg-water" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2b9be8" />
          <stop offset="100%" stopColor="#0f5fa8" />
        </linearGradient>
      </defs>

      <motion.g custom={0} variants={q} style={{ originX: "50px", originY: "50px" }}>
        <rect x="6" y="6" width="42" height="42" rx="2" fill="url(#lg-fire)" />
        <path
          d="M27 12c1 6-6 9-6 17 0 5 3 9 8 9s8-4 8-9c0-4-2-6-3-8-1 3-2 4-3 4 1-4-1-9-4-13z"
          fill="#fff"
        />
      </motion.g>

      <motion.g custom={1} variants={q} style={{ originX: "50px", originY: "50px" }}>
        <rect x="52" y="6" width="42" height="42" rx="2" fill="url(#lg-water)" />
        <path d="M73 13c-5 8-10 13-10 19a10 10 0 0 0 20 0c0-6-5-11-10-19z" fill="#fff" />
      </motion.g>

      <motion.g custom={2} variants={q} style={{ originX: "50px", originY: "50px" }}>
        <rect x="6" y="52" width="42" height="42" rx="2" fill="url(#lg-water)" />
        <g stroke="#fff" strokeWidth="3" strokeLinecap="round">
          <line x1="27" y1="60" x2="27" y2="86" />
          <line x1="14" y1="73" x2="40" y2="73" />
          <line x1="18" y1="64" x2="36" y2="82" />
          <line x1="36" y1="64" x2="18" y2="82" />
        </g>
      </motion.g>

      <motion.g custom={3} variants={q} style={{ originX: "50px", originY: "50px" }}>
        <rect x="52" y="52" width="42" height="42" rx="2" fill="url(#lg-fire)" />
        <circle cx="73" cy="73" r="8" fill="none" stroke="#fff" strokeWidth="3" />
        <g stroke="#fff" strokeWidth="3" strokeLinecap="round">
          <line x1="73" y1="57" x2="73" y2="60" />
          <line x1="73" y1="86" x2="73" y2="89" />
          <line x1="57" y1="73" x2="60" y2="73" />
          <line x1="86" y1="73" x2="89" y2="73" />
          <line x1="62" y1="62" x2="64" y2="64" />
          <line x1="82" y1="82" x2="84" y2="84" />
          <line x1="82" y1="64" x2="84" y2="62" />
          <line x1="62" y1="84" x2="64" y2="82" />
        </g>
      </motion.g>

      <motion.g custom={4} variants={q} style={{ originX: "50px", originY: "50px" }}>
        <circle cx="50" cy="50" r="8.5" fill="#fff" />
        <path
          d="M50 42.5a7.5 7.5 0 1 1-7.5 7.5 4.5 4.5 0 1 0 4.5-4.5 2.4 2.4 0 1 1 2.5 2.5"
          stroke="#f28b3a"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
        />
      </motion.g>
    </motion.svg>
  );
}

export function LogoFull({ light = true }: { light?: boolean }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5 md:gap-3.5">
      <img
        src="/logo.svg"
        alt="AKMEKANİK"
        className="h-10 w-auto shrink-0 object-contain md:h-12"
        style={{ filter: light ? "brightness(0) invert(1)" : "none" }}
      />
      <div className="min-w-0 leading-none">
        <div className={`truncate text-[1.02rem] font-extrabold tracking-[0.16em] md:text-[1.08rem] ${light ? "text-white" : "text-ink"}`}>
          AKMEKANİK
        </div>
        <div className={`mt-1 truncate text-[9px] font-medium tracking-[0.13em] md:text-[9px] ${light ? "text-white/70" : "text-ink/55"}`}>
          İnşaat San. ve Tic. Ltd. Şti.
        </div>
      </div>
    </div>
  );
}

export function LogoImage() {
  return (
    <img src="/logo.svg" alt="AKMEKANİK" className="h-12 w-auto object-contain md:h-14" />
  );
}
