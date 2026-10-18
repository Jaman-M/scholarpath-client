"use client";

import { useEffect, useMemo, useState } from "react";

import AddApplicationButton from "@/src/components/applications/AddApplicationButton";
import ApplicationsPanel from "@/src/components/applications/ApplicationsPanel";
import StatCard from "@/src/components/dashboard/StatCard";
import MobileHeader from "@/src/components/layout/MobileHeader";
import Sidebar from "@/src/components/layout/Sidebar";
import type { Application } from "@/src/types/application";

const STORAGE_KEY = "scholarpath-applications";

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

function applicationIsFinished(application: Application) {
    return ["Submitted", "Interview", "Offer", "Rejected"].includes(
        application.status,
    );
}

export default function ApplicationDashboard() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [hasLoadedStorage, setHasLoadedStorage] = useState(false);

    // Load saved applications when the website opens.
    useEffect(() => {
        try {
            const savedApplications = localStorage.getItem(STORAGE_KEY);

            if (savedApplications) {
                const parsedApplications = JSON.parse(savedApplications);

                if (Array.isArray(parsedApplications)) {
                    setApplications(parsedApplications);
                }
            }
        } catch (error) {
            console.error("Could not load saved applications:", error);
        } finally {
            setHasLoadedStorage(true);
        }
    }, []);

    // Save every change inside this browser.
    useEffect(() => {
        if (!hasLoadedStorage) {
            return;
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
    }, [applications, hasLoadedStorage]);

    const statistics = useMemo(() => {
        const preparing = applications.filter(
            (application) => application.status === "Preparing",
        ).length;

        const submitted = applications.filter((application) =>
            ["Submitted", "Interview", "Offer"].includes(application.status),
        ).length;

        const urgent = applications.filter((application) => {
            const daysRemaining = getDaysRemaining(application.deadline);

            return (
                daysRemaining !== null &&
                daysRemaining >= 0 &&
                daysRemaining <= 7 &&
                !applicationIsFinished(application)
            );
        }).length;

        const upcoming = applications.filter((application) => {
            const daysRemaining = getDaysRemaining(application.deadline);

            return (
                daysRemaining !== null &&
                daysRemaining >= 0 &&
                daysRemaining <= 30 &&
                !applicationIsFinished(application)
            );
        }).length;

        return {
            total: applications.length,
            preparing,
            submitted,
            urgent,
            upcoming,
        };
    }, [applications]);

    function addApplication(application: Application) {
        setApplications((currentApplications) => [
            application,
            ...currentApplications,
        ]);
    }

    function updateApplication(updatedApplication: Application) {
        setApplications((currentApplications) =>
            currentApplications.map((application) =>
                application.id === updatedApplication.id
                    ? updatedApplication
                    : application,
            ),
        );
    }

    function deleteApplication(applicationId: string) {
        setApplications((currentApplications) =>
            currentApplications.filter(
                (application) => application.id !== applicationId,
            ),
        );
    }

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
                                    Track universities, scholarships and deadlines in one
                                    place.
                                </p>
                            </div>

                            <AddApplicationButton
                                onAddApplication={addApplication}
                            />
                        </header>

                        {statistics.upcoming > 0 && (
                            <section
                                id="deadlines"
                                className="mt-8 flex flex-col gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:flex-row sm:items-center"
                            >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-200 text-xl">
                                    ⚠️
                                </div>

                                <div>
                                    <h2 className="font-semibold text-amber-950">
                                        {statistics.upcoming} upcoming{" "}
                                        {statistics.upcoming === 1
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
                                value={statistics.total}
                                description="All applications"
                                color="blue"
                            />

                            <StatCard
                                title="Urgent"
                                value={statistics.urgent}
                                description="Due within 7 days"
                                color="orange"
                            />

                            <StatCard
                                title="Preparing"
                                value={statistics.preparing}
                                description="Currently working"
                                color="yellow"
                            />

                            <StatCard
                                title="Submitted"
                                value={statistics.submitted}
                                description="Applications sent"
                                color="green"
                            />
                        </section>

                        <ApplicationsPanel
                            applications={applications}
                            onUpdateApplication={updateApplication}
                            onDeleteApplication={deleteApplication}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}