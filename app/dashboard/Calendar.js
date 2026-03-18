import React from 'react';

const Calendar = () => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = [
    { day: 'Sun', date: 12, active: false },
    { day: 'Mon', date: 13, active: true },
    { day: 'Tue', date: 14, active: false },
    { day: 'Wed', date: 15, active: false },
    { day: 'Thu', date: 16, active: false },
    { day: 'Fri', date: 17, active: false },
    { day: 'Sat', date: 18, active: false },
  ];

  const events = [
    { time: '2:00 pm', title: 'Meeting with chief physician Dr. Williams', color: 'bg-pink-400' },
    { time: '2:30 pm', title: 'Consultation with Mr. White', color: 'bg-blue-400' },
    { time: '3:00 pm', title: 'Consultation with Mrs. Maisy', color: 'bg-emerald-400' },
    { time: '3:50 pm', title: "Examination of Mrs. Lee's freckle", color: 'bg-yellow-400' },
    { time: '4:10 pm', title: 'Meeting with gastroenterologist Dr. Alice', color: 'bg-rose-400' },
  ];

  return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-50 flex flex-col flex-1 pb-10">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-sm font-bold text-slate-400 tracking-wider">MY CALENDAR</h3>
        <button className="text-xs font-bold text-blue-500 bg-blue-50 px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-100 transition-colors">
          April
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </button>
      </div>

      <div className="flex justify-around mb-8 border-b border-slate-50 pb-6">
        {dates.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-3">
            <span className="text-[10px] font-bold text-slate-300 uppercase">{item.day}</span>
            <div className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-black transition-all ${
              item.active 
                ? 'bg-[#5c7cfa] text-white shadow-lg shadow-blue-200 scale-110' 
                : 'text-slate-700 hover:bg-slate-50'
            }`}>
              {item.date}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-6 overflow-y-auto max-h-[300px] pr-2 scrollbar-hide">
        <div className="text-[10px] font-bold text-slate-300 tracking-widest uppercase mb-4">APRIL, 13</div>
        {events.map((event, index) => (
          <div key={index} className="flex items-start gap-4 group cursor-pointer">
            <div className="text-xs font-bold text-slate-400 whitespace-nowrap min-w-[55px]">{event.time}</div>
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${event.color} shadow-sm group-hover:scale-150 transition-transform`}></div>
              <div className="text-[11px] font-bold text-slate-500 group-hover:text-slate-800 transition-colors leading-relaxed">
                {event.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
