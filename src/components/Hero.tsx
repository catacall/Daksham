"use client";

export default function Hero() {
  return (
    <>
      <section
        id="hero"
        className="h-screen bg-slate-900 relative overflow-hidden flex items-center justify-center text-center"
      >
        {/* Background Video */}
        <video
          src="/SWC-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
        <div className="absolute inset-0 bg-black/10 z-0" />
        {/* Overlay for video readability */}
        {/* Content Layer */}
        <div className="relative z-10 container mx-auto px-6 mt-16 lg:mt-0">
          <p className="mt-6 md:mt-8 text-lg md:text-2xl text-white/90 font-light drop-shadow max-w-3xl mx-auto">
            Discover unparalleled luxury and transformative spaces designed for
            the future.
          </p>
        </div>
      </section>
    </>
  );
}
