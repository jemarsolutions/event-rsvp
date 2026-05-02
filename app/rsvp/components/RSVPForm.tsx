"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { createRSVP } from "@/server/actions/rsvp"

const rsvpSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  commitment: z.enum(["interested", "attending", "vip"]),
})

type RSVPFormData = z.infer<typeof rsvpSchema>

export default function RSVPForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [step, setStep] = useState(1)

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpSchema),
  })

  const onSubmit = async (data: RSVPFormData) => {
  try {
    setLoading(true)

    const res = await createRSVP(data)

    if (res?.success && data.commitment === "vip") {
      const stripeRes = await fetch("/api/stripe/checkout", {
        method: "POST",
        body: JSON.stringify({
          email: data.email,
          rsvpId: res.rsvpId,
        }),
      })

      const { url } = await stripeRes.json()

      window.location.assign(url)
      return
    }

    setSuccess(true)
  } catch (err) {
    console.error(err)
  } finally {
    setLoading(false)
  }
}

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white border rounded-2xl shadow-sm p-8 text-center max-w-md w-full">
          <div className="text-4xl mb-3">🎉</div>
          <h2 className="text-2xl font-semibold mb-2">Youre in!</h2>
          <p className="text-gray-500">
            Thanks for your RSVP. Well contact you soon.
          </p>
        </div>
      </div>
    )
  }

  return (
  <div className="bg-white/80 backdrop-blur border border-gray-200 rounded-2xl shadow-lg p-6 transition">

    {/* Header */}
    <div className="mb-6">
      <h2 className="text-xl font-semibold tracking-tight">
        RSVP for the Event
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Complete your registration below
      </p>

      {/* Step indicator */}
      <div className="flex gap-2 mt-4">
        <div
          className={`h-1.5 flex-1 rounded-full transition-all ${
            step === 1 ? "bg-black" : "bg-gray-200"
          }`}
        />
        <div
          className={`h-1.5 flex-1 rounded-full transition-all ${
            step === 2 ? "bg-black" : "bg-gray-200"
          }`}
        />
      </div>
    </div>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

      {/* STEP 1 */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              {...register("name")}
              className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register("email")}
              className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={async () => {
              const valid = await trigger(["name", "email"])
              if (valid) setStep(2)
            }}
            className="w-full bg-black text-white py-2.5 rounded-xl text-sm font-medium hover:bg-gray-900 active:scale-[0.98] transition"
          >
            Continue
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Commitment Level
            </label>

            <select
              {...register("commitment")}
              className="mt-1 w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
            >
              <option value="">Select one</option>
              <option value="interested">Interested</option>
              <option value="attending">Attending</option>
              <option value="vip">VIP</option>
            </select>

            {errors.commitment && (
              <p className="text-red-500 text-xs mt-1">
                {errors.commitment.message}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-1/3 border border-gray-300 rounded-xl py-2.5 text-sm hover:bg-gray-100 active:scale-[0.98] transition"
            >
              Back
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-2/3 bg-black text-white py-2.5 rounded-xl text-sm font-medium hover:bg-gray-900 active:scale-[0.98] transition disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit RSVP"}
            </button>
          </div>
        </div>
      )}

    </form>
  </div>
)
}