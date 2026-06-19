"use client";
import SocialLinks from "./Reuse/SocialLinks";

export default function Social(){
    return (
      <>
        <section id="connect" className="section-padding bg-off-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mb-10 sm:mb-12 md:mb-16">
              <h4 className="text-cyan text-xs sm:text-sm md:text-base mb-2 sm:mb-3 font-medium tracking-wide uppercase">
                Socials
              </h4>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans text-navy font-medium uppercase leading-snug tracking-wide">
                Connect With Us
              </h2>
            </div>
            {/* {motion badges} */}
              <SocialLinks />
          </div>
        </section>
      </>
    );
}