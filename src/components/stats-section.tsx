import { Users, Heart, Award, MapPin } from "lucide-react";

const stats = [
  {
    icon: Heart,
    value: "5,000+",
    label: "Happy Families",
    description: "Puppies placed in loving homes",
  },
  {
    icon: Award,
    value: "50+",
    label: "Breed Varieties",
    description: "Carefully selected breeds",
  },
  {
    icon: Users,
    value: "100+",
    label: "Expert Staff",
    description: "Certified pet care specialists",
  },
  {
    icon: MapPin,
    value: "25+",
    label: "Locations",
    description: "Nationwide coverage",
  },
];

export function StatsSection() {
  return (
    <section className="py-16 md:py-20 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/20 mb-4">
                <stat.icon className="h-7 w-7 text-primary" />
              </div>
              <div className="font-serif text-3xl md:text-4xl font-bold text-background">
                {stat.value}
              </div>
              <div className="font-semibold text-background/90 mt-1">
                {stat.label}
              </div>
              <p className="text-background/60 text-sm mt-1">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
