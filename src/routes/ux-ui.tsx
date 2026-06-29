import { createFileRoute, Link } from "@tanstack/react-router";
import { ProjectShell } from "@/components/SiteChrome";
import { uxProjects } from "@/lib/ux-projects";

export const Route = createFileRoute("/ux-ui")({
  head: () => ({
    meta: [
      { title: "Diseño UX / UI — Julio Cardona" },
      {
        name: "description",
        content:
          "Casos de estudio UX / UI de Julio Cardona: investigación, wireframes, prototipos y diseño de producto digital.",
      },
      { property: "og:title", content: "Diseño UX / UI — Julio Cardona" },
      {
        property: "og:description",
        content:
          "Casos de estudio UX / UI: apps móviles, plataformas web y experiencias digitales end-to-end.",
      },
    ],
  }),
  component: UxUiIndex,
});

function UxUiIndex() {
  return (
    <ProjectShell>
      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-12 lg:px-12 lg:pt-20">
        <div className="flex flex-col gap-6 border-b border-border/60 pb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            — Sección 06 · Producto digital
          </p>
          <h1 className="font-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] tracking-tight">
            Diseño <em className="italic text-accent">UX — UI</em>
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
            Casos de estudio completos: investigación, arquitectura de información,
            wireframes, prototipos y diseño visual de productos digitales nativos y web.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {uxProjects.map((p, i) => (
            <Link
              key={p.slug}
              to="/proyectos/$slug"
              params={{ slug: p.slug }}
              className="group flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-paper">
                <img
                  src={p.cover}
                  alt={p.client}
                  loading={i < 3 ? "eager" : "lazy"}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute left-4 top-4 rounded-full bg-background/80 px-3 py-1 text-[10px] uppercase tracking-[0.2em] backdrop-blur-md">
                  0{i + 1}
                </div>
              </div>
              <div className="mt-6 flex flex-1 flex-col gap-3">
                <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {p.category}
                </p>
                <h2 className="font-display text-2xl leading-tight transition-colors group-hover:text-accent">
                  {p.client}
                </h2>
                <p className="text-sm text-muted-foreground line-clamp-3">{p.tagline}</p>
                <span className="mt-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-foreground/70 transition-all group-hover:gap-3 group-hover:text-foreground">
                  Ver caso de estudio
                  <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </ProjectShell>
  );
}
