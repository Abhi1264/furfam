import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const popularBreeds = [
  {
    name: "Golden Retriever",
    type: "sporting",
    slug: "golden-retriever",
    image: "/golden-retriever.jpg",
    price: "$1,500 - $3,000",
    traits: ["Friendly", "Intelligent", "Devoted"],
  },
  {
    name: "French Bulldog",
    type: "toy",
    slug: "french-bulldog",
    image: "/french-bulldog.jpg",
    price: "$2,000 - $4,000",
    traits: ["Playful", "Adaptable", "Smart"],
  },
  {
    name: "German Shepherd",
    type: "herding",
    slug: "german-shepherd",
    image: "/german-shepherd.jpg",
    price: "$1,500 - $3,500",
    traits: ["Loyal", "Confident", "Courageous"],
  },
  {
    name: "Labrador Retriever",
    type: "sporting",
    slug: "labrador-retriever",
    image: "/labrador-retriever.jpg",
    price: "$1,200 - $2,500",
    traits: ["Outgoing", "Active", "Friendly"],
  },
];

export function PopularBreedsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Most Loved
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 text-balance">
              Popular Dog Breeds
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl text-pretty">
              Discover our most sought-after breeds that families love. Each
              puppy is health-checked and ready for their forever home.
            </p>
          </div>
          <Link href="/breeds/sporting" className="mt-6 md:mt-0">
            <Button variant="outline" className="group bg-transparent">
              View All Breeds
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularBreeds.map((breed) => (
            <Link
              key={breed.slug}
              href={`/breeds/${breed.type}/${breed.slug}`}
              className="group"
            >
              <div className="bg-card rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                <div className="relative aspect-square overflow-hidden bg-secondary/50">
                  <Image
                    src={breed.image || "/placeholder.svg"}
                    alt={breed.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    draggable={false}
                  />
                  <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                    <Heart className="h-5 w-5 text-muted-foreground hover:text-red-500" />
                  </button>
                </div>
                <div className="p-5">
                  <h3 className="font-serif font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                    {breed.name}
                  </h3>
                  <p className="text-primary font-semibold mt-1">
                    {breed.price}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {breed.traits.map((trait) => (
                      <Badge
                        key={trait}
                        variant="secondary"
                        className="text-xs font-medium"
                      >
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
