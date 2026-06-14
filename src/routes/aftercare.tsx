import { createFileRoute } from "@tanstack/react-router";
import aftercare from "@content/aftercare.json";
import site from "@content/site.json";
import { PageHeader } from "~/components/PageHeader";
import { CarvedDivider } from "~/components/CarvedDivider";
import { CtaLink } from "~/components/CtaLink";
import { FormattedText } from "~/components/FormattedText";

const AftercarePage = () => (
  <>
    <article className="pt-40 pb-32">
      <PageHeader
        rune="ᛟ"
        label="Care"
        heading={
          <>
            Before
            <br />
            <span className="italic">&amp;</span> after.
          </>
        }
        subtitle="Read this before your session. Come back to it when you need it for two weeks after. Bookmark it."
      />

      <CarvedDivider className="mt-24" />

      {/* BEFORE */}
      <section className="mx-auto mt-24 max-w-350 px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="min-w-0 overflow-hidden md:col-span-3">
            <div className="mono mb-4 text-(--bone-fade)">01 — Before</div>
            <h2 className="display text-5xl">{aftercare.before.title}</h2>
          </div>
          <ul className="md:col-span-9 md:col-start-4 divide-y divide-white/5 border-y border-white/5">
            {aftercare.before.items.map(({ title, text }) => (
              <li key={title} className="reveal grid grid-cols-12 gap-6 py-6">
                <div className="col-span-12 md:col-span-3">
                  <span className="mono text-(--blood-bright)">ᛏ</span>
                  <span className="display ml-3 text-2xl">{title}</span>
                </div>
                <div className="col-span-12 md:col-span-9 serif-tight text-pretty text-xl leading-relaxed text-(--bone-warm)">
                  {text}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CarvedDivider className="mt-32" />

      {/* AFTER — phased */}
      <section className="mx-auto mt-24 max-w-350 px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="min-w-0 overflow-hidden md:col-span-3">
            <div className="mono mb-4 text-(--bone-fade)">02 — After</div>
            <h2 className="display text-5xl">{aftercare.after.title}</h2>
          </div>
          <ol className="md:col-span-9 md:col-start-4 space-y-12">
            {aftercare.after.phases.map((p, i) => (
              <li key={p.label} className="reveal grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-3">
                  <div className="mono text-(--bone-fade)">
                    Phase {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="display mt-1 text-2xl text-(--bone-paper)">{p.label}</div>
                </div>
                <p className="col-span-12 md:col-span-9 serif-tight text-pretty text-xl leading-relaxed text-(--bone-warm)">
                  <FormattedText segments={p.body} />
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* DON'TS */}
      <section className="mx-auto mt-32 max-w-350 px-6 md:px-10">
        <div className="border border-(--blood)/40 bg-(--blood)/6 p-8 md:p-12">
          <div className="mono mb-6 text-(--blood-bright)">ᛉ &nbsp; What not to do</div>
          <ul className="grid gap-3 md:grid-cols-2">
            {aftercare.after.donts.map((d) => (
              <li key={d} className="serif-tight flex gap-3 text-lg text-(--bone-warm)">
                <span aria-hidden className="text-(--blood-bright)">
                  ×
                </span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CarvedDivider className="mt-32" />

      {/* TIPS */}
      <section className="mx-auto mt-24 max-w-350 px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="min-w-0 overflow-hidden md:col-span-3">
            <div className="mono mb-4 text-(--bone-fade)">03 — Tips</div>
            <h2 className="display text-5xl">{aftercare.tips.title}</h2>
          </div>
          <ul className="md:col-span-9 md:col-start-4 divide-y divide-white/5 border-y border-white/5">
            {aftercare.tips.items.map((item) => (
                <li key={item.title} className="reveal grid grid-cols-12 gap-6 py-6">
                  <div className="col-span-12 md:col-span-3">
                    <span className="mono text-(--bone-fade)">ᚠ</span>
                    <span className="display ml-3 text-2xl">{item.title}</span>
                  </div>
                  <div className="col-span-12 md:col-span-9 serif-tight text-pretty text-xl leading-relaxed text-(--bone-warm)">
                    <FormattedText segments={item.body} />
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto mt-24 max-w-350 px-6 md:px-10">
        <CtaLink href="/#inquire" showArrow className="px-7 py-4">
          Ready to book a session
        </CtaLink>
      </div>
    </article>
  </>
);

export const Route = createFileRoute("/aftercare")({
  component: AftercarePage,
  head: () => ({
    meta: [
      { title: site.seo.aftercareTitle },
      {
        name: "description",
        content: site.seo.aftercareDescription,
      },
    ],
  }),
});
