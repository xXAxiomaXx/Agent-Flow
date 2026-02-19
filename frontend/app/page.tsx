import AgentControl from '@/components/AgentControl';
import LogViewer from '@/components/LogViewer';
import StatsGrid from '@/components/StatsGrid';
import ExecutionChart from '@/components/ExecutionChart';
import JobHistory from '@/components/JobHistory';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-4 md:p-12">
      <header className="max-w-6xl mx-auto mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-blue-500 to-emerald-400 bg-clip-text text-transparent">
            AGENTFLOW <span className="text-xs font-mono text-slate-500 ml-2">v1.2.0</span>
          </h1>
          <p className="text-slate-400">Sistema de Orquestração de Agentes Python</p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-xs text-slate-500 uppercase">Uptime do Cluster</p>
          <p className="font-mono text-emerald-400">99.9%</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <StatsGrid />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            <AgentControl />
            <div className="p-6 bg-blue-900/10 border border-blue-500/20 rounded-xl">
              <h4 className="text-blue-400 font-bold mb-2">Dica de Operação</h4>
              <p className="text-sm text-slate-400">Cada agente roda em um container isolado. Você pode escalar via Docker conforme a demanda cresce.</p>
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-8">
            <ExecutionChart />
            <LogViewer />
            <JobHistory />
          </div>
        </div>
      </div>
    </main>
  );
}