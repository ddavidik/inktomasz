import { type Prefill } from "~/hooks/usePrefillIdea";
import site from "@content/site.json";

type Props = {
  prefill: Prefill;
  onClear: () => void;
};

export const PrefillBanner = ({ prefill, onClear }: Props) => (
  <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border border-(--blood-bright)/40 bg-(--blood-bright)/5 px-4 py-3">
    <div className="mono text-[11px] text-(--bone-paper)">
      {site.inquiry.prefillClaiming} <span className="text-(--blood-bright)">{prefill.title}</span>
    </div>
    <button
      type="button"
      onClick={onClear}
      className="mono text-[10px] text-(--bone-fade) hover:text-(--bone-paper)"
    >
      {site.inquiry.prefillClear}
    </button>
  </div>
);
