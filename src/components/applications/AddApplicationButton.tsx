"use client";

import { useState } from "react";

import ApplicationFormModal from "@/src/components/applications/ApplicationFormModal";
import type { Application } from "@/src/types/application";

interface AddApplicationButtonProps {
    onAddApplication: (application: Application) => void;
}

export default function AddApplicationButton({
    onAddApplication,
}: AddApplicationButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleSave(application: Application) {
        onAddApplication(application);
        setIsModalOpen(false);
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
                + Add Application
            </button>

            {isModalOpen && (
                <ApplicationFormModal
                    onSave={handleSave}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
}