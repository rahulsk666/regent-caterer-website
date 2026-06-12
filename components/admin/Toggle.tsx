interface ToggleProps {
  value: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}

export default function Toggle({ value, onChange, disabled }: ToggleProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange(!value)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
        disabled
          ? "bg-slate-400 opacity-50 cursor-not-allowed"
          : value
            ? "bg-emerald-500"
            : "bg-slate-200"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform duration-200 ${
          value ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}
