"use client";

import { IconChevronDown } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface GalleryCategoryDropdownProps {
  categories: { key: string; label: string }[];
  activeType: string;
}

export default function GalleryCategoryDropdown({
  categories,
  activeType,
}: GalleryCategoryDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeLabel =
    categories.find((item) => item.key === activeType)?.label ??
    "All Gallery";

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative lg:hidden mb-8">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-2xl border border-border bg-background-elevated px-5 py-4 shadow-sm"
      >
        <span className="font-medium text-foreground">{activeLabel}</span>
        <IconChevronDown
          size={20}
          className={`text-golden-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
          {categories.map((item) => {
            const isActive = item.key === activeType;

            return (
              <Link
                key={item.key}
                href={`/gallery/${item.key}`}
                onClick={() => setOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center justify-between px-5 py-4 transition-colors duration-200 ${
                  isActive
                    ? "bg-golden-500 text-white"
                    : "bg-white hover:bg-golden-50 text-foreground"
                }`}
              >
                <span className="font-medium">{item.label}</span>
                <span
                  className={isActive ? "text-white" : "text-golden-500"}
                >
                  →
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
