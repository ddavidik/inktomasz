import site from "@content/site.json";

export const Footer = () => (
  <footer className="border-t border-white/5 bg-(--ink-pitch)">
    <div className="mx-auto grid max-w-350 gap-10 px-6 py-16 md:grid-cols-3 md:px-10">
      <div>
        <div className="display text-3xl">
          {site.artist.firstName}{" "}
          <span className="text-(--blood-bright)">{site.artist.lastName}</span>
        </div>
        <p className="mt-3 max-w-xs text-sm text-(--bone-fade)">{site.artist.tagline}</p>
      </div>

      <div>
        <div className="mono mb-3">Find</div>
        <ul className="space-y-1.5 text-(--bone-warm)">
          <li>
            <a
              href={site.artist.instagram}
              target="_blank"
              rel="noreferrer"
              className="link-underline"
            >
              @{site.artist.handle} on Instagram
            </a>
          </li>
          <li>
            <a href={`mailto:${site.artist.email}`} className="link-underline">
              {site.artist.email}
            </a>
          </li>
          <li className="text-(--bone-fade)">
            <a
              href="https://dergrimm.com/"
              target="_blank"
              rel="noreferrer"
              className="link-underline"
            >
              {site.artist.studio}
            </a>{" "}
            · {site.artist.studioCity}
          </li>
        </ul>
      </div>

      <div>
        <div className="mono mb-3">Read</div>
        <ul className="space-y-1.5 text-(--bone-warm)">
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
      <div className="mx-auto flex max-w-350 flex-col gap-2 px-6 py-6 text-xs text-(--bone-fade) md:flex-row md:items-center md:justify-between md:px-10">
        <span className="mono">© {new Date().getFullYear()} Daniel Davidík</span>
        <span className="mono">ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ</span>
      </div>
    </div>
  </footer>
);
