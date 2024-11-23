import { auth, currentUser } from "@clerk/nextjs/server"; 
import { redirect } from "next/navigation"; 
import { getUser, addUserToDatabase } from "@/lib/actionsUsers";
import {stripe} from "@/lib/stripe"
import { prisma } from "@/lib/db";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

  const { userId } = await auth(); // Authentifier l'utilisateur et extraire son ID utilisateur.
const user = await currentUser(); // Récupérer les détails de l'utilisateur actuellement connecté.

const userDb = await getUser(); // Récupérer les informations de l'utilisateur dans la base de données.

if (!user || !userId) { // Vérifier si l'utilisateur ou son ID n'existent pas.
  redirect('/'); // Rediriger vers la page d'accueil si l'utilisateur n'est pas authentifié.
} else {
  // Construire le nom complet de l'utilisateur en combinant le prénom et le nom.
  const fullName = user.firstName + ' ' + user.lastName || ''; 
  const email = user.emailAddresses[0]?.emailAddress || ''; // Extraire l'adresse email, ou une chaîne vide si non disponible.
  const image = user.imageUrl || ''; // Récupérer l'URL de l'image de profil, ou une chaîne vide si non disponible.
  
  // Ajouter l'utilisateur à la base de données avec ses informations récupérées.
  await addUserToDatabase(userId, fullName, email, image);
}

if (!userDb?.stripeCustomerId) { // Vérifier si l'utilisateur n'a pas encore d'ID de client Stripe.
  // Créer un nouveau client Stripe avec l'adresse email de l'utilisateur.
  const stripeCustomer = await stripe.customers.create({
    email: userDb?.email as string, // Utiliser l'email récupéré de l'utilisateur dans la base de données.
  });

  // Mettre à jour les informations de l'utilisateur dans la base de données avec l'ID de client Stripe.
  await prisma.user.update({
    where: { clerkUserId: userId }, // Identifier l'utilisateur à mettre à jour avec son ID.
    data: {
      stripeCustomerId: stripeCustomer.id as string, // Associer l'ID de client Stripe à l'utilisateur dans la base de données.
    }
  });
}

  


  return (
    <section className="max-w-[1200px] mx-auto  h-screen w-full mt-2 p-2">
      <div className="w-full h-full"> 
        {children}
      </div>
    </section>
  );
}
