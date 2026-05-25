import { createFileRoute } from "@tanstack/react-router";
import aftercare from "@content/aftercare.json";
import site from "@content/site.json";
import { RevealMounter } from "~/components/RevealMounter";

export const Route = createFileRoute("/aftercare")({
  component: AftercarePage,
  head: () => ({
    meta: [
      { title: `Before & aftercare — ${site.artist.handle}` },
      {
        name: "description",
        content: "What to bring to your tattoo session and how to care for it afterwards.",
      },
    ],
  }),
});

function AftercarePage() {
  return (
    <>
      <RevealMounter />
      <article className="pt-40 pb-32">
        <header className="mx-auto max-w-[1400px] px-6 md:px-10">
          <p className="mono mb-6 text-[color:var(--blood-bright)]">ᛟ &nbsp; Care</p>
          <h1 className="display text-balance text-[14vw] leading-[0.9] md:text-[clamp(4rem,8vw,9rem)]">
            Before
            <br />
            <span className="italic">&amp;</span> after.
          </h1>
          <p className="serif-tight mt-8 max-w-2xl text-pretty text-xl text-[color:var(--bone-warm)] md:text-2xl">
            Read this before your session. Come back to it every day for two weeks
            after. Bookmark it.
          </p>
        </header>

        <div className="carved-divider mx-auto mt-24 max-w-[1400px]" />

        {/* BEFORE */}
        <section className="mx-auto mt-24 max-w-[1400px] px-6 md:px-10">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="mono mb-4 text-[color:var(--bone-fade)]">01 — Before</div>
              <h2 className="display text-5xl md:text-6xl">
                {aftercare.before.title}
              </h2>
            </div>
            <ul className="md:col-span-8 md:col-start-5 divide-y divide-white/5 border-y border-white/5">
              {aftercare.before.items.map((it) => (
                <li
                  key={it.k}
                  className="reveal grid grid-cols-12 gap-6 py-6"
                >
                  <div className="col-span-12 md:col-span-3">
                    <span className="mono text-[color:var(--blood-bright)]">ᛏ</span>
                    <span className="display ml-3 text-2xl">{it.k}</span>
                  </div>
                  <div className="col-span-12 md:col-span-9 serif-tight text-lg text-[color:var(--bone-warm)]">
                    {it.v}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="carved-divider mx-auto mt-32 max-w-[1400px]" />

        {/* AFTER — phased */}
        <section className="mx-auto mt-24 max-w-[1400px] px-6 md:px-10">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="mono mb-4 text-[color:var(--bone-fade)]">02 — After</div>
              <h2 className="display text-5xl md:text-6xl">
                {aftercare.after.title}
              </h2>
            </div>
            <ol className="md:col-span-8 md:col-start-5 space-y-12">
              {aftercare.after.phases.map((p, i) => (
                <li key={p.label} className="reveal grid grid-cols-12 gap-6">
                  <div className="col-span-12 md:col-span-3">
                    <div className="mono text-[color:var(--bone-fade)]">
                      Phase {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="display mt-1 text-2xl text-[color:var(--bone-paper)]">
                      {p.label}
                    </div>
                  </div>
                  <p className="col-span-12 md:col-span-9 serif-tight text-pretty text-xl leading-relaxed text-[color:var(--bone-warm)]">
                    {p.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* DON'TS */}
        <section className="mx-auto mt-32 max-w-[1400px] px-6 md:px-10">
          <div className="border border-[color:var(--blood)]/40 bg-[color:var(--blood)]/[0.06] p-8 md:p-12">
            <div className="mono mb-6 text-[color:var(--blood-bright)]">
              ᛉ &nbsp; What not to do
            </div>
            <ul className="grid gap-3 md:grid-cols-2">
              {aftercare.after.donts.map((d) => (
                <li
                  key={d}
                  className="serif-tight flex gap-3 text-lg text-[color:var(--bone-warm)]"
                >
                  <span aria-hidden className="text-[color:var(--blood-bright)]">×</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="mx-auto mt-24 max-w-[1400px] px-6 md:px-10">
          <a
            href="/#inquire"
            className="mono group inline-flex items-center gap-3 border border-[color:var(--bone-paper)]/30 px-7 py-4 text-[color:var(--bone-paper)] transition-colors hover:border-[color:var(--blood-bright)] hover:text-[color:var(--blood-bright)]"
          >
            Ready to book a session
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </article>
    </>
  );
}
