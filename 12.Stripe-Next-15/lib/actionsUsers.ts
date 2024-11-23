"use server"
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation"; 
import { auth } from "@clerk/nextjs/server"; 

export const addUserToDatabase = async (clerkUserId: string, name: string, email: string, image: string) => {
  try {
    const user = await prisma.user.upsert({
      where: { clerkUserId },
      update: {
        name,
        email,
        image
      },
      create: {
        clerkUserId,
        name,
        email,
        image
      },
    });
    return user;
  } catch (error) {
    console.error("Error adding user to database:", error);
    throw error;
  }
};


export const getUser = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("../"); 
  }

  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId } 
  });

  return user; 
};
