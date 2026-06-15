import type { ReactNode } from "react";

type AftercareSectionProps = {
  id: string;
  label: string;
  title: string;
  children: ReactNode;
  listTag?: "ol" | "ul";
};

export const AftercareSection = ({ id, label, title, children, listTag = "ul" }: AftercareSectionProps): ReactNode => {
  const ListTag = listTag;

  return (
    <section id={id} className="scroll-mt-20 mx-auto mt-24 max-w-350 px-6 md:px-10">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="min-w-0 overflow-hidden md:col-span-3">
          <div className="mono mb-4 text-(--bone-fade)">{label}</div>
          <h2 className="display text-5xl">{title}</h2>
        </div>
        <ListTag className="md:col-span-9 md:col-start-4 divide-y divide-white/5 border-y border-white/5">
          {children}
        </ListTag>
      </div>
    </section>
  );
};
