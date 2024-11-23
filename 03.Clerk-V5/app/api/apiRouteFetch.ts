// Dans certains cas, vous pouvez avoir besoin de l'objet Utilisateur complet. Par exemple, si vous souhaitez accéder à l'adresse e-mail ou au nom de l'utilisateur, vous pouvez utiliser le helper clerkClient pour obtenir l'objet Utilisateur complet.
import { getAuth, clerkClient } from "@clerk/nextjs/server";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Récupère l'identifiant utilisateur à partir de la requête en utilisant getAuth()
  const { userId } = getAuth(req);
  // Si l'identifiant utilisateur n'existe pas, renvoie une réponse avec le statut 401 (Non autorisé)
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  // Récupère l'objet utilisateur complet à partir de Clerk en utilisant l'identifiant utilisateur
  const user = await clerkClient.users.getUser(userId);
  // Utilisez l'objet utilisateur pour décider quelles données retourner
  return res.status(200).json({});
}
