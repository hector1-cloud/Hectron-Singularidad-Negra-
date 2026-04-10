import React from 'react';

function PageInicio({ alSiguiente }) {
  return (
    <div className="h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-zinc-900 border border-green-500/20 p-8 rounded-xl shadow-[0_0_50px_rgba(0,0,0,1)]">
        <div className="w-12 h-12 border-2 border-green-500 rounded-full mb-6 mx-auto animate-spin-slow flex items-center justify-center">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
        <h1 className="text-2xl font-black mb-2 text-center tracking-widest text-white">ABADALABS_VANGUARDIA</h1>
        <p className="text-zinc-500 text-sm mb-8 text-center leading-relaxed">
          CONECTAR PARA CREAR EXPERIENCIAS DE USUARIO CON CERO FRICCIÓN.
        </p>
        <button
          className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all duration-300 uppercase"
          onClick={alSiguiente}
        >
          Iniciar_Proyecto
        </button>
      </div>
    </div>
  );
}

export default PageInicio;
