Viteeact, { useState } from 'react';

function PageSeleccionProyecto({ alSiguiente }) {
  const [seleccion, setSeleccion] = useState('');

  return (
    <div className="h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-zinc-900 border border-green-500/20 p-8 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        
        <h2 className="text-xs font-bold mb-6 text-green-800 tracking-[0.3em] uppercase">
          Selección_de_Protocolo
        </h2>

        <div className="relative">
          <select 
            className="w-full bg-zinc-800 border border-zinc-700 text-green-400 py-3 px-4 rounded mb-8 outline-none focus:border-green-500 appearance-none transition-all cursor-pointer"
            value={seleccion} 
            onChange={(e) => setSeleccion(e.target.value)}
          >
            <option value="">-- ELIGE_TIPO --</option>
            <option value="chatbot">CHATBOT_INTERACTIVO</option>
            <option value="predictor">PREDICTOR_DE_DATOS</option>
            <option value="clasificador">CLASIFICADOR_IA</option>
          </select>
          <div className="absolute right-4 top-3 pointer-events-none text-green-900 text-xs">▼</div>
        </div>

        <button
          className="w-full bg-zinc-100 hover:bg-white text-black font-black py-4 rounded disabled:opacity-20 transition-all duration-300 shadow-[0_4px_15px_rgba(255,255,255,0.1)] uppercase tracking-widest text-sm"
          onClick={() => alSiguiente(seleccion)}
          disabled={!seleccion}
        >
          {"SIGUIENTE _PASO >>"}
          {"SIGUIENTE_PASO >>"}
        </button>

        <div className="mt-6 flex justify-between items-center opacity-20">
          <div className="h-[1px] bg-green-900 flex-1"></div>
          <span className="mx-4 text-[8px] text-green-500">ABADALABS_SISTEMAS</span>
          <div className="h-[1px] bg-green-900 flex-1"></div>
        </div>
      </div>
    </div>
  );
}

export default PageSeleccionProyecto;
