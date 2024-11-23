import Image from "next/image"; 
import { redirect } from "next/navigation"; 
import { createCustomerPortal } from "@/lib/actionsStripe";
import { auth, currentUser } from "@clerk/nextjs/server"; 
  
  export default async function PremiumCard() {
    const { userId } = await auth();
  
    if (!userId) {
      redirect('/'); 
    }

    const user = await currentUser();
  
    return (
      <div className="max-w-lg mx-auto space-y-4 mt-3">
        <div className="flex flex-col">  
            <Image src={user?.imageUrl as string} width={150} height={150} alt="" />
            <h1>Bienvenue {user?.fullName}</h1>
            <p>Email : {user?.emailAddresses[0].emailAddress}</p>
            <p className="mt-4 text-sm text-muted-foreground">Vous etes membre Premium</p>    
            <form className="w-full mt-4" action={createCustomerPortal}>
              <button className="bg-blue-500 hover:bg-blue-600 text-white w-full">Modifier abonnement</button>
            </form>
        </div>
      </div>
    )
  }
  