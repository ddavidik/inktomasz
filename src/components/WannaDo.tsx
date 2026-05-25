import { useMemo, useState } from "react";
import wannado from "@content/wannado.json";

export function WannaDo() {
  const [active, setActive] = useState<string>("all");
  const filtered = useMemo(
    () =>
      active === "all"
        ? wannado.ideas
        : wannado.ideas.filter((i) => i.tags.includes(active)),
    [active],
  );

  return (
    <section id="wannado" className="relative border-t border-white/5 py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mono mb-6 text-[color:var(--bone-fade)]">ᚹ &nbsp; Wanna-do</p>
            <h2 className="display text-5xl leading-[0.95] md:text-7xl">
              {wannado.heading}
            </h2>
          </div>
          <p className="max-w-md text-[color:var(--bone-warm)]">{wannado.lead}</p>
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          {wannado.tags.map((t) => {
            const on = active === t;
            return (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={`mono border px-4 py-2 transition-colors ${
                  on
                    ? "border-[color:var(--blood-bright)] bg-[color:var(--blood-bright)]/10 text-[color:var(--bone-paper)]"
                    : "border-white/10 text-[color:var(--bone-fade)] hover:border-white/40 hover:text-[color:var(--bone-paper)]"
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
              className="reveal group relative overflow-hidden border border-white/5 bg-[color:var(--ink-iron)]"
            >
              <img
                src={idea.src}
                alt={idea.alt}
                loading="lazy"
                className="block aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.05]"
              />
              <figcaption className="absolute inset-0 flex flex-col justify-between bg-gradient-to-b from-transparent via-transparent to-black/85 p-4">
                <div className="mono self-end rounded-none bg-black/60 px-2 py-1 text-[10px] text-[color:var(--bone-paper)] backdrop-blur-sm">
                  {idea.id}
                </div>
                <div>
                  <div className="display text-xl leading-tight">{idea.title}</div>
                  <div className="mono mt-1 text-[10px]">{idea.tags.join(" · ")}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
