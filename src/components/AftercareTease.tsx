import aftercare from "@content/aftercare.json";

export function AftercareTease() {
  const previewItems = aftercare.before.items.slice(0, 3);
  const previewPhases = aftercare.after.phases.slice(0, 2);

  return (
    <section className="relative border-t border-white/5 py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mono mb-6 text-[color:var(--bone-fade)]">ᛟ &nbsp; Care</p>
            <h2 className="display text-5xl leading-[0.95] md:text-7xl">
              {aftercare.heading}
            </h2>
          </div>
          <p className="max-w-md text-[color:var(--bone-warm)]">{aftercare.lead}</p>
        </div>

        <div className="grid gap-px border border-white/5 bg-white/5 md:grid-cols-2">
          <div className="bg-[color:var(--ink-iron)] p-8 md:p-10">
            <div className="mono mb-6 text-[color:var(--bone-fade)]">Before</div>
            <h3 className="display mb-6 text-3xl">{aftercare.before.title}</h3>
            <ul className="space-y-4">
              {previewItems.map((it) => (
                <li key={it.k} className="flex gap-4 text-[color:var(--bone-warm)]">
                  <span className="mono shrink-0 pt-1 text-[color:var(--blood-bright)]">
                    ᛏ
                  </span>
                  <span>
                    <span className="display block text-lg text-[color:var(--bone-paper)]">
                      {it.k}
                    </span>
                    <span className="text-sm">{it.v}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[color:var(--ink-iron)] p-8 md:p-10">
            <div className="mono mb-6 text-[color:var(--bone-fade)]">After</div>
            <h3 className="display mb-6 text-3xl">{aftercare.after.title}</h3>
            <ol className="space-y-6">
              {previewPhases.map((p, i) => (
                <li key={p.label} className="flex gap-4">
                  <span className="mono shrink-0 pt-1 text-[color:var(--blood-bright)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="display block text-lg text-[color:var(--bone-paper)]">
                      {p.label}
                    </span>
                    <span className="text-sm text-[color:var(--bone-warm)]">{p.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <a
            href="/aftercare"
            className="mono group inline-flex items-center gap-3 border-b border-[color:var(--bone-fade)] pb-2 text-[color:var(--bone-paper)] transition-colors hover:border-[color:var(--blood-bright)] hover:text-[color:var(--blood-bright)]"
          >
            Full before &amp; aftercare guide
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
