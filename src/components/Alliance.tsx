"use client";

import { motion } from "framer-motion";

export default function Alliance() {
  const partners = [
    {
      name: "HDFC Bank",
      role: "Strategic Banking Partner",
      desc: "Pre-approved home finance and project escrow accounts.",
      logoText: "HDFC",
    },
    {
      name: "ICICI Bank",
      role: "Official Finance Partner",
      desc: "Instant digital sanctions and tailored home loan solutions.",
      logoText: "ICICI",
    },
    {
      name: "State Bank of India",
      role: "Home Finance Partner",
      desc: "Low-interest home loan approvals and clear title validations.",
      logoText: "SBI",
    },
    {
      name: "L&T Construction",
      role: "Infrastructure Consultant",
      desc: "Engineering support for seismic proof concrete frameworks.",
      logoText: "L&T",
    },
    {
      name: "Hafele India",
      role: "Premium Fittings Partner",
      desc: "Upscale kitchen systems and architectural hardware.",
      logoText: "HÄFELE",
    },
    {
      name: "Somany Ceramics",
      role: "Exquisite Flooring Partner",
      desc: "Italian marble finish vitrified slabs and bathroom tile design.",
      logoText: "SOMANY",
    },
  ];

  return (
    <section id="alliance" className="section-padding bg-slate-50 border-t border-slate-200/50">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <motion.h4
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent text-xs md:text-sm font-sans font-bold tracking-[0.3em] uppercase mb-3 block"
          >
            Alliances
          </motion.h4>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-sans text-foreground font-medium uppercase leading-snug tracking-wider mb-6"
          >
            Strategic Partners
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans text-slate-600 font-light leading-relaxed text-sm md:text-base"
          >
            Collaborating with leading financial institutions and premium material manufacturers to ensure rapid financing approvals, quality materials, and structural engineering precision.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
              className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 flex flex-col gap-4 shadow-sm hover:border-accent/40 transition-all duration-300 group"
            >
              <div className="flex justify-between items-center">
                <div className="h-10 px-4 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-accent/10 transition-colors">
                  <span className="font-display font-extrabold text-[11px] tracking-widest text-foreground group-hover:text-accent transition-colors uppercase">
                    {partner.logoText}
                  </span>
                </div>
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md">
                  Verified Alliance
                </span>
              </div>
              <div>
                <h3 className="font-display font-medium text-lg md:text-xl text-foreground mb-1 group-hover:text-accent transition-colors">
                  {partner.name}
                </h3>
                <p className="font-sans text-xs font-semibold text-accent uppercase tracking-wider mb-3">
                  {partner.role}
                </p>
                <p className="font-sans text-xs md:text-sm text-slate-500 leading-relaxed font-light">
                  {partner.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
