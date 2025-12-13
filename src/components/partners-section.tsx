import Image from "next/image";

const partners = [
  { name: "PetSmart", logo: "/logoipsum-1.svg" },
  { name: "Royal Canin", logo: "/logoipsum-2.svg" },
  { name: "Blue Buffalo", logo: "/logoipsum-3.svg" },
  { name: "Purina", logo: "/logoipsum-4.svg" },
];

export function PartnersSection() {
  return (
    <section className="py-12 md:py-16 border-y bg-muted/30">
      <div className="container mx-auto px-4">
        <p className="text-center text-muted-foreground text-sm font-medium mb-8">
          Trusted by leading pet brands and partners
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                width={120}
                height={48}
                className="h-10 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
