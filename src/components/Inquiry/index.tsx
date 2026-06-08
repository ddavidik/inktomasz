import { useEffect, useState, type ChangeEvent } from "react";
import site from "@content/site.json";
import { Field } from "./Field";
import { Textarea } from "./Textarea";
import { FileField } from "./FileField";

type Prefill = { id: string; title: string };

export const Inquiry = () => {
  const [idea, setIdea] = useState("");
  const [prefill, setPrefill] = useState<Prefill | null>(null);

  // Consume wanna-do prefill: either set just-now via custom event,
  // or persisted in sessionStorage (e.g. on first load after click).
  useEffect(() => {
    if (typeof window === "undefined") return;

    const apply = (p: Prefill) => {
      setPrefill(p);
      setIdea((prev) => (prev.trim() ? prev : `Wanna-do: ${p.title} (${p.id})\n\n`));
    };

    try {
      const raw = window.sessionStorage.getItem("inktomasz:idea");
      if (raw) apply(JSON.parse(raw) as Prefill);
    } catch {
      /* ignore */
    }

    const onPrefill = (e: Event) => {
      const detail = (e as CustomEvent<Prefill>).detail;
      if (detail?.id) apply(detail);
    };
    window.addEventListener("inktomasz:prefill-idea", onPrefill);

    return () => {
      window.removeEventListener("inktomasz:prefill-idea", onPrefill);
    };
  }, []);

  const clearPrefill = () => {
    setPrefill(null);
    setIdea("");
    try {
      window.sessionStorage.removeItem("inktomasz:idea");
    } catch {
      /* ignore */
    }
  };

  const handleIdeaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setIdea(e.target.value);

    if (e.target.value === "") setPrefill(null);
  };

  const igDM = `${site.artist.instagram.replace(/\/$/, "")}/`;

  return (
    <section
      id="inquire"
      className="relative border-t border-white/5 bg-(--ink-pitch) py-28 md:py-40"
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
          <p className="serif-tight mt-8 max-w-md text-pretty text-xl text-(--bone-warm)">
            Form submits to email. Prefer Instagram? DM works too.
          </p>
          <div className="mt-10 flex flex-col gap-3">
            <a
              href={igDM}
              target="_blank"
              rel="noreferrer"
              className="mono group inline-flex items-center gap-3 text-(--bone-paper) link-underline"
            >
              <span aria-hidden>→</span> @{site.artist.handle} on Instagram
            </a>
            <a
              href={`mailto:${site.artist.email}`}
              className="mono group inline-flex items-center gap-3 text-(--bone-paper) link-underline"
            >
              <span aria-hidden>→</span> {site.artist.email}
            </a>
          </div>
        </div>

        <form
          className="md:col-span-7"
          netlify-honeypot="bot-field"
          data-netlify="true"
          name="inquiry"
          encType="multipart/form-data"
        >
          {prefill && (
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border border-(--blood-bright)/40 bg-(--blood-bright)/5 px-4 py-3">
              <div className="mono text-[11px] text-(--bone-paper)">
                Claiming <span className="text-(--blood-bright)">{prefill.title}</span> ·{" "}
                {prefill.id}
              </div>
              <button
                type="button"
                onClick={clearPrefill}
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
            <Field label="Your name" name="name" />
            <Field label="Placement (arm, ribs, calf…)" name="placement" />
            <Field label="Preferred date" type="date" name="date" />
            <Textarea
              label="Describe the idea — story, mood, references"
              value={idea}
              onChange={handleIdeaChange}
              name="idea"
            />
            <Textarea
              label="Reference links (Instagram, Pinterest, etc.)"
              rows={3}
              name="references"
            />
            <FileField label="Reference images" name="file" accept="image/*" multiple />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="mono group inline-flex items-center gap-3 border border-(--bone-paper)/30 px-7 py-4 text-(--bone-paper) transition-colors hover:border-(--blood-bright) hover:text-(--blood-bright) cursor-pointer"
            >
              Send inquiry
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
