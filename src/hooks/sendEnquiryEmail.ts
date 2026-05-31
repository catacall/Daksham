/* eslint-disable @typescript-eslint/no-explicit-any */

export const sendEnquiryEmail = async ({
  doc,
  operation,
  req,
}: any) => {
  if (operation !== 'create') return doc

  try {
    await req.payload.sendEmail({
      to: process.env.ADMIN_EMAIL,
      from: process.env.EMAIL_FROM,
      subject: `New Enquiry from ${doc.name}`,
      text: `
Name: ${doc.name}
Email: ${doc.email}
Phone: ${doc.phone}
Project: ${doc.projectInterestedIn || 'N/A'}

Message:
${doc.message}
      `,
    })

    req.payload.logger.info(
      `Enquiry notification sent for ${doc.email}`
    )
  } catch (error) {
    req.payload.logger.error(
      `Failed to send enquiry email: ${String(error)}`
    )
  }

  return doc
}