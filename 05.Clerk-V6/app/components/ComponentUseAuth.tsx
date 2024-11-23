'use client'
import { useAuth } from '@clerk/nextjs'

export default function ComponentUseAuth() {

  const { isLoaded, userId, sessionId, getToken } = useAuth()

  if (!isLoaded || !userId) {
    return null 
  }

  return (
    <div>
      Bonjour, {userId} ! Votre session active actuelle est {sessionId}
    </div>
  )
}

