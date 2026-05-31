'use client'

import { useState } from 'react'

export default function EnquiryForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent <HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setSuccess('')
    setError('')

    const form = new FormData(e.currentTarget)

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
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.message || 'Something went wrong')
    } else {
      setSuccess('Enquiry sent successfully')
      e.currentTarget.reset()
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" placeholder="Name" className="w-full border p-3" />
      <input name="email" type="email" placeholder="Email" className="w-full border p-3" />
      <input name="phone" placeholder="Phone" className="w-full border p-3" />
      <textarea name="message" placeholder="Message" className="w-full border p-3" />
      <button disabled={loading} className="bg-black text-white px-5 py-3">
        {loading ? 'Sending...' : 'Send Enquiry'}
      </button>
      {success && <p className="text-green-600">{success}</p>}
      {error && <p className="text-red-600">{error}</p>}
    </form>
  )
}