import { Activity, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function StatsGrid() {
  const stats = [
    { label: "Total de Tarefas", value: "128", icon: Activity, color: "text-blue-400" },
    { label: "Sucesso", value: "98.5%", icon: CheckCircle, color: "text-green-400" },
    { label: "Tempo Médio", value: "4.2s", icon: Clock, color: "text-amber-400" },
    { label: "Falhas", value: "2", icon: AlertCircle, color: "text-red-400" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full max-w-6xl mb-8">
      {stats.map((s, i) => (
        <div key={i} className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">{s.label}</span>
            <s.icon size={18} className={s.color} />
          </div>
          <div className="mt-2 text-2xl font-black text-white">{s.value}</div>
        </div>
      ))}
    </div>
  );
}