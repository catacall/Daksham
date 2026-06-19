"use client";

export default function About() {
  return (
    <>
      <section id="about" className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="mb-12 sm:mb-16 md:mb-20">
            <h4 className="text-cyan text-xs sm:text-sm md:text-base mb-2 sm:mb-3 font-medium tracking-wide uppercase">
              Who we are
            </h4>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans text-navy font-medium uppercase leading-snug tracking-wide">
              Developing Quality
              <br className="hidden md:block" /> Real Estate Projects Since 1990
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12 lg:gap-0">
            {/* Stat 1 */}
            <div className="flex flex-col border-b pb-6 lg:border-b-0 lg:pb-0 lg:border-r border-border-light lg:pr-8">
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-gold mb-2 sm:mb-3">125+</span>
              <span className="text-muted text-[10px] sm:text-xs font-semibold uppercase tracking-wider leading-relaxed">
                Successful Projects
              </span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col border-b pb-6 lg:border-b-0 lg:pb-0 lg:border-r border-border-light lg:px-8">
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-gold mb-2 sm:mb-3">
                25000+
              </span>
              <span className="text-muted text-[10px] sm:text-xs font-semibold uppercase tracking-wider leading-relaxed">
                Happy Residents Living The Paradise Life
              </span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col border-b pb-6 sm:border-b-0 sm:pb-0 lg:border-r border-border-light lg:px-8">
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-gold mb-2 sm:mb-3">
                2 Crore <span className="text-xl sm:text-2xl md:text-3xl font-medium">Sq.Ft.</span>
              </span>
              <span className="text-muted text-[10px] sm:text-xs font-semibold uppercase tracking-wider leading-relaxed">
                Of Landmark Projects Under Construction
              </span>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col lg:pl-8">
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-gold mb-2 sm:mb-3">14000</span>
              <span className="text-muted text-[10px] sm:text-xs font-semibold uppercase tracking-wider leading-relaxed">
                Themed Luxury Residencies In Making
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
