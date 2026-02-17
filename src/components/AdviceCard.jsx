import { motion } from "framer-motion";
import { Info } from "lucide-react";

export function AdviceCard({ advice }) {
  if (!advice) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex gap-4 p-5 rounded-2xl border ${advice.bg} ${advice.border} items-start shadow-sm`}
    >
      <div className={`mt-0.5 p-2 rounded-xl bg-white shadow-sm`}>
        <Info className={`w-5 h-5 ${advice.color}`} />
      </div>
      <p className={`text-sm leading-snug font-bold ${advice.color}`}>
        {advice.text}
      </p>
    </motion.div>
  );
}
