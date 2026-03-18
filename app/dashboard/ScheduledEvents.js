import React from 'react';

const ScheduledEvents = () => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-50 flex flex-col gap-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold text-slate-400 tracking-wider">MY SCHEDULED EVENTS</h3>
        <button className="text-xs font-bold text-blue-500 bg-blue-50 px-3 py-1.5 rounded-xl hover:bg-blue-100 transition-colors flex items-center gap-1">
          Today
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Ring Chart */}
        <div className="relative w-44 h-44 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="88" cy="88" r="70" stroke="#f1f3f9" strokeWidth="16" fill="transparent" />
            <circle 
              cx="88" cy="88" r="70" 
              stroke="#5c7cfa" 
              strokeWidth="16" 
              strokeDasharray="440" 
              strokeDashoffset="44" 
              fill="transparent" 
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-4xl font-black text-slate-800">95%</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Busyness</span>
          </div>
        </div>

        {/* Stats List */}
        <div className="flex-1 space-y-6">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-slate-800">25</div>
            <div className="text-xs text-slate-400 font-medium">Consultations</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-slate-800">10</div>
            <div className="text-xs text-slate-400 font-medium whitespace-nowrap">Laboratory analyzes</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-slate-800">3</div>
            <div className="text-xs text-slate-400 font-medium">Meetings</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduledEvents;
