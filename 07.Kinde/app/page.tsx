import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";


export default function Home() {
  return (
    <section className="w-full h-screen flex items-center justify-center flex-col">
    <h1 className="text-6xl uppercase font-black">PAGE Home</h1>
    <div className="flex items-center justify-center gap-1 mt-4">
      {/* Redirection statique: Si vous souhaitez rediriger les utilisateurs vers une certaine page après leur connexion, vous pouvez définir la variable d'environnement KINDE_POST_LOGIN_REDIRECT_URL dans votre fichier .env.local. */}
      <LoginLink > 
        <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md">Sign In</button>
      </LoginLink>
      {/* Redirection dynamique
        Vous pouvez également définir un paramètre postLoginRedirectURL pour nous indiquer où rediriger après l'authentification */}
      <RegisterLink postLoginRedirectURL="/dashboard" >
        <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md">Sign Up</button>
      </RegisterLink>
    </div>
  </section>
  );
}
