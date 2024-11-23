import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Pour configurer la protection des routes dans votre application, commencez par ouvrir le fichier middleware.ts. Dans ce fichier, créez une règle qui détecte les routes d’inscription et de connexion afin de les rendre accessibles à tous les utilisateurs, sans restriction d’accès. Vous pouvez les intégrer à une règle existante si vous avez déjà des routes publiques définies.

// Ensuite, ajoutez une vérification pour savoir si l’utilisateur est sur une route publique (celles que vous souhaitez rendre accessibles sans authentification, comme la page de connexion). Si l’utilisateur essaie d’accéder à une page privée sans être authentifié, la fonction auth.protect() s’assurera que cette route est protégée, permettant uniquement aux utilisateurs connectés d’y accéder.

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)'])

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}