import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { readLeads, leadsToCSV } from "@/lib/leads";

const INTEREST_LABELS: Record<string, string> = {
  demo: "Demo",
  "brand-cure": "Brand Cure",
  general: "General",
};

const INTEREST_COLORS: Record<string, string> = {
  demo: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  "brand-cure": "bg-blue-500/15 text-blue-400 border-blue-500/20",
  general: "bg-zinc-700/40 text-zinc-400 border-zinc-700/40",
};

/* ── Auth check ─────────────────────────────────────────────
   Pass ?pw=YOUR_PASSWORD in the URL to set the auth cookie.
   After that, the cookie keeps you logged in for 24 hours.  */
export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ pw?: string }>;
}) {
  const params = await searchParams;
  const cookieStore = await cookies();
  const adminPw = process.env.ADMIN_PASSWORD;

  // Set cookie if password provided in URL
  if (params.pw && params.pw === adminPw) {
    cookieStore.set("admin_auth", params.pw, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });
    redirect("/admin/leads");
  }

  const authed = cookieStore.get("admin_auth")?.value === adminPw && !!adminPw;
  if (!authed) {
    return <PasswordGate />;
  }

  const leads = readLeads();
  const csv = leadsToCSV(leads);
  const csvDataUri = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Inbound Leads</h1>
            <p className="text-zinc-500 text-sm mt-1">
              {leads.length} total lead{leads.length !== 1 ? "s" : ""}
            </p>
          </div>
          <a
            href={csvDataUri}
            download={`grewbie-leads-${new Date().toISOString().split("T")[0]}.csv`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export CSV
          </a>
        </div>

        {leads.length === 0 ? (
          <div className="text-center py-24 text-zinc-600">
            <p className="text-lg">No leads yet.</p>
            <p className="text-sm mt-2">Leads submitted through the website form will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/5">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 bg-zinc-900/60">
                  {["Name", "Email", "Phone", "Company", "Interest", "Message", "Source", "Time"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, i) => (
                  <tr
                    key={lead.id}
                    className={`border-b border-white/5 hover:bg-white/[0.02] transition-colors ${i % 2 === 0 ? "" : "bg-zinc-900/20"}`}
                  >
                    <td className="px-4 py-3 text-white font-medium whitespace-nowrap">{lead.name}</td>
                    <td className="px-4 py-3">
                      <a href={`mailto:${lead.email}`} className="text-emerald-400 hover:underline">
                        {lead.email}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-zinc-400 whitespace-nowrap">
                      {lead.phone ? (
                        <a href={`tel:${lead.phone}`} className="hover:text-emerald-400 transition-colors">
                          {lead.phone}
                        </a>
                      ) : (
                        <span className="text-zinc-700">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-zinc-400 whitespace-nowrap">
                      {lead.company || <span className="text-zinc-700">—</span>}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full border ${INTEREST_COLORS[lead.interest] ?? INTEREST_COLORS.general}`}>
                        {INTEREST_LABELS[lead.interest] ?? lead.interest}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-zinc-400 max-w-xs">
                      <span className="line-clamp-2">
                        {lead.message || <span className="text-zinc-700">—</span>}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-zinc-500 whitespace-nowrap text-xs">{lead.source}</td>
                    <td className="px-4 py-3 text-zinc-500 whitespace-nowrap text-xs">
                      {new Date(lead.createdAt).toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function PasswordGate() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-zinc-950 border border-white/10 rounded-2xl p-8 text-center">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5">
          <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </div>
        <h1 className="text-white font-bold text-lg mb-1">Admin access</h1>
        <p className="text-zinc-500 text-sm mb-6">
          Visit{" "}
          <code className="text-emerald-400 bg-zinc-900 px-1.5 py-0.5 rounded text-xs">
            /admin/leads?pw=YOUR_PASSWORD
          </code>{" "}
          to authenticate.
        </p>
        <p className="text-zinc-600 text-xs">Set <code className="text-zinc-500">ADMIN_PASSWORD</code> in your environment variables.</p>
      </div>
    </div>
  );
}
