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
  if (typeof value === 'string' && value) {
    return formatSlug(value)
  }

  if (operation === 'create' || operation === 'update') {
    const fallbackData = data?.[fallback] || originalDoc?.[fallback]

    if (fallbackData && typeof fallbackData === 'string') {
      return formatSlug(fallbackData)
    }
  }

  return value
}

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'publishedAt'],
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      hooks: {
        beforeValidate: [formatSlugHook('title')],
      },
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'ongoing',
      options: [
        {
          label: 'Ongoing',
          value: 'ongoing',
        },
        {
          label: 'Delivered',
          value: 'delivered',
        },
      ],
    },
    {
      name: 'location',
      type: 'text',
      required: true,
    },
    {
      name: 'area',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. 2BHK | 3BHK',
      },
    },
    {
      name: 'priceRange',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. ₹45L – ₹90L',
      },
    },
    {
      name: 'images',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      required: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
