import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { breedTypes } from "@/lib/breeds-data";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={175}
                height={56}
                draggable={false}
              />
            </Link>
            <p className="text-sm text-background/80 leading-relaxed">
              Your trusted partner in finding the perfect furry companion. We
              connect loving families with healthy, happy puppies from
              responsible breeders.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-background/60 transition-colors hover:text-primary"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-background/60 transition-colors hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-background/60 transition-colors hover:text-primary"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Breed Types */}
          <div>
            <h3 className="mb-4 font-semibold">Breed Types</h3>
            <ul className="space-y-2">
              {breedTypes.map((type) => (
                <li key={type.id}>
                  <Link
                    href={`/breeds/${type.slug}`}
                    className="text-sm text-background/80 transition-colors hover:text-primary"
                  >
                    {type.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-background/80 transition-colors hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm text-background/80 transition-colors hover:text-primary"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-background/80 transition-colors hover:text-primary"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="text-sm text-background/80 transition-colors hover:text-primary"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/faqs"
                  className="text-sm text-background/80 transition-colors hover:text-primary"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-background/80">
                  123 Paw Street, Pet City, PC 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-background/80">
                  (555) 123-4567
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-background/80">
                  hello@furfam.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-background/20 pt-8 text-center">
          <p className="text-sm text-background/60">
            © {new Date().getFullYear()} FurFam Pet Shop. All rights reserved.
            Made with love for pets.
          </p>
        </div>
      </div>
    </footer>
  );
}
