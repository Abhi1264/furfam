import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I choose the right dog breed for my family?",
    answer:
      "Choosing the right breed depends on your lifestyle, living space, activity level, and family composition. Consider factors like the dog&apos;s energy level, size, grooming needs, and temperament. Our team at FurFam is always ready to help you find the perfect match based on your specific needs and preferences.",
  },
  {
    question: "What health guarantees do you provide with your puppies?",
    answer:
      "All our puppies come with a comprehensive health guarantee that includes vaccinations up to date, deworming, microchipping, and a veterinary health certificate. We also provide a 1-year genetic health guarantee against hereditary conditions. Each puppy comes with complete health records and documentation.",
  },
  {
    question: "Do you offer pet delivery services?",
    answer:
      "Yes, we offer safe and comfortable pet delivery services across the country. Our trained pet transport specialists ensure your new family member arrives happy and healthy. We also offer in-person pickup with a meet-and-greet session at our facility.",
  },
  {
    question: "What is included in the puppy adoption package?",
    answer:
      "Our adoption package includes the puppy&apos;s health records, vaccination certificate, microchip registration, a starter kit with food samples, a comfort blanket with familiar scents, breed-specific care guide, and lifetime support from our pet care experts. Premium packages also include initial training sessions.",
  },
  {
    question: "How do you ensure the health and well-being of your puppies?",
    answer:
      "We partner only with certified, ethical breeders who follow strict breeding standards. All puppies undergo regular health screenings, live in clean and nurturing environments, and receive proper socialization from birth. We conduct thorough background checks on all our breeding partners.",
  },
  {
    question: "Can I visit the puppies before making a decision?",
    answer:
      "We encourage prospective pet parents to visit our facility and spend time with the puppies. You can schedule a visit through our website or by calling us. Virtual meet-and-greets are also available for those who cannot visit in person.",
  },
  {
    question: "What payment options do you offer?",
    answer:
      "We accept various payment methods including credit/debit cards, bank transfers, and financing options. We also offer flexible payment plans for qualified buyers. A deposit is required to reserve your puppy, with the balance due upon pickup or delivery.",
  },
  {
    question: "Do you provide training and post-adoption support?",
    answer:
      "Yes! We offer comprehensive training programs from basic obedience to advanced behavioral training. Our post-adoption support includes 24/7 helpline access, online resources, puppy parenting workshops, and regular check-ins during the first few months. We&apos;re committed to supporting you throughout your pet parenting journey.",
  },
];

export function FAQSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Got Questions?
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 text-balance">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-pretty">
            Find answers to common questions about our puppies, adoption
            process, and services.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl border px-6 shadow-sm"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
