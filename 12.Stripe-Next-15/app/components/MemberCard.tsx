import { auth, currentUser } from "@clerk/nextjs/server"; 
import { redirect } from "next/navigation"; 
import { SignOutButton } from "@clerk/nextjs"; 
import Image from "next/image"; 
import { createSubscription } from "@/lib/actionsStripe";

export default async function PageDashboard() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/'); 
  }

  const user = await currentUser();
  
  return (
    <section className="w-full h-screen flex items-center justify-center flex-col">
      <Image src={user?.imageUrl as string} width={150} height={150} alt="" />
      <h1>Bienvenue {user?.fullName}</h1>
      <p>Email : {user?.emailAddresses[0].emailAddress}</p>
      
      <form className="my-4" action={createSubscription}>
        <button className="p-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white w-full">Devenir membre premium</button>
      </form>

      <div className="p-2 rounded-md bg-red-500 hover:bg-red-600 text-white">
        <SignOutButton />
      </div>
    </section>
  );
}
