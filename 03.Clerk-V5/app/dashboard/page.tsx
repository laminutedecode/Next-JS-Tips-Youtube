import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link"
import { SignOutButton } from "@clerk/nextjs";
export default async function PageDashboard() {

  const { userId } = auth();

  if (!userId) {
    redirect('/')
  }

  console.log(userId);
  
  // Obtenez l'objet Utilisateur de l'API Backend lorsque vous avez besoin d'accéder aux informations de l'utilisateur
  const user = await currentUser()
 
  console.log(user);
  
  return (
    <section className="w-full h-screen flex items-center justify-center flex-col">
      <h1>Bienvenue {user?.firstName}{user?.lastName}</h1>
      <p>Email : {user?.emailAddresses[0].emailAddress}</p>
      <Link href="/dashboard/dashauth"><button className="bg-blue-500 hover:bg-blue-600 p-3 rounded-md text-white my-2">useAuth</button></Link>
      <Link href="/dashboard/dashuser"><button className="bg-blue-500 hover:bg-blue-600 p-3 rounded-md text-white my-2">useUser </button></Link>
      <SignOutButton />
    </section>
  )
}
