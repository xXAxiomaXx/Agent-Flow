"use client"; // Componentes interativos precisam ser Client Components

import { useState } from 'react';
import { Play, Loader2, CheckCircle } from 'lucide-react';

export default function AgentControl() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'running' | 'success'>('idle');

  const startAgent = async () => {
    setLoading(true);
    setStatus('running');

    try {
      // Chamamos a API via localhost (porque o browser do usuário que faz a requisição)
      const res = await fetch('http://localhost:8000/run-agent/WebScraper-01', {
        method: 'POST',
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Tarefa iniciada:", data.task_id);
        setStatus('success');
        // Resetamos o status após 3 segundos
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      console.error("Erro ao disparar agente:", error);
      setStatus('idle');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl max-w-md w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Agente de Monitoramento</h2>
          <p className="text-sm text-slate-400">ID: WebScraper-01</p>
        </div>
        <div className={`h-3 w-3 rounded-full ${status === 'running' ? 'bg-amber-500 animate-pulse' : 'bg-slate-700'}`} />
      </div>

      <button
        onClick={startAgent}
        disabled={loading || status === 'running'}
        className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
          status === 'running' 
          ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
          : 'bg-blue-600 hover:bg-blue-500 text-white active:scale-95'
        }`}
      >
        {loading ? (
          <Loader2 className="animate-spin h-5 w-5" />
        ) : status === 'success' ? (
          <CheckCircle className="h-5 w-5" />
        ) : (
          <Play className="h-5 w-5" />
        )}
        {status === 'running' ? 'Agente em Execução...' : 'Iniciar Automação'}
      </button>
    </div>
  );
}