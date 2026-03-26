"use client";
import { createClient } from '@/utils/supabase/client'
import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { UserRound, Phone, Mail, MapPin, Calendar as CalendarIcon, IdCard, UserPlus, X, Search, Plus, Pencil, Trash2 } from 'lucide-react'; // ເອົາ Eye ອອກ
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function DoctorsPage() {
  const [doctorlist, setDoctorlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [isEditing, setIsEditing] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    doctor_id: "", name: "", datebirth: "", phone: "",
    email: "", address: "", user_id: "", image: ""
  });

  const handlegetDoctor = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('tb_doctor')
      .select('*')
      .order('doc_id', { ascending: true });
    
    if (error) {
      console.error("Error fetching doctors:", error);
    } else {
      setDoctorlist(data || []);
    }
  }

  const filteredDoctors = doctorlist.filter(doctor => {
    const name = doctor.doc_name ? doctor.doc_name.toLowerCase() : "";
    const id = doctor.doc_id ? String(doctor.doc_id).toLowerCase() : "";
    const search = searchTerm.toLowerCase();
    return name.includes(search) || id.includes(search);
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const supabase = createClient();
    
    const doctorData = {
      doc_name: newDoctor.name,
      image: newDoctor.image,
      datebirth: newDoctor.datebirth || null,
      email: newDoctor.email,
      phone: newDoctor.phone,
      address: newDoctor.address,
      user_id: newDoctor.user_id,
    };

    try {
      if (isEditing) {
        const { error } = await supabase
          .from('tb_doctor')
          .update(doctorData)
          .eq('doc_id', newDoctor.doctor_id);

        if (error) throw error;
        alert("ແກ້ໄຂຂໍ້ມູນສຳເລັດ!");
      } else {
        const dataToInsert = { ...doctorData, doc_id: newDoctor.doctor_id };
        const { error } = await supabase
          .from('tb_doctor')
          .insert([dataToInsert]);

        if (error) throw error;
        alert("ເພີ່ມຂໍ້ມູນແພດໃໝ່ສຳເລັດ!");
      }

      setIsModalOpen(false);
      setIsEditing(false);
      setNewDoctor({ doctor_id: "", name: "", datebirth: "", phone: "", email: "", address: "", user_id: "", image: "" });
      handlegetDoctor();
    } catch (error) {
      alert("ເກີດຂໍ້ຜິດພາດ: " + error.message);
    }
  };

  const handleEdit = (doctor) => {
    setNewDoctor({
      doctor_id: doctor.doc_id,
      name: doctor.doc_name,
      datebirth: doctor.datebirth || "",
      phone: doctor.phone || "",
      email: doctor.email || "",
      address: doctor.address || "",
      user_id: doctor.user_id || "",
      image: doctor.image || ""
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm("ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລົບຂໍ້ມູນແພດທ່ານນີ້?")) {
      try {
        const { error } = await createClient()
          .from('tb_doctor')
          .delete()
          .eq('doc_id', id);

        if (error) throw error;
        alert("ລົບຂໍ້ມູນສຳເລັດ!");
        handlegetDoctor();
      } catch (err) {
        alert("ເກີດຂໍ້ຜິດພາດ: " + err.message);
      }
    }
  };

  const formatDate = (date) => {
    if (!date) return "ບໍ່ມີຂໍ້ມູນ";
    const dateObj = new Date(date);
    return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
  }

  useEffect(() => {
    handlegetDoctor()
  }, [])

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activePage="doctors" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-800" style={{ fontFamily: "Phetsarath" }}>ລາຍຊື່ແພດ</h1>
                <p className="text-slate-500 mt-1" style={{ fontFamily: "Phetsarath" }}>ຈັດການຂໍ້ມູນແພດທັງໝົດໃນລະບົບແບບຕາຕະລາງ</p>
              </div>
              <Button
                onClick={() => {
                  setIsEditing(false);
                  setNewDoctor({ doctor_id: "", name: "", datebirth: "", phone: "", email: "", address: "", user_id: "", image: "" });
                  setIsModalOpen(true);
                }}
                className="bg-[#4c6ef5] hover:bg-[#3b5bdb] text-white px-6 py-6 rounded-2xl flex gap-2 items-center transition-all shadow-lg"
              >
                <Plus size={20} />
                <span style={{ fontFamily: "Phetsarath" }}>ເພີ່ມແພດໃໝ່</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="ຄົ້ນຫາຊື່ ຫຼື ລະຫັດ..."
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-100 transition-all font-medium text-slate-600 outline-none"
                  style={{ fontFamily: "Phetsarath" }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-center border-l border-slate-100">
                <p className="text-sm font-medium text-slate-400" style={{ fontFamily: "Phetsarath" }}>ຈຳນວນທັງໝົດ: <span className="text-blue-600 font-bold">{filteredDoctors.length}</span> ທ່ານ</p>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                      <th className="px-8 py-5 text-[13px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap" style={{ fontFamily: "Phetsarath" }}>ຊື່ ແລະ ນາມສະກຸນ</th>
                      <th className="px-6 py-5 text-[13px] font-bold text-slate-400 uppercase tracking-wider text-center whitespace-nowrap" style={{ fontFamily: "Phetsarath" }}>ລະຫັດແພດ</th>
                      <th className="px-6 py-5 text-[13px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap" style={{ fontFamily: "Phetsarath" }}>ເບີໂທລະສັບ</th>
                      <th className="px-6 py-5 text-[13px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap" style={{ fontFamily: "Phetsarath" }}>ອີເມວ</th>
                      <th className="px-6 py-5 text-[13px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap" style={{ fontFamily: "Phetsarath" }}>ວັນເດືອນປີເກີດ</th>
                      <th className="px-6 py-5 text-[13px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap min-w-[200px]" style={{ fontFamily: "Phetsarath" }}>ທີ່ຢູ່</th>
                      <th className="px-6 py-5 text-[13px] font-bold text-slate-400 uppercase tracking-wider text-center whitespace-nowrap" style={{ fontFamily: "Phetsarath" }}>ລະຫັດຜູ້ໃຊ້</th>
                      <th className="px-8 py-5 text-[13px] font-bold text-slate-400 uppercase tracking-wider text-right whitespace-nowrap" style={{ fontFamily: "Phetsarath" }}>ຈັດການ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredDoctors.map((doctor, index) => (
                      <tr key={index} className="hover:bg-blue-50/30 transition-all group">
                        <td className="px-8 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="relative shrink-0">
                              <img
                                src={doctor.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=doctor1"}
                                className="w-10 h-10 rounded-xl object-cover bg-slate-100 ring-2 ring-white shadow-sm"
                                alt="doctor"
                              />
                            </div>
                            <div className="font-bold text-slate-800 text-sm" style={{ fontFamily: "Phetsarath" }}>
                              {doctor.doc_name}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-[11px] text-blue-600 font-mono bg-blue-50 px-2 py-1 rounded-lg">
                            {doctor.doc_id}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 font-medium whitespace-nowrap">
                          <div className="flex items-center gap-2">
                             <Phone size={14} className="text-blue-400" />
                             {doctor.phone || '---'}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                             <Mail size={14} className="text-slate-400" />
                             <span title={doctor.email}>{doctor.email || '---'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-600 font-medium whitespace-nowrap" style={{ fontFamily: "Phetsarath" }}>
                          {formatDate(doctor.datebirth)}
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-500 min-w-[200px] whitespace-normal leading-relaxed" style={{ fontFamily: "Phetsarath" }}>
                          {doctor.address || '---'}
                        </td>
                        <td className="px-6 py-4 text-center text-xs text-slate-500 font-mono">
                          {doctor.user_id || '---'}
                        </td>
                        <td className="px-8 py-4 text-right">
                          <div className="flex justify-end gap-1">
                            {/* ເອົາປຸ່ມ Eye ອອກແລ້ວ */}
                            <button onClick={() => handleEdit(doctor)} className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-all"><Pencil size={16} /></button>
                            <button onClick={() => handleDelete(doctor.doc_id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="relative h-32 bg-gradient-to-r from-blue-500 to-indigo-600 p-8 flex items-center justify-between">
              <div className="flex items-center gap-4 text-white">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                  {isEditing ? <Pencil size={32} /> : <UserPlus size={32} />}
                </div>
                <div>
                  <h2 className="text-2xl font-bold" style={{ fontFamily: "Phetsarath" }}>{isEditing ? "ແກ້ໄຂຂໍ້ມູນແພດ" : "ເພີ່ມຂໍ້ມູນແພດໃໝ່"}</h2>
                  <p className="opacity-80 text-sm" style={{ fontFamily: "Phetsarath" }}>{isEditing ? "ແກ້ໄຂຂໍ້ມູນດ້ານລຸ່ມໃຫ້ຖືກຕ້ອງ" : "ກະລຸນາກອກຂໍ້ມູນໃຫ້ຄົບຖ້ວນ"}</p>
                </div>
              </div>
              <button onClick={() => { setIsModalOpen(false); setIsEditing(false); }} className="p-2 hover:bg-white/20 rounded-full text-white">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="doctor_id" style={{ fontFamily: "Phetsarath" }}>ລະຫັດແພດ</Label>
                  <Input id="doctor_id" name="doctor_id" placeholder="DOC00x" className={`rounded-xl h-11 ${isEditing ? 'bg-slate-100' : ''}`} value={newDoctor.doctor_id} onChange={handleInputChange} required readOnly={isEditing} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name" style={{ fontFamily: "Phetsarath" }}>ຊື່ ແລະ ນາມສະກຸນ</Label>
                  <Input id="name" name="name" placeholder="ຊື່ທັງໝົດ" className="rounded-xl h-11" value={newDoctor.name} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="datebirth" style={{ fontFamily: "Phetsarath" }}>ວັນເດືອນປີເກີດ</Label>
                  <Input id="datebirth" name="datebirth" type="date" className="rounded-xl h-11" value={newDoctor.datebirth} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" style={{ fontFamily: "Phetsarath" }}>ເບີໂທລະສັບ</Label>
                  <Input id="phone" name="phone" placeholder="020 xxxx xxxx" className="rounded-xl h-11" value={newDoctor.phone} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" style={{ fontFamily: "Phetsarath" }}>ອີເມວ</Label>
                  <Input id="email" name="email" type="email" placeholder="name@email.com" className="rounded-xl h-11" value={newDoctor.email} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user_id" style={{ fontFamily: "Phetsarath" }}>ລະຫັດຜູ້ໃຊ້</Label>
                  <Input id="user_id" name="user_id" placeholder="user_xxx" className="rounded-xl h-11" value={newDoctor.user_id} onChange={handleInputChange} />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="image" style={{ fontFamily: "Phetsarath" }}>Link ຮູບພາບ (URL)</Label>
                  <Input id="image" name="image" placeholder="https://..." className="rounded-xl h-11" value={newDoctor.image} onChange={handleInputChange} />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="address" style={{ fontFamily: "Phetsarath" }}>ທີ່ຢູ່</Label>
                  <Input id="address" name="address" placeholder="ບ້ານ, ເມືອງ, ແຂວງ" className="rounded-xl h-11" value={newDoctor.address} onChange={handleInputChange} />
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <Button type="button" variant="outline" onClick={() => { setIsModalOpen(false); setIsEditing(false); }} className="flex-1 rounded-2xl h-12" style={{ fontFamily: "Phetsarath" }}>ຍົກເລີກ</Button>
                <Button type="submit" className="flex-1 rounded-2xl h-12 bg-[#4c6ef5] text-white" style={{ fontFamily: "Phetsarath" }}>{isEditing ? "ບັນທຶກການແກ້ໄຂ" : "ບັນທຶກຂໍ້ມູນ"}</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}