import type { Media } from '@/payload-types'

export const petImageHero: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Happy pets at FurFam Pet Shop - placeholder image',
}
