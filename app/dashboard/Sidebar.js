import React from 'react';
import { Home, LineChart, Send, Calendar, LayoutGrid, Info, LogOut } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: <Home size={24} />, active: true },
    { icon: <LineChart size={24} />, active: false },
    { icon: <Send size={24} />, active: false },
    { icon: <Calendar size={24} />, active: false },
    { icon: <LayoutGrid size={24} />, active: false },
    { icon: <Info size={24} />, active: false },
  ];

  return (
    <div className="flex flex-col items-center w-20 h-[calc(100vh-40px)] bg-[#4c6ef5] text-white py-8 m-5 rounded-3xl shadow-xl justify-between">
      <div className="flex flex-col items-center gap-10">
        <div className="mb-4 text-center">
          <div className="font-bold text-lg leading-tight">Med</div>
          <div className="text-sm">care</div>
        </div>
        
        <div className="flex flex-col gap-8">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`p-3 rounded-xl transition-all duration-300 ${
                item.active 
                  ? 'bg-white/20 shadow-lg scale-110' 
                  : 'hover:bg-white/10 opacity-70 hover:opacity-100'
              }`}
            >
              {item.icon}
            </button>
          ))}
        </div>
      </div>

      <button className="p-3 rounded-xl hover:bg-white/10 transition-all opacity-70 hover:opacity-100 mt-auto">
        <LogOut size={24} />
      </button>
    </div>
  );
};

export default Sidebar;
