import Link from "next/link"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">

      {/* HERO */}
      <section className="px-6 py-20 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Join Our Exclusive Event Experience
        </h1>

        <p className="text-gray-600 mt-4 text-lg">
          Secure your spot, choose your commitment level, and get access to a
          curated event designed for serious attendees.
        </p>

        <div className="mt-6">
          <Link
            href="/rsvp"
            className="bg-black text-white px-6 py-3 rounded-xl text-sm hover:bg-gray-900 transition"
          >
            RSVP Now
          </Link>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">

          <div className="p-6 border rounded-xl">
            <h3 className="font-semibold text-lg">Curated Experience</h3>
            <p className="text-gray-500 mt-2 text-sm">
              Designed for focused networking and high-value conversations.
            </p>
          </div>

          <div className="p-6 border rounded-xl">
            <h3 className="font-semibold text-lg">Flexible Commitment</h3>
            <p className="text-gray-500 mt-2 text-sm">
              Choose between interest, attendance, or VIP access.
            </p>
          </div>

          <div className="p-6 border rounded-xl">
            <h3 className="font-semibold text-lg">VIP Access</h3>
            <p className="text-gray-500 mt-2 text-sm">
              Unlock exclusive perks and guaranteed seats with deposit.
            </p>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-10">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-6 text-center">

          <div>
            <div className="text-2xl mb-2">1️⃣</div>
            <h3 className="font-medium">Submit RSVP</h3>
            <p className="text-gray-500 text-sm mt-2">
              Enter your details and select your level of interest.
            </p>
          </div>

          <div>
            <div className="text-2xl mb-2">2️⃣</div>
            <h3 className="font-medium">Choose Commitment</h3>
            <p className="text-gray-500 text-sm mt-2">
              Decide if you want general access or VIP experience.
            </p>
          </div>

          <div>
            <div className="text-2xl mb-2">3️⃣</div>
            <h3 className="font-medium">Confirm Spot</h3>
            <p className="text-gray-500 text-sm mt-2">
              VIP attendees secure their slot via deposit.
            </p>
          </div>

        </div>
      </section>

      {/* SOCIAL PROOF (Placeholder) */}
      <section className="bg-gray-50 py-16 px-6 text-center">
        <h2 className="text-2xl font-semibold mb-6">
          Trusted by Attendees
        </h2>

        <p className="text-gray-500 max-w-xl mx-auto">
          “This event delivered massive value. Highly recommend for anyone
          serious about growth.”
        </p>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 text-center px-6">
        <h2 className="text-3xl font-semibold">
          Ready to Join the Event?
        </h2>

        <p className="text-gray-500 mt-3">
          Secure your spot before slots run out.
        </p>

        <div className="mt-6">
          <Link
            href="/rsvp"
            className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-900 transition"
          >
            RSVP Now
          </Link>
        </div>
      </section>

    </main>
  )
}