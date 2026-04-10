import React, { useState } from 'react';

function PageConfiguracionIA({ alFinalizar }) {
  const [modelo, setModelo] = useState('');

  return (
    <div className="h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-zinc-900 border border-green-500/20 p-8 rounded-xl">
        <h2 className="text-xs font-bold mb-6 text-green-800 tracking-[0.3em] uppercase">Inyección_de_Modelo</h2>
        <select 
          className="w-full bg-zinc-800 border border-zinc-700 text-green-400 py-3 px-4 rounded mb-6 outline-none focus:border-green-500"
          value={modelo} 
          onChange={(e) => setModelo(e.target.value)}
        >
          <option value="">-- SELECCIONA_HUGGINGFACE --</option>
          <option value="HECTRON-8B">HECTRON_8B_INSTRUCT</option>
          <option value="MISTRAL-V3">MISTRAL_7B_V0.3</option>
          <option value="ZEPHYR-BETA">ZEPHYR_7B_BETA</option>
        </select>
        <button
          className="w-full bg-green-600 text-white font-bold py-3 rounded shadow-[0_0_20px_rgba(34,197,94,0.3)] disabled:opacity-20"
          onClick={() => alFinalizar(modelo)}
          disabled={!modelo}
        >
          FINALIZAR_CARGA
        </button>
      </div>
    </div>
  );
}

export default PageConfiguracionIA;
