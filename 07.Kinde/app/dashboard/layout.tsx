// Protéger les routes
//  Il existe plusieurs façons de protéger les pages avec Kinde Auth.

// Dans les composants serveur, vous pouvez obtenir les données Kinde Auth en utilisant le helper getKindeServerSession.

// Dans les composants client, vous pouvez obtenir les données Kinde Auth en utilisant le helper useKindeBrowserClient.
// Voici comment procéder pour chaque cas :

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

export default async function DashboardLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {

  const { isAuthenticated } = getKindeServerSession();

    
  
  return (await isAuthenticated()) ? (
    <>  
        {children}
    </>
  ) : (
    <section className="w-full h-screen flex items-center justify-center flex-col gap-2">
        <p>Vous devez etres connecter pour accéder à cette page</p>
        <LoginLink > 
        <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md">Sign In</button>
      </LoginLink>
    </section>
  )
}
