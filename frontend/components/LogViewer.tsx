"use client";

import { useEffect, useState, useRef } from 'react';
import { Terminal } from 'lucide-react';

export default function LogViewer() {
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Conecta ao WebSocket do FastAPI
    const socket = new WebSocket('ws://localhost:8000/ws/logs');

    socket.onmessage = (event) => {
      setLogs((prev) => [...prev, event.data]);
    };

    return () => socket.close();
  }, []);

  // Auto-scroll para o final dos logs
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="mt-6 w-full max-w-2xl bg-black rounded-lg border border-slate-800 overflow-hidden shadow-2xl">
      <div className="bg-slate-900 px-4 py-2 flex items-center gap-2 border-b border-slate-800">
        <Terminal size={16} className="text-blue-400" />
        <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Live Agent Logs</span>
      </div>
      <div 
        ref={scrollRef}
        className="p-4 h-64 overflow-y-auto font-mono text-sm space-y-1 scrollbar-thin scrollbar-thumb-slate-700"
      >
        {logs.length === 0 && (
          <p className="text-slate-600 italic">Aguardando início de processo...</p>
        )}
        {logs.map((log, i) => (
          <div key={i} className="flex gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
            <span className="text-slate-500">[{new Date().toLocaleTimeString()}]</span>
            <span className="text-blue-300">{log}</span>
          </div>
        ))}
      </div>
    </div>
  );
}