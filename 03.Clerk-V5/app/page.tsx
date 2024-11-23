import Link from "next/link"
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function Home() {

  // Obtenez l'identifiant utilisateur depuis auth() -- s'il est nul, l'utilisateur n'est pas connecté
  const { userId } = auth();

  if (userId) {
    redirect('/dashboard')
  }
  return (
    <section className="w-full h-screen flex items-center justify-center flex-col">
      <h1 className="text-8xl uppercase font-black">CLERK</h1>
      <Link href="/sign-in"><button className="bg-blue-500 hover:bg-blue-600 p-3 rounded-md text-white my-2">Sign In</button></Link>
      <Link href="/sign-up"><button className="bg-blue-500 hover:bg-blue-600 p-3 rounded-md text-white my-2">Sign Up</button></Link>
    </section>
  );
}
