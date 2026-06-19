"use client"

import { motion } from 'framer-motion';

export default function Enquiry() {
  return (
    <>
      <section id="enquiry" className="section-padding bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-10 sm:mb-12 md:mb-16">
            <h4 className="text-cyan text-xs sm:text-sm md:text-base mb-2 sm:mb-3 font-medium tracking-wide uppercase">
              Enquiry
            </h4>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans text-navy font-medium uppercase leading-snug tracking-wide">
              Feel Free to get in touch
            </h2>
          </div>
          <form className="max-w-2xl flex flex-col gap-4 sm:gap-6">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
            >
              <input
                type="text"
                placeholder="First Name"
                className="p-3.5 sm:p-4 rounded-xl bg-off-white border border-border-light focus:outline-none focus:ring-2 focus:ring-cyan/50 focus:border-cyan transition-all text-sm sm:text-base"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="p-3.5 sm:p-4 rounded-xl bg-off-white border border-border-light focus:outline-none focus:ring-2 focus:ring-cyan/50 focus:border-cyan transition-all text-sm sm:text-base"
              />
            </motion.div>
            <input
              type="email"
              placeholder="Email Address"
              className="p-3.5 sm:p-4 rounded-xl bg-off-white border border-border-light focus:outline-none focus:ring-2 focus:ring-cyan/50 focus:border-cyan transition-all text-sm sm:text-base"
            />
            <textarea
              placeholder="Your Message"
              className="p-3.5 sm:p-4 rounded-xl bg-off-white border border-border-light h-28 sm:h-32 focus:outline-none focus:ring-2 focus:ring-cyan/50 focus:border-cyan transition-all text-sm sm:text-base resize-none"
            ></textarea>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-gold text-navy py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl font-bold hover:bg-gold-light transition-colors self-start uppercase tracking-wider text-sm shadow-lg shadow-gold/10"
            >
              Submit Enquiry
            </motion.button>
          </form>
        </div>
      </section>
    </>
  );
}
