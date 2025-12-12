export default function Stats() {
  return (
    <section className="py-20 border-y border-white/10 bg-[#1c1c1c]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          <StatItem value="20hrs" label="Saved per week" />
          <StatItem value="3x" label="Faster growth" />
          <StatItem value="100%" label="Consistent posting" />
        </div>
      </div>
    </section>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="p-4">
      <div className="text-5xl font-bold text-[#3ECF8E] mb-2">{value}</div>
      <div className="text-gray-400 font-medium">{label}</div>
    </div>
  );
}
