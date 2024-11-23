import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import { addUserToDatabase, getUserFromDatabase } from '@/services/userService';
import Image from "next/image"

export default async function PageDashboard() {
  const { userId } = auth();

  if (!userId) {
    redirect('/');
  }

  const user = await currentUser();

  // Ajoutez l'utilisateur à la base de données
  if (userId && user) {
    const fullName = user.firstName + ' ' + user.lastName || '';
    const email = user.emailAddresses[0]?.emailAddress || '';
    const image = user.imageUrl || '';
    await addUserToDatabase(userId, fullName, email, image);
  }

  const data = await getUserFromDatabase(userId)

  return (
    <section className="w-full h-screen flex items-center justify-center flex-col">
      {/* <h1>Bienvenue {user?.firstName} {user?.lastName}</h1>
      <p>Email : {user?.emailAddresses[0]?.emailAddress}</p> */}
      <Image src={data?.image as string} width={150} height={150} alt="" />
      <h1>Bienvenue {data?.name}</h1>
      <p>Email : {data?.email}</p>
      <SignOutButton />
    </section>
  );
}