import Sidebar from "./Sidebar";
import Header from "./Header";
import StatsCard from "./StatsCard";
import Calendar from "./Calendar";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ແຖບເມນູເບື້ອງຊ້າຍ */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* ແຖບດ້ານເທິງ */}
        <Header />

        <main className="p-6 space-y-6">
          {/* ສ່ວນສະແດງຕົວເລກ Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard title="ນັດໝາຍມື້ນີ້" value="12" />
            <StatsCard title="ຄົນເຈັບໃໝ່" value="5" />
            <StatsCard title="ລາຍຮັບ" value="₭ 1,200,000" />
          </div>

          {/* ສ່ວນປະຕິທິນ ຫຼື ເນື້ອຫາຫຼັກ */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Calendar />
          </div>
        </main>
      </div>
    </div>
  );
}