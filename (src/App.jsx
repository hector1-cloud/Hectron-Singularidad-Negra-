import React, { useState } from 'react';
import PageInicio from './components/PageInicio';
import PageSeleccionProyecto from './components/PageSeleccionProyecto';
import PageConfiguracionIA from './components/PageConfiguracionIA';

// --- NUEVA CAPA DE COMUNICACIÓN CON EL NÚCLEO ---
const HUGGING_FACE_TOKEN = import.meta.env.VITE_HF_TOKEN; 

function App() {
  const [paso, setPaso] = useState('inicio');
  const [modelo, setModelo] = useState('');
  const [respuestaIA, setRespuestaIA] = useState('ESPERANDO_SEÑAL...');

  const irAConfiguracion = (tipo) => setPaso('configuracion');

  const finalizarTodo = async (modeloSeleccionado) => {
    setModelo(modeloSeleccionado);
    setPaso('finalizado');
    
    // Test de conexión automática al finalizar
    try {
      const res = await fetch(
        `https://api-inference.huggingface.co/models/AbadaLabs/HECTRON`,
        {
          headers: { Authorization: `Bearer ${HUGGING_FACE_TOKEN}` },
          method: "POST",
          body: JSON.stringify({ inputs: "Reportar estado del sistema." }),
        }
      );
      const data = await res.json();
      setRespuestaIA(data[0]?.generated_text || "CONEXIÓN_ESTABLECIDA");
    } catch (err) {
      setRespuestaIA("ERROR_DE_ENLACE_TOKEN_NO_DETECTADO");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-green-500 font-mono">
      {paso === 'inicio' && <PageInicio alSiguiente={() => setPaso('seleccion')} />}
      {paso === 'seleccion' && <PageSeleccionProyecto alSiguiente={irAConfiguracion} />}
      {paso === 'configuracion' && <PageConfiguracionIA alFinalizar={finalizarTodo} />}
      
      {paso === 'finalizado' && (
        <div className="h-screen flex flex-col items-center justify-center p-6 text-center">
          <div className="border border-green-500/50 p-6 rounded-lg bg-zinc-900 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
            <h1 className="text-2xl font-black mb-4 tracking-tighter text-white">NÚCLEO_ACTIVO</h1>
            <div className="bg-black p-4 rounded text-xs text-left mb-4 h-32 overflow-y-auto border border-zinc-800">
              <span className="text-green-800">>> [HECTRON_RESPONSE]:</span><br/>
              <span className="text-green-400">{respuestaIA}</span>
            </div>
            <p className="text-[10px] text-zinc-600">SISTEMA CONECTADO VÍA API_INFERENCE_LINK</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
