import React, { useState } from 'react';

function PageSeleccionProyecto({ alSiguiente }) {
  const [seleccion, setSeleccion] = useState('');

  return (
    <div className="h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-zinc-900 border border-green-500/20 p-8 rounded-xl">
        <h2 className="text-xs font-bold mb-6 text-green-800 tracking-[0.3em] uppercase">Selección_de_Protocolo</h2>
        <select 
          className="w-full bg-zinc-800 border border-zinc-700 text-green-400 py-3 px-4 rounded mb-6 outline-none focus:border-green-500"
          value={seleccion} 
          onChange={(e) => setSeleccion(e.target.value)}
        >
          <option value="">-- ELIGE_TIPO --</option>
          <option value="chatbot">CHATBOT_INTERACTIVO</option>
          <option value="predictor">PREDICTOR_DE_DATOS</option>
          <option value="clasificador">CLASIFICADOR_IA</option>
        </select>
        <button
          className="w-full bg-zinc-100 text-black font-black py-3 rounded disabled:opacity-20 transition-all"
          onClick={() => alSiguiente(seleccion)}
          disabled={!seleccion}
        >
          <button ...> {"SIGUIENTE_PASO >>"} </button>
  
        </button>
      </div>
    </div>
  );
}

export default PageSeleccionProyecto;
