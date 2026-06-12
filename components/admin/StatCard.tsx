interface StatCardProps {
  label: string;
  value: number;
  sub?: string;
  color: string;
}

export default function StatCard({ label, value, sub, color }: StatCardProps) {
  return (
    <div className={`rounded-3xl p-6 text-white ${color}`}>
      <p className="text-sm font-medium opacity-80">{label}</p>

      <p className="text-4xl font-bold mt-1">{value}</p>

      {sub && <p className="text-xs opacity-70 mt-1">{sub}</p>}
    </div>
  );
}
