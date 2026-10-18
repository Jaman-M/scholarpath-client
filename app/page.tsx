import StatCard from "@/src/components/dashboard/StatCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-5 py-10">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
              ScholarPath
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              PhD Application Tracker
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Track universities, scholarships and deadlines in one place.
            </p>
          </div>

          {/* We will connect this button to the form in the next step. */}
          <button
            type="button"
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            + Add Application
          </button>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total"
            value={0}
            description="All applications"
            color="blue"
          />

          <StatCard
            title="Urgent"
            value={0}
            description="Needs attention"
            color="orange"
          />

          <StatCard
            title="Preparing"
            value={0}
            description="Currently working"
            color="yellow"
          />

          <StatCard
            title="Submitted"
            value={0}
            description="Applications sent"
            color="green"
          />
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-xl font-semibold">Applications</h2>

            <p className="mt-1 text-sm text-slate-500">
              Your saved applications will appear here.
            </p>
          </div>

          <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
            <div className="rounded-full bg-slate-100 px-4 py-3 text-2xl">
              🎓
            </div>

            <h3 className="mt-4 font-semibold">No applications yet</h3>

            <p className="mt-1 max-w-sm text-sm text-slate-500">
              Add your first university to begin tracking its scholarship,
              deadline and application status.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}