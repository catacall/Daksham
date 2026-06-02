'use client'

import { useState } from 'react'

interface EnquiryFormProps {
  defaultProject?: string
  onSuccess?: () => void
}

export default function EnquiryForm({ defaultProject = '', onSuccess }: EnquiryFormProps) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const targetForm = e.currentTarget
    setLoading(true)
    setSuccess('')
    setError('')

    const form = new FormData(targetForm)

    const res = await fetch('/api/enquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: form.get('name'),
        email: form.get('email'),
        phone: form.get('phone'),
        message: form.get('message'),
        projectInterestedIn: form.get('projectInterestedIn') || defaultProject,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.message || 'Something went wrong')
    } else {
      setSuccess('Enquiry sent successfully!')
      targetForm.reset()
      if (onSuccess) {
        onSuccess()
      }
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="hidden"
        name="projectInterestedIn"
        value={defaultProject}
      />
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
          Full Name
        </label>
        <input
          required
          name="name"
          placeholder="John Doe"
          className="w-full rounded-xl border border-slate-200 p-3.5 text-sm font-sans focus:border-accent focus:outline-hidden transition-colors"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
            Email Address
          </label>
          <input
            required
            name="email"
            type="email"
            placeholder="john@example.com"
            className="w-full rounded-xl border border-slate-200 p-3.5 text-sm font-sans focus:border-accent focus:outline-hidden transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
            Phone Number
          </label>
          <input
            required
            name="phone"
            placeholder="+91 99999 99999"
            className="w-full rounded-xl border border-slate-200 p-3.5 text-sm font-sans focus:border-accent focus:outline-hidden transition-colors"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
          Your Message
        </label>
        <textarea
          required
          name="message"
          rows={3}
          placeholder="I would like to enquire about pricing and availability..."
          className="w-full rounded-xl border border-slate-200 p-3.5 text-sm font-sans focus:border-accent focus:outline-hidden transition-colors resize-none"
        />
      </div>
      <button
        disabled={loading}
        className="w-full bg-foreground text-background hover:bg-accent hover:text-foreground disabled:bg-slate-300 disabled:text-slate-500 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md"
      >
        {loading ? 'Sending Request...' : 'Submit Request'}
      </button>
      {success && 
      <p className="text-sm font-medium text-emerald-600 text-center animate-pulse">{success}</p>
      }
      {error && 
      <p className="text-sm font-medium text-red-600 text-center">{error}</p>
      }
    </form>
  )
}