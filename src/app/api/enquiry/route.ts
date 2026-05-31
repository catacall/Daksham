/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import configPromise from '@/payload.config'
import { getPayload } from 'payload'

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, message } = body

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
        status: 'new',
        source: 'website',
      } satisfies Partial<Record<string, any>>,
    })

    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.ADMIN_EMAIL!,
      subject: `New enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    })

    return NextResponse.json({ success: true, enquiry }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to submit enquiry' },
      { status: 500 }
    )
  }
}