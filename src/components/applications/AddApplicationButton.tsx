"use client";

import { FormEvent, useState } from "react";

export default function AddApplicationButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // Saving functionality will be added after the UI is complete.
    }

    return (
        <>
            <button
                type="button"
                onClick={openModal}
                className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
                + Add Application
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
                    <section
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="application-form-title"
                        className="max-h-[calc(100vh-2rem)] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
                    >
                        <header className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-200 bg-white px-6 py-5">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                                    Application details
                                </p>

                                <h2
                                    id="application-form-title"
                                    className="mt-1 text-2xl font-bold text-slate-900"
                                >
                                    Add a new application
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Add the university, scholarship, deadline and useful links.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeModal}
                                aria-label="Close application form"
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                            >
                                ×
                            </button>
                        </header>

                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-5 p-6 md:grid-cols-2">
                                <label className="space-y-2">
                                    <span className="text-sm font-semibold text-slate-700">
                                        University *
                                    </span>

                                    <input
                                        required
                                        type="text"
                                        name="university"
                                        placeholder="Kyushu University"
                                        className="h-11 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                    />
                                </label>

                                <label className="space-y-2">
                                    <span className="text-sm font-semibold text-slate-700">
                                        Country *
                                    </span>

                                    <input
                                        required
                                        type="text"
                                        name="country"
                                        placeholder="Japan"
                                        className="h-11 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                    />
                                </label>

                                <label className="space-y-2 md:col-span-2">
                                    <span className="text-sm font-semibold text-slate-700">
                                        Program
                                    </span>

                                    <input
                                        type="text"
                                        name="program"
                                        placeholder="Agricultural Science or Genetic Engineering"
                                        className="h-11 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                    />
                                </label>

                                <label className="space-y-2">
                                    <span className="text-sm font-semibold text-slate-700">
                                        Scholarship
                                    </span>

                                    <input
                                        type="text"
                                        name="scholarship"
                                        placeholder="MEXT University Recommendation"
                                        className="h-11 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                    />
                                </label>

                                <label className="space-y-2">
                                    <span className="text-sm font-semibold text-slate-700">
                                        Supervisor
                                    </span>

                                    <input
                                        type="text"
                                        name="supervisor"
                                        placeholder="Professor name"
                                        className="h-11 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                    />
                                </label>

                                <label className="space-y-2">
                                    <span className="text-sm font-semibold text-slate-700">
                                        Deadline
                                    </span>

                                    <input
                                        type="date"
                                        name="deadline"
                                        className="h-11 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                    />
                                </label>

                                <label className="space-y-2">
                                    <span className="text-sm font-semibold text-slate-700">
                                        Priority
                                    </span>

                                    <select
                                        name="priority"
                                        defaultValue="Medium"
                                        className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                    >
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </select>
                                </label>

                                <label className="space-y-2">
                                    <span className="text-sm font-semibold text-slate-700">
                                        Status
                                    </span>

                                    <select
                                        name="status"
                                        defaultValue="Researching"
                                        className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                    >
                                        <option value="Researching">Researching</option>
                                        <option value="Preparing">Preparing</option>
                                        <option value="Submitted">Submitted</option>
                                        <option value="Interview">Interview</option>
                                        <option value="Offer">Offer</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </label>

                                <label className="space-y-2">
                                    <span className="text-sm font-semibold text-slate-700">
                                        Application link
                                    </span>

                                    <input
                                        type="url"
                                        name="applicationUrl"
                                        placeholder="https://..."
                                        className="h-11 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                    />
                                </label>

                                <label className="space-y-2 md:col-span-2">
                                    <span className="text-sm font-semibold text-slate-700">
                                        Program information link
                                    </span>

                                    <input
                                        type="url"
                                        name="programUrl"
                                        placeholder="https://..."
                                        className="h-11 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                    />
                                </label>

                                <label className="space-y-2 md:col-span-2">
                                    <span className="text-sm font-semibold text-slate-700">
                                        Notes
                                    </span>

                                    <textarea
                                        name="notes"
                                        rows={4}
                                        placeholder="Eligibility, supervisor response or your next step..."
                                        className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                    />
                                </label>
                            </div>

                            <footer className="sticky bottom-0 flex justify-end gap-3 border-t border-slate-200 bg-white px-6 py-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                                >
                                    Save Application
                                </button>
                            </footer>
                        </form>
                    </section>
                </div>
            )}
        </>
    );
}