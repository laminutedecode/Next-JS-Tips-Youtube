"use client";
import { useAuth } from "@clerk/nextjs";
// Le hook useAuth est un moyen pratique d'accéder à l'état d'authentification actuel. 
// Ce hook fournit les informations minimales nécessaires pour le chargement des données 
// et des méthodes d'assistance pour gérer la session active actuelle.


export default function PageDashUser() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  if (!isLoaded || !userId) {
    return null;
  }

  return  (
    <section className="w-full h-screen flex items-center justify-center flex-col">
      <ul>
        <li>
          Id: {userId}
        </li>
        <li>
          Session ID: {sessionId}
        </li>
      </ul>
    </section>
  )
}