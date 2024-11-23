"use client";
import { useUser } from "@clerk/nextjs";
// Le hook useUser est un moyen pratique d'accéder aux données de l'utilisateur actuel là où vous en avez besoin. 
// Ce hook fournit les données de l'utilisateur et des méthodes d'assistance pour gérer la session active actuelle.

export default function PageDashAuth() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return  (
    <section className="w-full h-screen flex items-center justify-center flex-col">
      <div>Bienvenue, {user.firstName} {user.lastName}</div>
      <div>Email : {user.emailAddresses[0].emailAddress}</div>
    </section>
  )
}