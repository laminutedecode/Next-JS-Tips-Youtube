"use client"

import { IoMdHome,IoMdMail  } from "react-icons/io";
import { RiTeamFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import Link from "next/link"
import {usePathname  } from "next/navigation";
import { useRouter } from "next/navigation";



export default function Nav() {

  const router = useRouter()

  const pathname = usePathname()


    const handleClick = () => {
      router.push('/SignInAndUp');
    }

  const menuNav = [
    {name: "Home", icon:IoMdHome, path: "/"},
    {name: "À propos", icon:RiTeamFill, path: "/About"},
    {name: "Contact", icon:IoMdMail, path: "/Contact"},
  ]

  return (
    <nav className="fixed top-0 left-0 z-100 w-full h-[50px] shadow-md bg-white p-3">
      <ul className="w-full h-full flex justify-between items-center">
        <li>
          <ul className="flex items-center gap-5">
          {menuNav.map((item)=> (
            <li key={item.name}>
              <Link href={item.path} className={`flex items-center gap-2 text-[14px] ${
                    pathname  === item.path ? "text-red-700" : "text-gray-700 hover:text-red-700"
                  }`}>
                  <item.icon />
                  <span>{item.name}</span>
                
              </Link>
            </li>
          ))}
        </ul>
        </li>
        <li>
          <button onClick={handleClick} >
            <div className="bg-gray-200 hover:gray-300 text-gray-700 cursor-pointer p-2 rounded-full flex items-center justify-center">
              <FaUser />
            </div>
          </button>
        </li>
      </ul>
    </nav>
  )
}
