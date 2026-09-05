import { motion } from "framer-motion";
import { LogoMark } from "./Logo";

export function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink"
      initial={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
    >
      <LogoMark size={96} animate />
      <motion.div
        className="mt-8 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div
          className="text-2xl font-bold tracking-[0.35em] text-white"
          initial={{ y: 40 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          AKMEKANİK
        </motion.div>
      </motion.div>
      <div className="mt-6 h-px w-40 overflow-hidden bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-fire to-water"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
