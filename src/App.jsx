import { useState, useEffect } from "react";
import { DollarSign, Calendar, TrendingDown, ShoppingBag, Coffee, Laptop } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "./components/Header";
import { InputField } from "./components/InputField";
import { ResultCard } from "./components/ResultCard";
import { AdviceCard } from "./components/AdviceCard";

function App() {
  const [price, setPrice] = useState("");
  const [usage, setUsage] = useState("");
  const [period, setPeriod] = useState("monthly"); // monthly or yearly
  const [costPerUse, setCostPerUse] = useState(0);

  useEffect(() => {
    const p = parseFloat(price) || 0;
    const u = parseFloat(usage) || 0;
    
    if (p > 0 && u > 0) {
      setCostPerUse(p / u);
    } else {
      setCostPerUse(0);
    }
  }, [price, usage]);

  const getAdvice = (cpu) => {
    if (cpu === 0) return null;
    if (cpu < 0.5) return { text: "¡Inversión estelar! Prácticamente gratis por cada uso.", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" };
    if (cpu < 2) return { text: "Cuesta menos que un café. ¡Vale la pena!", color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-100" };
    if (cpu < 10) return { text: "Es una compra razonable si la calidad lo justifica.", color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-100" };
    if (cpu < 50) return { text: "Empieza a ser caro. ¿Hay una alternativa más barata?", color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-100" };
    return { text: "¡Alerta de lujo! El costo por uso es muy alto.", color: "text-rose-500", bg: "bg-rose-50", border: "border-rose-100" };
  };

  const advice = getAdvice(costPerUse);

 

  const applyExample = (ex) => {
    setPrice(ex.price.toString());
    setUsage(ex.usage.toString());
    setPeriod(ex.period);
  };

  const handleChangePeriod = (newPeriod) => {
    if (newPeriod === period) return;
    const u = parseFloat(usage) || 0;
    if (u > 0) {
      if (newPeriod === "yearly" && period === "monthly") {
        setUsage((Math.round(u * 12)).toString());
      } else if (newPeriod === "monthly" && period === "yearly") {
        setUsage((Math.round(u / 12)).toString());
      }
    }
    setPeriod(newPeriod);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center py-12 px-4 font-sans text-slate-900">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <Header />

        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 p-8 border border-slate-100 space-y-8">
          {/* Quick Examples */}
          

          <div className="space-y-6">
            <InputField 
              label="Precio del Producto" 
              icon={DollarSign} 
              value={price} 
              onChange={setPrice} 
              placeholder="0.00" 
            />

            <div className="group">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">¿Cuánto lo usarás?</label>
              <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl mb-4">
                <button
                  onClick={() => handleChangePeriod("monthly")}
                  className={`flex-1 py-2.5 text-xs font-black rounded-xl transition-all ${period === "monthly" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-600"}`}
                >
                  AL MES
                </button>
                <button
                  onClick={() => handleChangePeriod("yearly")}
                  className={`flex-1 py-2.5 text-xs font-black rounded-xl transition-all ${period === "yearly" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-600"}`}
                >
                  AL AÑO
                </button>
              </div>
              <InputField 
                label="" 
                icon={Calendar} 
                value={usage} 
                onChange={setUsage} 
                placeholder={period === "monthly" ? "Veces al mes" : "Veces al año"} 
                onlyIntegers={true}
              />
            </div>

            <AnimatePresence mode="wait">
              {costPerUse > 0 ? (
                <ResultCard costPerUse={costPerUse} period={period} />
              ) : (
                <div className="mt-8 p-10 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center text-slate-300 bg-slate-50/50">
                  <TrendingDown className="w-10 h-10 mb-3 opacity-20" />
                  <p className="text-sm font-bold uppercase tracking-widest opacity-40">Esperando datos...</p>
                </div>
              )}
            </AnimatePresence>

            <AdviceCard advice={advice} />
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-slate-100">
            <p className="text-[0.6rem] font-black text-slate-400 uppercase tracking-widest mb-1">Ahorro potencial</p>
            <p className="text-sm font-bold text-slate-700">Evita compras compulsivas analizando el valor real.</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-slate-100">
            <p className="text-[0.6rem] font-black text-slate-400 uppercase tracking-widest mb-1">Dato curioso</p>
            <p className="text-sm font-bold text-slate-700">El 80% del valor viene del uso, no del objeto.</p>
          </div>
        </div>
      </motion.div>

      <footer className="mt-12 text-slate-400 text-[0.6rem] font-black uppercase tracking-[0.3em] flex items-center gap-2">
        <div className="w-8 h-[1px] bg-slate-200"></div>
        ValueTracker 2026
        <div className="w-8 h-[1px] bg-slate-200"></div>
      </footer>
    </div>
  );
}

export default App;
