"use server"
import { prisma } from "@/lib/db";
import { getStripeSession } from "@/lib/stripe";
import { redirect } from "next/navigation";
import { getUser } from "./actionsUsers";
import { stripe } from "@/lib/stripe";

export const getDataStripeUser = async (userId: string) => {
  const data = await prisma.subscription.findUnique({
    where: {
      userId: userId,
    },
    select: {
      status: true,
      user: {
        select: {
          stripeCustomerId: true
        }
      }
    }
  });

  return data;
};

export const createSubscription = async () => {
  const user = await getUser(); // Récupère les informations de l'utilisateur connecté
  
  if (!user) {
    throw new Error("User not found."); // Gestion de l'erreur si l'utilisateur n'existe pas
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      clerkUserId: user.clerkUserId as string // Utilisez clerkUserId pour rechercher l'utilisateur
    },
    select: {
      stripeCustomerId: true
    }
  });

  // Vérification que stripeCustomerId est présent
  if (!dbUser?.stripeCustomerId) {
    throw new Error("User does not have a Stripe customer ID.");
  }

  const subscriptionUrl = await getStripeSession({
    customerId: dbUser.stripeCustomerId,
    domainUrl: "http://localhost:3000",
    priceId: process.env.STRIPE_API_ID as string
  });

  return redirect(subscriptionUrl);
};


export const createCustomerPortal = async () => {
  const user = await getUser();
  const session = await stripe.billingPortal.sessions.create({
    customer: user?.stripeCustomerId as string,
    return_url: "http://localhost:3000/dashboard/profile",
  });
  return redirect(session.url);
};
