
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET as string);


interface Data {
  title: string;
  price: number;
  image: string;
}


export const POST = async (request: NextRequest) => {
  try {
   
    const data: Data = await request.json();
    console.log("Data received:", data);


    const customer = await stripe.customers.create({
      email: 'customer@exemple.com',
      address: {
        city: "Los Angeles",
        country: "US",
        postal_code: "00000",
        line1: "rue de la paix",
        state: "CA", 
      },
      name: "Jonathan MDC",
    });
    console.log("Customer created:", customer);

    // Conversion du prix en centimes (Stripe fonctionne avec des centimes)
    const amountInCents = Math.round(data.price * 100); // Convertir en centimes
    if (amountInCents < 50) { // Vérification que le montant est au moins de 50 centimes
      throw new Error("The price is too low, must be at least 0.50 in your currency.");
    }


    const checkOutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], // Méthodes de paiement acceptées
      customer: customer.id,
      mode: "payment", // Mode de paiement unique
      success_url: "http://localhost:3000/success?token=" + customer.id, // URL de succès
      cancel_url: "http://localhost:3000/cancel?token=" + customer.id, // URL d'annulation
      line_items: [{
        quantity: 1,
        price_data: {
          product_data: {
            name: data.title, // Nom du produit
          },
          currency: "EUR", // Devise utilisée
          unit_amount: amountInCents, // Montant en centimes
        }
      }]
    });
    console.log("Checkout session created:", checkOutSession.url);

    // Retourner une réponse JSON avec l'URL de la session de paiement
    return NextResponse.json({ msg: checkOutSession, url: checkOutSession.url }, { status: 200 });
  } catch (error: any) {
    // Gestion des erreurs et retour d'une réponse JSON avec le message d'erreur
    console.error("Error occurred:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
