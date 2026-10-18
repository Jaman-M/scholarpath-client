// Navigation items are kept in one array so new pages can be added easily.
const navigationItems = [
    {
        label: "Dashboard",
        href: "#dashboard",
        active: true,
    },
    {
        label: "Applications",
        href: "#applications",
        active: false,
    },
    {
        label: "Deadlines",
        href: "#deadlines",
        active: false,
    },
];

export default function Sidebar() {
    return (
        <aside className="hidden min-h-screen w-64 flex-col bg-slate-950 px-5 py-7 text-white lg:flex">
            <div className="flex items-center gap-3 px-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400 text-xl text-slate-950">
                    🎓
                </div>

                <div>
                    <p className="font-bold">ScholarPath</p>
                    <p className="text-xs text-slate-400">PhD Application Tracker</p>
                </div>
            </div>

            <nav className="mt-10 space-y-2">
                {navigationItems.map((item) => (
                    <a
                        key={item.label}
                        href={item.href}
                        className={
                            item.active
                                ? "block rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold"
                                : "block rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
                        }
                    >
                        {item.label}
                    </a>
                ))}
            </nav>

            <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                    Personal workspace
                </p>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                    Your application information will remain connected to your own
                    account.
                </p>
            </div>
        </aside>
    );
}