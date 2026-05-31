import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig ={
    slug:'site-settings',
    admin : {
        group:'Site',
        description : 'Main website settings across the frontend. ' ,
    },
    access : {
        read : () => true,
    },
    fields : [
        {
            name : 'SiteName',
            type : 'text',
            required : true,
            defaultValue: 'My website',
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

