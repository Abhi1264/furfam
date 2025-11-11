import type { Media } from '@/payload-types'

export const petImage1: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Dog eating premium pet food - placeholder image',
  caption: {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: "Premium pet nutrition is essential for your dog's health and wellbeing.",
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
}
