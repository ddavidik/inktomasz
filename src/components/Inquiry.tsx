import { useEffect, useState } from "react";
import site from "@content/site.json";

type Prefill = { id: string; title: string };

export const Inquiry = () => {
  const [name, setName] = useState("");
  const [idea, setIdea] = useState("");
  const [placement, setPlacement] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [references, setReferences] = useState("");
  const [prefill, setPrefill] = useState<Prefill | null>(null);
  const [isCopied, setIsCopied] = useState(false);

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

  const body = [
    `Name: ${name}`,
    `Placement: ${placement}`,
    `Preferred date: ${preferredDate}`,
    prefill ? `Wanna-do: ${prefill.title} (${prefill.id})` : "",
    "",
    "Idea:",
    idea,
    "",
    "Reference links:",
    references,
  ]
    .filter(Boolean)
    .join("\n");

  const mailto = (() => {
    const url = new URL(`mailto:${site.artist.email}`);
    const subject = prefill
      ? `Wanna-do inquiry — ${prefill.title}`
      : `Tattoo inquiry — ${name || "new"}`;
    url.searchParams.set("subject", subject);
    url.searchParams.set("body", body);

    return url.toString().replace(/\+/g, "%20");
  })();

  const handleCopy = () => {
    navigator.clipboard.writeText(body);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1800);
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
            The form below opens your email client with everything pre-filled. Prefer Instagram? DM
            works too.
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
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = mailto;
          }}
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
            <Field label="Your name" value={name} onChange={setName} />
            <Field label="Placement (arm, ribs, calf…)" value={placement} onChange={setPlacement} />
            <Field
              label="Preferred date"
              type="date"
              value={preferredDate}
              onChange={setPreferredDate}
            />
            <Textarea
              label="Describe the idea — story, mood, references"
              value={idea}
              onChange={setIdea}
            />
            <Textarea
              label="Reference links (Instagram, Pinterest, etc.)"
              value={references}
              onChange={setReferences}
              rows={3}
            />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="mono group inline-flex items-center gap-3 border border-(--bone-paper)/30 px-7 py-4 text-(--bone-paper) transition-colors hover:border-(--blood-bright) hover:text-(--blood-bright)"
            >
              Open in email
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="mono border border-(--bone-paper)/20 px-7 py-4 text-(--bone-fade) transition-colors hover:border-(--bone-paper)/40 hover:text-(--bone-paper)"
            >
              {isCopied ? "copied" : "Copy"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

const Field = ({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) => (
  <label className="block bg-(--ink-iron) px-5 pt-4 pb-3 focus-within:bg-(--ink-stone)">
    <span className="mono block text-[10px] text-(--bone-fade)">{label}</span>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="block w-full bg-transparent serif-tight pt-1 text-lg text-(--bone-paper) outline-none placeholder:text-(--bone-fade) scheme:dark"
    />
  </label>
);

const Textarea = ({
  label,
  value,
  onChange,
  rows = 5,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) => (
  <label className="block bg-(--ink-iron) px-5 pt-4 pb-3 focus-within:bg-(--ink-stone)">
    <span className="mono block text-[10px] text-(--bone-fade)">{label}</span>
    <textarea
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="block w-full resize-none bg-transparent serif-tight pt-1 text-lg text-(--bone-paper) outline-none placeholder:text-(--bone-fade)"
    />
  </label>
);
