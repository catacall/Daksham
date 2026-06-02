" use client ";

import Image from "next/image";
export default function NewsEvent() {
  return (
    <>
      <section id="news" className="section-padding bg-slate-100">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h4 className="text-accent text-sm md:text-base mb-3 font-medium tracking-wide uppercase">
              News & Events
            </h4>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans text-foreground font-medium uppercase leading-snug tracking-wide">
              Creating Waves All Across
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white group hover:-translate-y-1 transition-transform">
              <Image
                src="/news-1.jpg"
                loading="eager"
                alt="News 1"
                className="w-full h-64 md:h-80 object-cover"
                height={640}
                width={800}
                quality={90}
              />
              <div className="p-8">
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                  NAVBHARAT
                </span>
                <h3 className="text-2xl font-display font-bold mt-2 mb-3"></h3>
                <p className="text-slate-600">
                  Read about our achievements in the real estate sector.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white group hover:-translate-y-1 transition-transform">
              <Image
                src="/news-2.jpg"
                loading="eager"
                alt="News 2"
                className="w-full h-64 md:h-80 object-cover"
                height={640}
                width={800}
                quality={90}
              />
              <div className="p-8">
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                  THE ECONOMIC TIMES
                </span>
                <h3 className="text-2xl font-display font-bold mt-2 mb-3">
                  SAI WORLD RETREAT - YOUR HILLSIDE HAVEN OF LUXURY
                </h3>
                <p className="text-slate-600">
                  Join us for an evening of celebration and networking at our
                  flagship property.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
