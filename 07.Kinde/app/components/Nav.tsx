import Link from "next/link"
import Image from "next/image"
import LogoMdc from "@/public/logo.svg"

export default function Nav() {
  return (
    <nav className="max-w-[1000px] mx-auto w-full h-[80px] flex items-center justify-between p-3 border-b border-b-gray-300">
      <Link href='/'>
        <Image src={LogoMdc} width={50} height={50} alt="Logo de La Minute De Code" />
      </Link>
    </nav>
  )
}
