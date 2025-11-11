import type { Media, User } from '@/payload-types'
import { RequiredDataFromCollectionSlug } from 'payload'

export type PostArgs = {
  heroImage: Media
  blockImage: Media
  author: User
}

export const petPost2: (args: PostArgs) => RequiredDataFromCollectionSlug<'posts'> = ({
  heroImage,
  blockImage,
  author,
}) => {
  return {
    slug: 'cat-grooming-tips-and-best-practices',
    _status: 'published',
    authors: [author],
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Keeping Your Cat Clean and Healthy',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            tag: 'h2',
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'While cats are known for their self-grooming abilities, regular grooming from their owners is essential for maintaining their health and preventing issues like matting, hairballs, and skin problems. Regular grooming sessions also provide an opportunity to check for fleas, ticks, skin abnormalities, or other health concerns.',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            textFormat: 0,
            version: 1,
          },
          {
            type: 'heading',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Brushing Your Cat',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            tag: 'h2',
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: "Regular brushing removes loose hair, prevents matting, and reduces hairballs. Short-haired cats benefit from weekly brushing, while long-haired breeds may need daily attention. Use a brush appropriate for your cat's coat type, and always brush gently in the direction of hair growth. Make grooming a positive experience with treats and praise.",
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            textFormat: 0,
            version: 1,
          },
          {
            type: 'block',
            fields: {
              blockName: '',
              blockType: 'mediaBlock',
              media: blockImage.id,
            },
            format: '',
            version: 2,
          },
          {
            type: 'heading',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Bathing Your Cat',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            tag: 'h2',
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: "Most cats don't need frequent baths, but occasional bathing can help with skin conditions or if your cat gets into something messy. Use cat-specific shampoo and lukewarm water. Keep the experience calm and quick, and ensure your cat is completely dry afterward to prevent chills. If your cat is particularly resistant to baths, consider professional grooming services.",
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            textFormat: 0,
            version: 1,
          },
          {
            type: 'heading',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Nail Trimming and Ear Care',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            tag: 'h2',
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Regular nail trims prevent painful overgrowth and protect your furniture. Trim nails every 2-3 weeks using cat-specific nail clippers, being careful to avoid the quick. Check ears weekly for dirt, wax buildup, or signs of infection. Clean gently with a cotton ball and cat-safe ear cleaner if needed, but never insert anything into the ear canal.',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            textFormat: 0,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    heroImage: heroImage.id,
    meta: {
      description:
        'Expert cat grooming tips including brushing, bathing, nail trimming, and ear care. Learn how to keep your cat clean and healthy.',
      image: heroImage.id,
      title: 'Cat Grooming Tips and Best Practices - Complete Guide',
    },
    relatedPosts: [],
    title: 'Cat Grooming Tips and Best Practices',
  }
}
