type StatItemProps = {
  label: string;
  value: string;
  classname?: string;
};

export default function StatItem({ label, value, classname }: StatItemProps) {
  return (
    <div className={`flex flex-col text-foreground-golden ${classname}`}>
      <p className="font-red-hat-display lg:text-xl md:text-xl text-base">
        {label}
      </p>
      <p className="font-red-hat-display lg:text-6xl md:text-5xl text-3xl">
        {value}
      </p>
    </div>
  );
}
