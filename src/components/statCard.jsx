
export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
  color,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#1f2937] p-5 transition hover:-translate-y-1 hover:border-violet-500/40">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">
          {title}
        </p>

        <div className={`rounded-xl p-3 ${color}`}>
          <Icon size={21} />
        </div>
      </div>

      <h3 className="mt-5 text-3xl font-bold text-white">
        {value}
      </h3>

      <p className="mt-2 text-xs text-gray-500">
        {description}
      </p>
    </div>
  );
}
