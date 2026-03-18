import React from 'react';
import { Edit2, MapPin } from 'lucide-react';

const Profile = () => {
  return (
    <div className="bg-[#5c7cfa] rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden group">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/20 transition-colors"></div>
      
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-sm font-bold tracking-widest uppercase opacity-90">MY PROFILE</h3>
        <button className="p-2 bg-white/20 rounded-xl hover:bg-white/30 transition-all border border-white/20">
          <Edit2 size={16} />
        </button>
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full border-4 border-white/30 overflow-hidden shadow-2xl transition-transform group-hover:scale-105">
            {/* Using a placeholder for the avatar */}
            <div className="w-full h-full bg-blue-200 flex items-center justify-center">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-400 border-4 border-white rounded-full"></div>
        </div>

        <h2 className="text-2xl font-black mb-1">Dr. Alisha Nicholls</h2>
        <div className="text-[10px] font-bold opacity-70 tracking-widest uppercase mb-4">DERMATOLOGIST</div>
        
        <div className="flex items-center gap-1.5 text-xs font-medium opacity-80 mb-10">
          <MapPin size={14} className="text-blue-200" />
          Bottrop, Germany
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/20 text-center">
        <div>
          <div className="text-[10px] font-bold opacity-60 mb-2 uppercase">Date Birth</div>
          <div className="text-sm font-black italic">17.07.86</div>
        </div>
        <div>
          <div className="text-[10px] font-bold opacity-60 mb-2 uppercase">Blood</div>
          <div className="text-sm font-black italic">A(II) Rh+</div>
        </div>
        <div>
          <div className="text-[10px] font-bold opacity-60 mb-2 uppercase whitespace-nowrap">Working Hours</div>
          <div className="text-sm font-black italic">9pm - 5am</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
