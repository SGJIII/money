import { auth } from "@/app/auth"
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const PLANS = {
  pro: {
    name: "Pro Plan",
    price: "price_1QTTpoGRPozAvrQuGrx6GlUS",
    credits: 100,
  },
  business: {
    name: "Business Plan",
    price: "price_1QTTqCGRPozAvrQulBFHOwkf",
    credits: -1, // unlimited
  },
};

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { plan, successUrl, cancelUrl } = body;

    if (!plan || !successUrl || !cancelUrl) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const planConfig = PLANS[plan as keyof typeof PLANS];
    if (!planConfig) {
      return new NextResponse("Invalid plan", { status: 400 });
    }

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      success_url: successUrl,
      cancel_url: cancelUrl,
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: session.user.email!, // Use user's email from session
      line_items: [
        {
          price: planConfig.price,
          quantity: 1,
        },
      ],
      metadata: {
        userId: session.user.id,
        plan,
        credits: planConfig.credits.toString(),
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("[STRIPE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 