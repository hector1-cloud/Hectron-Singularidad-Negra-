import React from 'react';

function PageSeleccionProyecto({ alSiguiente }) {
  return (
    <div className="h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-zinc-900 border border-green-500/20 p-8 rounded-xl shadow-[0_0_50px_rgba(0,0,0,1)]">
        <h2 className="text-xl font-black mb-6 text-center tracking-widest text-white">
          SELECCIONAR_TIPO_DE_PROYECTO
        </h2>
        <p className="text-zinc-500 text-sm mb-8 text-center leading-relaxed">
          Elige el tipo de proyecto que deseas crear con HECTRON.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            className="bg-zinc-800 hover:bg-green-600/10 border border-green-500/30 hover:border-green-500 text-green-400 font-bold py-6 px-4 rounded shadow-[0_0_20px_rgba(34,197,94,0.1)] hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] transition-all duration-300 uppercase"
            onClick={() => alSiguiente('web')}
          >
            Proyecto_Web
          </button>
          
          <button
            className="bg-zinc-800 hover:bg-green-600/10 border border-green-500/30 hover:border-green-500 text-green-400 font-bold py-6 px-4 rounded shadow-[0_0_20px_rgba(34,197,94,0.1)] hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] transition-all duration-300 uppercase"
            onClick={() => alSiguiente('mobile')}
          >
            Proyecto_Mobile
          </button>
          
          <button
            className="bg-zinc-800 hover:bg-green-600/10 border border-green-500/30 hover:border-green-500 text-green-400 font-bold py-6 px-4 rounded shadow-[0_0_20px_rgba(34,197,94,0.1)] hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] transition-all duration-300 uppercase"
            onClick={() => alSiguiente('api')}
          >
            Proyecto_API
          </button>
          
          <button
            className="bg-zinc-800 hover:bg-green-600/10 border border-green-500/30 hover:border-green-500 text-green-400 font-bold py-6 px-4 rounded shadow-[0_0_20px_rgba(34,197,94,0.1)] hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] transition-all duration-300 uppercase"
            onClick={() => alSiguiente('custom')}
          >
            Proyecto_Personalizado
          </button>
        </div>
      </div>
    </div>
  );
}

export default PageSeleccionProyecto;
