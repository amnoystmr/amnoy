import React from 'react';

const StatsCard = ({ title, value, sub, change, color }) => {
  const colorClasses = {
    rose: 'text-rose-500 bg-rose-50 border-rose-100',
    emerald: 'text-emerald-500 bg-emerald-50 border-emerald-100',
    blue: 'text-blue-500 bg-blue-50 border-blue-100',
  };

  const badgeColor = color === 'rose' ? 'text-rose-400' : color === 'emerald' ? 'text-emerald-400' : 'text-blue-400';

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-50 hover:shadow-md transition-shadow relative overflow-hidden group">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase">{title}</h3>
        <button className="text-slate-300 hover:text-slate-500">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
        </button>
      </div>

      <div className="flex items-end gap-6">
        {/* Simple SVG Chart */}
        <div className="w-16 h-12 flex items-center justify-center">
            <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                <path 
                    d={color === 'rose' ? "M0,35 Q20,10 40,30 T80,10 T100,20" : color === 'emerald' ? "M0,30 Q25,25 50,10 T80,20 T100,5" : "M0,30 L100,30"}
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3" 
                    className={colorClasses[color] ? colorClasses[color].split(' ')[0] : 'text-gray-500'}
                />
            </svg>
        </div>

        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-800">{value}</span>
          </div>
          <div className="text-[10px] whitespace-nowrap text-slate-400 font-medium mb-1">{sub}</div>
          <div className={`text-[10px] font-bold ${badgeColor}`}>{change}</div>
        </div>
      </div>
      
      {/* Decorative dot */}
      <div className={`absolute top-0 right-0 w-2 h-2 rounded-full m-4 ${color === 'rose' ? 'bg-rose-400' : color === 'emerald' ? 'bg-emerald-400' : 'bg-blue-400'} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
    </div>
  );
};

export default StatsCard;
