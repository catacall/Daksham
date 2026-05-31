"use client"

import { motion } from 'framer-motion';

export default function Enquiry() {
  return (
    <>
      <section id="enquiry" className="section-padding bg-background">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <h4 className="text-accent text-sm md:text-base mb-3 font-medium tracking-wide uppercase">
              Enquiry
            </h4>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans text-foreground font-medium uppercase leading-snug tracking-wide">
              Feel Free to get in touch
            </h2>
          </div>
          <form className="max-w-2xl flex flex-col gap-6">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <input
                type="text"
                placeholder="First Name"
                className="p-4 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="p-4 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
            </motion.div>
            <input
              type="email"
              placeholder="Email Address"
              className="p-4 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
            <textarea
              placeholder="Your Message"
              className="p-4 rounded-lg bg-slate-50 border border-slate-200 h-32 focus:outline-none focus:ring-2 focus:ring-slate-400"
            ></textarea>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-foreground text-background py-4 px-8 rounded-lg font-bold hover:bg-slate-800 transition-colors self-start"
            >
              Submit Enquiry
            </motion.button>
          </form>
        </div>
      </section>
    </>
  );
}
