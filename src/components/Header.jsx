import { motion } from "framer-motion";
import { RefreshCcw } from "lucide-react";

export function Header() {
  return (
    <header className="mb-8 text-center">
      <motion.div 
        whileHover={{ rotate: 180 }}
        transition={{ duration: 0.5 }}
        className="inline-flex p-3 bg-indigo-600 rounded-2xl mb-4 shadow-lg shadow-indigo-200"
      >
        <RefreshCcw className="w-6 h-6 text-white" />
      </motion.div>
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">ValueTracker</h1>
      <p className="text-slate-500 mt-2 text-sm font-medium">Finanzas conscientes para compras inteligentes.</p>
    </header>
  );
}
