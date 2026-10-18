import { connection } from "next/server";

import AddApplicationButton from "@/src/components/applications/AddApplicationButton";
import ApplicationsPanel from "@/src/components/applications/ApplicationsPanel";
import StatCard from "@/src/components/dashboard/StatCard";
import MobileHeader from "@/src/components/layout/MobileHeader";
import Sidebar from "@/src/components/layout/Sidebar";
import { sampleApplications } from "@/src/data/sampleApplications";

// Calculate the number of days between today and a deadline.
function getDaysRemaining(deadline: string | null) {
  if (!deadline) {
    return null;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const deadlineDate = new Date(`${deadline}T00:00:00`);

  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  return Math.ceil(
    (deadlineDate.getTime() - today.getTime()) / millisecondsPerDay,
  );
}

export default async function Home() {
  // Deadline calculations use the current date.
  // This tells Next.js to render the page at request time.
  await connection();

  const totalApplications = sampleApplications.length;

  const preparingApplications = sampleApplications.filter(
    (application) => application.status === "Preparing",
  ).length;

  const submittedApplications = sampleApplications.filter((application) =>
    ["Submitted", "Interview", "Offer"].includes(application.status),
  ).length;

  // An application is urgent when its deadline has passed
  // or it is due within the next seven days.
  const urgentApplications = sampleApplications.filter((application) => {
    const daysRemaining = getDaysRemaining(application.deadline);

    if (daysRemaining === null) {
      return false;
    }

    const applicationIsFinished = [
      "Submitted",
      "Interview",
      "Offer",
    ].includes(application.status);

    return !applicationIsFinished && daysRemaining <= 7;
  }).length;

  // Upcoming applications are due within the next 30 days.
  const upcomingApplications = sampleApplications.filter((application) => {
    const daysRemaining = getDaysRemaining(application.deadline);

    if (daysRemaining === null) {
      return false;
    }

    const applicationIsFinished = [
      "Submitted",
      "Interview",
      "Offer",
    ].includes(application.status);

    return (
      !applicationIsFinished &&
      daysRemaining >= 0 &&
      daysRemaining <= 30
    );
  }).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <MobileHeader />

      <div className="flex">
        <Sidebar />

        <main id="dashboard" className="min-w-0 flex-1">
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

              <AddApplicationButton />
            </header>

            {/* Show a warning when an unfinished application
                is due within the next 30 days. */}
            {upcomingApplications > 0 && (
              <section
                id="deadlines"
                className="mt-8 flex flex-col gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:flex-row sm:items-center"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-200 text-xl">
                  ⚠️
                </div>

                <div>
                  <h2 className="font-semibold text-amber-950">
                    {upcomingApplications} upcoming{" "}
                    {upcomingApplications === 1
                      ? "deadline"
                      : "deadlines"}
                  </h2>

                  <p className="mt-1 text-sm text-amber-800">
                    Review applications due within the next 30 days.
                  </p>
                </div>

                <a
                  href="#applications"
                  className="text-sm font-semibold text-amber-900 hover:underline sm:ml-auto"
                >
                  Review applications
                </a>
              </section>
            )}

            <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total"
                value={totalApplications}
                description="All applications"
                color="blue"
              />

              <StatCard
                title="Urgent"
                value={urgentApplications}
                description="Due within 7 days"
                color="orange"
              />

              <StatCard
                title="Preparing"
                value={preparingApplications}
                description="Currently working"
                color="yellow"
              />

              <StatCard
                title="Submitted"
                value={submittedApplications}
                description="Applications sent"
                color="green"
              />
            </section>

            <ApplicationsPanel />
          </div>
        </main>
      </div>
    </div>
  );
}