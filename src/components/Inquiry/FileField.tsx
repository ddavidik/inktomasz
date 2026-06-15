import type { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, MouseEvent, RefObject } from "react";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import site from "@content/site.json";

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

const handleKeyDown =
  (inputRef: RefObject<HTMLInputElement | null>) =>
  (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      inputRef.current?.click();
    }
  };

const handleClearAll =
  (clearAllFiles: () => void) =>
  (e: MouseEvent) => {
    e.stopPropagation();
    clearAllFiles();
  };

const handleRemoveFile =
  (removeFile: (i: number) => void, index: number) =>
  (e: MouseEvent) => {
    e.stopPropagation();
    removeFile(index);
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
  const [sizeError, setSizeError] = useState<string | null>(null);
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
    const oversized = newFiles.some((f) => f.size > 8_388_608);
    if (oversized) {
      setSizeError(site.fileField.sizeError);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    setSizeError(null);
    setFiles((prev) => {
      const next = multiple ? [...prev, ...newFiles] : newFiles.slice(0, 1);
      onChange?.(filesToFileList(next));
      return next;
    });
  };

  const removeFile = (index: number) => {
    setSizeError(null);
    setFiles((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      onChange?.(filesToFileList(updated));
      return updated;
    });
  };

  const clearAllFiles = () => {
    setSizeError(null);
    setFiles([]);
    onChange?.(filesToFileList([]));
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const buildAriaLabel = (): string => {
    const len = files.length;
    if (len === 0) return multiple ? site.fileField.ariaChooseFiles : site.fileField.ariaChooseFile;
    if (multiple) return site.fileField.ariaFiles.replace("{n}", String(len));
    return site.fileField.ariaOneFile;
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
        className={clsx(
          "flex flex-col gap-0.5 w-full bg-transparent serif-tight pt-1 text-lg text-(--bone-paper) outline-none placeholder:text-(--bone-fade) scheme:dark text-left px-0 cursor-pointer focus:outline-2 focus:outline-(--blood-bright)",
          className,
        )}
        onKeyDown={handleKeyDown(inputRef)}
        tabIndex={0}
        role="button"
        aria-label={buildAriaLabel()}
      >
        {files.length > 0 ? (
          <>
            {multiple && (
              <button
                type="button"
                onClick={handleClearAll(clearAllFiles)}
                className="mono mb-1 self-end text-[10px] text-(--bone-fade) hover:text-(--blood-bright) cursor-pointer"
                aria-label={site.fileField.clearAllAria}
              >
                {site.fileField.clearAllLabel}
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
                  onClick={handleRemoveFile(removeFile, i)}
                  className="mono text-base leading-none cursor-pointer text-(--bone-fade) hover:text-(--blood-bright)"
                  aria-label={site.fileField.clearAllAria.replace("all", file.name).replace("Clear ", "Remove ")}
                >
                  ×
                </button>
              </div>
            ))}
          </>
        ) : (
          <span className="text-(--bone-fade)">
            {multiple ? site.fileField.placeholderFiles : site.fileField.placeholderFile}
          </span>
        )}
      </div>
      {sizeError && <p className="mono mt-1 text-[10px] text-(--blood-bright)">{sizeError}</p>}
    </label>
  );
};
