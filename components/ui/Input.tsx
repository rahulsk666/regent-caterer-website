import { cn } from "@/lib/utils";
import * as React from "react";
import { StarRatingInput } from "./StarRating";
import Image from "next/image";

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
  rows?: number;
  resize?: "none" | "vertical" | "horizontal" | "both";
  variant?: "outlined" | "plain";
}

function UnderlineTextarea({
  className,
  label,
  required,
  error,
  id,
  rows = 4,
  resize = "none",
  variant = "outlined",
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
      hideUnderline={variant === "outlined"}
    >
      <textarea
        id={textareaId}
        required={required}
        rows={rows}
        data-slot="underline-textarea"
        className={cn(
          fieldBaseStyles,
          resizeClass,
          "mt-1 pt-1 pb-3 pr-1 leading-relaxed no-scrollbar",
          variant === "outlined" && [
            "border border-dark-100 rounded-sm px-3",
            "focus:border-foreground-primary/70",
            "transition-colors duration-300",
          ],
          variant === "plain" && [
            "border-none rounded-none px-0",
            "focus:border-none focus:outline-none",
          ],
          className,
        )}
        {...props}
      />
    </FieldWrapper>
  );
}

interface UnderlineRatingProps {
  label?: string;
  required?: boolean;
  error?: string;
  value: number;
  size?: number;
  onChange: (value: number) => void;
}

function UnderlineRating({
  label,
  required,
  error,
  value,
  size,
  onChange,
}: UnderlineRatingProps) {
  return (
    <FieldWrapper label={label} required={required} error={error} hideUnderline>
      <div className="pt-1 pb-2">
        <StarRatingInput value={value} onChange={onChange} size={size} />
      </div>
    </FieldWrapper>
  );
}

// ─── File upload ──────────────────────────────────────────────────────────────

interface UnderlineFileUploadProps extends Omit<
  React.ComponentProps<"input">,
  "type"
> {
  label?: string;
  required?: boolean;
  error?: string;
  /** URL of an already-saved image (e.g. when editing an existing record) */
  existingImage?: string;
  existingImageName?: string;
  /** Called when the user clears the existing image */
  onClearExisting?: () => void;
  resetTrigger?: number;
}

function UnderlineFileUpload({
  className,
  label,
  required,
  error,
  id,
  multiple,
  onChange,
  existingImage,
  existingImageName,
  onClearExisting,
  ...props
}: UnderlineFileUploadProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [files, setFiles] = React.useState<File[]>([]);

  // If the parent resets existingImage to undefined, also clear local files
  React.useEffect(() => {
    if (!existingImage) {
      setFiles([]);
      if (inputRef.current) inputRef.current.value = "";
    }
  }, [existingImage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files ?? []);
    setFiles(selectedFiles);
    onChange?.(e);
  };

  const handleRemoveNew = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);

    if (inputRef.current) {
      const dt = new DataTransfer();
      updated.forEach((f) => dt.items.add(f));
      inputRef.current.files = dt.files;
      // Notify react-hook-form / parent onChange
      inputRef.current.dispatchEvent(new Event("change", { bubbles: true }));
    }
  };

  const handleClearExisting = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClearExisting?.();
  };

  const showExisting = !!existingImage && files.length === 0;
  const hasFiles = files.length > 0;
  const isEmpty = !showExisting && !hasFiles;
  const existingFileName = existingImageName
    ? existingImageName
    : existingImage?.split("/").pop();

  return (
    <FieldWrapper
      label={label}
      required={required}
      error={error}
      htmlFor={inputId}
      hideUnderline
    >
      <label
        htmlFor={inputId}
        className={cn(
          "mt-1 flex w-full cursor-pointer flex-col items-center justify-center gap-2",
          "rounded-sm border border-dark-100",
          "transition-colors duration-300",
          "hover:border-foreground-primary/70",
          "focus-within:border-foreground-primary/70",
          isEmpty ? "min-h-28" : "p-3",
          className,
        )}
      >
        {/* ── Empty state ── */}
        {isEmpty && (
          <>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-foreground-primary/60"
            >
              <path
                d="M12 16V4M12 4L7 9M12 4L17 9M5 20H19"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="text-center">
              <p className="text-sm font-medium font-poppins">
                Upload file{multiple ? "s" : ""}
              </p>
              <p className="text-xs text-foreground-primary/50">
                Click to browse
              </p>
            </div>
          </>
        )}

        {/* ── Existing saved image ── */}
        {showExisting && (
          <div className="w-full space-y-2">
            <FileRow
              preview={existingImage}
              name={existingFileName ?? "Current image"}
              onRemove={handleClearExisting}
            />
            <ReplaceHint />
          </div>
        )}

        {/* ── Newly selected files ── */}
        {hasFiles && (
          <div className="w-full space-y-2">
            {files.map((file, i) => (
              <FileRow
                key={i}
                preview={
                  file.type.startsWith("image/")
                    ? URL.createObjectURL(file)
                    : undefined
                }
                name={file.name}
                meta={`${(file.size / 1024).toFixed(0)} KB`}
                onRemove={(e) => handleRemoveNew(i, e)}
              />
            ))}

            {multiple && (
              <div className="flex items-center justify-center gap-1.5 py-1 text-xs text-foreground-primary/50 hover:text-foreground-primary transition-colors">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                Add more
              </div>
            )}
          </div>
        )}

        <input
          ref={inputRef}
          id={inputId}
          type="file"
          required={required && !showExisting}
          multiple={multiple}
          className="hidden"
          onChange={handleChange}
          {...props}
        />
      </label>
    </FieldWrapper>
  );
}

// ─── Small helpers ────────────────────────────────────────────────────────────

interface FileRowProps {
  preview?: string;
  name: string;
  meta?: string;
  onRemove: (e: React.MouseEvent) => void;
  disabled?: boolean;
}

function FileRow({ preview, name, meta, onRemove, disabled }: FileRowProps) {
  return (
    <div className="flex items-center gap-3 rounded-sm border border-dark-100 bg-background-elevated px-3 py-2">
      {preview ? (
        <Image
          src={preview}
          alt={name}
          width={10}
          height={10}
          className="h-10 w-10 rounded-sm object-cover shrink-0"
        />
      ) : (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-dark-100">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <polyline
              points="14 2 14 8 20 8"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium font-poppins">{name}</p>
        {meta && <p className="text-xs text-foreground-primary/50">{meta}</p>}
      </div>

      <button
        type="button"
        disabled={disabled}
        onClick={onRemove}
        className="shrink-0 rounded-full p-1 text-foreground-primary/40 hover:bg-dark-100 hover:text-foreground-primary transition-colors"
        aria-label="Remove file"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M18 6L6 18M6 6l12 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}

function ReplaceHint() {
  return (
    <p className="text-center text-xs text-foreground-primary/40 py-0.5">
      Click to replace
    </p>
  );
}

// ─── Exports ──────────────────────────────────────────────────────────────────

export {
  UnderlineInput,
  UnderlineSelect,
  UnderlineTextarea,
  UnderlineRating,
  UnderlineFileUpload,
};
export type {
  UnderlineInputProps,
  UnderlineSelectProps,
  UnderlineTextareaProps,
  UnderlineRatingProps,
  UnderlineFileUploadProps,
  SelectOption,
};
