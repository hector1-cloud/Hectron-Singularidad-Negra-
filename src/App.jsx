import React, { useState } from 'react';
import PageInicio from './components/PageInicio';
import PageSeleccionProyecto from './components/PageSeleccionProyecto';
import PageConfiguracionIA from './components/PageConfiguracionIA';

function App() {
  const [paso, setPaso] = useState('inicio');
  const [proyecto, setProyecto] = useState('');
  const [modelo, setModelo] = useState('');

  // Navegación limpia de Fricción Cero
  const irASeleccion = () => setPaso('seleccion');
  
  const irAConfiguracion = (tipoProyecto) => {
    setProyecto(tipoProyecto);
    setPaso('configuracion');
  };

  const finalizarTodo = (modeloSeleccionado) => {
    setModelo(modeloSeleccionado);
    setPaso('finalizado');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-green-500 font-mono selection:bg-green-500 selection:text-black">
      {paso === 'inicio' && <PageInicio alSiguiente={irASeleccion} />}
      
      {paso === 'seleccion' && <PageSeleccionProyecto alSiguiente={irAConfiguracion} />}
      
      {paso === 'configuracion' && <PageConfiguracionIA alFinalizar={finalizarTodo} />}
      
      {paso === 'finalizado' && (
        <div className="h-screen flex flex-col items-center justify-center p-6 text-center animate-pulse">
          <h1 className="text-4xl font-black mb-4 tracking-tighter">SISTEMA_OPERATIVO_LISTO</h1>
          <p className="text-zinc-500 border border-green-500/30 p-4 rounded">
            Proyecto: <span className="text-white">{proyecto.toUpperCase()}</span><br/>
            Núcleo: <span className="text-white">{modelo.toUpperCase()}</span>
          </p>
          <button onClick={() => window.location.reload()} className="mt-8 text-xs hover:underline">REINICIAR_MATRIZ</button>
        </div>
      )}
    </div>
  );
}

export default App;
