import Link from "next/link"
import RSVPForm from "./components/RSVPForm"

export default function Page() {
  return (
    <main className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">
            Reserve Your Spot
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Quick RSVP — takes less than a minute
          </p>
          <Link href="/" className="text-blue-500 hover:text-blue-700 text-sm font-medium">
            ← Back to Home
          </Link>
        </div>

        <RSVPForm />

      </div>
    </main>
  )
}