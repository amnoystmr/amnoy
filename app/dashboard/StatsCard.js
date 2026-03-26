import { Users, Calendar, CheckCircle, AlertTriangle } from 'lucide-react';

const icons = {
  Users: <Users size={24} />,
  Calendar: <Calendar size={24} />,
  CheckCircle: <CheckCircle size={24} />,
  AlertTriangle: <AlertTriangle size={24} />
};

export default function StatsCard({ title, value, unit, color, textColor, icon }) {
  return (
    <div className={`${color} p-6 rounded-[2rem] border border-white shadow-sm flex items-center gap-5 transition-transform hover:scale-105 duration-300`}>
      <div className={`p-3 rounded-2xl bg-white shadow-sm ${textColor}`}>
        {icons[icon]}
      </div>
      <div>
        <p className={`text-[13px] font-bold opacity-70 ${textColor} font-phetsarath`}>{title}</p>
        <div className="flex items-baseline gap-1">
          <h2 className={`text-2xl font-extrabold ${textColor}`}>{value}</h2>
          <span className={`text-[11px] font-bold ${textColor} opacity-60 font-phetsarath`}>{unit}</span>
        </div>
      </div>
    </div>
  );
}