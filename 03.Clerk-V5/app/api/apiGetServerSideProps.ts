// Vous pouvez accéder à la session active et aux données utilisateur dans votre getServerSideProps en utilisant le helper getAuth().
import { getAuth, buildClerkProps } from "@clerk/nextjs/server";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Accède à l'identifiant utilisateur et à la session active en utilisant getAuth() avec la requête contextuelle
  const { userId } = getAuth(ctx.req);
  if (!userId) {
    // Gère le cas où l'utilisateur n'est pas connecté
  }
  // Chargez toutes les données dont votre application a besoin pour la page en utilisant l'identifiant utilisateur
  // Retourne les props pour la page, incluant les props construits par Clerk
  return { props: { ...buildClerkProps(ctx.req) } };
};
