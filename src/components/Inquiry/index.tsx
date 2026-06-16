import { useEffect, useRef } from "react";
import { Field } from "./Field";
import { Textarea } from "./Textarea";
import { FileField } from "./FileField";
import { CtaButton } from "~/components/CtaButton";
import { PricingTable } from "./PricingTable";
import { BookingInfo } from "./BookingInfo";
import { ContactLinks } from "./ContactLinks";
import { PrefillBanner } from "./PrefillBanner";
import { type Prefill } from "~/hooks/usePrefillIdea";
import { useInquiryForm } from "~/hooks/useInquiryForm";
import site from "@content/site.json";

type Props = {
  prefill: Prefill | null;
  onClearPrefill: () => void;
};

export const Inquiry = ({ prefill, onClearPrefill }: Props) => {
  const {
    idea,
    errors,
    status,
    hasAttempted,
    handleIdeaChange,
    handleFieldChange,
    handleSubmit,
    handleSendAnother,
  } = useInquiryForm(prefill, onClearPrefill);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (status !== "success") return;
    const el = formRef.current;
    if (!el) return;

    const id = setTimeout(() => {
      const rect = el.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY;
      const centered = absoluteTop - (window.innerHeight - rect.height) / 2;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({
        top: Math.max(0, centered),
        behavior: reducedMotion ? "instant" : "smooth",
      });
    }, 50);

    return () => clearTimeout(id);
  }, [status]);

  return (
    <section id="inquire" className="relative scroll-mt-16 py-28 md:py-40">
      <div className="mx-auto grid max-w-350 gap-16 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <p className="mono mb-6 text-(--blood-bright)">
            {site.inquiry.kickerRune} &nbsp; {site.inquiry.kickerLabel}
          </p>
          <h2 className="display text-5xl md:text-7xl">
            <span className="block leading-none">{site.inquiry.headingSegments[0]!.text}</span>
            <span className="block italic leading-none mt-1 md:mt-0">
              {site.inquiry.headingSegments[1]!.text}
            </span>
            <span className="block leading-none mt-1 md:-mt-1">
              {site.inquiry.headingSegments[2]!.text}
            </span>
          </h2>

          <PricingTable />
          <BookingInfo />

          <p className="serif-tight mt-8 max-w-md text-pretty text-xl text-(--bone-paper)">
            {site.inquiry.description}
          </p>
          <ContactLinks />
        </div>

        <form
          ref={formRef}
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
              <p className="mono text-(--blood-bright)">{site.inquiry.successKicker}</p>
              <p className="serif-tight text-pretty text-xl text-(--bone-paper)">
                {site.inquiry.successMessage}
              </p>
              <button
                type="button"
                onClick={handleSendAnother}
                className="mono self-start text-[11px] text-(--bone-fade) hover:text-(--blood-bright) cursor-pointer"
              >
                {site.inquiry.sendAnother}
              </button>
            </div>
          ) : (
            <>
              {prefill && <PrefillBanner prefill={prefill} onClear={onClearPrefill} />}

              <div className="grid gap-px bg-white/5 border border-white/5">
                <p className="hidden">
                  <label>
                    {site.inquiry.honeypotLabel} <input name="bot-field" type="text" />
                  </label>
                </p>

                <Field
                  label={site.inquiry.fieldName}
                  name="name"
                  error={errors.name}
                  onInput={handleFieldChange()}
                />

                <div className="bg-(--ink-stone) px-5 py-2">
                  <span className="mono block text-[9px] text-(--bone-fade)">
                    {site.inquiry.fieldContact}
                  </span>
                </div>
                <Field
                  label={site.inquiry.fieldEmail}
                  name="email"
                  type="email"
                  error={errors.email}
                  onInput={handleFieldChange()}
                />
                <Field
                  label={site.inquiry.fieldInstagram}
                  name="instagram"
                  placeholder={site.inquiry.fieldInstagramPlaceholder}
                  error={errors.instagram}
                  onInput={handleFieldChange()}
                />
                <div className="bg-(--ink-stone) px-5 py-2" />
                <Field label={site.inquiry.fieldPlacement} name="placement" />
                <Field
                  label={site.inquiry.fieldDate}
                  name="date"
                  placeholder={site.inquiry.fieldDatePlaceholder}
                />

                <Textarea
                  label={site.inquiry.fieldIdea}
                  value={idea}
                  onChange={handleIdeaChange}
                  name="idea"
                  error={errors.idea}
                  onInput={handleFieldChange()}
                />

                <Textarea label={site.inquiry.fieldReferences} rows={3} name="references" />
                <FileField label={site.inquiry.fieldFile} name="file" accept="image/*" />
              </div>

              {status === "error" && (
                <p className="mono mt-4 text-[11px] text-(--blood-bright)">
                  {site.inquiry.errorGeneric}
                </p>
              )}

              {hasAttempted && Object.keys(errors).length > 0 && (
                <p className="mono mt-4 text-[11px] text-(--blood-bright)">
                  {site.inquiry.validationSummary}
                </p>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <CtaButton
                  type="submit"
                  disabled={status === "submitting"}
                  showArrow={status !== "submitting"}
                  className="px-7 py-4"
                >
                  {status === "submitting" ? site.inquiry.submitLoading : site.inquiry.submitLabel}
                </CtaButton>
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  );
};
