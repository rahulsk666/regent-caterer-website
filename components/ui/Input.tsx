import { cn } from "@/lib/utils";
import * as React from "react";

// ─── Shared label + wrapper ───────────────────────────────────────────────────

interface FieldWrapperProps {
  label?: string;
  required?: boolean;
  error?: string;
  htmlFor?: string;
  children: React.ReactNode;
  hideUnderline?: boolean;
}

function FieldWrapper({
  label,
  required,
  error,
  htmlFor,
  children,
  hideUnderline,
}: FieldWrapperProps) {
  return (
    <div className="group relative w-full">
      {label && (
        <label
          htmlFor={htmlFor}
          className="mb-1 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground-primary font-poppins"
        >
          <span>{label}</span>
          {required && (
            <span className="text-foreground-primary/50 text-xs">✦</span>
          )}
        </label>
      )}

      <div className="relative">
        {children}

        {/* Bottom border + animated focus line */}
        {!hideUnderline && (
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute bottom-0 left-0 h-px w-full",
              "bg-dark-200",
              "after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-foreground-primary",
              "after:transition-[width] after:duration-300 after:ease-out",
              "group-focus-within:after:w-full",
              error && "bg-red-400/60",
            )}
          />
        )}
      </div>

      {error && (
        <p className="mt-1.5 text-[11px] tracking-wide text-red-500/80 font-poppins">
          {error}
        </p>
      )}
    </div>
  );
}

// Shared field styles
const fieldBaseStyles = cn(
  "w-full bg-transparent outline-none",
  "text-sm font-light tracking-wide text-foreground-primary font-medium font-poppins",
  "placeholder:text-foreground-primary/50",
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40",
);

// ─── Text / number / email / etc. input ──────────────────────────────────────

interface UnderlineInputProps extends React.ComponentProps<"input"> {
  label?: string;
  required?: boolean;
  error?: string;
}

function UnderlineInput({
  className,
  type,
  label,
  required,
  error,
  id,
  ...props
}: UnderlineInputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <FieldWrapper
      label={label}
      required={required}
      error={error}
      htmlFor={inputId}
    >
      <input
        id={inputId}
        type={type}
        required={required}
        data-slot="underline-input"
        className={cn(
          fieldBaseStyles,
          "pb-2 pr-1 min-w-0 border-none",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground-primary",
          className,
        )}
        {...props}
      />
    </FieldWrapper>
  );
}

// ─── Select input ─────────────────────────────────────────────────────────────

interface SelectOption {
  value: string;
  label: string;
}

interface UnderlineSelectProps extends React.ComponentProps<"select"> {
  label?: string;
  required?: boolean;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

function UnderlineSelect({
  className,
  label,
  required,
  error,
  id,
  options,
  placeholder,
  value,
  defaultValue,
  ...props
}: UnderlineSelectProps) {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  const hasValue = value !== undefined ? !!value : !!defaultValue;

  return (
    <FieldWrapper
      label={label}
      required={required}
      error={error}
      htmlFor={selectId}
    >
      <div className="relative pb-2">
        <select
          id={selectId}
          required={required}
          value={value}
          // defaultValue={defaultValue ?? ""}
          data-slot="underline-select"
          className={cn(
            fieldBaseStyles,
            "w-full appearance-none pr-6 cursor-pointer border-none",
            !hasValue && !value && "text-foreground-primary/50",
            className,
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className="bg-background-elevated text-foreground-primary"
            >
              {opt.label}
            </option>
          ))}
        </select>

        {/* Custom chevron icon */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 flex h-full items-center text-foreground-primary/40"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.5 4.5L6 8L9.5 4.5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </FieldWrapper>
  );
}

// ─── Textarea ─────────────────────────────────────────────────────────────────

interface UnderlineTextareaProps extends React.ComponentProps<"textarea"> {
  label?: string;
  required?: boolean;
  error?: string;
  /** Number of visible rows. Defaults to 4 */
  rows?: number;
  /** Allow manual resize. Defaults to "none" */
  resize?: "none" | "vertical" | "horizontal" | "both";
}

function UnderlineTextarea({
  className,
  label,
  required,
  error,
  id,
  rows = 4,
  resize = "none",
  ...props
}: UnderlineTextareaProps) {
  const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  const resizeClass = {
    none: "resize-none",
    vertical: "resize-y",
    horizontal: "resize-x",
    both: "resize",
  }[resize];

  return (
    <FieldWrapper
      label={label}
      required={required}
      error={error}
      htmlFor={textareaId}
      hideUnderline
    >
      <textarea
        id={textareaId}
        required={required}
        rows={rows}
        data-slot="underline-textarea"
        className={cn(
          fieldBaseStyles,
          resizeClass,
          "pt-1 pb-3 pr-1 leading-relaxed",
          "border! border-dark-100! rounded-sm px-3",
          "focus:border-foreground-primary/70!",
          "transition-colors duration-300",
          "no-scrollbar",
          className,
        )}
        {...props}
      />
    </FieldWrapper>
  );
}

// ─── Exports ──────────────────────────────────────────────────────────────────

export { UnderlineInput, UnderlineSelect, UnderlineTextarea };
export type {
  UnderlineInputProps,
  UnderlineSelectProps,
  UnderlineTextareaProps,
  SelectOption,
};
