import site from "@content/site.json";

export const PricingTable = () => (
  <div className="mt-10 divide-y divide-white/5 border-y border-white/5">
    <div className="flex items-baseline justify-between py-3">
      <span className="mono text-(--bone-fade)">{site.inquiry.pricingFullDay}</span>
      <span className="display text-2xl text-(--bone-paper)">~{site.pricing.fullDay}</span>
    </div>
    <div className="flex items-baseline justify-between py-3">
      <span className="mono text-(--bone-fade)">{site.inquiry.pricingHalfDay}</span>
      <span className="display text-2xl text-(--bone-paper)">~{site.pricing.halfDay}</span>
    </div>
    <p className="mono py-3 text-(--bone-fade)">{site.pricing.disclaimer}</p>
  </div>
);
