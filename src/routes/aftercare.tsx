import { createFileRoute } from "@tanstack/react-router";
import aftercare from "@content/aftercare.json";
import site from "@content/site.json";
import { PageHeader } from "~/components/PageHeader";
import { CarvedDivider } from "~/components/CarvedDivider";
import { CtaLink } from "~/components/CtaLink";
import { FormattedText } from "~/components/FormattedText";
import { SectionNav } from "~/components/SectionNav";
import { AftercareSection } from "~/components/AftercareSection";

const SECTIONS = [
  { id: "before", label: "Before" },
  { id: "after", label: "After" },
  { id: "tips", label: "Tips" },
];

const AftercarePage = () => {
  const headingSegments = aftercare.page.headingSegments;
  const heading = (
    <>
      <span className="block leading-none">{headingSegments[0]!.text}</span>
      <span className="block italic leading-none mt-1 md:mt-0">{headingSegments[1]!.text}</span>
    </>
  );

  return (
    <>
      <SectionNav sections={SECTIONS} />
      <article className="pt-40 pb-32">
        <PageHeader
          rune={site.aftercarePageSection.rune}
          label={site.aftercarePageSection.label}
          heading={heading}
          subtitle={aftercare.page.subtitle}
        />

        <CarvedDivider className="mt-24" />

        {/* BEFORE */}
        <AftercareSection
          id="before"
          label={aftercare.sectionLabels.before}
          title={aftercare.before.title}
          listTag="ul"
        >
          {aftercare.before.items.map(({ title, text }) => (
            <li key={title} className="reveal grid grid-cols-12 gap-6 py-6">
              <div className="col-span-12 md:col-span-3">
                <span className="mono text-(--blood-bright)">ᛏ</span>
                <span className="display ml-3 text-2xl">{title}</span>
              </div>
              <div className="col-span-12 md:col-span-9 serif-tight text-pretty text-xl leading-relaxed text-(--bone-paper)">
                {text}
              </div>
            </li>
          ))}
        </AftercareSection>

        <CarvedDivider className="mt-32" />

        {/* AFTER — phased (custom layout, not AftercareSection) */}
        <section id="after" className="scroll-mt-20 mx-auto mt-24 max-w-350 px-6 md:px-10">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="min-w-0 overflow-hidden md:col-span-3">
              <div className="mono mb-4 text-(--bone-fade)">{aftercare.sectionLabels.after}</div>
              <h2 className="display text-5xl">{aftercare.after.title}</h2>
            </div>
            <ol className="md:col-span-9 md:col-start-4 space-y-12">
              {aftercare.after.phases.map((p, i) => (
                <li key={p.label} className="reveal grid grid-cols-12 gap-6">
                  <div className="col-span-12 md:col-span-3">
                    <div className="mono text-(--bone-fade)">
                      Phase {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="display mt-1 text-2xl text-white">{p.label}</div>
                  </div>
                  <p className="col-span-12 md:col-span-9 serif-tight text-pretty text-xl leading-relaxed text-(--bone-paper)">
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
            <div className="mono mb-6 text-(--blood-bright)">
              {aftercare.sectionLabels.donts.substring(0, 3)} &nbsp;{" "}
              {aftercare.sectionLabels.donts.substring(3)}
            </div>
            <ul className="grid gap-3 md:grid-cols-2">
              {aftercare.after.donts.map((d) => (
                <li key={d} className="serif-tight flex gap-3 text-lg text-(--bone-paper)">
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
        <AftercareSection
          id="tips"
          label={aftercare.sectionLabels.tips}
          title={aftercare.tips.title}
          listTag="ul"
        >
          {aftercare.tips.items.map((item) => (
            <li key={item.title} className="reveal grid grid-cols-12 gap-6 py-6">
              <div className="col-span-12 md:col-span-3">
                <span className="mono text-(--bone-fade)">ᚠ</span>
                <span className="display ml-3 text-2xl">{item.title}</span>
              </div>
              <div className="col-span-12 md:col-span-9 serif-tight text-pretty text-xl leading-relaxed text-(--bone-paper)">
                <FormattedText segments={item.body} />
              </div>
            </li>
          ))}
        </AftercareSection>

        <div className="mx-auto mt-24 max-w-350 px-6 md:px-10">
          <CtaLink href="/#inquire" showArrow className="px-7 py-4">
            {aftercare.page.ctaLink}
          </CtaLink>
        </div>
      </article>
    </>
  );
};

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
