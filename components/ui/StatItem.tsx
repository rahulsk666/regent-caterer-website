type StatItemProps = {
  label: string;
  value: string;
  classname?: string;
};

export default function StatItem({ label, value, classname }: StatItemProps) {
  return (
    <div className={`flex flex-col ${classname}`}>
      <p className="font-red-hat-display text-xl">{label}</p>
      <p className="font-red-hat-display text-6xl">{value}</p>
    </div>
  );
}
