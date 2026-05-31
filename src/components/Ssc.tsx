"use client"

import { motion } from 'framer-motion'

import Carousel from './Carousel'

export default function Ssc() {
  return (
   <>
   <section
           id="swc-carousel"
           className="py-20 bg-slate-50 overflow-hidden relative"
         >
           <motion.div className="container mx-auto px-6 mb-10 text-center">
             <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
               Explore Our Vision
             </h2>
             <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
               Immerse yourself in our premier projects and architectural
               masterpieces.
             </p>
           </motion.div>
   
           <Carousel />
         </section>
   </>
  )
}
