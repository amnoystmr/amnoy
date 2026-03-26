"use client"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', count: 12 }, { name: 'Tue', count: 18 }, { name: 'Wed', count: 15 },
  { name: 'Thu', count: 25 }, { name: 'Fri', count: 20 }, { name: 'Sat', count: 10 },
];

export default function MainChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4C6EF5" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#4C6EF5" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F3FF" />
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
        <Tooltip />
        <Area type="monotone" dataKey="count" stroke="#4C6EF5" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}