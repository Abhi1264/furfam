import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import React from 'react'
import { Media } from '@/components/Media'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function BreedsPage() {
  const payload = await getPayload({ config: configPromise })
  const breeds = await payload.find({
    collection: 'breeds',
    depth: 1,
    limit: 100,
    sort: 'name',
  })

  return (
    <div className="pt-24 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-in fade-in zoom-in duration-700">
          <h1 className="text-5xl md:text-6xl font-heading text-primary mb-6">
            Meet Our Furry Friends
          </h1>
          <p className="text-xl text-muted-foreground font-body max-w-2xl mx-auto">
            Find your perfect companion from our selection of lovable breeds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {breeds.docs.map((breed, index) => (
            <Link
              key={breed.id}
              href={`/breeds/${breed.slug}`}
              className="group block bg-card rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-in slide-in-from-bottom-4 fade-in duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {breed.image && typeof breed.image === 'object' && (
                  <Media
                    resource={breed.image}
                    fill
                    imgClassName="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-heading text-primary mb-2">
                  {breed.name}
                </h3>
                {breed.shortDescription && (
                  <p className="text-muted-foreground font-body line-clamp-2">
                    {breed.shortDescription}
                  </p>
                )}
                <div className="mt-4 flex items-center justify-between">
                   <span className="font-heading text-lg text-secondary-foreground bg-secondary/20 px-3 py-1 rounded-full">
                     {breed.size && typeof breed.size === 'string' ? breed.size.charAt(0).toUpperCase() + breed.size.slice(1) : ''}
                   </span>
                   <span className="text-primary font-bold font-body">
                      View Details →
                   </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

