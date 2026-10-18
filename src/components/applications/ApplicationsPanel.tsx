"use client";

import { useMemo, useState } from "react";

import ApplicationFormModal from "@/src/components/applications/ApplicationFormModal";
import type { Application } from "@/src/types/application";

interface ApplicationsPanelProps {
  applications: Application[];
  onUpdateApplication: (application: Application) => void;
  onDeleteApplication: (applicationId: string) => void;
}

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

function formatDeadline(deadline: string | null) {
  if (!deadline) {
    return "Not set";
  }

  return new Date(`${deadline}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getDeadlineMessage(deadline: string | null) {
  const daysRemaining = getDaysRemaining(deadline);

  if (daysRemaining === null) {
    return "No deadline";
  }

  if (daysRemaining < 0) {
    return "Deadline passed";
  }

  if (daysRemaining === 0) {
    return "Due today";
  }

  if (daysRemaining === 1) {
    return "1 day left";
  }

  return `${daysRemaining} days left`;
}

function getDeadlineColor(deadline: string | null) {
  const daysRemaining = getDaysRemaining(deadline);

  if (daysRemaining === null) {
    return "bg-slate-100 text-slate-600";
  }

  if (daysRemaining < 0) {
    return "bg-red-100 text-red-700";
  }

  if (daysRemaining <= 7) {
    return "bg-orange-100 text-orange-700";
  }

  if (daysRemaining <= 30) {
    return "bg-amber-100 text-amber-700";
  }

  return "bg-green-100 text-green-700";
}

function getStatusColor(status: Application["status"]) {
  const colors = {
    Researching: "bg-slate-100 text-slate-700",
    Preparing: "bg-amber-100 text-amber-700",
    Submitted: "bg-blue-100 text-blue-700",
    Interview: "bg-purple-100 text-purple-700",
    Offer: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return colors[status];
}

function getPriorityColor(priority: Application["priority"]) {
  const colors = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-amber-100 text-amber-700",
    Low: "bg-green-100 text-green-700",
  };

  return colors[priority];
}

export default function ApplicationsPanel({
  applications,
  onUpdateApplication,
  onDeleteApplication,
}: ApplicationsPanelProps) {
  const [searchText, setSearchText] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [editingApplication, setEditingApplication] =
    useState<Application | null>(null);

  const countries = useMemo(() => {
    return Array.from(
      new Set(applications.map((application) => application.country)),
    ).sort();
  }, [applications]);

  const filteredApplications = useMemo(() => {
    const normalizedSearch = searchText.toLowerCase().trim();

    return applications.filter((application) => {
      const searchableText = [
        application.university,
        application.country,
        application.program,
        application.scholarship,
        application.supervisor,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalizedSearch === "" ||
        searchableText.includes(normalizedSearch);

      const matchesCountry =
        selectedCountry === "All" ||
        application.country === selectedCountry;

      const matchesStatus =
        selectedStatus === "All" ||
        application.status === selectedStatus;

      const matchesPriority =
        selectedPriority === "All" ||
        application.priority === selectedPriority;

      return (
        matchesSearch &&
        matchesCountry &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [
    applications,
    searchText,
    selectedCountry,
    selectedStatus,
    selectedPriority,
  ]);

  function clearFilters() {
    setSearchText("");
    setSelectedCountry("All");
    setSelectedStatus("All");
    setSelectedPriority("All");
  }

  function handleDelete(application: Application) {
    const shouldDelete = window.confirm(
      `Delete ${application.university} from your tracker?`,
    );

    if (shouldDelete) {
      onDeleteApplication(application.id);
    }
  }

  function handleUpdate(application: Application) {
    onUpdateApplication(application);
    setEditingApplication(null);
  }

  return (
    <>
      <section
        id="applications"
        className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white"
      >
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-xl font-semibold">Applications</h2>

          <p className="mt-1 text-sm text-slate-500">
            Search, filter and manage your saved applications.
          </p>
        </div>

        <div className="grid gap-3 border-b border-slate-200 p-5 md:grid-cols-2 lg:grid-cols-5">
          <input
            type="search"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search applications..."
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 lg:col-span-2"
          />

          <select
            value={selectedCountry}
            onChange={(event) => setSelectedCountry(event.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
          >
            <option value="All">All countries</option>

            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(event) => setSelectedStatus(event.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
          >
            <option value="All">All statuses</option>
            <option value="Researching">Researching</option>
            <option value="Preparing">Preparing</option>
            <option value="Submitted">Submitted</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select
            value={selectedPriority}
            onChange={(event) => setSelectedPriority(event.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
          >
            <option value="All">All priorities</option>
            <option value="High">High priority</option>
            <option value="Medium">Medium priority</option>
            <option value="Low">Low priority</option>
          </select>
        </div>

        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <p className="text-sm text-slate-500">
            Showing {filteredApplications.length} of{" "}
            {applications.length} applications
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="text-sm font-semibold text-blue-700 hover:underline"
          >
            Clear filters
          </button>
        </div>

        {applications.length === 0 ? (
          <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
            <div className="rounded-full bg-slate-100 px-4 py-3 text-2xl">
              🎓
            </div>

            <h3 className="mt-4 font-semibold">No applications yet</h3>

            <p className="mt-1 max-w-sm text-sm text-slate-500">
              Use the Add Application button to add your first university.
            </p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="flex min-h-60 flex-col items-center justify-center px-6 text-center">
            <h3 className="font-semibold">No matching application</h3>

            <p className="mt-1 text-sm text-slate-500">
              Change your search text or clear the filters.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[1000px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-4">University</th>
                    <th className="px-6 py-4">Program</th>
                    <th className="px-6 py-4">Deadline</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Priority</th>
                    <th className="px-6 py-4">Links</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                  {filteredApplications.map((application) => (
                    <tr key={application.id} className="hover:bg-slate-50">
                      <td className="px-6 py-5">
                        <p className="font-semibold">
                          {application.university}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {application.country}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <p>{application.program || "Not added"}</p>

                        {application.scholarship && (
                          <p className="mt-1 text-xs text-slate-500">
                            {application.scholarship}
                          </p>
                        )}
                      </td>

                      <td className="px-6 py-5">
                        <p>{formatDeadline(application.deadline)}</p>

                        <span
                          className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getDeadlineColor(
                            application.deadline,
                          )}`}
                        >
                          {getDeadlineMessage(application.deadline)}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                            application.status,
                          )}`}
                        >
                          {application.status}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getPriorityColor(
                            application.priority,
                          )}`}
                        >
                          {application.priority}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex flex-col gap-2">
                          {application.applicationUrl && (
                            <a
                              href={application.applicationUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="font-semibold text-blue-700 hover:underline"
                            >
                              Apply
                            </a>
                          )}

                          {application.programUrl && (
                            <a
                              href={application.programUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-slate-600 hover:underline"
                            >
                              Program
                            </a>
                          )}

                          {!application.applicationUrl &&
                            !application.programUrl && (
                              <span className="text-slate-400">No links</span>
                            )}
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              setEditingApplication(application)
                            }
                            className="font-semibold text-blue-700 hover:underline"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(application)}
                            className="font-semibold text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile and tablet cards */}
            <div className="grid gap-4 p-4 lg:hidden">
              {filteredApplications.map((application) => (
                <article
                  key={application.id}
                  className="rounded-2xl border border-slate-200 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold">
                        {application.university}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {application.country}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getPriorityColor(
                        application.priority,
                      )}`}
                    >
                      {application.priority}
                    </span>
                  </div>

                  <div className="mt-5 space-y-3 text-sm">
                    <div>
                      <p className="text-xs text-slate-500">Program</p>
                      <p className="mt-1">
                        {application.program || "Not added"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">Deadline</p>
                      <p className="mt-1">
                        {formatDeadline(application.deadline)}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                          application.status,
                        )}`}
                      >
                        {application.status}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getDeadlineColor(
                          application.deadline,
                        )}`}
                      >
                        {getDeadlineMessage(application.deadline)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-4 border-t border-slate-200 pt-4 text-sm">
                    {application.applicationUrl && (
                      <a
                        href={application.applicationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-blue-700"
                      >
                        Apply
                      </a>
                    )}

                    {application.programUrl && (
                      <a
                        href={application.programUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-slate-600"
                      >
                        Program
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => setEditingApplication(application)}
                      className="font-semibold text-blue-700"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(application)}
                      className="font-semibold text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>

      {editingApplication && (
        <ApplicationFormModal
          key={editingApplication.id}
          initialApplication={editingApplication}
          onSave={handleUpdate}
          onClose={() => setEditingApplication(null)}
        />
      )}
    </>
  );
}