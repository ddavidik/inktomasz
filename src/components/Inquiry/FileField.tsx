import type { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from "react";
import { useState, useRef, useEffect } from "react";

type Props = {
  label: string;
  accept?: string;
  multiple?: boolean;
  onChange?: (files: FileList) => void;
  className?: string;
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "onChange" | "type"
>;

const filesToFileList = (files: File[]): FileList => {
  const dt = new DataTransfer();
  files.forEach((file) => dt.items.add(file));
  return dt.files;
};

export const FileField = ({
  label,
  accept,
  multiple = false,
  onChange,
  className,
  ...props
}: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      const dt = new DataTransfer();
      files.forEach((file) => dt.items.add(file));
      inputRef.current.files = dt.files;
    }
  }, [files]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files ?? []);
    setFiles((prev) => {
      const next = multiple ? [...prev, ...newFiles] : newFiles.slice(0, 1);
      onChange?.(filesToFileList(next));
      return next;
    });
  };

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      onChange?.(filesToFileList(updated));
      return updated;
    });
  };

  const clearAllFiles = () => {
    setFiles([]);
    onChange?.(filesToFileList([]));
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <label className="block bg-(--ink-iron) px-5 pt-4 pb-3 focus-within:bg-(--ink-stone) cursor-pointer">
      <span className="mono block text-[10px] text-(--bone-fade)">{label}</span>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="sr-only"
        {...props}
      />
      <div
        className={`flex flex-col gap-0.5 w-full bg-transparent serif-tight pt-1 text-lg text-(--bone-paper) outline-none placeholder:text-(--bone-fade) scheme:dark text-left px-0 cursor-pointer focus:outline-2 focus:outline-(--blood-bright) ${className ?? ""}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={
          files.length > 0
            ? multiple
              ? `${files.length} files selected`
              : (files[0]?.name ?? "1 file selected")
            : multiple
              ? "Choose files"
              : "Choose a file"
        }
      >
        {files.length > 0 ? (
          <>
            {multiple && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  clearAllFiles();
                }}
                className="mono mb-1 self-end text-[10px] text-(--bone-fade) hover:text-(--blood-bright) cursor-pointer"
                aria-label="Clear all files"
              >
                Clear all
              </button>
            )}
            {files.map((file, i) => (
              <div
                key={`${file.name}-${file.lastModified}-${i}`}
                className="flex items-center justify-between gap-2"
              >
                <span className="truncate">{file.name}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(i);
                  }}
                  className="mono text-base leading-none cursor-pointer text-(--bone-fade) hover:text-(--blood-bright)"
                  aria-label={`Remove ${file.name}`}
                >
                  ×
                </button>
              </div>
            ))}
          </>
        ) : (
          <span className="text-(--bone-fade)">{multiple ? "Choose files…" : "Choose a file…"}</span>
        )}
      </div>
    </label>
  );
};
