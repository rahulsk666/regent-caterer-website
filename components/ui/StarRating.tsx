"use client";

import { useState } from "react";

const STAR_PATH =
  "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z";

function StarIcon({
  fill,
  // size = 20,
  classname,
}: {
  fill: "none" | "half" | "full";
  classname?: string;
}) {
  return (
    <div className={`relative ${classname}`}>
      <svg
        viewBox="0 0 24 24"
        width={20}
        height={20}
        className={`absolute inset-0 text-gray-200 ${classname}`}
      >
        <path d={STAR_PATH} fill="currentColor" />
      </svg>
      {fill !== "none" && (
        <svg
          viewBox="0 0 24 24"
          width={20}
          height={20}
          className={`absolute inset-0 text-yellow-400 ${classname}`}
          style={{ clipPath: fill === "half" ? "inset(0 50% 0 0)" : undefined }}
        >
          <path d={STAR_PATH} fill="currentColor" />
        </svg>
      )}
    </div>
  );
}

export function StarDisplay({
  rating,
  classname,
}: {
  rating: number;
  classname?: string;
}) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((k) => (
        <StarIcon
          key={k}
          classname={classname}
          fill={rating >= k ? "full" : rating >= k - 0.5 ? "half" : "none"}
        />
      ))}
    </div>
  );
}

export function StarRatingInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const displayed = hover ?? value;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((k) => (
        <div
          key={k}
          className="relative cursor-pointer md:w-8 md:h-8 w-4 h-4"
          onMouseLeave={() => setHover(null)}
        >
          <StarIcon
            classname="md:w-8 md:h-8 w-4 h-4"
            fill={
              displayed >= k ? "full" : displayed >= k - 0.5 ? "half" : "none"
            }
          />
          <div
            className="absolute left-0 top-0 h-full w-1/2"
            onMouseEnter={() => setHover(k - 0.5)}
            onClick={() => onChange(k - 0.5)}
          />
          <div
            className="absolute right-0 top-0 h-full w-1/2"
            onMouseEnter={() => setHover(k)}
            onClick={() => onChange(k)}
          />
        </div>
      ))}
      {displayed > 0 && (
        <span className="ml-1 text-sm font-medium text-slate-500">
          {displayed}/5
        </span>
      )}
    </div>
  );
}
