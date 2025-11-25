import { getPayload } from 'payload'
import configPromise from '@payload-config'
import React, { cache } from 'react'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const breeds = await payload.find({
    collection: 'breeds',
    depth: 0,
    limit: 1000,
    select: {
      slug: true,
    },
  })

  return breeds.docs.map(({ slug }) => ({ slug }))
}

export default async function BreedPage({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await paramsPromise
  const breed = await queryBreedBySlug({ slug })

  if (!breed) {
    return notFound()
  }

  return (
    <div className="pt-24 pb-24 bg-background min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-in slide-in-from-left fade-in duration-700">
            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-square relative">
              {breed.image && typeof breed.image === 'object' && (
                <Media resource={breed.image} fill imgClassName="object-cover" />
              )}
            </div>
          </div>
          <div className="animate-in slide-in-from-right fade-in duration-700">
            <h1 className="text-6xl font-heading text-primary mb-4">{breed.name}</h1>
            <p className="text-2xl font-body text-muted-foreground mb-8">
              {breed.shortDescription}
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-card p-4 rounded-2xl shadow-sm">
                <span className="block text-sm text-muted-foreground uppercase tracking-wide mb-1">
                  Temperament
                </span>
                <span className="font-heading text-lg">{breed.temperament}</span>
              </div>
              <div className="bg-card p-4 rounded-2xl shadow-sm">
                <span className="block text-sm text-muted-foreground uppercase tracking-wide mb-1">
                  Life Expectancy
                </span>
                <span className="font-heading text-lg">{breed.lifeExpectancy}</span>
              </div>
              <div className="bg-card p-4 rounded-2xl shadow-sm">
                <span className="block text-sm text-muted-foreground uppercase tracking-wide mb-1">
                  Size
                </span>
                <span className="font-heading text-lg capitalize">{breed.size}</span>
              </div>
              <div className="bg-card p-4 rounded-2xl shadow-sm">
                <span className="block text-sm text-muted-foreground uppercase tracking-wide mb-1">
                  Origin
                </span>
                <span className="font-heading text-lg">{breed.origin}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-3xl font-heading text-primary font-bold">
                ${breed.price?.toLocaleString()}
              </div>
              <Link
                href="/contact"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-full font-bold text-lg transition-colors"
              >
                Adopt Me
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="container mx-auto px-4 max-w-4xl mb-16 animate-in fade-in duration-700 delay-300">
        <div className="bg-card rounded-3xl p-8 md:p-12 shadow-lg">
          <h2 className="text-3xl font-heading mb-6">About the {breed.name}</h2>
          {breed.description && (
            <RichText
              data={breed.description}
              className="prose prose-lg max-w-none font-body text-foreground"
            />
          )}
        </div>
      </div>

      {/* Gallery (if exists) */}
      {breed.gallery && breed.gallery.length > 0 && (
        <div className="container mx-auto px-4 mb-16 animate-in fade-in duration-700 delay-500">
          <h2 className="text-3xl font-heading text-center mb-8">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {breed.gallery.map(
              (item) =>
                item.image &&
                typeof item.image === 'object' && (
                  <div
                    key={item.image.id}
                    className="rounded-2xl overflow-hidden shadow-md aspect-square relative group"
                  >
                    <Media
                      resource={item.image}
                      fill
                      imgClassName="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                ),
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const queryBreedBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'breeds',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })
  return result.docs?.[0] || null
})
