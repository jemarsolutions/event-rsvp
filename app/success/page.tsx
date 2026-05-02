import Link from "next/link"

export default function Success() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-8 text-center">

        {/* Icon */}
        <div className="text-5xl mb-4">🎉</div>

        {/* Title */}
        <h1 className="text-2xl font-semibold tracking-tight">
          Payment Successful
        </h1>

        {/* Description */}
        <p className="text-gray-500 text-sm mt-3">
          Your spot has been secured. We’ve received your deposit and will
          contact you with the next steps.
        </p>

        {/* Divider */}
        <div className="h-px bg-gray-200 my-6" />

        {/* Info box */}
        <div className="bg-gray-50 border rounded-xl p-4 text-sm text-gray-600">
          <p>
            ✔ RSVP confirmed
          </p>
          <p className="mt-1">
            ✔ Payment received
          </p>
          <p className="mt-1">
            ✔ Confirmation email coming soon
          </p>
        </div>

        {/* CTA */}
        <div className="mt-6 space-y-3">
          <Link
            href="/"
            className="block w-full bg-black text-white py-2.5 rounded-xl text-sm font-medium hover:bg-gray-900 transition"
          >
            Back to Home
          </Link>

          <Link
            href="/dashboard"
            className="block w-full border border-gray-300 py-2.5 rounded-xl text-sm hover:bg-gray-100 transition"
          >
            View Dashboard
          </Link>
        </div>

      </div>
    </main>
  )
}