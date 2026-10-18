"use client";

import type { FormEvent } from "react";

import type {
    Application,
    ApplicationPriority,
    ApplicationStatus,
} from "@/src/types/application";

interface ApplicationFormModalProps {
    initialApplication?: Application;
    onSave: (application: Application) => void;
    onClose: () => void;
}

export default function ApplicationFormModal({
    initialApplication,
    onSave,
    onClose,
}: ApplicationFormModalProps) {
    const isEditing = Boolean(initialApplication);

    function getFormValue(formData: FormData, fieldName: string) {
        return String(formData.get(fieldName) ?? "").trim();
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const currentTime = new Date().toISOString();

        // Create a new application or update the existing application.
        const application: Application = {
            id: initialApplication?.id ?? crypto.randomUUID(),
            university: getFormValue(formData, "university"),
            country: getFormValue(formData, "country"),
            program: getFormValue(formData, "program"),
            scholarship: getFormValue(formData, "scholarship"),
            supervisor: getFormValue(formData, "supervisor"),
            deadline: getFormValue(formData, "deadline") || null,
            status: getFormValue(formData, "status") as ApplicationStatus,
            priority: getFormValue(formData, "priority") as ApplicationPriority,
            applicationUrl: getFormValue(formData, "applicationUrl"),
            programUrl: getFormValue(formData, "programUrl"),
            notes: getFormValue(formData, "notes"),
            createdAt: initialApplication?.createdAt ?? currentTime,
            updatedAt: currentTime,
        };

        onSave(application);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                    <div>
                        <h2 className="text-xl font-bold">
                            {isEditing ? "Edit Application" : "Add Application"}
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            {isEditing
                                ? "Update your saved application information."
                                : "Add a university application to your tracker."}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close form"
                        className="rounded-lg px-3 py-2 text-xl text-slate-500 hover:bg-slate-100"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid gap-5 sm:grid-cols-2">
                        <label className="text-sm font-medium">
                            University *
                            <input
                                required
                                name="university"
                                type="text"
                                defaultValue={initialApplication?.university ?? ""}
                                placeholder="Kyushu University"
                                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </label>

                        <label className="text-sm font-medium">
                            Country *
                            <input
                                required
                                name="country"
                                type="text"
                                defaultValue={initialApplication?.country ?? ""}
                                placeholder="Japan"
                                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </label>

                        <label className="text-sm font-medium">
                            Program
                            <input
                                name="program"
                                type="text"
                                defaultValue={initialApplication?.program ?? ""}
                                placeholder="Agricultural Science"
                                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </label>

                        <label className="text-sm font-medium">
                            Scholarship
                            <input
                                name="scholarship"
                                type="text"
                                defaultValue={initialApplication?.scholarship ?? ""}
                                placeholder="MEXT Scholarship"
                                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </label>

                        <label className="text-sm font-medium">
                            Supervisor
                            <input
                                name="supervisor"
                                type="text"
                                defaultValue={initialApplication?.supervisor ?? ""}
                                placeholder="Professor name"
                                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </label>

                        <label className="text-sm font-medium">
                            Deadline
                            <input
                                name="deadline"
                                type="date"
                                defaultValue={initialApplication?.deadline ?? ""}
                                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </label>

                        <label className="text-sm font-medium">
                            Priority
                            <select
                                name="priority"
                                defaultValue={initialApplication?.priority ?? "Medium"}
                                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                            >
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </label>

                        <label className="text-sm font-medium">
                            Status
                            <select
                                name="status"
                                defaultValue={initialApplication?.status ?? "Researching"}
                                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                            >
                                <option value="Researching">Researching</option>
                                <option value="Preparing">Preparing</option>
                                <option value="Submitted">Submitted</option>
                                <option value="Interview">Interview</option>
                                <option value="Offer">Offer</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </label>

                        <label className="text-sm font-medium">
                            Application link
                            <input
                                name="applicationUrl"
                                type="url"
                                defaultValue={initialApplication?.applicationUrl ?? ""}
                                placeholder="https://..."
                                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </label>

                        <label className="text-sm font-medium">
                            Program link
                            <input
                                name="programUrl"
                                type="url"
                                defaultValue={initialApplication?.programUrl ?? ""}
                                placeholder="https://..."
                                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </label>

                        <label className="text-sm font-medium sm:col-span-2">
                            Notes
                            <textarea
                                name="notes"
                                rows={4}
                                defaultValue={initialApplication?.notes ?? ""}
                                placeholder="Requirements, documents or important information..."
                                className="mt-2 w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </label>
                    </div>

                    <div className="mt-7 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold hover:bg-slate-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-600"
                        >
                            {isEditing ? "Update Application" : "Save Application"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}