import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ProjectShell } from "@/components/SiteChrome";
import { uxBySlug, uxProjects, type UxProject } from "@/lib/ux-projects";

export const Route = createFileRoute("/proyectos/$slug")({
  loader: ({ params }) => {
    const project = uxBySlug(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    const title = p ? `${p.client} — UX / UI · Julio Cardona` : "Proyecto · Julio Cardona";
    const description = p?.tagline ?? "Caso de estudio UX/UI por Julio Cardona.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        ...(p?.cover ? [{ property: "og:image", content: p.cover }] : []),
      ],
    };
  },
  notFoundComponent: () => (
    <ProjectShell>
      <section className="mx-auto max-w-[1400px] px-6 py-32 lg:px-12">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">404</p>
        <h1 className="mt-6 font-display text-5xl tracking-tight">Proyecto no encontrado</h1>
        <Link to="/" className="mt-10 inline-block border-b border-foreground/30 pb-2 text-sm uppercase tracking-[0.2em] hover:text-accent">
          ← Volver al portafolio
        </Link>
      </section>
    </ProjectShell>
  ),
  errorComponent: ({ error, reset }) => (
    <ProjectShell>
      <section className="mx-auto max-w-[1400px] px-6 py-32 lg:px-12">
        <h1 className="font-display text-4xl">Algo salió mal</h1>
        <p className="mt-4 text-muted-foreground">{error.message}</p>
        <button onClick={reset} className="mt-8 border-b border-foreground/30 pb-2 text-sm uppercase tracking-[0.2em] hover:text-accent">
          Reintentar
        </button>
      </section>
    </ProjectShell>
  ),
  component: ProjectPage,
});

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs uppercase tracking-[0.25em] text-accent">{children}</p>;
}

function ProjectPage() {
  const { project: p } = Route.useLoaderData() as { project: UxProject };
  const idx = uxProjects.findIndex((x) => x.slug === p.slug);
  const next = uxProjects[(idx + 1) % uxProjects.length];

  return (
    <ProjectShell>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1400px] px-6 pt-8 lg:px-12">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Inicio</Link>
          <span>/</span>
          <Link to="/" hash="uxui" className="hover:text-foreground">UX / UI</Link>
          <span>/</span>
          <span className="text-foreground">{p.client}</span>
        </div>
      </div>

      {/* HERO */}
      <section className="mx-auto max-w-[1400px] px-6 pt-12 lg:px-12 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionLabel>{p.category}</SectionLabel>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.95] tracking-tight">
              {p.client}
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">{p.tagline}</p>
          </div>
          <aside className="lg:col-span-5 lg:border-l lg:border-border lg:pl-10">
            <dl className="grid grid-cols-2 gap-y-8 text-sm">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Cliente</dt>
                <dd className="mt-2 font-display text-lg">{p.client}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Año</dt>
                <dd className="mt-2 font-display text-lg">{p.year}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Mi rol en el proyecto</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {p.role.map((r) => (
                    <span key={r} className="border border-border px-2.5 py-1 text-xs">{r}</span>
                  ))}
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Alcance</dt>
                <dd className="mt-2 text-base text-muted-foreground">{p.scope.join(" · ")}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      {/* HERO IMAGE */}
      {p.hero && (
        <section className="mx-auto mt-16 max-w-[1400px] px-6 lg:px-12">
          <div className="overflow-hidden bg-card ring-1 ring-border">
            <img src={p.hero} alt={`${p.client} — hero`} className="h-full w-full object-cover" />
          </div>
        </section>
      )}

      {/* PROBLEMA / OBJETIVO / DESAFÍOS */}
      <section className="mx-auto mt-28 max-w-[1400px] px-6 lg:px-12">
        <SectionLabel>— Contexto</SectionLabel>
        <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
          El <em className="italic text-accent">reto</em> y los objetivos del proyecto.
        </h2>

        <div className="mt-16 grid gap-px border border-border bg-border md:grid-cols-3">
          <article className="bg-background p-10">
            <p className="font-display text-2xl text-accent">01</p>
            <h3 className="mt-6 font-display text-2xl tracking-tight">El problema</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.problem}</p>
          </article>
          <article className="bg-background p-10">
            <p className="font-display text-2xl text-accent">02</p>
            <h3 className="mt-6 font-display text-2xl tracking-tight">Objetivo</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.objective}</p>
          </article>
          <article className="bg-background p-10">
            <p className="font-display text-2xl text-accent">03</p>
            <h3 className="mt-6 font-display text-2xl tracking-tight">Desafíos & limitaciones</h3>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              {p.challenges.map((c) => (
                <li key={c} className="flex gap-3">
                  <span className="mt-2 h-px w-3 shrink-0 bg-accent" />
                  {c}
                </li>
              ))}
            </ul>
          </article>
        </div>

        {/* Audiencia */}
        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Público objetivo</p>
          </div>
          <ul className="flex flex-wrap gap-3 lg:col-span-8">
            {p.audience.map((a) => (
              <li key={a} className="border border-border px-4 py-2 text-sm">{a}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* INVESTIGACIÓN */}
      <section className="mx-auto mt-28 max-w-[1400px] px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel>— Investigación</SectionLabel>
            <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
              Investigación de <em className="italic text-accent">usuario</em>.
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground lg:col-span-7 lg:col-start-6">
            {p.research}
          </p>
        </div>
      </section>

      {/* PERSONAS */}
      {p.personas.length > 0 && (
        <section className="mx-auto mt-28 max-w-[1400px] px-6 lg:px-12">
          <SectionLabel>— Personas</SectionLabel>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
            ¿A quién le diseñamos?
          </h2>

          <div className={`mt-14 grid gap-6 ${p.personas.length > 1 ? "md:grid-cols-2" : ""}`}>
            {p.personas.map((per) => (
              <article key={per.name} className="bg-paper p-8 ring-1 ring-border lg:p-10">
                <div className="flex items-center gap-5">
                  {per.avatar ? (
                    <img src={per.avatar} alt={per.name} className="h-16 w-16 rounded-full object-cover ring-1 ring-border" />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-foreground font-display text-2xl text-background">
                      {per.name[0]}
                    </div>
                  )}
                  <div>
                    <h3 className="font-display text-3xl tracking-tight">{per.name}</h3>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{per.role}</p>
                  </div>
                </div>

                <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-6 text-sm">
                  {Object.entries({
                    Edad: per.demographics.age,
                    Educación: per.demographics.education,
                    Residencia: per.demographics.residence,
                    Familia: per.demographics.family,
                    Ocupación: per.demographics.occupation,
                  }).map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{k}</dt>
                      <dd className="mt-1">{v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/70">Bio</p>
                    <p className="mt-1">{per.bio}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/70">Metas</p>
                    <p className="mt-1">{per.goals}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/70">Frustraciones</p>
                    <p className="mt-1">{per.frustrations}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* INSIGHTS */}
      {p.insights.length > 0 && (
        <section className="mx-auto mt-28 max-w-[1400px] px-6 lg:px-12">
          <SectionLabel>— Insights</SectionLabel>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
            Hallazgos que <em className="italic text-accent">guiaron</em> el diseño.
          </h2>
          <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-3">
            {p.insights.map((ins, i) => (
              <article key={ins.title} className="bg-background p-8 lg:p-10">
                <p className="font-display text-3xl text-accent">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-6 font-display text-xl tracking-tight">{ins.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{ins.text}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* WIREFRAMES & USER FLOW */}
      {(p.wireframe || p.userflow) && (
        <section className="mx-auto mt-28 max-w-[1400px] px-6 lg:px-12">
          <SectionLabel>— Ideación</SectionLabel>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
            Wireframes & <em className="italic text-accent">flujos</em> de usuario.
          </h2>
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {p.wireframe && (
              <figure className="overflow-hidden bg-card ring-1 ring-border">
                <img src={p.wireframe} alt={`${p.client} — Wireframes`} loading="lazy" className="h-full w-full object-cover" />
                <figcaption className="border-t border-border bg-background p-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Wireframes
                </figcaption>
              </figure>
            )}
            {p.userflow && (
              <figure className="overflow-hidden bg-card ring-1 ring-border">
                <img src={p.userflow} alt={`${p.client} — User flow`} loading="lazy" className="h-full w-full object-cover" />
                <figcaption className="border-t border-border bg-background p-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Flujo de usuario
                </figcaption>
              </figure>
            )}
          </div>
        </section>
      )}

      {/* HIGH FIDELITY */}
      {p.hifi && (
        <section className="mx-auto mt-28 max-w-[1400px] px-6 lg:px-12">
          <SectionLabel>— Hi-Fi</SectionLabel>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
            Prototipo de <em className="italic text-accent">alta fidelidad</em>.
          </h2>
          <figure className="mt-12 overflow-hidden bg-card ring-1 ring-border">
            <img src={p.hifi} alt={`${p.client} — Hi-Fi`} className="h-full w-full object-cover" />
          </figure>
        </section>
      )}

      {/* FEATURES */}
      {p.features.length > 0 && (
        <section className="mx-auto mt-28 max-w-[1400px] px-6 lg:px-12">
          <SectionLabel>— Funcionalidades destacadas</SectionLabel>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
            Pantallas <em className="italic text-accent">clave</em>.
          </h2>
          <div className="mt-16 space-y-24">
            {p.features.map((f, i) => (
              <article key={f.title} className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <p className="font-display text-2xl text-accent">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-4 font-display text-3xl tracking-tight sm:text-4xl">{f.title}</h3>
                  <ul className="mt-6 space-y-3 text-sm leading-relaxed text-muted-foreground">
                    {f.points.map((pt) => (
                      <li key={pt} className="flex gap-3">
                        <span className="mt-2 h-px w-3 shrink-0 bg-accent" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
                {f.image && (
                  <figure className="overflow-hidden bg-card ring-1 ring-border lg:col-span-8">
                    <img src={f.image} alt={`${p.client} — ${f.title}`} loading="lazy" className="h-full w-full object-cover" />
                  </figure>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {/* CLOSING IMAGE */}
      {p.closingImage && (
        <section className="mx-auto mt-28 max-w-[1400px] px-6 lg:px-12">
          <figure className="overflow-hidden bg-card ring-1 ring-border">
            <img src={p.closingImage} alt={`${p.client} — cierre`} className="h-full w-full object-cover" />
          </figure>
        </section>
      )}

      {/* CONCLUSIONS */}
      <section className="mx-auto mt-28 max-w-[1400px] px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel>— Conclusiones</SectionLabel>
            <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
              Resultados &<br /><em className="italic text-accent">aprendizajes</em>.
            </h2>
          </div>
          <ul className="space-y-6 text-base leading-relaxed text-muted-foreground lg:col-span-7 lg:col-start-6">
            {p.conclusions.map((c, i) => (
              <li key={i} className="flex gap-4">
                <span className="mt-2 h-px w-6 shrink-0 bg-accent" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* NEXT */}
      <section className="mx-auto mt-32 max-w-[1400px] border-t border-border px-6 py-20 lg:px-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Siguiente proyecto</p>
            <Link
              to="/proyectos/$slug"
              params={{ slug: next.slug }}
              className="mt-4 inline-block font-display text-5xl leading-tight tracking-tight transition-colors hover:text-accent sm:text-6xl"
            >
              {next.client} →
            </Link>
          </div>
          <Link to="/" hash="uxui" className="text-xs uppercase tracking-[0.22em] text-foreground/70 hover:text-foreground">
            ← Todos los proyectos UX
          </Link>
        </div>
      </section>
    </ProjectShell>
  );
}
