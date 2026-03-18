import React from 'react';
import { Search, Bell, Settings } from 'lucide-react';

const Header = () => {
  return (
    <div className="flex items-center justify-between w-full px-8 py-6">
      {/* Search Bar */}
      <div className="relative w-2/3">
        <input
          type="text"
          placeholder="Search for events, patients etc."
          className="w-full bg-white border-2 border-slate-100 rounded-2xl py-3 px-6 pr-12 focus:outline-none focus:border-blue-400 text-slate-600 transition-all font-medium shadow-sm ring-blue-50/50 focus:ring-4"
        />
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
      </div>

      {/* Action Icons */}
      <div className="flex gap-4">
        <button className="p-3 bg-white hover:bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-600 transition-all shadow-sm group">
          <Bell size={24} className="group-hover:scale-110 transition-transform text-blue-500" />
        </button>
        <button className="p-3 bg-white hover:bg-slate-50 border-2 border-slate-100 rounded-2xl text-slate-600 transition-all shadow-sm group">
          <Settings size={24} className="group-hover:rotate-45 transition-transform text-slate-400" />
        </button>
      </div>
    </div>
  );
};

export default Header;
