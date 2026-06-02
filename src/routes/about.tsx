import { createFileRoute } from "@tanstack/react-router";
import about from "@content/about.json";
import site from "@content/site.json";
import { PageHeader } from "~/components/PageHeader";
import { CarvedDivider } from "~/components/CarvedDivider";

const AboutPage = () => (
  <>
    <article className="pt-40 pb-32">
      <PageHeader
        rune="ᛁ"
        label="About"
        heading={
          <>
            The hand
            <br />
            <span className="italic">behind</span> the needle.
          </>
        }
      />

      <CarvedDivider className="mt-24" />

      <div className="mx-auto mt-24 grid grid-cols-1 max-w-350 gap-16 px-6 md:grid-cols-12 md:px-10">
        {about.full.chapters.map((ch, i) => (
          <section
            key={ch.title}
            className="reveal grid grid-cols-12 gap-6 min-w-0 md:col-span-12 md:gap-10"
          >
            <div className="col-span-12 md:col-span-3">
              <div className="mono text-(--bone-fade)">
                {String(i + 1).padStart(2, "0")} /{" "}
                {String(about.full.chapters.length).padStart(2, "0")}
              </div>
              <h2 className="display mt-2 text-4xl md:text-5xl">{ch.title}</h2>
            </div>
            <div className="col-span-12 min-w-0 md:col-span-8 md:col-start-5">
              <p className="serif-tight wrap-break-word text-pretty text-xl leading-relaxed text-(--bone-warm) md:text-2xl">
                {ch.body}
              </p>
            </div>
          </section>
        ))}
      </div>

      <div className="mx-auto mt-32 max-w-350 px-6 md:px-10">
        <div className="rune-rule mono">ᛟ</div>
        <div className="mt-12 flex flex-wrap gap-6">
          <a
            href="/#inquire"
            className="mono group inline-flex items-center gap-3 border border-(--bone-paper)/30 px-7 py-4 text-(--bone-paper) transition-colors hover:border-(--blood-bright) hover:text-(--blood-bright)"
          >
            Start an inquiry
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
          <a href="/#portfolio" className="mono link-underline self-center text-(--bone-warm)">
            Or browse the work
          </a>
        </div>
      </div>
    </article>
  </>
);

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: `About — ${site.artist.handle}` },
      {
        name: "description",
        content: `About ${site.artist.name}, a tattoo artist working out of ${site.artist.studio} in ${site.artist.studioCity}.`,
      },
    ],
  }),
});
