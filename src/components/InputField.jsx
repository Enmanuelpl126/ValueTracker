export function InputField({ label, icon: Icon, value, onChange, placeholder, type = "number", min = "0", onlyIntegers = false }) {
  const handleChange = (newValue) => {
    // Si el usuario borra todo, permitirlo
    if (newValue === "") {
      onChange("");
      return;
    }

    if (type === "number") {
      // Expresión regular para validar el formato según las reglas:
      // - Si onlyIntegers es true: Solo dígitos.
      // - Si onlyIntegers es false: Dígitos opcionalmente seguidos de un punto y más dígitos.
      const regex = onlyIntegers ? /^\d+$/ : /^\d*\.?\d*$/;
      
      if (!regex.test(newValue)) {
        return;
      }

      // Validar que no sea negativo (aunque la regex ya lo previene al no incluir el signo -)
      const num = parseFloat(newValue);
      if (num < 0) return;
    }
    
    onChange(newValue);
  };

  // Prevenir caracteres no deseados en el evento onKeyDown (como 'e', 'E', '+', '-')
  const handleKeyDown = (e) => {
    if (type === "number") {
      const invalidChars = ["e", "E", "+", "-"];
      if (onlyIntegers) {
        invalidChars.push(".", ",");
      }
      if (invalidChars.includes(e.key)) {
        e.preventDefault();
      }
    }
  };

  return (
    <div className="group">
      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        <input
          type={type}
          value={value}
          min={min}
          onKeyDown={handleKeyDown}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          className="block w-full pl-12 pr-6 py-5 bg-slate-50 border-2 border-transparent rounded-2xl text-xl font-bold text-slate-800 transition-all outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-300"
        />
      </div>
    </div>
  );
}
