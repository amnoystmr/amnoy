import React from 'react';

const PlansDone = () => {
  const plans = [
    { name: 'Consultations', percentage: 64, color: 'bg-blue-500' },
    { name: 'Analysys', percentage: 50, color: 'bg-rose-400' },
    { name: 'Meetings', percentage: 33, color: 'bg-pink-400' },
  ];

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-50 flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-sm font-bold text-slate-400 tracking-wider uppercase">MY PLANS DONE</h3>
        <button className="text-xs font-bold text-blue-500 bg-blue-50 px-3 py-1.5 rounded-xl hover:bg-blue-100 transition-colors flex items-center gap-1">
          Today
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </button>
      </div>

      <div className="space-y-8 flex-1">
        {plans.map((plan, index) => (
          <div key={index} className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-500">{plan.name}</span>
              <span className="text-xs font-black text-slate-800">{plan.percentage}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-50 rounded-full overflow-hidden">
              <div 
                className={`h-full ${plan.color} rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${plan.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-8 w-full py-4 border-2 border-dashed border-slate-100 rounded-2xl text-blue-500 text-sm font-bold hover:bg-blue-50/50 transition-all flex items-center justify-center gap-2 group">
        <span className="text-xl group-hover:scale-125 transition-transform">+</span> Add plan
      </button>
    </div>
  );
};

export default PlansDone;
