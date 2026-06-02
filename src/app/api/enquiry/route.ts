/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import configPromise from '@/payload.config'
import { getPayload } from 'payload'

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, message, projectInterestedIn } = body

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config: configPromise })

    const enquiry = await payload.create({
      collection: 'enquiries' as any,
      data: {
        name,
        email,
        phone,
        message,
        projectInterestedIn,
        status: 'new',
        source: 'website',
      } satisfies Partial<Record<string, any>>,
    })

    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.ADMIN_EMAIL!,
      subject: `New enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nProject: ${projectInterestedIn || 'N/A'}\nMessage: ${message}`,
    })

    return NextResponse.json({ success: true, enquiry }, { status: 200 })
  } catch (error) {
  console.error('API Error:', error)

  return NextResponse.json(
    {
      message: 'Failed to submit enquiry',
      error: String(error),
    },
    { status: 500 }
  )

  }
}