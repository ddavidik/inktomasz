import site from "@content/site.json";

const resolveEnvValue = (value: string): string => {
  const match = value.match(/^\$VITE_(.+)/);

  if (!match) return value;

  const envKey = `VITE_${match[1]!}`;

  return import.meta.env[envKey] ?? value;
};

export const PricingTable = () => (
  <div className="mt-10 divide-y divide-white/5 border-y border-white/5">
    <div className="flex items-baseline justify-between py-3">
      <span className="mono text-(--bone-fade)">Full day</span>
      <span className="display text-2xl text-(--bone-paper)">
        {resolveEnvValue(site.pricing.fullDay)}
      </span>
    </div>
    <div className="flex items-baseline justify-between py-3">
      <span className="mono text-(--bone-fade)">Half day</span>
      <span className="display text-2xl text-(--bone-paper)">
        {resolveEnvValue(site.pricing.halfDay)}
      </span>
    </div>
    <p className="mono py-3 text-(--bone-fade)">{site.pricing.disclaimer}</p>
  </div>
);
