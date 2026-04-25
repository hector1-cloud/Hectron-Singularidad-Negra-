import React, { useState } from 'react';
import PageInicio from './components/PageInicio';
import PageSeleccionProyecto from './components/PageSeleccionProyecto';
import PageConfiguracionIA from './components/PageConfiguracionIA';
import ChatTerminal from './components/ChatTerminal'; // El nuevo componente
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {
  const [paso, setPaso] = useState('inicio');
  const [proyecto, setProyecto] = useState('');
  const [modelo, setModelo] = useState('');

  const irAConfiguracion = (tipo) => {
    setProyecto(tipo);
    setPaso('configuracion');
  };

  const finalizarTodo = (modeloSeleccionado) => {
    setModelo(modeloSeleccionado);
    setPaso('chat'); // Saltamos al chat operativo
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-green-500 font-mono">
      {paso === 'inicio' && <PageInicio alSiguiente={() => setPaso('seleccion')} />}
      {paso === 'seleccion' && <PageSeleccionProyecto alSiguiente={irAConfiguracion} />}
      {paso === 'configuracion' && <PageConfiguracionIA alFinalizar={finalizarTodo} />}
      
      {paso === 'chat' && (
        <ChatTerminal proyecto={proyecto} modelo={modelo} />
      )}
      <SpeedInsights />
    </div>
  );
}

export default App;
