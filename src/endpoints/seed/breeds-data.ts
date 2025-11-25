import { Media } from '@/payload-types'

type LexicalText = {
  type: 'text'
  detail: number
  format: number
  mode: 'normal'
  style: string
  text: string
  version: number
}

type LexicalParagraph = {
  type: 'paragraph'
  children: LexicalText[]
  direction: 'ltr' | 'rtl' | null
  format: '' | 'left' | 'start' | 'center' | 'right' | 'end' | 'justify'
  indent: number
  textFormat: number
  version: number
}

type LexicalRoot = {
  type: 'root'
  children: LexicalParagraph[]
  direction: 'ltr' | 'rtl' | null
  format: '' | 'left' | 'start' | 'center' | 'right' | 'end' | 'justify'
  indent: number
  version: number
}

type LexicalRichText = {
  root: LexicalRoot
}

export const breedsData = (image1: Media, image2: Media, image3: Media) => [
  {
    name: 'Golden Retriever',
    slug: 'golden-retriever',
    shortDescription: 'Friendly, intelligent, and devoted.',
    description: {
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
                text: 'The Golden Retriever is a Scottish breed of retriever dog of a medium size. It is characterised by a gentle and affectionate nature and a striking golden coat.',
                version: 1,
              },
            ],
            direction: 'ltr' as const,
            format: '' as const,
            indent: 0,
            textFormat: 0,
            version: 1,
          },
        ],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        version: 1,
      },
    } as LexicalRichText,
    image: image1.id,
    gallery: [
        { image: image1.id },
        { image: image2.id }
    ],
    price: 1500,
    temperament: 'Friendly, Intelligent, Devoted',
    lifeExpectancy: '10-12 years',
    size: 'large' as const,
    origin: 'Scotland',
    _status: 'published',
  },
  {
    name: 'French Bulldog',
    slug: 'french-bulldog',
    shortDescription: 'Adaptable, playful, and smart.',
    description: {
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
                text: 'The French Bulldog is a breed of domestic dog, bred to be companion dogs. The breed is the result of a cross between Toy Bulldogs imported from England and local ratters in Paris.',
                version: 1,
              },
            ],
            direction: 'ltr' as const,
            format: '' as const,
            indent: 0,
            textFormat: 0,
            version: 1,
          },
        ],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        version: 1,
      },
    } as LexicalRichText,
    image: image2.id,
    gallery: [
        { image: image2.id },
        { image: image3.id }
    ],
    price: 2500,
    temperament: 'Playful, Affectionate, Easygoing',
    lifeExpectancy: '10-12 years',
    size: 'small' as const,
    origin: 'France/England',
    _status: 'published',
  },
  {
    name: 'German Shepherd',
    slug: 'german-shepherd',
    shortDescription: 'Confident, courageous, and smart.',
    description: {
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
                text: 'The German Shepherd is a breed of medium to large-sized working dog that originated in Germany. They are known for their intelligence, loyalty, and versatility.',
                version: 1,
              },
            ],
            direction: 'ltr' as const,
            format: '' as const,
            indent: 0,
            textFormat: 0,
            version: 1,
          },
        ],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        version: 1,
      },
    } as LexicalRichText,
    image: image3.id,
    gallery: [
        { image: image3.id },
        { image: image1.id }
    ],
    price: 1800,
    temperament: 'Loyal, Confident, Courageous',
    lifeExpectancy: '7-10 years',
    size: 'large' as const,
    origin: 'Germany',
    _status: 'published',
  },
]
