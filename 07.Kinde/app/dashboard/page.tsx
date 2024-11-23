import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image"


export default async function PageDashboard() {

  const {getUser} = getKindeServerSession()

  const user = await getUser()

  console.log(user);
  




  return  (
    <section className="w-full h-screen flex items-center justify-center flex-col">
      <h1 className="text-6xl uppercase font-black mb-2">PAGE DASHBOARD</h1>
      <p className="text-lg text-muted-foreground">Bienvenue {user?.family_name}</p>
      <Image src={user?.picture as string} width={100} height={100} alt="Photo de profil" className="rounded-full" />
      <ul className="text-center my-4">
        <li>
          <span className="font-bold">ID:</span>
          <span>{user?.id}</span>
        </li>
        <li>
          <span className="font-bold">Email:</span>
          <span>{user?.email}</span>
        </li>
        <li>
          <span className="font-bold">Prenom:</span>
          <span>{user?.given_name}</span>
        </li>
      </ul>
      <LogoutLink>
        <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md">Log out</button>
      </LogoutLink>
    </section>
  ) 
  
}
