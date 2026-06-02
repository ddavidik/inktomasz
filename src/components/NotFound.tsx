export const NotFound = () => (
  <article className="flex flex-1 flex-col pt-40 pb-32">
    <div className="mx-auto w-full max-w-350 px-6 md:px-10">
      <div className="md:grid md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="mono mb-6 text-(--blood-bright)">ᚾ&nbsp;&nbsp;404</p>
          <h1 className="display text-[14vw] leading-[0.9] md:text-[clamp(4rem,8vw,9rem)]">
            Path not
            <br />
            <span className="italic">carved.</span>
          </h1>
          <p className="serif-tight mt-8 text-pretty text-xl text-(--bone-warm) md:text-2xl">
            Whatever you sought was not carved here.
          </p>
        </div>
      </div>
    </div>
    <div className="flex-1" />
    <div className="mx-auto w-full max-w-350 px-6 md:px-10">
      <div className="rune-rule mono">ᚾ</div>
    </div>
  </article>
);
