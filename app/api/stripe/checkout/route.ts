import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"

export async function POST(req: Request) {
  const body = await req.json()

  const { email, rsvpId } = body

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "VIP Event Deposit",
            },
            unit_amount: 2000, // $20 deposit
          },
          quantity: 1,
        },
      ],
      customer_email: email,
      metadata: {
        rsvpId,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/rsvp`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    return NextResponse.json({ error: "Stripe error" }, { status: 500 })
  }
}