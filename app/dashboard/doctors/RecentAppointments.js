import React from 'react';

const appointments = [
  { id: 1, time: "09:00 AM", patient: "ທ້າວ ສົມພອນ", type: "ກວດທົ່ວໄປ", status: "ລໍຖ້າກວດ", color: "bg-blue-500" },
  { id: 2, time: "10:30 AM", patient: "ນາງ ຈັນທາ", type: "ຕິດຕາມອາການ", status: "ກຳລັງກວດ", color: "bg-green-500" },
  { id: 3, time: "01:00 PM", patient: "ທ້າວ ບຸນມີ", type: "ປຶກສາສຸຂະພາບ", status: "ນັດໝາຍ", color: "bg-orange-500" },
  { id: 4, time: "02:30 PM", patient: "ນາງ ມະລີ", type: "ກວດເລືອດ", status: "ນັດໝາຍ", color: "bg-purple-500" },
];

export default function RecentAppointments() {
  return (
    <div className="space-y-6 font-phetsarath">
      {appointments.map((item) => (
        <div key={item.id} className="flex items-center gap-5 group cursor-pointer">
          {/* ເວລາ (Time Column) */}
          <div className="w-20 text-sm font-bold text-slate-400 group-hover:text-[#4C6EF5] transition-colors">
            {item.time}
          </div>

          {/* ເສັ້ນ Timeline */}
          <div className="relative flex flex-col items-center">
            <div className={`w-3 h-3 rounded-full ${item.color} z-10 shadow-md`}></div>
            <div className="w-[2px] h-12 bg-slate-100 absolute top-3"></div>
          </div>

          {/* ຂໍ້ມູນຄົນເຈັບ (Patient Card) */}
          <div className="flex-1 bg-slate-50 p-4 rounded-2xl group-hover:bg-white group-hover:shadow-md transition-all border border-transparent group-hover:border-blue-50">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-bold text-slate-800 text-[15px]">{item.patient}</h4>
                <p className="text-[12px] text-slate-500">{item.type}</p>
              </div>
              <span className={`text-[10px] px-3 py-1 rounded-full font-bold text-white ${item.color}`}>
                {item.status}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}