import { useState } from "react";
import site from "@content/site.json";

export function Inquiry() {
  const [name, setName] = useState("");
  const [idea, setIdea] = useState("");
  const [placement, setPlacement] = useState("");
  const [size, setSize] = useState("");
  const [references, setReferences] = useState("");

  const mailto = (() => {
    const body = [
      `Name: ${name}`,
      `Placement: ${placement}`,
      `Approx. size: ${size}`,
      "",
      "Idea:",
      idea,
      "",
      "Reference links:",
      references,
    ].join("\n");
    const url = new URL(`mailto:${site.artist.email}`);
    url.searchParams.set("subject", `Tattoo inquiry — ${name || "new"}`);
    url.searchParams.set("body", body);
    return url.toString().replace(/\+/g, "%20");
  })();

  const igDM = `${site.artist.instagram.replace(/\/$/, "")}/`;

  return (
    <section
      id="inquire"
      className="relative border-t border-white/5 bg-[color:var(--ink-pitch)] py-28 md:py-40"
    >
      <div className="mx-auto grid max-w-[1400px] gap-16 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <p className="mono mb-6 text-[color:var(--blood-bright)]">
            ᛒ &nbsp; Inquire
          </p>
          <h2 className="display text-5xl leading-[0.95] md:text-7xl">
            Tell me
            <br />
            <span className="italic">the story</span>
            <br />
            first.
          </h2>
          <p className="serif-tight mt-8 max-w-md text-pretty text-xl text-[color:var(--bone-warm)]">
            The form below opens your email client with everything pre-filled.
            Prefer Instagram? DM works too.
          </p>
          <div className="mt-10 flex flex-col gap-3">
            <a
              href={igDM}
              target="_blank"
              rel="noreferrer"
              className="mono group inline-flex items-center gap-3 text-[color:var(--bone-paper)] link-underline"
            >
              <span aria-hidden>→</span> @{site.artist.handle} on Instagram
            </a>
            <a
              href={`mailto:${site.artist.email}`}
              className="mono group inline-flex items-center gap-3 text-[color:var(--bone-paper)] link-underline"
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
          <div className="grid gap-px bg-white/5 border border-white/5">
            <Field label="Your name" value={name} onChange={setName} />
            <Field label="Placement (arm, ribs, calf…)" value={placement} onChange={setPlacement} />
            <Field label="Approx. size (cm) & sessions you can give" value={size} onChange={setSize} />
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

          <button
            type="submit"
            className="mono group mt-8 inline-flex items-center gap-3 border border-[color:var(--bone-paper)]/30 px-7 py-4 text-[color:var(--bone-paper)] transition-colors hover:border-[color:var(--blood-bright)] hover:text-[color:var(--blood-bright)]"
          >
            Open in email
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block bg-[color:var(--ink-iron)] px-5 pt-4 pb-3 focus-within:bg-[color:var(--ink-stone)]">
      <span className="mono block text-[10px] text-[color:var(--bone-fade)]">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full bg-transparent serif-tight pt-1 text-lg text-[color:var(--bone-paper)] outline-none placeholder:text-[color:var(--bone-fade)]"
      />
    </label>
  );
}

function Textarea({
  label,
  value,
  onChange,
  rows = 5,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <label className="block bg-[color:var(--ink-iron)] px-5 pt-4 pb-3 focus-within:bg-[color:var(--ink-stone)]">
      <span className="mono block text-[10px] text-[color:var(--bone-fade)]">{label}</span>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full resize-none bg-transparent serif-tight pt-1 text-lg text-[color:var(--bone-paper)] outline-none placeholder:text-[color:var(--bone-fade)]"
      />
    </label>
  );
}
