"use client"

import {signIn} from "next-auth/react"

import { useSession } from "next-auth/react";

export default function Home() {

  const {data: session} = useSession()


  if(session){
    console.log(session);
    
  }


  return (
    <>
      <div className="max-w-[1000px] h-screen mx-auto  flex justify-center items-center flex-col gap-2">
        <h1 className="text-8xl uppercase font-black text-center mb-4">NEXT AUTH</h1>
        {session  && <p className="mb-4">Bienvenue {session?.user?.name}</p>}
        <div className="flex items-center gap-2">
          <button onClick={() => signIn('google')} className="bg-gray-200 hover:bg-gray-300 rounded-md p-3 ">
            Se connecter via Google
          </button>
          <button onClick={() => signIn('github')} className="bg-gray-200 hover:bg-gray-300 rounded-md p-3 ">
            Se connecter via GitHub
          </button>
        </div>
      </div>
    </>
  );
}
