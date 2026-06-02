import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHero({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="gradient-hero text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 text-center">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-4 text-lg text-primary-foreground/90 max-w-2xl mx-auto">{subtitle}</p>}
      </div>
    </section>
  );
}
