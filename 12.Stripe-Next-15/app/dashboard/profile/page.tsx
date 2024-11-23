import { auth } from "@clerk/nextjs/server"; 
import { redirect } from "next/navigation"; 
import {getDataStripeUser } from "@/lib/actionsStripe";
import MemberCard from "@/app/components/MemberCard";
import PremiumCard from "@/app/components/PremiumCard";

export default async function PageDashboard() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/'); 
  }

  const dataStripe = await getDataStripeUser(userId as string);
  
  return (
    <>
      {dataStripe?.status === 'active' ? <PremiumCard/> : <MemberCard/>}
    </>
   
  );
}
