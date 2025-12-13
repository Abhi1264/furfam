import { Search, ClipboardCheck, Truck, Heart } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Browse & Select",
    description:
      "Explore our collection of healthy, happy puppies. Filter by breed, size, and temperament to find your perfect match.",
  },
  {
    icon: ClipboardCheck,
    step: "02",
    title: "Application & Approval",
    description:
      "Complete our simple adoption application. Our team reviews it to ensure a great fit for both you and the puppy.",
  },
  {
    icon: Truck,
    step: "03",
    title: "Meet & Pickup",
    description:
      "Visit our facility for a meet-and-greet or schedule a delivery. We'll prepare everything for your puppy's homecoming.",
  },
  {
    icon: Heart,
    step: "04",
    title: "Welcome Home",
    description:
      "Bring your new family member home with complete documentation, health records, and ongoing support from our team.",
  },
];

export function ProcessSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Simple & Easy
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 text-balance">
            How Adoption Works
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-pretty">
            Our streamlined adoption process makes bringing home your new best
            friend simple and stress-free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-[2px] bg-border" />
              )}

              <div className="text-center">
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-5">
                  <step.icon className="h-8 w-8 text-primary" />
                  <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-xl text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-pretty">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
