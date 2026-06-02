"use client";

export default function About() {
  return (
    <>
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="mb-20">
            <h4 className="text-accent text-sm md:text-base mb-3 font-medium tracking-wide">
              Who we are
            </h4>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans text-foreground font-medium uppercase leading-snug tracking-wide">
              Developing Quality
              <br className="hidden md:block" /> Real Estate Projects Since 1990
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-0">
            {/* Stat 1 */}
            <div className="flex flex-col border-b pb-6 sm:border-b-0 sm:pb-0 sm:border-r border-slate-200 sm:pr-8">
              <span className="text-5xl font-bold text-accent mb-3">125+</span>
              <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider leading-relaxed">
                Successful Projects
              </span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col border-b pb-6 sm:border-b-0 sm:pb-0 lg:border-r border-slate-200 lg:px-8">
              <span className="text-5xl font-bold text-accent mb-3">
                25000 +
              </span>
              <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider leading-relaxed">
                Happy Residents Living The Paradise Life
              </span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col border-b pb-6 sm:border-b-0 sm:pb-0 sm:border-r border-slate-200 sm:pr-8 lg:pr-0 lg:border-r lg:px-8">
              <span className="text-5xl font-bold text-accent mb-3">
                2 Crore <span className="text-3xl font-medium">Sq.Ft.</span>
              </span>
              <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider leading-relaxed">
                Of Landmark Projects Under Construction
              </span>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col sm:pl-8 lg:pl-8">
              <span className="text-5xl font-bold text-accent mb-3">14000</span>
              <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider leading-relaxed">
                Themed Luxury Residencies In Making
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
