'use client'

import { useEffect, useState } from 'react'
import EnquiryForm from '@/components/EnquiryForm'

export default function EnquiryModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 3000) // popup after 3 seconds

    return () => clearTimeout(timer)
  }, [])
  
  useEffect(() => {
  const seen = localStorage.getItem('enquiry-popup')

  if (!seen) {
    const timer = setTimeout(() => {
      setIsOpen(true)
      localStorage.setItem('enquiry-popup', 'true')
    }, 3000)

    return () => clearTimeout(timer)
  }
}, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative w-full max-w-lg rounded-xl bg-white p-6">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 text-xl"
        >
          ✕
        </button>

        <h2 className="mb-4 text-2xl font-bold">
          Enquire Now
        </h2>

        <EnquiryForm />
      </div>
    </div>
  )
}