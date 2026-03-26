"use client";
import { createClient } from '@/utils/supabase/client'
import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { User, Phone, X, Search, Plus, Pencil, Trash2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function PatientsPage() {
  const [patientList, setPatientList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // 1. ປັບ State ໃຫ້ຕົງກັບຊື່ Column ໃນ Supabase (pat_name)
  const initialPatientState = {
    pat_id: "",
    pat_name: "", 
    gender: "ຊາຍ",
    phone: "",
    address: "",
    allergy: "",
  };

  const [newPatient, setNewPatient] = useState(initialPatientState);

  const handleGetPatients = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('tb_patient') 
        .select('*')
        .order('pat_id', { ascending: true });
      
      if (error) {
        console.error("Fetch Error:", error.message);
        setPatientList([]); 
        return;
      }

      setPatientList(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("System Error:", err);
      setPatientList([]);
    }
  }

  // 2. ປັບ Filter ໃຫ້ໃຊ້ pat_name
  const filteredPatients = patientList.filter(p => {
    const name = (p.pat_name || "").toLowerCase();
    const id = String(p.pat_id || "").toLowerCase();
    const search = searchTerm.toLowerCase();
    return name.includes(search) || id.includes(search);
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // ໃຊ້ || "" ເພື່ອປ້ອງກັນ Error: Changing uncontrolled input to be controlled
    setNewPatient(prev => ({ ...prev, [name]: value || "" }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const supabase = createClient();
    
    // 3. ຂໍ້ມູນທີ່ຈະສົ່ງໄປ Supabase ຕ້ອງຕົງກັບຊື່ Column
    const patientData = {
      pat_name: newPatient.pat_name, 
      gender: newPatient.gender,
      phone: newPatient.phone,
      address: newPatient.address,
      allergy: newPatient.allergy,
    };

    try {
      if (isEditing) {
        const { error } = await supabase
          .from('tb_patient')
          .update(patientData)
          .eq('pat_id', newPatient.pat_id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('tb_patient')
          .insert([{ ...patientData, pat_id: newPatient.pat_id }]);
        if (error) throw error;
      }

      setIsModalOpen(false);
      setIsEditing(false);
      setNewPatient(initialPatientState);
      handleGetPatients();
      alert("ບັນທຶກສຳເລັດ!");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleEdit = (p) => {
    // 4. Mapping ຂໍ້ມູນຈາກ DB ມາໃສ່ State ໃຫ້ຖືກຕ້ອງ
    setNewPatient({
      pat_id: p.pat_id || "",
      pat_name: p.pat_name || "",
      gender: p.gender || "ຊາຍ",
      phone: p.phone || "",
      address: p.address || "",
      allergy: p.allergy || ""
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm("ຕ້ອງການລົບຂໍ້ມູນຄົນເຈັບຜູ້ນີ້?")) {
      try {
        const { error } = await createClient()
          .from('tb_patient')
          .delete()
          .eq('pat_id', id);
        if (error) throw error;
        handleGetPatients();
      } catch (err) {
        alert("Error: " + err.message);
      }
    }
  };

  useEffect(() => {
    handleGetPatients();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activePage="patients" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-slate-800" style={{ fontFamily: "Phetsarath" }}>ລາຍຊື່ຄົນເຈັບ</h1>
                <p className="text-slate-500" style={{ fontFamily: "Phetsarath" }}>ຈັດການຂໍ້ມູນຄົນເຈັບທັງໝົດໃນລະບົບ</p>
              </div>
              <Button
                onClick={() => {
                  setIsEditing(false);
                  setNewPatient(initialPatientState);
                  setIsModalOpen(true);
                }}
                className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-6 py-6 rounded-2xl flex gap-2 items-center shadow-lg transition-all"
              >
                <Plus size={20} />
                <span style={{ fontFamily: "Phetsarath" }}>ລົງທະບຽນໃໝ່</span>
              </Button>
            </div>

            {/* Search Bar */}
            <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
              <Search className="text-slate-400" size={18} />
              <input
                type="text"
                placeholder="ຄົ້ນຫາຊື່ ຫຼື ລະຫັດຄົນເຈັບ..."
                className="w-full bg-transparent outline-none font-medium"
                style={{ fontFamily: "Phetsarath" }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Table */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                      <th className="px-8 py-5 text-[13px] font-bold text-slate-400 uppercase" style={{ fontFamily: "Phetsarath" }}>ຄົນເຈັບ</th>
                      <th className="px-6 py-5 text-[13px] font-bold text-slate-400 uppercase text-center" style={{ fontFamily: "Phetsarath" }}>ລະຫັດ</th>
                      <th className="px-6 py-5 text-[13px] font-bold text-slate-400 uppercase" style={{ fontFamily: "Phetsarath" }}>ເບີໂທ</th>
                      <th className="px-6 py-5 text-[13px] font-bold text-slate-400 uppercase min-w-[200px]" style={{ fontFamily: "Phetsarath" }}>ທີ່ຢູ່</th>
                      <th className="px-6 py-5 text-[13px] font-bold text-slate-400 uppercase" style={{ fontFamily: "Phetsarath" }}>ແພ້ຢາ</th>
                      <th className="px-8 py-5 text-[13px] font-bold text-slate-400 uppercase text-right" style={{ fontFamily: "Phetsarath" }}>ຈັດການ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredPatients.length > 0 ? (
                      filteredPatients.map((p, index) => (
                        <tr key={index} className="hover:bg-green-50/30 transition-all group">
                          <td className="px-8 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                                <User size={20} />
                              </div>
                              <span className="font-bold text-slate-800" style={{ fontFamily: "Phetsarath" }}>{p.pat_name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="text-[11px] text-slate-500 font-mono bg-slate-50 px-2 py-1 rounded-lg">{p.pat_id}</span>
                          </td>
                          <td className="px-6 py-4 text-sm">{p.phone || '---'}</td>
                          <td className="px-6 py-4 text-xs text-slate-500 whitespace-normal leading-relaxed" style={{ fontFamily: "Phetsarath" }}>
                            {p.address || '---'}
                          </td>
                          <td className="px-6 py-4 text-xs">
                            {p.allergy ? (
                              <span className="text-red-500 flex items-center gap-1 font-medium" style={{ fontFamily: "Phetsarath" }}>
                                <AlertCircle size={14} /> {p.allergy}
                              </span>
                            ) : <span className="text-slate-400 italic">ບໍ່ມີ</span>}
                          </td>
                          <td className="px-8 py-4 text-right">
                            <div className="flex justify-end gap-1">
                              <button onClick={() => handleEdit(p)} className="p-2 text-slate-400 hover:text-amber-500 rounded-lg transition-all"><Pencil size={16} /></button>
                              <button onClick={() => handleDelete(p.pat_id)} className="p-2 text-slate-400 hover:text-red-500 rounded-lg transition-all"><Trash2 size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-8 py-10 text-center text-slate-400" style={{ fontFamily: "Phetsarath" }}>
                          ບໍ່ມີຂໍ້ມູນຄົນເຈັບ
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden">
            <div className="h-28 bg-gradient-to-r from-green-500 to-emerald-600 p-8 flex items-center justify-between text-white">
              <h2 className="text-2xl font-bold" style={{ fontFamily: "Phetsarath" }}>{isEditing ? "ແກ້ໄຂຂໍ້ມູນຄົນເຈັບ" : "ລົງທະບຽນໃໝ່"}</h2>
              <button onClick={() => setIsModalOpen(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleSave} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label style={{ fontFamily: "Phetsarath" }}>ລະຫັດຄົນເຈັບ</Label>
                  <Input 
                    name="pat_id" 
                    value={newPatient.pat_id || ""} // 5. ເພີ່ມ || "" ທຸກບ່ອນເພື່ອປ້ອງກັນ Error ແຖວທີ 7
                    onChange={handleInputChange} 
                    required 
                    readOnly={isEditing} 
                    className="rounded-xl border-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label style={{ fontFamily: "Phetsarath" }}>ຊື່ ແລະ ນາມສະກຸນ</Label>
                  <Input 
                    name="pat_name" // 6. ປ່ຽນ name ໃຫ້ຕົງກັບ State 
                    value={newPatient.pat_name || ""} 
                    onChange={handleInputChange} 
                    required 
                    className="rounded-xl border-slate-200"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label style={{ fontFamily: "Phetsarath" }}>ທີ່ຢູ່</Label>
                  <Input 
                    name="address" 
                    value={newPatient.address || ""} 
                    onChange={handleInputChange} 
                    className="rounded-xl border-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label style={{ fontFamily: "Phetsarath" }}>ເບີໂທ</Label>
                  <Input 
                    name="phone" 
                    value={newPatient.phone || ""} 
                    onChange={handleInputChange} 
                    className="rounded-xl border-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label style={{ fontFamily: "Phetsarath" }}>ແພ້ຢາ</Label>
                  <Input 
                    name="allergy" 
                    value={newPatient.allergy || ""} 
                    onChange={handleInputChange} 
                    className="rounded-xl border-slate-200"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-green-600 h-12 rounded-xl text-white shadow-md hover:bg-green-700 transition-all active:scale-95">
                <span style={{ fontFamily: "Phetsarath" }}>ບັນທຶກຂໍ້ມູນ</span>
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}