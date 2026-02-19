"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '10:00', tasks: 4 },
  { name: '10:05', tasks: 7 },
  { name: '10:10', tasks: 5 },
  { name: '10:15', tasks: 12 },
  { name: '10:20', tasks: 9 },
];

export default function ExecutionChart() {
  return (
    <div className="w-full max-w-4xl h-64 bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-2xl">
      <h3 className="text-slate-400 text-xs font-bold mb-4 uppercase">Volume de Automações (Última Hora)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
          <YAxis stroke="#64748b" fontSize={12} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }}
            itemStyle={{ color: '#60a5fa' }}
          />
          <Line type="monotone" dataKey="tasks" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}