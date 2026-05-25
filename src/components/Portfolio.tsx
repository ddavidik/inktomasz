import portfolio from "@content/portfolio.json";

export function Portfolio() {
  return (
    <section
      id="portfolio"
      className="relative border-t border-white/5 bg-[color:var(--ink-pitch)] py-28 md:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mono mb-6 text-[color:var(--bone-fade)]">ᛉ &nbsp; Portfolio</p>
            <h2 className="display text-5xl leading-[0.95] md:text-7xl">
              {portfolio.heading}
            </h2>
          </div>
          <p className="max-w-md text-[color:var(--bone-warm)]">{portfolio.lead}</p>
        </div>

        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [column-fill:_balance]">
          {portfolio.pieces.map((p) => (
            <figure
              key={p.id}
              className="reveal group relative mb-6 break-inside-avoid overflow-hidden border border-white/5 bg-[color:var(--ink-iron)]"
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="block w-full transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div>
                  <div className="display text-2xl leading-tight">{p.title}</div>
                  <div className="mono mt-1">{p.style}</div>
                </div>
                <div className="mono">{p.year}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
