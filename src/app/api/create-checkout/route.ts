import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const PLANS = {
  pro: {
    name: "Pro Plan",
    price: "price_1QTTh7GRPozAvrQuGjJAqvwH2TAXXuPWvhYaXBGjr0dMPPeVfr8dEKqQaiQ4t07HbaYarCswdijzHOfpSLb3TIAB00eOVmzlnO",
    credits: 100,
  },
  business: {
    name: "Business Plan",
    price: "price_1QTTh7GRPozAvrQuV3rQdmHCLDe8j45ptVNu4Xb8zmyxhVj2JL78ziFsu0i9nHR8u8e3vOxEM5t8DWGee6yw8Qbq00yTOTGOpV",
    credits: -1, // unlimited
  },
};

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
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
    const session = await stripe.checkout.sessions.create({
      success_url: successUrl,
      cancel_url: cancelUrl,
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: userId, // We'll use userId as customer email for now
      line_items: [
        {
          price: planConfig.price,
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        plan,
        credits: planConfig.credits.toString(),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[STRIPE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 