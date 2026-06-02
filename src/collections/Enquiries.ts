import type { CollectionConfig } from "payload";

export const Enquiries: CollectionConfig = {
    slug: 'enquiries',
    admin: {
        group : 'leads',
        defaultColumns: ['name', 'email', 'phone', 'status' , 'createdAt'],
        useAsTitle: 'name',
    },
    access: {
        read : ({req}) => !!req.user,
        create: () => true,
        update: ({req}) => !!req.user,
        delete: ({req}) => !!req.user,
    },
    fields: [
        {
            name: 'name', type: 'text', required: true
        },
        {
            name: 'email',type: 'text', required: true
        },
        {
            name: 'phone',type: 'text', required: true
        },
        {
            name: 'projectInterestedIn', type: 'text'
        },
        {
            name: 'message', type: 'textarea', required: true
        },
        {
            name: 'status',
            type: 'select',
            defaultValue: 'new',
            options: ['new' , 'contacted' , 'closed'],

        },
        {
            name: 'source', type: 'text' ,defaultValue: 'website'
        },
        {
            name: 'notes' , type : 'textarea'
        },
    ],
}