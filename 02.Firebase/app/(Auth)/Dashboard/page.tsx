"use client"

import { signOut } from "firebase/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { auth } from "../../db/firebaseConfig"
import useClientAuth from '../../Hooks/useClientAuth'; 

export default function pageDashboard() {

  const { user, redirectIfAuthenticated } = useClientAuth(); 

  console.log(user);
  

  useEffect(() => {
    redirectIfAuthenticated(); 
  }, [user]);



  const router = useRouter()

  const handleSignOut = ()=> {
    signOut(auth)
    .then(()=> console.log('Deconnexion'))
    .catch((error)=> console
    .error(error))
    router.push('/')
  }



  return (

    <>
    {user && (
      <div className='h-screen w-full flex items-center justify-center flex-col'>
      <h1 className="text-4xl uppercase font-black">page Dashboard</h1>

      <p><b>Votre email: </b>{user?.email}</p>


      <button onClick={handleSignOut} className="block bg-slate-900 px-3 py-1.5 text-white my-3 rounded hover:bg-blue-700">Déconnexion</button>
    </div>
    ) }
  </>
    
  )
}
