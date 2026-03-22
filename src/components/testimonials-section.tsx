"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Aarav Mehta",
    role: "Pet Parent, Mumbai, Maharashtra",
    image: "/testimonials/testimonial-01.jpeg",
    content:
      "From first call to delivery, FurFam made the whole process smooth and transparent. Our Labrador settled in just two days.",
    rating: 5,
  },
  {
    name: "Ishita Verma",
    role: "Pet Parent, New Delhi, Delhi",
    image: "/testimonials/testimonial-02.jpeg",
    content:
      "I appreciated the health records and regular updates before pickup. Our Beagle is playful, confident, and very affectionate.",
    rating: 5,
  },
  {
    name: "Naina Rao",
    role: "First-time Owner, Bengaluru, Karnataka",
    image: "/testimonials/testimonial-03.jpeg",
    content:
      "As a first-time pet parent, I had a lot of questions and the team answered every one patiently. Great after-adoption guidance too.",
    rating: 5,
  },
  {
    name: "Saif Khan",
    role: "Pet Parent, Hyderabad, Telangana",
    image: "/testimonials/testimonial-04.jpeg",
    content:
      "Our Indie pup came home healthy and socialized. The care checklist FurFam shared has been super useful in the first month.",
    rating: 5,
  },
  {
    name: "Harsh Vaidya",
    role: "Dog Owner, Kolhapur, Maharashtra",
    image: "/testimonials/testimonial-05.jpeg",
    content:
      "Professional, punctual, and genuinely caring team. We felt supported throughout the process and still get quick help on WhatsApp.",
    rating: 5,
  },
  {
    name: "Pradeep Ghosh",
    role: "Pet Parent, Kolkata, West Bengal",
    image: "/testimonials/testimonial-06.jpeg",
    content:
      "FurFam matched us with the right temperament for apartment living. Our puppy adapted beautifully with their routine tips.",
    rating: 5,
  },
  {
    name: "Kavya Joshi",
    role: "Pet Parent, Pune, Maharashtra",
    image: "/testimonials/testimonial-07.jpeg",
    content:
      "The onboarding call was detailed and practical. Vaccination schedule, food transitions, and training basics were all clearly explained.",
    rating: 5,
  },
  {
    name: "Nirav Shah",
    role: "Pet Parent, Ahmedabad, Gujarat",
    image: "/testimonials/testimonial-08.jpeg",
    content:
      "I loved the ethical and transparent approach. Our little Shih Tzu came happy, healthy, and full of personality.",
    rating: 5,
  },
  {
    name: "Ritwik Malhotra",
    role: "Pet Parent, Jaipur, Rajasthan",
    image: "/testimonials/testimonial-09.jpeg",
    content:
      "FurFam kept us informed at every step and made us feel confident. The post-adoption support has been excellent.",
    rating: 5,
  },
  {
    name: "Tarun Srivastava",
    role: "Dog Owner, Lucknow, Uttar Pradesh",
    image: "/testimonials/testimonial-10.jpeg",
    content:
      "Our Cocker Spaniel arrived with all documents and clear care instructions. The team was warm, responsive, and reliable.",
    rating: 5,
  },
  {
    name: "Aditya Kulkarni",
    role: "Pet Parent, Indore, Madhya Pradesh",
    image: "/testimonials/testimonial-11.jpeg",
    content:
      "The puppy temperament matched exactly what we discussed. That thoughtful matching made a big difference for our family.",
    rating: 5,
  },
  {
    name: "Manav Tiwari",
    role: "Pet Parent, Bhopal, Madhya Pradesh",
    image: "/testimonials/testimonial-12.jpeg",
    content:
      "Everything felt well organized from consultation to handover. We had zero confusion thanks to their clear communication.",
    rating: 5,
  },
  {
    name: "Gurleen Sandhu",
    role: "Dog Owner, Chandigarh, Punjab",
    image: "/testimonials/testimonial-13.jpeg",
    content:
      "Super smooth experience and genuine care for animal welfare. Even our vet praised the condition and records.",
    rating: 5,
  },
  {
    name: "Sidharth Menon",
    role: "Pet Parent, Coimbatore, Tamil Nadu",
    image: "/testimonials/testimonial-14.jpeg",
    content:
      "FurFam helped us choose a breed that fits our routine and weather. That guidance saved us from making a rushed decision.",
    rating: 5,
  },
  {
    name: "Anil Nair",
    role: "Pet Parent, Kochi, Kerala",
    image: "/testimonials/testimonial-15.jpeg",
    content:
      "Very reassuring process for a new pet parent. They checked in after adoption and shared practical training resources.",
    rating: 5,
  },
  {
    name: "Devansh Agrawal",
    role: "Pet Parent, Nagpur, Maharashtra",
    image: "/testimonials/testimonial-16.jpeg",
    content:
      "Our pup is healthy, cheerful, and settled quickly with our kids. FurFam made this transition easy and joyful.",
    rating: 5,
  },
  {
    name: "Khushi Patel",
    role: "Pet Parent, Surat, Gujarat",
    image: "/testimonials/testimonial-17.jpeg",
    content:
      "The pre-adoption counseling was very helpful and honest. We knew exactly what to expect in the first few weeks.",
    rating: 5,
  },
  {
    name: "Vivek Reddy",
    role: "Dog Owner, Visakhapatnam, Andhra Pradesh",
    image: "/testimonials/testimonial-18.jpeg",
    content:
      "Quick responses, transparent process, and a genuinely caring team. We would confidently recommend FurFam to friends.",
    rating: 5,
  },
  {
    name: "Rhea Bhandari",
    role: "Pet Parent, Udaipur, Rajasthan",
    image: "/testimonials/testimonial-19.jpeg",
    content:
      "Living in a smaller city, I expected delays, but everything was well coordinated. The experience exceeded expectations.",
    rating: 5,
  },
  {
    name: "Aditi Dubey",
    role: "Pet Parent, Ranchi, Jharkhand",
    image: "/testimonials/testimonial-20.jpeg",
    content:
      "FurFam made pet adoption accessible and stress-free for us. Their step-by-step guidance was clear and practical.",
    rating: 5,
  },
  {
    name: "Sohini Dutta",
    role: "Dog Owner, Siliguri, West Bengal",
    image: "/testimonials/testimonial-21.jpeg",
    content:
      "I loved how responsive the team was even after adoption. They truly care about long-term pet wellbeing.",
    rating: 5,
  },
  {
    name: "Manpreet Kaur",
    role: "Pet Parent, Jalandhar, Punjab",
    image: "/testimonials/testimonial-22.jpeg",
    content:
      "The documentation and care notes were detailed and easy to follow. Our puppy settled in comfortably from day one.",
    rating: 5,
  },
  {
    name: "Arjun Bisht",
    role: "Pet Parent, Dehradun, Uttarakhand",
    image: "/testimonials/testimonial-23.jpeg",
    content:
      "Excellent support for our first dog at home. The feeding and crate training plan worked exactly as suggested.",
    rating: 5,
  },
  {
    name: "Madhuri Rao",
    role: "Dog Owner, Warangal, Telangana",
    image: "/testimonials/testimonial-24.jpeg",
    content:
      "I appreciated the honest communication and humane approach. The team felt more like pet mentors than sellers.",
    rating: 5,
  },
  {
    name: "Kiran Nair",
    role: "Pet Parent, Tirunelveli, Tamil Nadu",
    image: "/testimonials/testimonial-25.jpeg",
    content:
      "Our family had a fantastic experience with FurFam. Every step was clearly explained and thoughtfully managed.",
    rating: 5,
  },
  {
    name: "Pallavi Sahu",
    role: "Pet Parent, Bhilai, Chhattisgarh",
    image: "/testimonials/testimonial-26.jpeg",
    content:
      "Smooth coordination, healthy puppy, and strong post-adoption guidance. Could not have asked for a better experience.",
    rating: 5,
  },
  {
    name: "Nandini Shetty",
    role: "Dog Owner, Hubballi, Karnataka",
    image: "/testimonials/testimonial-27.jpeg",
    content:
      "I was impressed by the quality checks and transparency. Our pup is thriving and everyone at home is delighted.",
    rating: 5,
  },
  {
    name: "Faizan Ali",
    role: "Pet Parent, Aligarh, Uttar Pradesh",
    image: "/testimonials/testimonial-28.jpeg",
    content:
      "FurFam made the entire journey simple and trustworthy. It felt like they cared as much as we do about our pet.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const autoplay = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  );

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

        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[autoplay.current]}
          className="w-full"
          onMouseEnter={() => autoplay.current.stop()}
          onMouseLeave={() => autoplay.current.reset()}
        >
          <CarouselContent className="-ml-2 md:-ml-4 mb-2">
            {testimonials.map((testimonial, index) => {
              const location = testimonial.role.split(", ").slice(1).join(", ");

              return (
                <CarouselItem
                  key={`${testimonial.name}-${index}`}
                  className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <div className="rounded-2xl bg-card p-6 shadow-sm flex h-full flex-col">
                    <div className="mb-4 flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-primary text-primary"
                        />
                      ))}
                    </div>
                    <p className="mb-6 text-muted-foreground leading-relaxed">
                      &quot;{testimonial.content}&quot;
                    </p>
                    <div className="mt-auto flex items-center gap-3">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-border/70">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                          priority={index < 3}
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-card-foreground">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {location}
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="-left-4 lg:-left-2 bg-background/90 shadow-sm hover:shadow-md cursor-pointer" />
          <CarouselNext className="-right-4 lg:-right-2 bg-background/90 shadow-sm hover:shadow-md cursor-pointer" />
        </Carousel>
      </div>
    </section>
  );
}
