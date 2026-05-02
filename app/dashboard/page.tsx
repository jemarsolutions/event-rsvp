export const dynamic = "force-dynamic"
import { supabase } from "@/lib/supabase"

export default async function DashboardPage() {
  const { data: rsvps } = await supabase
    .from("rsvps")
    .select("*, guests(*)")

  const { data: payments } = await supabase
    .from("payments")
    .select("*")

  const totalRSVPs = rsvps?.length || 0
  const totalPaid = payments?.filter(p => p.status === "paid").length || 0
  const revenue =
    payments?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>

      {/* KPI CARDS */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 border rounded-xl">
          <p className="text-sm text-gray-500">Total RSVPs</p>
          <p className="text-2xl font-bold">{totalRSVPs}</p>
        </div>

        <div className="p-4 border rounded-xl">
          <p className="text-sm text-gray-500">Paid Users</p>
          <p className="text-2xl font-bold">{totalPaid}</p>
        </div>

        <div className="p-4 border rounded-xl">
          <p className="text-sm text-gray-500">Revenue</p>
          <p className="text-2xl font-bold">${revenue / 100}</p>
        </div>
      </div>

      {/* RSVP TABLE */}
      <div>
        <h2 className="text-lg font-semibold mb-2">RSVPs</h2>

        <div className="border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Commitment</th>
                <th className="p-2 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {rsvps?.map((rsvp) => (
                <tr key={rsvp.id} className="border-t">
                  <td className="p-2">{rsvp.guests?.name}</td>
                  <td className="p-2">{rsvp.guests?.email}</td>
                  <td className="p-2">{rsvp.commitment_level}</td>
                  <td className="p-2">{rsvp.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAYMENTS TABLE */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Payments</h2>

        <div className="border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Amount</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Stripe ID</th>
              </tr>
            </thead>

            <tbody>
              {payments?.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-2">${p.amount / 100}</td>
                  <td className="p-2">{p.status}</td>
                  <td className="p-2 text-xs">{p.stripe_payment_intent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}