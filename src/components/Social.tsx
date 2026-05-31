"use client";
import { motion } from "framer-motion";

export default function Social(){
    //  const badges = [
    //    {
    //      icon: <instagram size={24} />,
    //      href: "https://wa.me/1234567890",
    //      color: "bg-green-500",
    //      delay: 0.1,
    //      name: "WhatsApp",
    //    },
    //    {
    //      icon: <Mail size={24} />,
    //      href: "mailto:contact@paradisegroup.com",
    //      color: "bg-blue-500",
    //      delay: 0.2,
    //      name: "Email",
    //    },
    //    {
    //      icon: <Phone size={24} />,
    //      href: "tel:+1234567890",
    //      color: "bg-accent",
    //      delay: 0.3,
    //      name: "Phone",
    //    },
    //  ];
    return (
      <>
        <section id="connect" className="section-padding bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="mb-16">
              <h4 className="text-accent text-sm md:text-base mb-3 font-medium tracking-wide uppercase">
                Socials
              </h4>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans text-foreground font-medium uppercase leading-snug tracking-wide">
                Connect With Us
              </h2>
            </div>
            <div className="flex gap-6">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="w-14 h-14 rounded-full bg-blue-200 hover:bg-blue-300 transition-colors flex items-center justify-center font-bold text-lg"
              >
                FB
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="w-14 h-14 rounded-full bg-slate-200 hover:bg-slate-300 transition-colors flex items-center justify-center font-bold text-lg"
              >
                X
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="w-14 h-14 rounded-full bg-pink-200 hover:bg-pink-300 transition-colors flex items-center justify-center font-bold text-lg"
              >
                <i className="fi fi-brands-instagram"></i>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="w-14 h-14 rounded-full bg-slate-200 hover:bg-slate-300 transition-colors flex items-center justify-center font-bold text-lg"
              >
                LI
              </motion.a>
            </div>
          </div>
        </section>
      </>
    );
}