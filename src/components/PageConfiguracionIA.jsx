import React, { useState } from 'react';

function PageConfiguracionIA({ alFinalizar }) {
  const [modelo, setModelo] = useState('');
  const [cargando, setCargando] = useState(false);

  // PROTOCOLO DE CONEXIÓN CON EL NÚCLEO HECTRON
  const ejecutarInyeccion = async () => {
    setCargando(true);
    
    // Aquí simulamos la latencia de conexión con Hugging Face
    // En el futuro, aquí dispararemos el 'fetch' hacia tu API Token
    setTimeout(() => {
      setCargando(false);
      alFinalizar(modelo);
    }, 1500); 
  };

  return (
    <div className="h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-zinc-900 border border-green-500/20 p-8 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.7)]">
        <h2 className="text-xs font-bold mb-6 text-green-800 tracking-[0.3em] uppercase flex justify-between">
          Inyección_de_Modelo
          {cargando && <span className="animate-pulse text-green-500">CONECTANDO...</span>}
        </h2>

        <div className="relative group">
          <select 
            className="w-full bg-zinc-800 border border-zinc-700 text-green-400 py-3 px-4 rounded mb-6 outline-none focus:border-green-500 appearance-none transition-all cursor-pointer"
            value={modelo} 
            onChange={(e) => setModelo(e.target.value)}
            disabled={cargando}
          >
            <option value="">-- SELECCIONA_HUGGINGFACE --</option>
            <option value="HECTRON-8B">HECTRON_8B_INSTRUCT (ABADALABS)</option>
            <option value="MISTRAL-V3">MISTRAL_7B_V0.3</option>
            <option value="ZEPHYR-BETA">ZEPHYR_7B_BETA</option>
          </select>
          <div className="absolute right-4 top-3 pointer-events-none text-green-800">▼</div>
        </div>

        <button
          className={`w-full font-bold py-3 rounded transition-all duration-500 uppercase tracking-widest ${
            cargando 
            ? 'bg-zinc-800 text-zinc-600 cursor-wait' 
            : 'bg-green-600 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:bg-green-500 hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]'
          }`}
          onClick={ejecutarInyeccion}
          disabled={!modelo || cargando}
        >
          {cargando ? 'Sincronizando...' : 'Finalizar_Carga'}
        </button>

        <p className="mt-4 text-[10px] text-zinc-700 text-center uppercase tracking-tighter">
          Al presionar finalizar, se establecerá un puente SSL con los servidores de Hugging Face.
        </p>
      </div>
    </div>
  );
}

export default PageConfiguracionIA;
