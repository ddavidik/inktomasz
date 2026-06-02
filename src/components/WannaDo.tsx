import { useMemo, useState } from "react";
import wannado from "@content/wannado.json";
import { SectionHeader } from "~/components/SectionHeader";
import { CtaButton } from "~/components/CtaButton";

const pickIdea = (id: string, title: string): void => {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem("inktomasz:idea", JSON.stringify({ id, title }));
    window.dispatchEvent(new CustomEvent("inktomasz:prefill-idea", { detail: { id, title } }));
  } catch {
    /* sessionStorage may be unavailable */
  }
};

export const WannaDo = () => {
  const [active, setActive] = useState<string>("all");
  const filtered = useMemo(
    () => (active === "all" ? wannado.ideas : wannado.ideas.filter((i) => i.tags.includes(active))),
    [active],
  );

  return (
    <section id="wannado" className="relative border-t border-white/5 py-28 md:py-40">
      <div className="mx-auto max-w-350 px-6 md:px-10">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionHeader rune="ᚹ" label="Wanna-do" heading={wannado.heading} />
          </div>
          <p className="max-w-md text-(--bone-warm)">{wannado.lead}</p>
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          {wannado.tags.map((t) => {
            const isOn = active === t;

            return (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={`mono border px-4 py-2 transition-colors ${
                  isOn
                    ? "border-(--blood-bright) bg-(--blood-bright)/10 text-(--bone-paper)"
                    : "border-white/10 text-(--bone-fade) hover:border-white/40 hover:text-(--bone-paper)"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {filtered.map((idea) => (
            <figure
              key={idea.id}
              className="reveal group relative flex flex-col overflow-hidden border border-white/5 bg-(--ink-iron)"
            >
              <div className="relative overflow-hidden">
                <img
                  src={idea.src}
                  alt={idea.alt}
                  loading="lazy"
                  className="block aspect-4/5 w-full object-cover transition-transform duration-1200 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-between bg-linear-to-b from-transparent via-transparent to-black/85 p-4">
                  <div className="mono self-end rounded-none bg-black/60 px-2 py-1 text-[10px] text-(--bone-paper) backdrop-blur-sm">
                    {idea.id}
                  </div>
                  <div>
                    <div className="display text-xl leading-tight">{idea.title}</div>
                    <div className="mono mt-1 text-[10px]">{idea.tags.join(" · ")}</div>
                  </div>
                </div>
              </div>
              <a
                href="#inquire"
                onClick={() => pickIdea(idea.id, idea.title)}
                className="mono group/btn flex items-center justify-between gap-2 border-t border-white/5 bg-(--ink-stone) px-4 py-3 text-[10px] text-(--bone-paper) transition-colors hover:bg-(--blood-bright)/10 hover:text-(--blood-bright)"
              >
                <span>Claim this one</span>
                <span aria-hidden className="transition-transform group-hover/btn:translate-x-1">
                  →
                </span>
              </a>
            </figure>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-white/5 pt-10">
          <p className="serif-tight max-w-xl text-pretty text-xl text-(--bone-warm) md:text-2xl">
            See something you want? First message wins it.
          </p>
          <CtaButton href="#inquire" showArrow className="px-7 py-4">
            Inquire about a wanna-do
          </CtaButton>
        </div>
      </div>
    </section>
  );
};
