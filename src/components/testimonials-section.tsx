// import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Dog Mom",
    image: "/placeholder.jpg",
    content:
      "FurFam made our puppy adoption experience absolutely wonderful! The team was so helpful in matching us with the perfect Golden Retriever. Max has been the best addition to our family.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Pet Parent",
    image: "/placeholder.jpg",
    content:
      "The level of care and attention FurFam puts into their process is amazing. Our Beagle came healthy, well-socialized, and already trained on the basics. Highly recommend!",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "First-time Owner",
    image: "/placeholder.jpg",
    content:
      "As a first-time dog owner, I was nervous about the process. FurFam's team guided me every step of the way and their ongoing support has been invaluable. Love my Corgi!",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-secondary py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            What Our Pet Parents Say
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Don&apos;t just take our word for it. Hear from the families who
            found their perfect companions through FurFam.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="rounded-2xl bg-card p-6 shadow-sm">
              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                &quot;{testimonial.content}&quot;
              </p>
              <div className="flex items-center gap-4">
                {/* <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div> */}
                <div>
                  <div className="font-semibold text-card-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
