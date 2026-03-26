"use client"
import React from 'react';
import { 
  Home, LineChart, Package, Calendar, 
  LayoutGrid, ClipboardList, LogOut, 
  UserRound, Settings, Pill, Stethoscope,
  Users, Truck, Inbox, ShieldCheck, ShoppingCart
} from 'lucide-react';
import Link from 'next/link';

const Sidebar = ({ activePage }) => {
  const menuGroups = [
    {
      title: "Main",
      items: [
        { icon: <Home size={20} />, href: "/dashboard", id: "home", label: "ໜ້າຫຼັກ" },
      ]
    },
    {
      title: "ຂໍ້ມູນຫຼັກ (Master Data)",
      items: [
        { icon: <Stethoscope size={20} />, href: "/dashboard/doctors", id: "doctors", label: "ຂໍ້ມູນແພດ" },
        { icon: <Users size={20} />, href: "/dashboard/patients", id: "patients", label: "ຂໍ້ມູນຄົນເຈັບ" },
        { icon: <Truck size={20} />, href: "/dashboard/suppliers", id: "suppliers", label: "ຂໍ້ມູນຜູ້ສະໜອງ" },
        { icon: <ShieldCheck size={20} />, href: "/dashboard/users", id: "users", label: "ຂໍ້ມູນຜູ້ໃຊ້ລະບົບ" },
      ]
    },
    {
      title: "ລະບົບຢາ ແລະ ຄັງຢາ (Pharmacy)",
      items: [
        { icon: <Pill size={20} />, href: "/dashboard/medicine", id: "medicine", label: "ຂໍ້ມູນຢາ" },
        { icon: <ShoppingCart size={20} />, href: "/dashboard/purchase", id: "purchase", label: "ສັ່ງຊື້ຢານຳຜູ້ສະໜອງ" },
        { icon: <Inbox size={20} />, href: "/dashboard/inventory-in", id: "inventory-in", label: "ນຳຢາເຂົ້າຄຣີນິກ (Stock)" },
      ]
    },
    {
      title: "ການບໍລິການ (Services)",
      items: [
        { icon: <Calendar size={20} />, href: "/dashboard/appointments", id: "appointments", label: "ຂໍ້ມູນການນັດໝາຍ" },
        { icon: <ClipboardList size={20} />, href: "/dashboard/treatment", id: "treatment", label: "ປະຫວັດການປິ່ນປົວ" },
      ]
    },
    {
      title: "Report",
      items: [
        { icon: <LineChart size={20} />, href: "/dashboard/reports", id: "reports", label: "ລາຍງານທັງໝົດ" },
      ]
    }
  ];

  return (
    // 1. ປ່ຽນ BG ເປັນ Gradient ສີຟ້າ (ສີຟ້າເຂັ້ມໄປຫາສີຟ້າອ່ອນ)
    <div className="flex flex-col items-start w-72 h-[calc(100vh-40px)] bg-gradient-to-b from-[#4c6ef5] to-[#5c7cfa] text-white py-6 m-5 rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden shrink-0">
      
      {/* Logo Section */}
      <div className="mb-6 px-6 border-b border-white/10 pb-6 w-full flex items-center gap-3">
        <div className="p-2.5 bg-white/20 backdrop-blur-md rounded-2xl shadow-inner">
          <Stethoscope className="text-white" size={24} />
        </div>
        <div className="flex flex-col">
          <div className="font-bold text-[16px] leading-tight text-white">ຄຣີນິກກວດພະຍາດທົ່ວໄປ</div>
          <div className="text-[11px] font-medium text-blue-100 uppercase tracking-wide opacity-80">ດຣ. ສຸພາພອນ ພະນາວັນ</div>
        </div>
      </div>
      
      {/* Scrollable Menu Section */}
      <div className="flex-1 overflow-y-auto w-full px-4 custom-scrollbar">
        {menuGroups.map((group, gIndex) => (
          <div key={gIndex} className="mb-6">
            <h3 className="px-4 text-[10px] font-bold text-blue-100/50 uppercase tracking-[0.15em] mb-2">
              {group.title}
            </h3>
            <div className="flex flex-col gap-1">
              {group.items.map((item, index) => (
                <Link href={item.href} key={index} className="w-full">
                  <button
                    className={`flex items-center gap-3.5 w-full p-3 rounded-2xl transition-all duration-300 group ${
                      activePage === item.id 
                        ? 'bg-white text-[#4c6ef5] shadow-lg font-bold' 
                        : 'hover:bg-white/10 text-blue-50 hover:text-white'
                    }`}
                  >
                    <span className={`${activePage === item.id ? 'text-[#4c6ef5]' : 'text-blue-100/70 group-hover:text-white'}`}>
                      {item.icon}
                    </span>
                    <span className="text-[13.5px] font-phetsarath leading-none">{item.label}</span>
                  </button>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <div className="mt-auto w-full px-4 pt-4 border-t border-white/10">
        <Link href="/login" className="w-full">
          <button className="flex items-center gap-3.5 w-full p-3 rounded-2xl text-red-200 hover:bg-red-500/20 hover:text-white transition-all">
            <LogOut size={20} />
            <span className="text-[13.5px] font-bold font-phetsarath">ອອກຈາກລະບົບ</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;