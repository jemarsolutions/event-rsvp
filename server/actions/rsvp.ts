"use server"

import { supabase } from "@/lib/supabase"

export async function createRSVP(data: {
  name: string
  email: string
  commitment: string
}) {
  // 1. Insert guest
  const { data: guest, error: guestError } = await supabase
    .from("guests")
    .insert([
      {
        name: data.name,
        email: data.email,
      },
    ])
    .select("id")
    .single()

  if (guestError || !guest) {
    console.error("Guest Insert Error:", guestError)
    throw new Error("Failed to create guest")
  }

  // 2. Insert RSVP
  const { data: rsvp, error: rsvpError } = await supabase
    .from("rsvps")
    .insert([
      {
        guest_id: guest.id,
        commitment_level: data.commitment,
        status: "pending",
        current_step: 2,
      },
    ])
    .select("id")
    .single()

  if (rsvpError || !rsvp) {
    console.error("RSVP Insert Error FULL:", rsvpError)
    throw new Error(JSON.stringify(rsvpError))
  }

  return { success: true, rsvpId: rsvp.id }
}