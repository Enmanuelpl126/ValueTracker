import { motion } from "framer-motion";
import { Zap, CheckCircle2 } from "lucide-react";

export function ResultCard({ costPerUse, period }) {
  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      className="relative overflow-hidden mt-8 p-8 bg-indigo-600 rounded-[2rem] text-white shadow-2xl shadow-indigo-200"
    >
      <Zap className="absolute -right-4 -top-4 w-24 h-24 text-white/10 rotate-12" />
      <div className="relative z-10 text-center">
        <p className="text-indigo-100 text-[0.65rem] font-black uppercase tracking-[0.2em] mb-2">Costo por cada uso</p>
        <div className="text-5xl font-black mb-3 flex items-center justify-center tracking-tight">
          <span className="text-2xl mr-1 self-start mt-2 opacity-70">$</span>
          {costPerUse.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full backdrop-blur-md">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span className="text-[0.65rem] font-bold uppercase tracking-wider">
            {period === "monthly" ? "Basado en uso mensual" : "Basado en uso anual"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
