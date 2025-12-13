import { Shield, Heart, Award, Clock } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Health Guaranteed",
    description:
      "All our puppies come with comprehensive health checks and vaccinations to ensure a healthy start.",
  },
  {
    icon: Heart,
    title: "Raised with Love",
    description:
      "Our puppies are raised in loving environments with early socialization and proper care.",
  },
  {
    icon: Award,
    title: "Premium Breeds",
    description:
      "We partner only with certified, responsible breeders who meet our high standards.",
  },
  {
    icon: Clock,
    title: "Lifetime Support",
    description:
      "Get expert advice and support throughout your pet&apos;s life with our dedicated team.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            Why Choose FurFam?
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            We&apos;re committed to connecting you with your perfect companion
            while ensuring the highest standards of care and ethics.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-border bg-card p-6 text-center transition-all hover:border-primary hover:shadow-lg"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="mb-2 font-semibold text-card-foreground">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
