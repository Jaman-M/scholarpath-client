"use client";

import { useState } from "react";

import { sampleApplications } from "@/src/data/sampleApplications";
import type { Application } from "@/src/types/application";

// Each application status has a separate visual style.
const statusStyles: Record<Application["status"], string> = {
  Researching: "bg-slate-100 text-slate-700",
  Preparing: "bg-amber-100 text-amber-800",
  Submitted: "bg-blue-100 text-blue-800",
  Interview: "bg-purple-100 text-purple-800",
  Offer: "bg-emerald-100 text-emerald-800",
  Rejected: "bg-red-100 text-red-800",
};

// Format a YYYY-MM-DD date into a readable format.
function formatDate(deadline: string | null) {
  if (!deadline) {
    return "Not set";
  }

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${deadline}T00:00:00`));
}

// Calculate how much time remains before a deadline.
function getDeadlineInformation(deadline: string | null) {
  if (!deadline) {
    return {
      label: "Date needed",
      className: "bg-slate-100 text-slate-600",
    };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const deadlineDate = new Date(`${deadline}T00:00:00`);
  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  const daysRemaining = Math.ceil(
    (deadlineDate.getTime() - today.getTime()) / millisecondsPerDay,
  );

  if (daysRemaining < 0) {
    return {
      label: `${Math.abs(daysRemaining)} days overdue`,
      className: "bg-red-100 text-red-700",
    };
  }

  if (daysRemaining === 0) {
    return {
      label: "Due today",
      className: "bg-red-100 text-red-700",
    };
  }

  if (daysRemaining <= 7) {
    return {
      label: `${daysRemaining} days left`,
      className: "bg-orange-100 text-orange-700",
    };
  }

  if (daysRemaining <= 30) {
    return {
      label: `${daysRemaining} days left`,
      className: "bg-amber-100 text-amber-800",
    };
  }

  return {
    label: `${daysRemaining} days left`,
    className: "bg-emerald-100 text-emerald-700",
  };
}

export default function ApplicationsPanel() {
  const [searchQuery, setSearchQuery] = useState("");
  const [countryFilter, setCountryFilter] = useState("All countries");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [priorityFilter, setPriorityFilter] = useState("All priorities");

  const countries = Array.from(
    new Set(
      sampleApplications.map((application) => application.country),
    ),
  ).sort();

  // Apply every selected filter to the sample application list.
  const filteredApplications = sampleApplications.filter((application) => {
    const normalizedSearchQuery = searchQuery.trim().toLowerCase();

    const searchableText = [
      application.university,
      application.program,
      application.scholarship,
      application.country,
      application.supervisor,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      normalizedSearchQuery === "" ||
      searchableText.includes(normalizedSearchQuery);

    const matchesCountry =
      countryFilter === "All countries" ||
      application.country === countryFilter;

    const matchesStatus =
      statusFilter === "All statuses" ||
      application.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All priorities" ||
      application.priority === priorityFilter;

    return (
      matchesSearch &&
      matchesCountry &&
      matchesStatus &&
      matchesPriority
    );
  });

  function clearFilters() {
    setSearchQuery("");
    setCountryFilter("All countries");
    setStatusFilter("All statuses");
    setPriorityFilter("All priorities");
  }

  return (
    <section
      id="applications"
      className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white"
    >
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-xl font-semibold text-slate-900">
          Applications
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Search, filter and manage your PhD applications.
        </p>
      </div>

      <div className="grid gap-3 border-b border-slate-200 p-5 md:grid-cols-2 lg:grid-cols-5">
        <label className="md:col-span-2">
          <span className="sr-only">Search applications</span>

          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search university, program or scholarship"
            className="h-11 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </label>

        <label>
          <span className="sr-only">Filter by country</span>

          <select
            value={countryFilter}
            onChange={(event) => setCountryFilter(event.target.value)}
            className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            <option>All countries</option>

            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="sr-only">Filter by status</span>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            <option>All statuses</option>
            <option>Researching</option>
            <option>Preparing</option>
            <option>Submitted</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
        </label>

        <label>
          <span className="sr-only">Filter by priority</span>

          <select
            value={priorityFilter}
            onChange={(event) => setPriorityFilter(event.target.value)}
            className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            <option>All priorities</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </label>
      </div>

      {filteredApplications.length === 0 ? (
        <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
          <div className="rounded-full bg-slate-100 px-4 py-3 text-2xl">
            🔍
          </div>

          <h3 className="mt-4 font-semibold text-slate-900">
            No matching applications
          </h3>

          <p className="mt-1 max-w-sm text-sm text-slate-500">
            Try changing your search text or selected filters.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          {/* Desktop application table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <thead className="bg-slate-50">
                <tr className="text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-4 font-semibold">
                    University and program
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Scholarship
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Deadline
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Status
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Priority
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Links
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredApplications.map((application) => {
                  const deadlineInformation = getDeadlineInformation(
                    application.deadline,
                  );

                  return (
                    <tr
                      key={application.id}
                      className="border-t border-slate-200 transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-5 align-top">
                        <p className="font-semibold text-slate-900">
                          {application.university}
                        </p>

                        <p className="mt-1 max-w-xs text-sm text-slate-500">
                          {application.program}
                        </p>

                        <p className="mt-2 text-xs font-medium text-blue-700">
                          {application.country}
                        </p>
                      </td>

                      <td className="px-6 py-5 align-top">
                        <p className="max-w-xs text-sm text-slate-600">
                          {application.scholarship}
                        </p>
                      </td>

                      <td className="px-6 py-5 align-top">
                        <p className="text-sm font-medium text-slate-800">
                          {formatDate(application.deadline)}
                        </p>

                        <span
                          className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${deadlineInformation.className}`}
                        >
                          {deadlineInformation.label}
                        </span>
                      </td>

                      <td className="px-6 py-5 align-top">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[application.status]}`}
                        >
                          {application.status}
                        </span>
                      </td>

                      <td className="px-6 py-5 align-top">
                        <span className="text-sm font-medium text-slate-700">
                          {application.priority}
                        </span>
                      </td>

                      <td className="px-6 py-5 align-top">
                        <div className="flex flex-col gap-2">
                          {application.applicationUrl && (
                            <a
                              href={application.applicationUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-sm font-semibold text-blue-700 hover:underline"
                            >
                              Application ↗
                            </a>
                          )}

                          {application.programUrl && (
                            <a
                              href={application.programUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-sm font-semibold text-slate-600 hover:underline"
                            >
                              Program ↗
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile application cards */}
          <div className="grid gap-4 p-4 md:hidden">
            {filteredApplications.map((application) => {
              const deadlineInformation = getDeadlineInformation(
                application.deadline,
              );

              return (
                <article
                  key={application.id}
                  className="rounded-xl border border-slate-200 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {application.university}
                      </h3>

                      <p className="mt-1 text-xs font-medium text-blue-700">
                        {application.country}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[application.status]}`}
                    >
                      {application.status}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-slate-600">
                    {application.program}
                  </p>

                  <div className="mt-4 border-t border-slate-200 pt-4">
                    <p className="text-xs uppercase tracking-wider text-slate-400">
                      Scholarship
                    </p>

                    <p className="mt-1 text-sm text-slate-700">
                      {application.scholarship}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-slate-400">
                        {formatDate(application.deadline)}
                      </p>

                      <span
                        className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${deadlineInformation.className}`}
                      >
                        {deadlineInformation.label}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      {application.applicationUrl && (
                        <a
                          href={application.applicationUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm font-semibold text-blue-700"
                        >
                          Apply ↗
                        </a>
                      )}

                      {application.programUrl && (
                        <a
                          href={application.programUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm font-semibold text-slate-600"
                        >
                          Program ↗
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </>
      )}

      <div className="border-t border-slate-200 px-6 py-4">
        <p className="text-xs text-slate-500">
          Showing {filteredApplications.length} of{" "}
          {sampleApplications.length} applications
        </p>
      </div>
    </section>
  );
}