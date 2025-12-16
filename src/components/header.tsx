"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { breedTypes } from "@/lib/breeds-data";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-gray-900">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={175} height={56} draggable={false}/>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-xl font-medium text-background transition-colors hover:text-primary"
          >
            Home
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-xl font-medium text-background transition-colors hover:text-primary">
              Breeds <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48">
              {breedTypes.map((type) => (
                <DropdownMenuItem key={type.id} asChild>
                  <Link href={`/breeds/${type.slug}`}>{type.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href="/about"
            className="text-xl font-medium text-background transition-colors hover:text-primary"
          >
            About Us
          </Link>
          <Link
            href="/services"
            className="text-xl font-medium text-background transition-colors hover:text-primary"
          >
            Services
          </Link>
          <Link
            href="/contact"
            className="text-xl font-medium text-background transition-colors hover:text-primary"
          >
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex">
          <Button asChild>
            <Link href="/contact">Find Your Pup</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-background" />
          ) : (
            <Menu className="h-6 w-6 text-background" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container mx-auto flex flex-col gap-4 px-4 py-4">
            <Link
              href="/"
              className="font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <div className="flex flex-col gap-2">
              <span className="font-medium text-muted-foreground">Breeds</span>
              {breedTypes.map((type) => (
                <Link
                  key={type.id}
                  href={`/breeds/${type.slug}`}
                  className="pl-4"
                  onClick={() => setIsOpen(false)}
                >
                  {type.name}
                </Link>
              ))}
            </div>
            <Link
              href="/about"
              className="font-medium"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/services"
              className="font-medium"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="font-medium"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Button asChild className="w-full text-lg">
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                Find Your Pup
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
