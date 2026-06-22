import type { CollectionConfig, CollectionSlug } from "payload";

export const Enquiries: CollectionConfig = {
  slug: "enquiries",
  admin: {
    hidden: true,
    group: "Leads",
    defaultColumns: ["name", "phone", "projectInterestedIn", "status", "followUpDate", "createdAt"],
    useAsTitle: "name",
    description: "All website enquiries. Update status after each call. Add notes so nothing is forgotten.",
  },
  access: {
    read: ({ req }) => !!req.user,
    create: () => true,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  timestamps: true,
  fields: [
    // ── Row 1: Name + Phone ──
    {
      type: "row",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
          label: "Full Name",
          admin: {
            description: "Lead's full name as entered on the form",
            width: "50%",
          },
        },
        {
          name: "phone",
          type: "text",
          required: true,
          label: "Phone Number",
          admin: {
            description: "Click to call directly from your phone",
            width: "50%",
          },
        },
      ],
    },

    // ── Row 2: Email + Source ──
    {
      type: "row",
      fields: [
        {
          name: "email",
          type: "email",
          required: true,
          label: "Email Address",
          admin: { width: "60%" },
        },
        {
          name: "source",
          type: "text",
          defaultValue: "website",
          label: "How they found us",
          admin: {
            description: "website / whatsapp / referral / walk-in",
            width: "40%",
          },
        },
      ],
    },

    // ── Project Interest ──
    {
      name: "projectInterestedIn",
      type: "relationship",
      relationTo: "projects" as unknown as CollectionSlug,
      label: "Project They Asked About",
      admin: {
        description: "Which project did this person enquire about?",
      },
    },

    // ── Message ──
    {
      name: "message",
      type: "textarea",
      required: true,
      label: "Their Message",
      admin: {
        description: "Exactly what they typed in the form",
        rows: 3,
      },
    },

    // ── Status + Follow-up (sidebar) ──
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      label: "Status",
      required: true,
      admin: {
        position: "sidebar",
        description: "Update this after every interaction",
      },
      options: [
        { label: "🟡 New Lead", value: "new" },
        { label: "📞 Called — No Answer", value: "no_answer" },
        { label: "💬 Contacted", value: "contacted" },
        { label: "🤝 Meeting Scheduled", value: "meeting" },
        { label: "✅ Won / Booking Done", value: "closed" },
        { label: "❌ Not Interested", value: "lost" },
      ],
    },

    {
      name: "followUpDate",
      type: "date",
      label: "Follow-up Date",
      admin: {
        position: "sidebar",
        description: "When should you call them back?",
        date: {
          pickerAppearance: "dayOnly",
          displayFormat: "d MMM yyyy",
        },
      },
    },

    // ── Notes ──
    {
      name: "notes",
      type: "textarea",
      label: "Your Notes",
      admin: {
        description: "Private notes — customer preferences, what was discussed, next steps",
        rows: 4,
      },
    },
  ],
};
