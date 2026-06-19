// @ts-nocheck
'use client'

import { useEffect, useState } from 'react'
import { EnquiryForm } from '@/components/EnquiryForm'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function EnquiryModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState('')

  useEffect(() => {
    // Check if user has seen the popup during this session/visit
    const seen = sessionStorage.getItem('enquiry-popup-seen')

    if (!seen) {
      const timer = setTimeout(() => {
        setIsOpen(true)
        sessionStorage.setItem('enquiry-popup-seen', 'true')
      }, 5000) // popup after 5 seconds of the visit

      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ project?: string }>
      if (customEvent.detail?.project) {
        setSelectedProject(customEvent.detail.project)
      } else {
        setSelectedProject('')
      }
      setIsOpen(true)
    }

    window.addEventListener('open-enquiry-modal', handleOpen)
    return () => window.removeEventListener('open-enquiry-modal', handleOpen)
  }, [])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Smooth Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60"
          />

          {/* Smooth Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-lg rounded-3xl bg-background p-6 md:p-8 shadow-2xl shadow-slate-900/20 border border-border z-10"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-5 top-5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <h2 className="mb-2 text-2xl md:text-3xl font-display font-medium text-foreground uppercase tracking-wide">
              Enquire Now
            </h2>
            {selectedProject && (
              <p className="mb-4 text-sm font-sans text-accent font-semibold uppercase tracking-wider">
                Interested in: {selectedProject}
              </p>
            )}

            <EnquiryForm defaultProject={selectedProject} onSuccess={() => setTimeout(() => setIsOpen(false), 2000)} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}