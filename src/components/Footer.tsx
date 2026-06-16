import { Link } from "@tanstack/react-router";
import site from "@content/site.json";
import { resolveHandle } from "~/utils/resolveHandle";

export const Footer = () => (
  <footer className="border-t border-(--ink-stone) bg-(--ink-void)">
    <div className="mx-auto grid max-w-350 gap-10 px-6 py-16 md:grid-cols-3 md:px-10">
      <div>
        <div className="display text-3xl">
          {site.artist.firstName}{" "}
          <span className="text-(--blood-bright)">{site.artist.lastName}</span>
        </div>
        <p className="mt-3 max-w-xs text-sm text-(--bone-fade)">{site.artist.tagline}</p>
      </div>

      <div>
        <div className="mono mb-3">{site.footer.findLabel}</div>
        <ul className="space-y-1.5 text-(--bone-warm)">
          <li>
            <a
              href={site.artist.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
            >
              {resolveHandle(site.footer.instagramLabel)}
            </a>
          </li>
          <li>
            <a
              href={site.artist.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
            >
              {resolveHandle(site.footer.tiktokLabel)}
            </a>
          </li>
          <li>
            <a
              href={site.artist.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
            >
              {resolveHandle(site.footer.facebookLabel)}
            </a>
          </li>
          <li className="text-(--bone-fade)">
            <a
              href="https://dergrimm.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
            >
              {site.artist.studio}
            </a>{" "}
            · {site.artist.studioCity}
          </li>
        </ul>
      </div>

      <div>
        <div className="mono mb-3">{site.footer.readLabel}</div>
        <ul className="space-y-1.5 text-(--bone-warm)">
          <li>
            <Link to="/about" className="link-underline">
              {site.footer.linkAbout}
            </Link>
          </li>
          <li>
            <Link to="/aftercare" className="link-underline">
              {site.footer.linkAftercare}
            </Link>
          </li>
          <li>
            <Link to="/" hash="inquire" className="link-underline">
              {site.footer.linkInquire}
            </Link>
          </li>
        </ul>
      </div>
    </div>
    <div className="border-t border-(--ink-stone)">
      <div className="mx-auto flex max-w-350 flex-col gap-2 px-6 py-6 text-xs text-(--bone-fade) md:flex-row md:items-center md:justify-between md:px-10">
        <span className="mono">
          © {new Date().getFullYear()} {site.artist.name} · {site.footer.creditSuffix}
        </span>
        <span className="mono">{site.footer.futhark}</span>
      </div>
    </div>
  </footer>
);
