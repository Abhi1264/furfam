import { Shield, Heart, Award, Clock, Sparkles } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Health Guaranteed",
    description:
      "All our puppies come with comprehensive health checks and vaccinations to ensure a healthy start.",
    gradient: "from-blue-500/10 to-cyan-500/10",
    iconColor: "text-blue-600 dark:text-blue-400",
    borderColor: "group-hover:border-blue-500/50",
  },
  {
    icon: Heart,
    title: "Raised with Love",
    description:
      "Our puppies are raised in loving environments with early socialization and proper care.",
    gradient: "from-pink-500/10 to-rose-500/10",
    iconColor: "text-pink-600 dark:text-pink-400",
    borderColor: "group-hover:border-pink-500/50",
  },
  {
    icon: Award,
    title: "Premium Breeds",
    description:
      "We partner only with certified, responsible breeders who meet our high standards.",
    gradient: "from-amber-500/10 to-yellow-500/10",
    iconColor: "text-amber-600 dark:text-amber-400",
    borderColor: "group-hover:border-amber-500/50",
  },
  {
    icon: Clock,
    title: "Lifetime Support",
    description:
      "Get expert advice and support throughout your pet's life with our dedicated team.",
    gradient: "from-purple-500/10 to-indigo-500/10",
    iconColor: "text-purple-600 dark:text-purple-400",
    borderColor: "group-hover:border-purple-500/50",
  },
];

export function FeaturesSection() {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-linear-to-b from-secondary/50 via-background to-secondary/30 -z-10" />
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            <Sparkles className="h-4 w-4" />
            Our Promise
          </span>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-5xl text-balance mb-4">
            Why Choose FurFam?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We&apos;re committed to connecting you with your perfect companion while
            ensuring the highest standards of care and ethics.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative rounded-2xl border border-border bg-card p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${feature.borderColor}`}
            >
              {/* Gradient background on hover */}
              <div
                className={`absolute inset-0 rounded-2xl bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}
              />

              {/* Icon container with animation */}
              <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center">
                {/* Outer ring */}
                <div
                  className={`absolute inset-0 rounded-full bg-linear-to-br ${feature.gradient} opacity-100 group-hover:scale-110 transition-transform duration-500`}
                />
                {/* Inner circle */}
                <div className="absolute inset-1 rounded-full bg-card" />
                {/* Icon */}
                <feature.icon
                  className={`relative h-8 w-8 ${feature.iconColor} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}
                  strokeWidth={2}
                />
              </div>

              {/* Content */}
              <h3 className="mb-3 text-xl font-bold text-card-foreground font-serif">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl" />
            </div>
          ))}
        </div>

        {/* Trust badge section */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-center opacity-70">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Certified Breeders
            </span>
          </div>
          <div className="hidden sm:block h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              10,000+ Happy Families
            </span>
          </div>
          <div className="hidden sm:block h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Excellence Since 2020
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
