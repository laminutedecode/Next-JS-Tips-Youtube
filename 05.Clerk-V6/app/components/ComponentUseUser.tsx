'use client'
import { useUser } from '@clerk/nextjs'

export default function ComponentUseUser() {

  const { isLoaded, isSignedIn, user } = useUser()
  
  if (!isLoaded || !isSignedIn) {
    return null
  }

  return (
    <div>
      Bonjour, {user.firstName} ! Bienvenue sur notre site
    </div>
  )
}


