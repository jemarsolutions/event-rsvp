import { stripe } from "@/lib/stripe"
import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature")!

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    return NextResponse.json({ error: "Webhook error" }, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
  const session = event.data.object

  const rsvpId = session.metadata?.rsvpId

  if (!rsvpId) {
    return NextResponse.json({ error: "Missing rsvpId metadata" }, { status: 400 })
  }

  // 1. Get RSVP first (to get guest_id)
  const { data: rsvp } = await supabase
    .from("rsvps")
    .select("guest_id")
    .eq("id", rsvpId)
    .single()

  if (!rsvp) {
    return NextResponse.json({ error: "RSVP not found" }, { status: 404 })
  }

  // 2. Update RSVP
  await supabase
    .from("rsvps")
    .update({
      payment_status: "paid",
      status: "completed",
      stripe_payment_intent: session.payment_intent,
    })
    .eq("id", rsvpId)

  // 3. INSERT into payments table
  await supabase.from("payments").insert([
    {
      guest_id: rsvp.guest_id,
      rsvp_id: rsvpId,
      stripe_payment_intent: session.payment_intent,
      stripe_checkout_session: session.id,
      amount: session.amount_total,
      currency: session.currency,
      status: "paid",
    },
  ])
}

  return NextResponse.json({ received: true })
}