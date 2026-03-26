import Sidebar from "./Sidebar";
import Header from "./Header";
import StatsCard from "./StatsCard";
// ສົມມຸດວ່າເຈົ້າມີ Component ເຫຼົ່ານີ້ ຫຼື ຈະສ້າງໃໝ່ຕາມ Style ດ້ານລຸ່ມ
import MainChart from "./MainChart"; 
import RecentAppointments from "./doctors/RecentAppointments";
import MiniCalendar from "./MiniCalendar";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#F8FAFF] font-phetsarath">
      {/* ແຖບເມນູເບື້ອງຊ້າຍ (Sidebar) */}
      <Sidebar activePage="home" />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* ແຖບດ້ານເທິງ (Header) */}
        <Header />

        {/* ສ່ວນເນື້ອຫາຫຼັກ (Scrollable) */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-10">
          
          {/* 1. ສ່ວນສະຫຼຸບຂໍ້ມູນ (Top Statistics Cards) - Pastel Style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard 
              title="ຄົນເຈັບມື້ນີ້" 
              value="27" 
              unit="ຄົນ"
              color="bg-[#FFEFEF]" 
              textColor="text-[#FF7D7D]" 
              icon="Users"
            />
            <StatsCard 
              title="ນັດໝາຍໄວ້" 
              value="09" 
              unit="ລາຍການ"
              color="bg-[#EFFFF6]" 
              textColor="text-[#4AD991]" 
              icon="Calendar"
            />
            <StatsCard 
              title="ປິ່ນປົວສຳເລັດ" 
              value="19" 
              unit="ເຄສ"
              color="bg-[#F0F3FF]" 
              textColor="text-[#4C6EF5]" 
              icon="CheckCircle"
            />
            <StatsCard 
              title="ຢາໃກ້ໝົດ" 
              value="04" 
              unit="ຊະນິດ"
              color="bg-[#FFF9EC]" 
              textColor="text-[#F5A623]" 
              icon="AlertTriangle"
            />
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* 2. ສ່ວນກາງ: ແຜນວາດ ແລະ ລາຍຊື່ຄົນເຈັບ (Main Content) */}
            <div className="col-span-12 lg:col-span-8 space-y-8">
              
              {/* Chart: Gradient Fill & Rounded */}
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-blue-50/50">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-slate-800">ສະຖິຕິການປິ່ນປົວ</h3>
                  <select className="text-sm border-none bg-slate-50 rounded-lg px-2 py-1 outline-none">
                    <option>ອາທິດນີ້</option>
                    <option>ເດືອນນີ້</option>
                  </select>
                </div>
                <div className="h-[300px] w-full">
                  <MainChart /> {/* ສ້າງກຣາບທີ່ໃຊ້ Gradient Fill */}
                </div>
              </div>

              {/* Recent Appointments: Timeline Style */}
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-blue-50/50">
                <h3 className="text-lg font-bold text-slate-800 mb-6">ລາຍຊື່ຄົນເຈັບລໍຖ້າກວດ</h3>
                <RecentAppointments /> 
              </div>
            </div>

            {/* 3. ສ່ວນຂ້າງຂວາ: Profile & Quick Access */}
            <div className="col-span-12 lg:col-span-4 space-y-8">
              
              {/* Doctor Profile Card */}
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-blue-50/50 text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="w-full h-full bg-blue-100 rounded-full overflow-hidden border-4 border-white shadow-md">
                    {/* ໃສ່ຮູບແພດບ່ອນນີ້ */}
                    <img src="/doctor-avatar.jpg" alt="Doctor" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-400 border-2 border-white rounded-full"></div>
                </div>
                <h3 className="text-lg font-bold text-slate-800">ດຣ. ສຸພາພອນ ພະນາວັນ</h3>
                <p className="text-sm text-slate-400 font-medium">ແພດຊ່ຽວຊານທົ່ວໄປ</p>
                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-50">
                  <div className="text-center">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">ເລືອດ</p>
                    <p className="font-bold text-slate-700">A (II) Rh+</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">ເວລາເຂົ້າການ</p>
                    <p className="font-bold text-slate-700">9am - 5pm</p>
                  </div>
                </div>
              </div>

              {/* Mini Calendar */}
              <div className="bg-[#4C6EF5] p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-200/50">
                <h3 className="text-lg font-bold mb-6 flex justify-between items-center">
                  ປະຕິທິນນັດໝາຍ
                </h3>
                <MiniCalendar /> {/* ສ້າງປະຕິທິນນ້ອຍໆສີຂາວ-ຟ້າ */}
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}