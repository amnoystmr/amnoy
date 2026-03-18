"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const RegisterPage = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  
  // ເກັບຂໍ້ມູນ Form
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = (e) => {
    e.preventDefault()

    if (!name || !email || !password) {
      alert("ກະລຸນາກອກຂໍ້ມູນໃຫ້ຄົບຖ້ວນ!")
      return
    }

    console.log("Saving user:", { name, email, password })
    alert("ສ້າງບັນຊີສຳເລັດ!")
    router.push("/login")
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-200" style={{ fontFamily: "Phetsarath" }}>
      
      {/* Container ຫຼັກ: ຂະໜາດ 950x600px ຕາມໜ້າ Login */}
      <div className="w-[950px] h-[600px] bg-white rounded-xl shadow-lg flex overflow-hidden">
        
        {/* ເບື້ອງຊ້າຍ: ປັບເປັນ w-[55%] ໃຫ້ຄືກັບໜ້າ Login */}
        <div className="w-[55%] bg-indigo-200 flex flex-col items-center justify-center p-6 text-center">
          <img 
            src="/icons/stethoscope.png" 
            className="w-[180px] mb-6" 
            alt="logo" 
          />
          <p className="text-center text-gray-700 font-bold leading-relaxed">
            ຄຣີນິກກວດພະຍາດທົ່ວໄປ ດຣ ສຸພາພອນ ພະນາວັນ <br/>
            ດູແລສຸຂະພາບຢ່າງມີປະສິດທິພາບ, ສະດວກ, ວ່ອງໄວ ແລະ ໜ້າເຊື່ອຖື.
          </p>
        </div>

        {/* ເບື້ອງຂວາ: ປັບເປັນ w-[60%] (ຫຼືສ່ວນທີ່ເຫຼືອ) ໃຫ້ຄືກັບໜ້າ Login */}
        <div className="w-[60%] flex flex-col items-center justify-center p-10 bg-white">
          
          <h2 className="text-2xl font-semibold mb-6">ສ້າງບັນຊີ</h2>

          {/* Form Content */}
          <div className="w-full max-w-[350px] flex flex-col gap-4">
            
            {/* Social Buttons */}
            <div className="flex gap-4 mb-2">
              <Button className="flex-1 h-[48px] bg-white border border-gray-300 text-gray-400 hover:bg-blue-50 hover:text-gray-600 cursor-pointer text-xs">
                <img src="/icons/google.png" width={20} className="mr-2" alt="Google"/>
                ລົງທະບຽນກັບ Google
              </Button>

              <Button className="flex-1 h-[48px] bg-white border border-gray-300 text-gray-400 hover:bg-blue-50 hover:text-gray-600 cursor-pointer text-xs">
                <img src="/icons/facebook.png" width={20} className="mr-2" alt="Facebook"/>
                ລົງທະບຽນກັບ Facebook
              </Button>
            </div>

            <p className="text-center text-gray-400 text-xs mb-2">- ຫຼື -</p>

            {/* Input Fields */}
            <Input 
              placeholder="ຊື່" 
              onChange={(e) => setName(e.target.value)} 
              className="h-11"
            />
            <Input 
              placeholder="ອີເມວ" 
              type="email"
              onChange={(e) => setEmail(e.target.value)} 
              className="h-11"
            />
            
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="ລະຫັດຜ່ານ"
                onChange={(e) => setPassword(e.target.value)}
                className="h-11"
              />
              <div 
                className="absolute right-3 top-3 cursor-pointer text-gray-400" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
              </div>
            </div>

            <Button 
              onClick={handleRegister} 
              className="mt-2 h-11 bg-indigo-500 hover:bg-indigo-600 text-white font-bold"
            >
              ສ້າງບັນຊີ
            </Button>

            <p className="text-sm text-center text-gray-500 mt-2">
              ມີບັນຊີຢູ່ແລ້ວແມ່ນບໍ່? 
              <Link href="/login" className="text-indigo-600 font-bold ml-1 hover:underline">
                ເຂົ້າສູ່ລະບົບ
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage