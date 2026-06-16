import aftercare from "@content/aftercare.json";
import site from "@content/site.json";
import { SectionHeader } from "~/components/SectionHeader";
import { FormattedText } from "~/components/FormattedText";
import { TextLink } from "~/components/TextLink";

export const AftercareTease = () => {
  const previewItems = aftercare.before.items.slice(0, 3);
  const previewPhases = aftercare.after.phases.slice(0, 2);

  return (
    <section id="care" className="relative scroll-mt-16 py-28 md:py-40">
      <div className="mx-auto max-w-350 px-6 md:px-10">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionHeader
              rune={site.aftercarePageSection.rune}
              label={site.aftercarePageSection.label}
              heading={aftercare.heading}
            />
          </div>
          <p className="max-w-md text-(--bone-paper) text-sm md:text-lg">{aftercare.lead}</p>
        </div>

        <div className="grid gap-px border border-white/5 bg-white/5 md:grid-cols-2">
          <div className="bg-(--ink-iron) p-8 md:p-10">
            <div className="mono mb-6 text-(--bone-fade)">{aftercare.teaser.beforeLabel}</div>
            <h3 className="display mb-6 text-3xl">{aftercare.before.title}</h3>
            <ul className="space-y-4">
              {previewItems.map(({ title, text }) => (
                <li key={title} className="flex gap-4 text-(--bone-paper)">
                  <span className="mono shrink-0 pt-1 text-(--blood-bright)">ᛏ</span>
                  <span>
                    <span className="display block text-lg text-white">{title}</span>
                    <span className="text-sm">{text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-(--ink-iron) p-8 md:p-10">
            <div className="mono mb-6 text-(--bone-fade)">{aftercare.teaser.afterLabel}</div>
            <h3 className="display mb-6 text-3xl">{aftercare.after.title}</h3>
            <ol className="space-y-6">
              {previewPhases.map((phase, index) => (
                <li key={phase.label} className="flex gap-4">
                  <span className="mono shrink-0 pt-1 text-(--blood-bright)">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="display block text-lg text-white">{phase.label}</span>
                    <span className="text-sm text-(--bone-paper)">
                      <FormattedText segments={phase.body} />
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <TextLink href="/aftercare">{aftercare.teaser.ctaLink}</TextLink>
        </div>
      </div>
    </section>
  );
};
