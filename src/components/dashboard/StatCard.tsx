type StatCardColor = "blue" | "orange" | "yellow" | "green";

interface StatCardProps {
  title: string;
  value: number;
  description: string;
  color: StatCardColor;
}

// Each color name maps to its own background and text colors.
const colorStyles: Record<StatCardColor, string> = {
  blue: "bg-blue-50 text-blue-700",
  orange: "bg-orange-50 text-orange-700",
  yellow: "bg-yellow-50 text-yellow-700",
  green: "bg-green-50 text-green-700",
};

export default function StatCard({
  title,
  value,
  description,
  color,
}: StatCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div
        className={`mb-5 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${colorStyles[color]}`}
      >
        {title}
      </div>

      <p className="text-3xl font-bold text-slate-900">{value}</p>

      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </article>
  );
}