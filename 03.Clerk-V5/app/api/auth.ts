// Pour les applications Next.js utilisant le Pages Router, vous pouvez récupérer des informations sur l'utilisateur et son état d'authentification, ou contrôler l'accès à certaines ou à toutes vos routes API en utilisant le helper getAuth(). Le helper getAuth() nécessite Middleware.

import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Récupère l'identifiant utilisateur à partir de la requête en utilisant getAuth()
  const { userId } = getAuth(req);

  // Si l'identifiant utilisateur n'existe pas, renvoie une réponse avec le statut 401 (Non autorisé)
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Si l'utilisateur est authentifié, renvoie une réponse avec le statut 200 (OK) et un objet vide
  res.status(200).json({});
}