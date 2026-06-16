import { useEffect, useState, type ChangeEvent, type InputEvent, type SubmitEvent } from "react";
import { type Prefill } from "~/hooks/usePrefillIdea";
import { inquirySchema } from "~/utils/inquirySchema";
import site from "@content/site.json";

type InlineErrors = Record<string, string>;

const buildFormValues = (formData: FormData): Record<string, string> => {
  const values: Record<string, string> = {};
  formData.forEach((v, k) => {
    if (typeof v === "string") values[k] = v.trim();
  });
  return values;
};

const extractErrors = (result: ReturnType<typeof inquirySchema.safeParse>): InlineErrors => {
  if (result.success) return {};
  const next: InlineErrors = {};
  const contactMsg = site.inquiry.validationContact;
  let hasContactError = false;

  for (const issue of result.error.issues) {
    const path = issue.path[0] as string;
    if (!next[path]) next[path] = issue.message;
    if (issue.message === contactMsg) hasContactError = true;
  }

  if (hasContactError) {
    next.email = contactMsg;
    next.instagram = contactMsg;
  }

  return next;
};

export const useInquiryForm = (prefill: Prefill | null, onClearPrefill: () => void) => {
  const [idea, setIdea] = useState("");
  const [errors, setErrors] = useState<InlineErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [hasAttempted, setHasAttempted] = useState(false);

  useEffect(() => {
    if (prefill) setIdea(`Wanna-do: ${prefill.title}\n\n`);
    else setIdea("");
  }, [prefill]);

  const handleIdeaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (prefill) {
      const prefix = `Wanna-do: ${prefill.title}\n\n`;
      if (!val.startsWith(prefix)) {
        setIdea(prefix);
        return;
      }
    }
    setIdea(val);
  };

  const handleFieldChange = () => (e: InputEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!hasAttempted) return;
    const form = e.currentTarget.form;
    if (!form) return;
    const formData = new FormData(form);
    const values = buildFormValues(formData);
    const result = inquirySchema.safeParse(values);
    if (result.success) {
      setErrors({});
      return;
    }
    const next = extractErrors(result);
    setErrors(next);
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const values = buildFormValues(formData);

    const result = inquirySchema.safeParse(values);
    if (!result.success) {
      setErrors(extractErrors(result));
      setHasAttempted(true);
      return;
    }

    setErrors({});
    setHasAttempted(true);
    setStatus("submitting");

    const form = e.currentTarget;

    fetch("/", { method: "POST", body: formData })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setStatus("success");
        requestAnimationFrame(() => {
          form.scrollIntoView({ behavior: "smooth", block: "center" });
        });
      })
      .catch(() => setStatus("error"));
  };

  const handleSendAnother = () => {
    setStatus("idle");
    setIdea("");
    setErrors({});
    setHasAttempted(false);
    onClearPrefill();
  };

  return {
    idea,
    errors,
    status,
    hasAttempted,
    handleIdeaChange,
    handleFieldChange,
    handleSubmit,
    handleSendAnother,
  };
};

export type { InlineErrors };
