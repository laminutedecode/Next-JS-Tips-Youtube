import { auth, currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'
import ComponentUserAuth from '../components/ComponentUseAuth'
import ComponentUseUser from '../components/ComponentUseUser'


export default async function page() {
  
      const { userId } = await auth()

      if (userId) {
      }

      const user = await currentUser()
     
  return (

    <section className='w-full h-screen flex items-center flex-col pt-6'>
      <div className='mb-4 border p-3 rounded-md'>
        <Image src={user?.imageUrl as string} alt={user?.fullName as string} width={100} height={100} />
        <h1>Bienvenue {user?.fullName}</h1>
        <p>{user?.emailAddresses[0].emailAddress}</p>
      </div>


      <ComponentUserAuth/>
      <ComponentUseUser/>

    </section>
  
  )
}

