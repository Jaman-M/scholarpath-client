"use client";

import { useState } from "react";

const mobileNavigationItems = [
    {
        label: "Dashboard",
        href: "#dashboard",
    },
    {
        label: "Applications",
        href: "#applications",
    },
    {
        label: "Deadlines",
        href: "#deadlines",
    },
];

export default function MobileHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function toggleMenu() {
        setIsMenuOpen((currentValue) => !currentValue);
    }

    function closeMenu() {
        setIsMenuOpen(false);
    }

    return (
        <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950 text-white lg:hidden">
            <div className="flex h-16 items-center justify-between px-5">
                <a
                    href="#dashboard"
                    onClick={closeMenu}
                    className="flex items-center gap-3"
                >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400 text-lg text-slate-950">
                        🎓
                    </span>

                    <span>
                        <span className="block text-sm font-bold">
                            ScholarPath
                        </span>

                        <span className="block text-xs text-slate-400">
                            PhD Tracker
                        </span>
                    </span>
                </a>

                <button
                    type="button"
                    onClick={toggleMenu}
                    aria-expanded={isMenuOpen}
                    aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                    className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl border border-white/10 transition hover:bg-white/10"
                >
                    <span
                        className={`h-0.5 w-5 bg-white transition ${isMenuOpen ? "translate-y-2 rotate-45" : ""
                            }`}
                    />

                    <span
                        className={`h-0.5 w-5 bg-white transition ${isMenuOpen ? "opacity-0" : ""
                            }`}
                    />

                    <span
                        className={`h-0.5 w-5 bg-white transition ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""
                            }`}
                    />
                </button>
            </div>

            {isMenuOpen && (
                <nav className="border-t border-white/10 px-5 py-4">
                    <div className="space-y-2">
                        {mobileNavigationItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={closeMenu}
                                className="block rounded-xl px-4 py-3 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </nav>
            )}
        </header>
    );
}