"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PawPrint, Ruler, Sun, Scissors } from "lucide-react";
import { type Classification } from "@/lib/breeds-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ClassificationItem extends Classification {
  breedCount?: number;
}

interface ClassificationBrowserProps {
  // groups: ClassificationItem[];
  sizes: ClassificationItem[];
  climates: ClassificationItem[];
  coats: ClassificationItem[];
}

export function ClassificationBrowser({
  // groups,
  sizes,
  climates,
  coats,
}: ClassificationBrowserProps) {
  const [activeTab, setActiveTab] = useState("size");

  const getIcon = (dimension: string) => {
    switch (dimension) {
      case "group":
        return <PawPrint className="h-4 w-4" />;
      case "size":
        return <Ruler className="h-4 w-4" />;
      case "climate":
        return <Sun className="h-4 w-4" />;
      case "coat":
        return <Scissors className="h-4 w-4" />;
      default:
        return <PawPrint className="h-4 w-4" />;
    }
  };

  const renderGrid = (items: ClassificationItem[], dimension: string) => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const href =
          dimension === "group"
            ? `/breeds/${item.slug}`
            : `/breeds?${dimension}=${item.slug}`;

        return (
          <Link
            key={item.id}
            href={href}
            className="group relative overflow-hidden rounded-2xl bg-card shadow-sm transition-all hover:shadow-xl"
          >
            <div className="relative h-56 overflow-hidden">
              <Image
                src={item.image || "/placeholder-dog.jpg"}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                draggable={false}
                loading="eager"
              />
              <div className="absolute inset-0 bg-linear-to-t from-foreground/80 via-foreground/20 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-background">
                    {item.name}
                  </h3>
                  <p className="text-sm text-background/80">
                    {item.breedCount} breeds available
                  </p>
                  <p className="mt-1 text-xs text-background/60 line-clamp-1">
                    {item.description}
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:translate-x-1">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );

  return (
    <div className="w-full space-y-8">
      <Tabs
        defaultValue="size"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full text-center"
      >
        <TabsList className="inline-flex h-auto flex-wrap justify-center gap-2 bg-transparent p-0">
          {/* <TabsTrigger
            value="group"
            className="rounded-full border border-border bg-background px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground cursor-pointer"
          >
            <span className="flex items-center gap-2">
              {getIcon("group")} Breed Groups
            </span>
          </TabsTrigger> */}
          <TabsTrigger
            value="size"
            className="rounded-full border border-border bg-background px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground cursor-pointer"
          >
            <span className="flex items-center gap-2">
              {getIcon("size")} By Size
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="climate"
            className="rounded-full border border-border bg-background px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground cursor-pointer"
          >
            <span className="flex items-center gap-2">
              {getIcon("climate")} Climate
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="coat"
            className="rounded-full border border-border bg-background px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground cursor-pointer"
          >
            <span className="flex items-center gap-2">
              {getIcon("coat")} Coat Type
            </span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-8 text-left">
          {/* <TabsContent
            value="group"
            className="mt-0 animate-in fade-in-50 zoom-in-95 duration-300"
          >
            {renderGrid(groups, "group")}
          </TabsContent>  */}
          <TabsContent
            value="size"
            className="mt-0 animate-in fade-in-50 zoom-in-95 duration-300"
          >
            {renderGrid(sizes, "size")}
          </TabsContent>
          <TabsContent
            value="climate"
            className="mt-0 animate-in fade-in-50 zoom-in-95 duration-300"
          >
            {renderGrid(climates, "climate")}
          </TabsContent>
          <TabsContent
            value="coat"
            className="mt-0 animate-in fade-in-50 zoom-in-95 duration-300"
          >
            {renderGrid(coats, "coat")}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
