"use client" // ຕ້ອງຢູ່ແຖວທີ 1 ເທົ່ານັ້ນ
import { createClient } from '@/utils/supabase/client'

import { useState, useEffect } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const Login = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [todos, setTodos] = useState([])

  // ເກັບຂໍ້ມູນການກອກ
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()
      const { data } = await supabase.from('tb_users').select()
      setTodos(data || [])
      
    }
    fetchData()
  }, [])
  // ຟັງຊັນຈັດການເມື່ອກົດປຸ່ມ ເຂົ້າສູ່ລະບົບ
  const handleLogin = (e) => {
    e.preventDefault()

    // ກວດສອບຂໍ້ມູນ
    const user = todos.find((x) => x.user_name === email && x.password === password)
    if (user) {
      router.push("/dashboard")
    } else {
      alert("ອີເມວ ແລະ ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ!")
    }
    // router.push("/dashboard")
  }

  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-gray-200"
      style={{ fontFamily: "Phetsarath" }}
    >
      <div className="w-[950px] h-[600px] bg-white rounded-xl shadow-lg flex overflow-hidden">

        {/* Left side */}
        <div className="w-[55%] bg-indigo-200 flex flex-col items-center justify-center p-6">
          <img
            src="/icons/stethoscope.png"
            className="w-[180px] mb-6"
            alt="Stethoscope"
          />
          <p className="text-center text-gray-700 font-bold leading-relaxed">
            ຄຣີນິກກວດພະຍາດທົ່ວໄປ ດຣ ສຸພາພອນ ພະນາວັນ <br />
            ດູແລສຸຂະພາບຢ່າງມີປະສິດທິພາບ, ສະດວກ, ວ່ອງໄວ ແລະ ໜ້າເຊື່ອຖື.
          </p>
        </div>

        {/* Right side */}
        <div className="w-[60%] flex flex-col items-center justify-center p-10 bg-white">
          <h2 className="text-2xl font-semibold mb-6">ເຂົ້າສູ່ລະບົບ</h2>

          {/* Google & Facebook Buttons */}
          <div className="flex gap-4 mb-4">
            <Button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })} // ໃສ່ onClick ໃຫ້ຖືກບ່ອນ
              className="flex-1 h-[48px] bg-white border border-gray-300 text-gray-400 hover:bg-blue-50 hover:text-gray-600 cursor-pointer text-xs"
            >
              <img src="/icons/google.png" width={20} className="mr-2" alt="Google" />
              ເຂົ້າສູ່ລະບົບດ້ວຍ Google
            </Button>

            <Button
              onClick={() => signIn("facebook", { callbackUrl: "/dashboard" })}
              className="flex-1 h-[48px] bg-white border border-gray-300 text-gray-400 hover:bg-blue-50 hover:text-gray-600 cursor-pointer text-xs"
            >
              <img src="/icons/facebook.png" width={20} className="mr-2" alt="Facebook" />
              ເຂົ້າສູ່ລະບົບດ້ວຍ Facebook
            </Button>
          </div>

          <p className="text-gray-400 text-sm mb-4">- ຫຼື -</p>

          <div className="w-full max-w-[350px] flex flex-col gap-4">
            <Input
              placeholder="ອີເມວ"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11"
            />

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="ລະຫັດຜ່ານ"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11"
              />
              <div
                className="absolute right-3 top-3 cursor-pointer text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>

            <Button
              onClick={handleLogin}
              className="mt-3 h-11 bg-indigo-500 hover:bg-indigo-600 text-white font-bold transition-all"
            >
              ເຂົ້າສູ່ລະບົບ
            </Button>

            <p className="text-sm text-center text-gray-500 mt-2">
              ຍັງບໍ່ມີບັນຊີແມ່ນບໍ່?
              <Link href="/register">
                <span className="text-indigo-600 font-bold ml-1 hover:underline cursor-pointer">
                  ສ້າງບັນຊີ
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login