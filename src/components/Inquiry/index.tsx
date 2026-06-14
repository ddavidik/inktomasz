import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Field } from "./Field";
import { Textarea } from "./Textarea";
import { FileField } from "./FileField";
import { CtaButton } from "~/components/CtaButton";
import { PricingTable } from "./PricingTable";
import { BookingInfo } from "./BookingInfo";
import { ContactLinks } from "./ContactLinks";
import { type Prefill } from "~/lib/use-prefill-idea";
import { inquirySchema } from "~/lib/inquiry-schema";

type Props = {
  prefill: Prefill | null;
  onClearPrefill: () => void;
};

type InlineErrors = Record<string, string>;

export const Inquiry = ({ prefill, onClearPrefill }: Props) => {
  const [idea, setIdea] = useState("");
  const [errors, setErrors] = useState<InlineErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

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
    const contactMsg = "Provide your email or Instagram — at least one is required.";
    let hasContactError = false;

    for (const issue of result.error.issues) {
      const path = issue.path[0] as string;
      // Skip duplicate: only set first error for each path
      if (!next[path]) next[path] = issue.message;
      if (issue.message === contactMsg) hasContactError = true;
    }

    // Spread contact error to both email + instagram
    if (hasContactError) {
      next.email = contactMsg;
      next.instagram = contactMsg;
    }

    return next;
  };

  const handleFieldChange = (_fieldName: string) => (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const values = buildFormValues(formData);

    const result = inquirySchema.safeParse(values);
    if (!result.success) {
      setErrors(extractErrors(result));
      return;
    }

    setErrors({});
    setStatus("submitting");

    fetch("/", { method: "POST", body: formData })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  };

  const handleSendAnother = () => {
    setStatus("idle");
    setIdea("");
    setErrors({});
    onClearPrefill();
  };

  return (
    <section
      id="inquire"
      className="relative scroll-mt-20 border-t border-white/5 bg-(--ink-pitch) py-28 md:py-40"
    >
      <div className="mx-auto grid max-w-350 gap-16 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <p className="mono mb-6 text-(--blood-bright)">ᛒ &nbsp; Inquire</p>
          <h2 className="display text-5xl leading-[0.95] md:text-7xl">
            Tell me
            <br />
            <span className="italic">the story</span>
            <br />
            first.
          </h2>

          <PricingTable />
          <BookingInfo />

          <p className="serif-tight mt-8 max-w-md text-pretty text-xl text-(--bone-warm)">
            Every piece starts with a conversation — describe the idea, placement, and what it means
            to you. I'll be back within a few days.
          </p>
          <ContactLinks />
        </div>

        <form
          className="md:col-span-7"
          netlify-honeypot="bot-field"
          data-netlify="true"
          name="inquiry"
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="inquiry" />

          {status === "success" ? (
            <div className="flex flex-col gap-6 border border-white/5 bg-(--ink-iron) px-8 py-12">
              <p className="mono text-(--blood-bright)">ᛒ &nbsp; Sent</p>
              <p className="serif-tight text-pretty text-xl text-(--bone-warm)">
                Message received. I'll be in touch.
              </p>
              <button
                type="button"
                onClick={handleSendAnother}
                className="mono self-start text-[11px] text-(--bone-fade) hover:text-(--bone-paper) cursor-pointer"
              >
                Send another
              </button>
            </div>
          ) : (
            <>
              {prefill && (
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border border-(--blood-bright)/40 bg-(--blood-bright)/5 px-4 py-3">
                  <div className="mono text-[11px] text-(--bone-paper)">
                    Claiming <span className="text-(--blood-bright)">{prefill.title}</span>
                  </div>
                  <button
                    type="button"
                    onClick={onClearPrefill}
                    className="mono text-[10px] text-(--bone-fade) hover:text-(--bone-paper)"
                  >
                    clear
                  </button>
                </div>
              )}

              <div className="grid gap-px bg-white/5 border border-white/5">
                <p className="hidden">
                  <label>
                    Don't fill this out if you're human: <input name="bot-field" type="text" />
                  </label>
                </p>

                <Field
                  label="Your name *"
                  name="name"
                  error={errors.name}
                  onInput={handleFieldChange("name")}
                />

                <Field
                  label="Your email (required if no Instagram)"
                  name="email"
                  type="email"
                  error={errors.email}
                  onInput={handleFieldChange("email")}
                />
                <Field
                  label="Your Instagram (required if no email)"
                  name="instagram"
                  placeholder="@inktomasz"
                  error={errors.instagram}
                  onInput={handleFieldChange("instagram")}
                />

                <Field label="Placement (arm, ribs, calf…)" name="placement" />
                <Field label="Preferred date" name="date" placeholder="e.g. June 2025" />

                <Textarea
                  label="Describe the idea — story, mood, references *"
                  value={idea}
                  onChange={handleIdeaChange}
                  name="idea"
                  error={errors.idea}
                  onInput={handleFieldChange("idea")}
                />

                <Textarea
                  label="Reference links (Instagram, Pinterest, etc.)"
                  rows={3}
                  name="references"
                />
                <FileField label="Reference image (max 8 MB)" name="file" accept="image/*" />
              </div>

              {status === "error" && (
                <p className="mono mt-4 text-[11px] text-(--blood-bright)">
                  Something went wrong — try again or email directly.
                </p>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <CtaButton
                  type="submit"
                  disabled={status === "submitting"}
                  showArrow={status !== "submitting"}
                  className="px-7 py-4"
                >
                  {status === "submitting" ? "Sending…" : "Send inquiry"}
                </CtaButton>
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  );
};
