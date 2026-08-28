import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig ={
    slug:'site-settings',
    admin : {
        group:'Site',
        description : 'Main website settings across the frontend. ' ,
    },
    access : {
        read : () => true,
        update: ({ req }) => !!req.user,
    },
    fields : [
        {
            name : 'SiteName',
            type : 'text',
            defaultValue: 'Daksham Developers',
        },
        {
            name: 'logo',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'favicon',
            type : 'upload',
            relationTo : 'media',
        },
        {
            name: 'brochure',
            type: 'upload',
            relationTo: 'media',
            label: 'E-Brochure (PDF)',
            admin: {
                description: 'Upload the general website brochure PDF here for download on the home page',
            },
        },
        {
            name: 'heroMediaType',
            type: 'select',
            options: [
                { label: 'Cinematic Video', value: 'video' },
                { label: 'Static Hero Image', value: 'image' },
            ],
            defaultValue: 'video',
            label: 'Hero Media Type',
        },
        {
            name: 'heroVideo',
            type: 'upload',
            relationTo: 'media',
            label: 'Hero Video File (MP4/WebM)',
        },
        {
            name: 'heroVideoUrl',
            type: 'text',
            label: 'Hero Video Direct URL (Optional)',
            defaultValue: '/videoplayback.mp4',
        },
        {
            name: 'heroPoster',
            type: 'upload',
            relationTo: 'media',
            label: 'Hero Video Poster / Fallback Image',
        },
        {
            name: 'heroPosterUrl',
            type: 'text',
            label: 'Hero Poster URL (Optional)',
        },
        {
            name: 'heroImage',
            type: 'upload',
            relationTo: 'media',
            label: 'Hero Static Image',
        },
        {
            name: 'heroVideoEnabled',
            type: 'checkbox',
            label: 'Enable Hero Video Background',
            defaultValue: true,
        },
        {
            name: 'primaryPhone',
            type: 'text',
        },
        { 
            name: 'primaryEmail',
            type: 'email',
        },
        {
            name: 'address',
            type: 'textarea',
        },
        {
            name: 'whatsapp',
            type: 'text',
        },
        {
            name: 'businessHours',
            type: 'textarea',
        },
        {
            name: 'socialLinks',
            type: 'array',
            fields : [
                {
                    name : 'platform',
                    type : 'select',
                    required: true,
                    options: ['Facebook', 'Instagram',
                    'LinkedIn', 'YouTube', 
                    'X'
                    ]
                },
                {
                        name : 'url',
                        type : 'text',
                        required: true,
                },
            ],
        },
        {
            name: 'defaultSEO',
            type:'group',
            fields: [
                {
                    name: 'title',
                    type: 'text',
                },
                {
                    name: 'description',
                    type : 'textarea',
                },
                {
                    name: 'image',
                    type : 'upload',
                    relationTo: 'media',
                },
            ],
        },
    ],
}

