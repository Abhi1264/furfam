import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'

import { contactForm as contactFormData } from './contact-form'
import { petShopContact } from './pet-shop-contact'
import { petShopHome } from './pet-shop-home'
import { petShopAbout } from './pet-shop-about'
import { petShopServices } from './pet-shop-services'
import { petShopProducts } from './pet-shop-products'
import { petImageHero } from './pet-image-hero'
import { petImage1 } from './pet-image-1'
import { petImage2 } from './pet-image-2'
import { petImage3 } from './pet-image-3'
import { petImage4 } from './pet-image-4'
import { petImage5 } from './pet-image-5'
import { petImage6 } from './pet-image-6'
import { petImageMeta } from './pet-image-meta'
import { petPost1 } from './pet-post-1'
import { petPost2 } from './pet-post-2'
import { petPost3 } from './pet-post-3'
import { petPost4 } from './pet-post-4'
import { petPost5 } from './pet-post-5'
import { petPost6 } from './pet-post-6'
import { breedsData } from './breeds-data'

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'posts',
  'forms',
  'form-submissions',
  'search',
  'breeds',
]

const globals: GlobalSlug[] = ['header', 'footer']

const categories = [
  'Dogs',
  'Cats',
  'Small Pets',
  'Birds',
  'Fish',
  'Pet Care',
  'Nutrition',
  'Grooming',
]

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  // this is because while `yarn seed` drops the database
  // the custom `/api/seed` endpoint does not
  payload.logger.info(`— Clearing collections and globals...`)

  // Clear globals sequentially to avoid any potential conflicts
  for (const global of globals) {
    try {
      await payload.updateGlobal({
        slug: global,
        data: {
          navItems: [],
        },
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      })
    } catch (error) {
      payload.logger.warn(`Failed to clear global ${global}: ${error}`)
    }
  }

  // Delete collections sequentially to avoid deadlocks with foreign key constraints
  // Delete versions FIRST, then delete actual records
  // Delete in order: child collections first, then parent collections
  const deleteOrder = [
    'form-submissions', // Child of forms
    'posts', // May reference categories, media, users
    'pages', // May reference media, forms
    'breeds', // May reference media
    'categories', // Referenced by posts
    'media', // Referenced by pages and posts
    'forms', // Referenced by pages
    'search', // May reference other collections
  ]

  // Helper function to retry on deadlock
  const deleteWithRetry = async (
    operation: () => Promise<void>,
    collectionName: string,
    maxRetries = 3,
  ) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await operation()
        return // Success
      } catch (error: unknown) {
        const message =
          typeof error === 'object' && error !== null ? (error as { message?: string }).message : ''
        const errMessage =
          typeof error === 'object' && error !== null
            ? (error as { err?: { message?: string } }).err?.message
            : ''
        const isDeadlock = Boolean(
          message?.includes('deadlock') || errMessage?.includes('deadlock'),
        )
        if (isDeadlock && attempt < maxRetries) {
          const delay = attempt * 200 // Exponential backoff: 200ms, 400ms, 600ms
          payload.logger.warn(
            `Deadlock detected for ${collectionName}, retrying in ${delay}ms (attempt ${attempt}/${maxRetries})`,
          )
          await new Promise((resolve) => setTimeout(resolve, delay))
          continue
        }
        throw error // Re-throw if not a deadlock or max retries reached
      }
    }
  }

  // First, delete all versions sequentially
  for (const collection of deleteOrder) {
    // Safely read versions config with a typed lookup
    const collDef = (payload.collections as Record<string, { config?: { versions?: unknown } }>)[
      collection
    ]
    const hasVersions = Boolean(collDef?.config?.versions)
    if (collections.includes(collection as CollectionSlug) && hasVersions) {
      try {
        await deleteWithRetry(
          () =>
            payload.db.deleteVersions({ collection: collection as CollectionSlug, req, where: {} }),
          `${collection} versions`,
        )
        // Small delay to avoid race conditions
        await new Promise((resolve) => setTimeout(resolve, 100))
      } catch (error) {
        payload.logger.warn(`Failed to delete versions for ${collection}: ${error}`)
      }
    }
  }

  // Then, delete actual records sequentially
  for (const collection of deleteOrder) {
    if (collections.includes(collection as CollectionSlug)) {
      try {
        await deleteWithRetry(
          () => payload.db.deleteMany({ collection: collection as CollectionSlug, req, where: {} }),
          collection,
        )
        // Small delay to avoid race conditions
        await new Promise((resolve) => setTimeout(resolve, 100))
      } catch (error) {
        payload.logger.warn(`Failed to delete records for ${collection}: ${error}`)
        // Continue with next collection even if one fails
      }
    }
  }

  payload.logger.info(`— Seeding demo author and user...`)

  await payload.delete({
    collection: 'users',
    depth: 0,
    where: {
      email: {
        equals: 'pet-care@furfam.com',
      },
    },
  })

  payload.logger.info(`— Seeding media...`)

  // Create placeholder images - user will replace these manually
  const placeholderImageBuffer = createPlaceholderImage()

  const [
    demoAuthor,
    petHeroImage,
    petImage1Doc,
    petImage2Doc,
    petImage3Doc,
    petImage4Doc,
    petImage5Doc,
    petImage6Doc,
    petMetaImage,
  ] = await Promise.all([
    payload.create({
      collection: 'users',
      data: {
        name: 'Pet Care Expert',
        email: 'pet-care@furfam.com',
        password: 'password',
      },
    }),
    payload.create({
      collection: 'media',
      data: petImageHero,
      file: placeholderImageBuffer,
    }),
    payload.create({
      collection: 'media',
      data: petImage1,
      file: placeholderImageBuffer,
    }),
    payload.create({
      collection: 'media',
      data: petImage2,
      file: placeholderImageBuffer,
    }),
    payload.create({
      collection: 'media',
      data: petImage3,
      file: placeholderImageBuffer,
    }),
    payload.create({
      collection: 'media',
      data: petImage4,
      file: placeholderImageBuffer,
    }),
    payload.create({
      collection: 'media',
      data: petImage5,
      file: placeholderImageBuffer,
    }),
    payload.create({
      collection: 'media',
      data: petImage6,
      file: placeholderImageBuffer,
    }),
    payload.create({
      collection: 'media',
      data: petImageMeta,
      file: placeholderImageBuffer,
    }),
  ])

  payload.logger.info(`— Seeding categories...`)

  // Create categories sequentially to avoid foreign key constraint violations
  // Categories may have nested relationships (breadcrumbs) that require sequential creation
  const categoryDocs = []
  for (const category of categories) {
    try {
      const categoryDoc = await payload.create({
        collection: 'categories',
        data: {
          title: category,
          slug: category.toLowerCase().replace(/\s+/g, '-'),
        },
      })
      categoryDocs.push(categoryDoc)
    } catch (error) {
      payload.logger.warn(`Failed to create category ${category}: ${error}`)
    }
  }

  payload.logger.info(`— Seeding posts...`)

  // Do not create posts with `Promise.all` because we want the posts to be created in order
  // This way we can sort them by `createdAt` or `publishedAt` and they will be in the expected order
  const post1Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: petPost1({ heroImage: petImage1Doc, blockImage: petImage1Doc, author: demoAuthor }),
  })

  const post2Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: petPost2({ heroImage: petImage2Doc, blockImage: petImage2Doc, author: demoAuthor }),
  })

  const post3Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: petPost3({ heroImage: petImage3Doc, blockImage: petImage3Doc, author: demoAuthor }),
  })

  const post4Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: petPost4({ heroImage: petImage4Doc, blockImage: petImage4Doc, author: demoAuthor }),
  })

  const post5Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: petPost5({ heroImage: petImage5Doc, blockImage: petImage5Doc, author: demoAuthor }),
  })

  const post6Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: petPost6({ heroImage: petImage6Doc, blockImage: petImage6Doc, author: demoAuthor }),
  })

  // update each post with related posts
  await payload.update({
    id: post1Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post2Doc.id, post3Doc.id],
      categories: [],
    },
  })
  await payload.update({
    id: post2Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post4Doc.id],
      categories: [],
    },
  })
  await payload.update({
    id: post3Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post5Doc.id],
      categories: [],
    },
  })
  await payload.update({
    id: post4Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post2Doc.id, post6Doc.id],
      categories: [],
    },
  })
  await payload.update({
    id: post5Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post3Doc.id, post6Doc.id],
      categories: [],
    },
  })
  await payload.update({
    id: post6Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post4Doc.id, post5Doc.id],
      categories: [],
    },
  })

  payload.logger.info(`— Seeding breeds...`)

  const breeds = breedsData(petImage1Doc, petImage2Doc, petImage3Doc)

  for (const breed of breeds) {
    try {
        await payload.create({
            collection: 'breeds',
            data: breed,
        })
    } catch (error) {
        payload.logger.warn(`Failed to seed breed ${breed.name}: ${error}`)
    }
  }

  payload.logger.info(`— Seeding contact form...`)

  const contactForm = await payload.create({
    collection: 'forms',
    depth: 0,
    data: contactFormData,
  })

  payload.logger.info(`— Seeding pages...`)

  const [homePage, aboutPage, servicesPage, productsPage, contactPage] = await Promise.all([
    payload.create({
      collection: 'pages',
      depth: 0,
      data: petShopHome({ heroImage: petHeroImage, metaImage: petMetaImage }),
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      data: petShopAbout({ heroImage: petHeroImage }),
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      data: petShopServices({ heroImage: petHeroImage }),
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      data: petShopProducts({ heroImage: petHeroImage }),
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      data: petShopContact({ contactForm: contactForm }),
    }),
  ])

  payload.logger.info(`— Seeding globals...`)

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: [
          {
            link: {
              type: 'reference',
              label: 'Home',
              reference: {
                relationTo: 'pages',
                value: homePage.id,
              },
            },
          },
          {
            link: {
              type: 'reference',
              label: 'About',
              reference: {
                relationTo: 'pages',
                value: aboutPage.id,
              },
            },
          },
          {
            link: {
                type: 'custom',
                label: 'Breeds',
                url: '/breeds',
            },
          },
          {
            link: {
              type: 'reference',
              label: 'Services',
              reference: {
                relationTo: 'pages',
                value: servicesPage.id,
              },
            },
          },
          {
            link: {
              type: 'reference',
              label: 'Products',
              reference: {
                relationTo: 'pages',
                value: productsPage.id,
              },
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Blog',
              url: '/posts',
            },
          },
          {
            link: {
              type: 'reference',
              label: 'Contact',
              reference: {
                relationTo: 'pages',
                value: contactPage.id,
              },
            },
          },
        ],
      },
    }),
    payload.updateGlobal({
      slug: 'footer',
      data: {
        navItems: [
          {
            link: {
              type: 'reference',
              label: 'About',
              reference: {
                relationTo: 'pages',
                value: aboutPage.id,
              },
            },
          },
          {
            link: {
                type: 'custom',
                label: 'Breeds',
                url: '/breeds',
            },
          },
          {
            link: {
              type: 'reference',
              label: 'Services',
              reference: {
                relationTo: 'pages',
                value: servicesPage.id,
              },
            },
          },
          {
            link: {
              type: 'reference',
              label: 'Products',
              reference: {
                relationTo: 'pages',
                value: productsPage.id,
              },
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Blog',
              url: '/posts',
            },
          },
          {
            link: {
              type: 'reference',
              label: 'Contact',
              reference: {
                relationTo: 'pages',
                value: contactPage.id,
              },
            },
          },
        ],
      },
    }),
  ])

  payload.logger.info('Seeded database successfully!')
}

// Creates a simple 1x1 pixel PNG placeholder image
// User will replace these with actual images manually
function createPlaceholderImage(): File {
  // Minimal valid PNG: 1x1 pixel transparent PNG
  const pngData = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    'base64',
  )

  return {
    name: 'placeholder.png',
    data: pngData,
    mimetype: 'image/png',
    size: pngData.length,
  }
}

// Removed legacy fetchFileByURL helper; placeholder images are generated locally
