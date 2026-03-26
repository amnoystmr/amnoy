"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function MiniCalendar() {
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mounted, setMounted] = useState(false); // ໃຊ້ເພື່ອແກ້ Hydration Error

  // ໃຫ້ Component ໂຫຼດເຕັມຮູບແບບຢູ່ຝັ່ງ Client ກ່ອນ
  useEffect(() => {
    setMounted(true);
  }, []);

  const laoMonths = [
    "ມັງກອນ", "ກຸມພາ", "ມີນາ", "ເມສາ", "ພຶດສະພາ", "ມິຖຸນາ",
    "ກໍລະກົດ", "ສິງຫາ", "ກັນຍາ", "ຕຸລາ", "ພະຈິກ", "ທັນວາ"
  ];

  const getDaysInMonth = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ date: null, isCurrentMonth: false });
    }
    
    for (let d = 1; d <= daysInMonth; d++) {
      const fullDate = new Date(year, month, d);
      days.push({
        date: d,
        fullDate: fullDate,
        isToday: fullDate.toDateString() === new Date().toDateString(),
        isSelected: fullDate.toDateString() === selectedDate.toDateString(),
        isCurrentMonth: true
      });
    }
    return days;
  };

  const changeMonth = (offset) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1);
    setViewDate(newDate);
  };

  const handleDateClick = (dateObj) => {
    if (dateObj.fullDate) {
      setSelectedDate(dateObj.fullDate);
    }
  };

  const dayLabels = ['ອາທິດ', 'ຈັນ', 'ອັງຄານ', 'ພຸດ', 'ພະຫັດ', 'ສຸກ', 'ເສົາ'];
  
  // ຖ້າຫາກຍັງບໍ່ທັນ Mounted (SSR) ໃຫ້ສະແດງ UI ເປົ່າໆໄວ້ກ່ອນເພື່ອປ້ອງກັນ Error
  if (!mounted) return <div className="min-h-[300px]"></div>;

  const monthName = laoMonths[viewDate.getMonth()];

  return (
    <div className="font-phetsarath bg-white/5 p-5 rounded-[2.5rem] backdrop-blur-md border border-white/10 shadow-lg">
      {/* Header: ສະແດງເດືອນ ແລະ ປຸ່ມປ່ຽນ */}
      <div className="flex justify-between items-center mb-6 text-white px-2">
        <div className="flex flex-col">
          <span className="text-[18px] font-black leading-none">{monthName}</span>
          <span className="text-[12px] opacity-60 font-bold mt-1">{viewDate.getFullYear()}</span>
        </div>
        <div className="flex gap-1">
          <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-white/20 rounded-xl transition-all">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => changeMonth(1)} className="p-2 hover:bg-white/20 rounded-xl transition-all">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* ຊື່ວັນທີ: ອາ - ສ */}
      <div className="grid grid-cols-7 mb-2">
        {dayLabels.map((label, i) => (
          <div key={i} className="text-center text-[10px] font-bold text-white/40 py-2">{label}</div>
        ))}
      </div>

      {/* ຕາຕະລາງວັນທີ */}
      <div className="grid grid-cols-7 gap-1">
        {getDaysInMonth().map((item, index) => (
          <div key={index} className="aspect-square flex items-center justify-center">
            {item.date && (
              <button
                onClick={() => handleDateClick(item)}
                className={`w-9 h-9 flex flex-col items-center justify-center rounded-2xl text-[13px] font-bold transition-all duration-200 relative ${
                  item.isSelected 
                    ? 'bg-white text-[#4C6EF5] shadow-xl scale-110' 
                    : item.isToday 
                      ? 'border border-white/40 text-white' 
                      : 'text-white hover:bg-white/10'
                }`}
              >
                {item.date}
                {/* Appointment Dot: ຈຸດບອກວ່ານັດໝາຍ */}
                {item.date % 7 === 0 && !item.isSelected && (
                  <span className="absolute bottom-1 w-1 h-1 bg-green-400 rounded-full"></span>
                )}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Footer: ວັນທີທີ່ເລືອກ */}
      <div className="mt-5 pt-4 border-t border-white/10 text-center">
        <p className="text-[12px] text-white/60 font-medium">
          {selectedDate.toLocaleDateString('lo-LA', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>
    </div>
  );
}