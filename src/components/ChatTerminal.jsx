import React, { useState, useEffect, useRef } from 'react';

// El token se extrae de las variables de entorno de Vercel
const HF_TOKEN = import.meta.env.VITE_HF_TOKEN;

function ChatTerminal({ proyecto, modelo }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'system', content: `NÚCLEO_${modelo}_ACTIVO. PROYECTO: ${proyecto?.toUpperCase()}.` },
    { role: 'assistant', content: 'Protocolos de comunicación establecidos. ¿Qué órdenes tiene, Arquitecto?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll al recibir nuevos datos
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Inyección de señal hacia Hugging Face
      const response = await fetch(
        `https://api-inference.huggingface.co/models/AbadaLabs/HECTRON`,
        {
          headers: { 
            Authorization: `Bearer ${HF_TOKEN}`,
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({ 
            inputs: input,
            parameters: { max_new_tokens: 250, return_full_text: false }
          }),
        }
      );
      
      const data = await response.json();
      
      // Limpieza de respuesta para evitar duplicados o errores de formato
      let aiContent = "";
      if (Array.isArray(data)) {
        aiContent = data[0]?.generated_text || "ERROR: RESPUESTA_VACÍA";
      } else {
        aiContent = data.generated_text || "ERROR: ESTRUCTURA_NO_RECONOCIDA";
      }

      setMessages(prev => [...prev, { role: 'assistant', content: aiContent }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "FALLO_DE_ENLACE: VERIFIQUE_VARIABLE_VITE_HF_TOKEN" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-black p-2 sm:p-4 font-mono text-green-500">
      {/* Header Estilo Satelital */}
      <div className="border-b border-green-900/50 pb-2 mb-4 flex justify-between text-[9px] uppercase tracking-[0.2em]">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
          ENLACE_ESTABLE
        </span>
        <span>MODO: {proyecto?.toUpperCase()}</span>
      </div>

      {/* Caja de Diálogo */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 scrollbar-thin scrollbar-thumb-green-900">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] p-3 rounded-lg border ${
              msg.role === 'user' 
                ? 'bg-green-950/10 border-green-500/20 text-green-200' 
                : msg.role === 'system'
                ? 'bg-zinc-900/50 border-zinc-700 text-zinc-500 italic'
                : 'bg-zinc-900 border-zinc-800 text-green-400'
            }`}>
              <p className="text-[9px] opacity-40 mb-1 font-black">
                {msg.role === 'assistant' ? ">> HECTRON_OS" : msg.role === 'user' ? ">> OPERADOR" : ">> SYS_LOG"}
              </p>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-green-800 animate-pulse">
            <span>PROCESANDO_BIT_DE_DATOS...</span>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Entrada de Comandos Cyberpunk */}
      <form onSubmit={sendMessage} className="relative mt-auto">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-green-800">
          {">"}
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Introducir comando neural..."
          className="w-full bg-zinc-900 border border-zinc-800 text-green-400 py-4 pl-10 pr-12 rounded-xl outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all text-sm placeholder:text-zinc-700 shadow-2xl"
          disabled={isTyping}
        />
        <button 
          className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 hover:text-white transition-colors"
          type="submit"
        >
          {/* Símbolo de retorno escapado para evitar errores de build */}
          {"↵"}
        </button>
      </form>
    </div>
  );
}

export default ChatTerminal;
