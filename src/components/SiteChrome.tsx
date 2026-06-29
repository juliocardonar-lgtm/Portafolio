import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

type NavItem = {
  label: string;
  href: "/" | "/ux-ui";
  hash?: string;
};

const nav: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Branding", href: "/", hash: "logo-branding" },
  { label: "Packaging", href: "/", hash: "packaging" },
  { label: "Web", href: "/", hash: "diseno-web" },
  { label: "Menús", href: "/", hash: "restaurant-branding" },
  { label: "Catálogo & POP", href: "/", hash: "brochures-pop" },
  { label: "UX / UI", href: "/ux-ui" },
  { label: "Contacto", href: "/", hash: "contact" },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-xl bg-background/75 border-b border-border/60">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-3.5 sm:px-6 sm:py-4 lg:px-12">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="font-display text-xl leading-none sm:text-2xl">Julio Cardona</span>
          <span className="hidden text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:inline">
            · Estudio
          </span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm lg:flex">
          {nav.map((n) => (
            <Link
              key={n.label}
              to={n.href}
              hash={n.hash}
              className="relative text-foreground/70 transition-colors duration-300 hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-accent after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/"
          hash="contact"
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-foreground/20 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] transition-all duration-300 hover:border-accent hover:bg-accent hover:text-accent-foreground sm:px-4 sm:py-2 sm:text-xs"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          Disponible
        </Link>
      </div>
    </header>

  );
}

export function SiteFooter() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("es-MX", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/Mexico_City",
      }).format(new Date());
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="relative bg-foreground py-24 text-background">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-xs uppercase tracking-[0.25em] text-background/50">— Contacto</p>
            <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4.5rem)] leading-[0.95] tracking-tight">
              ¿Listo para tu próximo proyecto?{" "}
              <em className="italic text-accent">Platiquemos.</em>
            </h2>
            <a
              href="mailto:contacto@juliocardona.net"
              className="mt-10 inline-block border-b border-background/20 pb-2 font-display text-2xl transition-colors hover:text-accent sm:text-3xl"
            >
              contacto@juliocardona.net
            </a>
          </div>
          <div className="lg:col-span-5 lg:pl-10">
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-background/50">Ubicación</p>
                <p className="mt-2 text-lg">CDMX · MX</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-background/50">Hora local</p>
                <p className="mt-2 text-lg">{time || "—"}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 flex flex-wrap items-end justify-between gap-6 border-t border-background/15 pt-10 text-xs uppercase tracking-[0.2em] text-background/50">
          <p>© {new Date().getFullYear()} Julio Cardona · Estudio de diseño</p>
          <p></p>
        </div>
      </div>
    </footer>
  );
}

export function ProjectShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <SiteHeader />
      <main className="pt-24">{children}</main>
      <SiteFooter />
    </div>
  );
}
