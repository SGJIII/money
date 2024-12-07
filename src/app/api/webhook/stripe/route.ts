import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Webhook signature verification failed");
    return new NextResponse("Webhook Error", { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  try {
    switch (event.type) {
      case "checkout.session.completed":
        // Handle successful subscription
        const userId = session.metadata?.userId;
        const plan = session.metadata?.plan;
        const credits = session.metadata?.credits;

        if (userId && plan) {
          // Here you would typically:
          // 1. Update user's subscription status in your database
          // 2. Add credits to user's account
          // 3. Send welcome email
          console.log(`User ${userId} subscribed to ${plan} plan with ${credits} credits`);
        }
        break;

      case "customer.subscription.updated":
        // Handle subscription updates
        break;

      case "customer.subscription.deleted":
        // Handle subscription cancellations
        break;
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("Webhook handler failed");
    return new NextResponse("Webhook Error", { status: 400 });
  }
} 