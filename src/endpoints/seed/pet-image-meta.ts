import type { Media } from '@/payload-types'

export const petImageMeta: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'FurFam Pet Shop - premium pet supplies and services - placeholder image',
}
