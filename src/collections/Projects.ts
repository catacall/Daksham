import type { CollectionConfig, FieldHook } from 'payload'

const formatSlug = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

const formatSlugHook = (fallback: string): FieldHook => ({
  operation,
  value,
  originalDoc,
  data,
}) => {
  if (typeof value === 'string' && value && value.trim()) {
    return formatSlug(value)
  }

  if (operation === 'create' || operation === 'update') {
    const fallbackData = data?.[fallback] || originalDoc?.[fallback]

    if (fallbackData && typeof fallbackData === 'string' && fallbackData.trim()) {
      return formatSlug(fallbackData)
    }
  }

  if (originalDoc?.slug) {
    return originalDoc.slug
  }
  return `project-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`
}

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'location', 'priceRange', 'publishedAt'],
    description: 'Add or update your projects here. Changes appear on the website instantly after saving.',
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    // ── Title ──
    {
      name: 'title',
      type: 'text',
      required: false,
      label: 'Project Name',
      admin: {
        description: 'e.g. Sai World City',
      },
    },

    // ── Status + Slug (sidebar) ──
    {
      name: 'status',
      type: 'select',
      required: false,
      defaultValue: 'ongoing',
      label: 'Project Status',
      admin: {
        position: 'sidebar',
        description: 'Change to Delivered when the project is complete',
      },
      options: [
        { label: '🏗️ Ongoing', value: 'ongoing' },
        { label: '✅ Delivered', value: 'delivered' },
      ],
    },

    {
      name: 'slug',
      type: 'text',
      required: false,
      unique: true,
      index: true,
      label: 'URL Slug (auto-generated)',
      hooks: {
        beforeValidate: [formatSlugHook('title')],
      },
      admin: {
        position: 'sidebar',
        description: 'Auto-filled from the project name. Do not edit unless needed.',
      },
    },

    {
      name: 'publishedAt',
      type: 'date',
      required: false,
      defaultValue: () => new Date().toISOString(),
      label: 'Date Added',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMM yyyy',
        },
      },
    },

    // ── Location + Price ──
    {
      type: 'row',
      fields: [
        {
          name: 'location',
          type: 'text',
          required: false,
          label: 'Location',
          admin: {
            description: 'e.g. Panvel, Navi Mumbai',
            width: '50%',
          },
        },
        {
          name: 'priceRange',
          type: 'text',
          required: false,
          label: 'Price Range',
          admin: {
            description: 'e.g. ₹45L – ₹90L or "Price on Request"',
            width: '50%',
          },
        },
      ],
    },

    // ── Config + RERA ──
    {
      type: 'row',
      fields: [
        {
          name: 'area',
          type: 'text',
          required: false,
          label: 'Unit Configurations',
          admin: {
            description: 'e.g. 2, 3 & 4 BHK Luxury Condos',
            width: '50%',
          },
        },
        {
          name: 'reraNumber',
          type: 'text',
          label: 'RERA Number',
          admin: {
            description: 'Official RERA registration number',
            width: '50%',
          },
        },
      ],
    },

    // ── Completion Date ──
    {
      name: 'completionDate',
      type: 'date',
      label: 'Expected Completion',
      admin: {
        description: 'When is this project expected to be ready?',
        date: {
          pickerAppearance: 'monthOnly',
          displayFormat: 'MMM yyyy',
        },
      },
    },

    // ── Description ──
    {
      name: 'description',
      type: 'textarea',
      required: false,
      label: 'Project Description',
      admin: {
        description: 'A short paragraph about this project. Keep it to 3–4 lines.',
        rows: 5,
      },
    },

    // ── Highlights ──
    {
      name: 'highlights',
      type: 'array',
      label: 'Project Highlights',
      admin: {
        description: 'Short selling points shown as tags. e.g. "RERA Approved", "Ready to Move", "3 mins from Station"',
      },
      fields: [
        {
          name: 'point',
          type: 'text',
          required: false,
          label: 'Highlight',
          admin: {
            description: 'Keep under 5 words',
          },
        },
      ],
    },

    // ── Images ──
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Cover Photo',
      admin: {
        description: 'Main photo shown on the projects listing page. Upload one clear image.',
      },
    },

    {
      name: 'images',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      label: 'Gallery Photos',
      admin: {
        description: 'Upload all photos for this project — exterior, interior, amenities, floor plans',
      },
    },

    // ── Amenity Photos ──
    {
      name: 'amenityPhotos',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      label: 'Amenity Photos',
      admin: {
        description: 'Photos showcasing amenities — pool, gym, lobby, garden, living spaces, etc. Shown in a dedicated section on the project page.',
      },
    },


    // ── YouTube ──
    {
      name: 'youtubeUrl',
      type: 'text',
      label: 'YouTube Video Link',
      admin: {
        description: 'Paste the full YouTube URL. e.g. https://youtube.com/watch?v=xxxx — will embed on the project page',
      },
    },

    // ── Amenities ──
    {
      name: 'amenities',
      type: 'array',
      label: 'Amenities',
      admin: {
        description: 'Group amenities by category for display on the project page',
      },
      fields: [
        {
          name: 'category',
          type: 'text',
          required: false,
          label: 'Category',
          admin: {
            description: 'e.g. Flooring, Kitchen, Security, Outdoor',
          },
        },
        {
          name: 'items',
          type: 'text',
          required: false,
          label: 'Items (comma separated)',
          admin: {
            description: 'e.g. Vitrified Tiles, Wooden Flooring, Anti-Skid Ceramic',
          },
        },
      ],
    },

    // ── Specifications ──
    {
      name: 'specifications',
      type: 'array',
      label: 'Specifications & Interior Images',
      admin: {
        description: 'Detail room specifications and features with interior photos (e.g., Living Room, Kitchen, Bedrooms)',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Specification Title',
          admin: {
            description: 'e.g. Living Room, Modular Kitchen, Bathroom Fittings',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Specification Details',
          admin: {
            description: 'Provide details about materials, flooring, fittings, etc.',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Interior/Detail Photo',
          admin: {
            description: 'Photo showing this specific area/specification',
          },
        },
      ],
    },
  ],
}
