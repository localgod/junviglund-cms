import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            description: 'URL-friendly identifier for the post',
            type: 'slug',
            options: {
              source: 'title',
              maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: [{type: 'author'}],
         }),
         defineField({
            name: 'mainImage',
            title: 'Main image',
            description: 'Featured image for the post',
            type: 'image',
            options: {
              hotspot: true,
            },
            fields: [
              {
                name: 'alt',
                type: 'string',
                title: 'Alternative text',
                description: 'Important for SEO and accessibility',
              },
            ],
        }),
        defineField({
            name: 'images',
            title: 'Image Gallery',
            description: 'Additional images for the post',
            type: 'array',
            options: {
              layout: 'grid'
            },
            of: [{
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative text',
                  description: 'Important for SEO and accessibility',
                },
              ],
            }]
        }),
        defineField({
            name: 'categories',
            title: 'Categories',
            description: 'Organize posts by topic',
            type: 'array',
            of: [{type: 'reference', to: [{type: 'category'}]}],
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            description: 'When the post was published',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'blockContent',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            media: 'mainImage',
        },
        prepare(selection: { author: any }) {
            const {author} = selection
            return Object.assign({}, selection, {
              subtitle: author && `by ${author}`,
            })
        }
    },
    
})