import site from "@content/site.json";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[color:var(--ink-pitch)]">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-16 md:grid-cols-3 md:px-10">
        <div>
          <div className="display text-3xl">
            ink<span className="text-[color:var(--blood-bright)]">tomasz</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-[color:var(--bone-fade)]">
            {site.artist.tagline}
          </p>
        </div>

        <div>
          <div className="mono mb-3">Find</div>
          <ul className="space-y-1.5 text-[color:var(--bone-warm)]">
            <li>
              <a
                href={site.artist.instagram}
                target="_blank"
                rel="noreferrer"
                className="link-underline"
              >
                Instagram
              </a>
            </li>
            <li>
              <a href={`mailto:${site.artist.email}`} className="link-underline">
                {site.artist.email}
              </a>
            </li>
            <li className="text-[color:var(--bone-fade)]">
              {site.artist.location} · by appointment
            </li>
          </ul>
        </div>

        <div>
          <div className="mono mb-3">Read</div>
          <ul className="space-y-1.5 text-[color:var(--bone-warm)]">
            <li>
              <a href="/about" className="link-underline">
                About Tomasz
              </a>
            </li>
            <li>
              <a href="/aftercare" className="link-underline">
                Before &amp; aftercare
              </a>
            </li>
            <li>
              <a href="/#inquire" className="link-underline">
                Inquire
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-6 py-6 text-xs text-[color:var(--bone-fade)] md:flex-row md:items-center md:justify-between md:px-10">
          <span className="mono">© {new Date().getFullYear()} inktomasz</span>
          <span className="mono">ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ</span>
        </div>
      </div>
    </footer>
  );
}
