export default function SinceBadge() {
  return (
    <svg
      viewBox="0 0 155 72"
      className="w-[180px] h-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M97.0033 5.80487C-1.49671 11.8049 0.503295 33.8049 0.503289 46.3049C9.50329 75.3049 134.503 83.8049 154.503 46.3049C154.503 27.8049 131.003 15.8049 97.0033 11.8049C63.0033 7.80487 57.8366 2.47154 59.5033 0.304871"
        stroke="url(#gold)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <text
        x="77.5"
        y="45"
        textAnchor="middle"
        fill="var(--color-dark-500)"
        fontSize="24"
        fontFamily="var(--font-caveat)"
      >
        - Since: 1981
      </text>

      <defs>
        <linearGradient
          id="gold"
          x1="0"
          y1="36"
          x2="155"
          y2="36"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--color-golden-500)" />
          <stop offset="0.5" stopColor="var(--color-golden-400)" />
          <stop offset="1" stopColor="var(--color-golden-500)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
