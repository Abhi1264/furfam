"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import { Menu, X, ChevronDown, PawPrint, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { breedTypes } from "@/lib/breeds-data";
import { useSearchContext } from "./search-provider";

function SearchShortcutButton({ openSearch }: { openSearch: () => void }) {
  const shortcut = useMemo(() => {
    if (typeof window === "undefined") return "⌘K";
    const isMac = navigator.userAgent.toUpperCase().includes("MAC");
    return isMac ? "⌘K" : "Ctrl K";
  }, []);
  return (
    <button
      onClick={openSearch}
      className="flex items-center gap-2 rounded-md border border-border bg-background/90 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
    >
      <Search className="h-4 w-4" />
      <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-medium opacity-100 xl:inline-flex">
        <span className="text-xs">{shortcut}</span>
      </kbd>
    </button>
  );
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { openSearch } = useSearchContext();

  return (
    <header className="sticky top-0 z-50 w-full bg-foreground">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={130}
            height={40}
            draggable={false}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          <Link
            href="/"
            className="text-xl font-medium text-background transition-colors hover:text-primary"
          >
            Home
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-xl font-medium text-background transition-colors hover:text-primary cursor-pointer">
              Breeds <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48">
              {breedTypes.map((type) => (
                <DropdownMenuItem key={type.id} asChild>
                  <Link
                    href={`/breeds/${type.slug}`}
                    className="cursor-pointer"
                  >
                    {type.name}
                  </Link>
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
            href="/blogs"
            className="text-xl font-medium text-background transition-colors hover:text-primary"
          >
            Blogs
          </Link>
          <Link
            href="/contact"
            className="text-xl font-medium text-background transition-colors hover:text-primary"
          >
            Contact
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <SearchShortcutButton openSearch={openSearch} />
          <Button asChild className="group">
            <Link href="/contact">
              Find Your Pup
              <PawPrint className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Mobile Search & Menu Buttons */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={openSearch}
            aria-label="Search"
            className="text-background hover:text-primary transition-colors"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="text-background"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`bg-foreground lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-screen opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-4"
        }`}
      >
        <nav className="container text-background mx-auto flex flex-col gap-4 px-4 py-4">
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
            href="/blogs"
            className="font-medium"
            onClick={() => setIsOpen(false)}
          >
            Blogs
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
              <PawPrint className="h-4 w-4" />
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
