"use client"

import { motion } from 'framer-motion'

import Carousel from './Carousel'

export default function Ssc() {
  return (
   <>
   <section
          id="swc-carousel"
          className="py-12 sm:py-16 md:py-20 bg-off-white overflow-hidden relative"
        >
          <motion.div className="container mx-auto px-4 sm:px-6 mb-8 sm:mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-navy">
              Explore Our Vision
            </h2>
            <p className="mt-3 sm:mt-4 text-muted max-w-2xl mx-auto text-sm sm:text-base">
              Immerse yourself in our premier projects and architectural
              masterpieces.
            </p>
          </motion.div>
  
          <Carousel />
        </section>
   </>
  )
}
