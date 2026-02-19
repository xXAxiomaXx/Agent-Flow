"use client";

import { useEffect, useState } from 'react';
import { Clock, CheckCircle2, XCircle, Loader2, RefreshCcw } from 'lucide-react';

interface Job {
  id: number;
  agent_name: string;
  status: string;
  started_at: string;
  finished_at: string | null;
  result_summary: string | null;
}

export default function JobHistory() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/jobs');
      const data = await res.json();
      setJobs(data);
    } catch (error) {
      console.error("Erro ao buscar histórico:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    // Atualiza a lista automaticamente a cada 30 segundos
    const interval = setInterval(fetchJobs, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      <div className="bg-slate-800/50 px-6 py-4 flex justify-between items-center border-b border-slate-800">
        <h3 className="text-white font-bold flex items-center gap-2">
          <Clock size={18} className="text-blue-400" />
          Histórico de Execuções
        </h3>
        <button 
          onClick={fetchJobs}
          className="text-slate-400 hover:text-white transition-colors"
          title="Atualizar agora"
        >
          <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-900/50 text-slate-500 uppercase text-[10px] tracking-widest font-bold">
            <tr>
              <th className="px-6 py-3">Agente / ID</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Início</th>
              <th className="px-6 py-3">Resultado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {loading && jobs.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center">
                  <Loader2 className="animate-spin mx-auto text-blue-500 mb-2" />
                  <p className="text-slate-500 text-sm">Carregando histórico...</p>
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr key={job.id} className="hover:bg-blue-500/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-200">{job.agent_name}</div>
                    <div className="text-[10px] text-slate-500 font-mono">#JOB-{job.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={job.status} />
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400">
                    {new Date(job.started_at).toLocaleString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400 italic">
                    {job.result_summary || "---"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    RUNNING: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    SUCCESS: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    FAILED: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  const icons: Record<string, any> = {
    RUNNING: <Loader2 size={12} className="animate-spin" />,
    SUCCESS: <CheckCircle2 size={12} />,
    FAILED: <XCircle size={12} />,
  };

  return (
    <span className={`flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full border text-[10px] font-bold ${styles[status] || styles.RUNNING}`}>
      {icons[status] || icons.RUNNING}
      {status}
    </span>
  );
}