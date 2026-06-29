import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";
import logo from "@/assets/Logo_JC-01.png";
import { uxProjects } from "@/lib/ux-projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Julio Cardona — Diseñador Gráfico Senior · Branding, Packaging & Web" },
      { name: "description", content: "Portafolio de Julio Cardona: branding, packaging, diseño web y UX/UI para marcas líderes en México, EE.UU. y LATAM." },
      { property: "og:title", content: "Julio Cardona — Diseñador Gráfico Senior" },
      { property: "og:description", content: "Branding, packaging, web y UX/UI con más de una década de experiencia." },
    ],
    links: [{ rel: "icon", type: "image/png", href: "/assets/favicon.png" }],
  }),
  component: Index,
});

const CDN = "/assets";

// ─── ParticleCanvas ───────────────────────────────────────────────────────────
function ParticleCanvas() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Alias to non-null consts so nested functions satisfy TS
    const cvs = canvas;
    const ctx2d = ctx;
    const cnt = wrap;

    const PARTICLE_COUNT = 72;
    const MAX_DIST = 160;
    const ACCENT: [number, number, number] = [255, 98, 0];
    const NEUTRAL: [number, number, number] = [200, 200, 210];
    const NEUTRAL_LINE: [number, number, number] = [160, 160, 175];

    let W = 0, H = 0, raf = 0, dpr = 1;

    type Ptcl = {
      x: number; y: number; vx: number; vy: number;
      r: number; opacity: number; pulse: number; pulseSpeed: number;
    };

    let particles: Ptcl[] = [];

    function resize() {
      dpr = window.devicePixelRatio || 1;
      const rect = cnt.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      cvs.width = W * dpr;
      cvs.height = H * dpr;
      cvs.style.width = W + "px";
      cvs.style.height = H + "px";
      ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawn(): Ptcl {
      return {
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.6, opacity: Math.random() * 0.5 + 0.3,
        pulse: Math.random() * Math.PI * 2, pulseSpeed: Math.random() * 0.015 + 0.008,
      };
    }

    function init() {
      resize();
      particles = Array.from({ length: PARTICLE_COUNT }, spawn);
    }

    function draw() {
      ctx2d.clearRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy; p.pulse += p.pulseSpeed;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        const pr = p.r + Math.sin(p.pulse) * 0.4;
        const alpha = p.opacity * (0.85 + Math.sin(p.pulse * 1.3) * 0.15);
        const isAccent = i % 7 === 0;
        const [r, g, b] = isAccent ? ACCENT : NEUTRAL;
        ctx2d.beginPath();
        ctx2d.arc(p.x, p.y, pr * 1.6, 0, Math.PI * 2);
        ctx2d.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx2d.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const lineAlpha = (1 - dist / MAX_DIST) * 0.45;
            const bothAccent = isAccent && j % 7 === 0;
            const [lr, lg, lb] = bothAccent ? ACCENT : NEUTRAL_LINE;
            ctx2d.beginPath();
            ctx2d.moveTo(p.x, p.y); ctx2d.lineTo(q.x, q.y);
            ctx2d.strokeStyle = `rgba(${lr},${lg},${lb},${lineAlpha})`;
            ctx2d.lineWidth = bothAccent ? 1.4 : 0.9;
            ctx2d.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    }

    init(); draw();
    const ro = new ResizeObserver(init);
    ro.observe(cnt);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full" style={{ aspectRatio: "4/5" }} aria-hidden>
      <canvas ref={canvasRef} style={{ display: "block", background: "transparent" }} />
    </div>
  );
}

// ─── RevealText ───────────────────────────────────────────────────────────────
interface RevealTextProps {
  as?: "h1" | "h2" | "h3" | "h4" | "p";
  className?: string;
  lines: React.ReactNode[];
  delay?: number;
}

function RevealText({ as: Tag = "h2", className = "", lines, delay = 90 }: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <Tag ref={ref as unknown as React.RefObject<HTMLHeadingElement>} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden leading-[1.05]">
          <span className="block" style={{
            transform: visible ? "translateY(0)" : "translateY(110%)",
            opacity: visible ? 1 : 0,
            transition: `transform 0.75s cubic-bezier(0.16,1,0.3,1) ${i * delay}ms, opacity 0.5s ease ${i * delay}ms`,
          }}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}

// ─── FadeUp ───────────────────────────────────────────────────────────────────
function FadeUp({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      transform: visible ? "translateY(0)" : "translateY(28px)",
      opacity: visible ? 1 : 0,
      transition: `transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, opacity 0.6s ease ${delay}ms`,
    }}>{children}</div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const services = [
  { n: "01", title: "Branding e imagen corporativa", items: ["Diseño de imagen corporativa y branding", "Material POP", "Manual de uso de marca"] },
  { n: "02", title: "Diseño editorial", items: ["Folletería y brochure", "Catálogos", "Informes anuales"] },
  { n: "03", title: "Diseño web", items: ["Sitios corporativos", "Tiendas en línea", "Landing pages"] },
  { n: "04", title: "Packaging", items: ["Desarrollo estructural", "Diseño gráfico de empaque", "Prototipos"] },
  { n: "05", title: "Licensing", items: ["Aplicación de artes", "Elaboración de prototipos", "Material POP"] },
  { n: "06", title: "Diseño UX / UI", items: ["Investigación de usuario", "Personas, escenarios y flujos", "Wireframes y prototipos Lo-Fi / Hi-Fi", "Pruebas de usabilidad"] },
];

interface Project { client: string; desc: string; category: string; img: string; span?: "tall" | "wide" | "normal"; }

const projects: Project[] = [
  // Branding (9)
  { client: "LVC", desc: "Logo, Branding & Style Guide", category: "Branding", img: `${CDN}/Guia_LVCOPTI.jpg`, span: "wide" },
  { client: "Vibe Adventures", desc: "Logo, Branding & Style Guide", category: "Branding", img: `${CDN}/Guia_VibeOPTI.jpg` },
  { client: "Hola Mahjóng", desc: "Logo, Branding & Style Guide", category: "Branding", img: `${CDN}/Guia_Mahjong.jpg` },
  { client: "KRMN Custom Brokers", desc: "Logo & Branding", category: "Branding", img: `${CDN}/KRMN_Moodboard.jpg` },
  { client: "Reputique", desc: "Logo & Branding", category: "Branding", img: `${CDN}/Repurique_Moodboard.jpg` },
  { client: "Laboratorios Reuffer", desc: "Logo & Branding", category: "Branding", img: `${CDN}/Laboratorios_Reuffer_Moodboard.jpg` },
  { client: "Javelina Hunting Texas", desc: "Logo & Branding", category: "Branding", img: `${CDN}/Javelina_moodboard.jpg`, span: "wide" },
  { client: "Leon Oil Transfer", desc: "Logo & Branding", category: "Branding", img: `${CDN}/Leon_Moodboard.jpg` },
  { client: "Infinigas", desc: "Logo & Branding", category: "Branding", img: `${CDN}/Infinigas_Moodboard.jpg` },
  // Packaging (10)
  { client: "EJ Water — Ground Coffee", desc: "Empaque navideño", category: "Packaging", img: `${CDN}/packaging_design1.jpg`, span: "wide" },
  { client: "Hamcock Wine", desc: "Diseño de etiqueta", category: "Packaging", img: `${CDN}/packaging_design-wine.jpg` },
  { client: "Sílica Spray Kerashine", desc: "Línea de sílicas en spray", category: "Packaging", img: `${CDN}/packaging_design_Silics_spray3.jpg` },
  { client: "Power Probiotic", desc: "Empaques y etiquetas", category: "Packaging", img: `${CDN}/packaging_design_probiotics.jpg`, span: "tall" },
  { client: "Sílica Kerashine", desc: "Línea de sílicas en spray", category: "Packaging", img: `${CDN}/Packaging_125.jpg` },
  { client: "Spray de Brillo Kerashine", desc: "Empaques y etiquetas", category: "Packaging", img: `${CDN}/Packaging_124.jpg` },
  { client: "Tattoo Master's", desc: "Línea de productos para tatuajes", category: "Packaging", img: `${CDN}/Packaging_1tatto.jpg` },
  { client: "Express Retouch", desc: "Diseño de etiquetas", category: "Packaging", img: `${CDN}/Packaging_express_retouch.jpg` },
  { client: "Express Fantasy", desc: "Sprays de color temporal", category: "Packaging", img: `${CDN}/Packaging_fantasy.jpg`, span: "wide" },
  { client: "Spray Fijador", desc: "Diseño de línea", category: "Packaging", img: `${CDN}/Packaging_spry_fijador.jpg` },
  // Web (4)
  { client: "The Beer Box", desc: "Web design & UX/UI App", category: "Web", img: `${CDN}/mosiaco_Proyectos_Beerbox.jpg`, span: "wide" },
  { client: "Leon Oil Transfer", desc: "Logo, Branding & Website", category: "Web", img: `${CDN}/Leon_thumb.jpg` },
  { client: "MEC — Renta de Maquinaria", desc: "Web design", category: "Web", img: `${CDN}/mosiaco_mec.jpg` },
  { client: "Goa Tek", desc: "E-Commerce", category: "Web", img: `${CDN}/mosiaco_goa.jpg`, span: "wide" },
  // Restaurantes (4)
  { client: "Athena Deli", desc: "Takeout Packaging & Brand Identity", category: "Restaurantes", img: `${CDN}/packaging_to_Go_design.jpg` },
  { client: "550 Pizzeria", desc: "Restaurant Advertising Design", category: "Restaurantes", img: `${CDN}/mosiac_Design-restaurant.jpg`, span: "wide" },
  { client: "Big Bull Grill", desc: "Logo & Advertising", category: "Restaurantes", img: `${CDN}/tend_card_Design-restaurant.jpg` },
  { client: "Ravello", desc: "Logo & Menu Design", category: "Restaurantes", img: `${CDN}/design_menu_restaurant_ravello.jpg` },
  // POP (4)
  { client: "Inspira Yoga", desc: "Eventos y clases", category: "Catálogo & POP", img: `${CDN}/pop_design_inspira.jpg` },
  { client: "Med Serv", desc: "Brochure", category: "Catálogo & POP", img: `${CDN}/brochure_graphic_design_3.jpg`, span: "tall" },
  { client: "Vibe Adventures", desc: "Display promocional", category: "Catálogo & POP", img: `${CDN}/Cube_Banner_design_3.jpg` },
  { client: "Lone Star Real State", desc: "Logo & Brochure", category: "Catálogo & POP", img: `${CDN}/brochure_design_real_state.jpg` },
];

const nav = [
  { label: "Sobre mí", href: "#about" },
  { label: "Branding", href: "#logo-branding" },
  { label: "Packaging", href: "#packaging" },
  { label: "Web", href: "#diseno-web" },
  { label: "Menús", href: "#restaurant-branding" },
  { label: "Catálogo & POP", href: "#brochures-pop" },
  { label: "UX / UI", href: "/ux-ui" },
  { label: "Contacto", href: "#contact" },
];

const workGroups = [
  { id: "logo-branding", eyebrow: "01 — Identidad", title: "Logotipo & Branding", desc: "Sistemas de identidad y manuales de marca para marcas con visión a largo plazo.", category: "Branding" },
  { id: "packaging", eyebrow: "02 — Producto", title: "Packaging", desc: "Empaques que comunican desde el anaquel — estructura, gráfica y prototipos.", category: "Packaging" },
  { id: "diseno-web", eyebrow: "03 — Digital", title: "Diseño Web", desc: "Sitios corporativos, tiendas en línea y landing pages enfocadas en conversión.", category: "Web" },
  { id: "restaurant-branding", eyebrow: "04 — Hospitality", title: "Menús & Branding de restaurantes", desc: "Identidad, publicidad y materiales para restaurantes y experiencias culinarias.", category: "Restaurantes" },
  { id: "brochures-pop", eyebrow: "05 — Print & POP", title: "Catálogo & POP", desc: "Editorial, brochures y materiales POP para campañas y puntos de venta.", category: "Catálogo & POP" },
];

const uxProcess = [
  { n: "01", title: "Investigación", desc: "Investigación y comprensión del usuario para entender contexto, motivaciones y fricciones reales." },
  { n: "02", title: "Personas & escenarios", desc: "Creación de personas y escenarios de usuario que aterrizan decisiones de producto con evidencia." },
  { n: "03", title: "Flujos & mapas", desc: "Flujos de usuario y mapas de experiencia para visualizar todo el recorrido extremo a extremo." },
  { n: "04", title: "Wireframes & prototipos", desc: "Wireframes y prototipos Lo-Fi y Hi-Fi listos para validar con stakeholders y usuarios reales." },
  { n: "05", title: "Pruebas de usabilidad", desc: "Testing iterativo para medir, ajustar y entregar interfaces que funcionan y convierten." },
];

// ─── Lightbox ─────────────────────────────────────────────────────────────────
type LightboxState = { images: { src: string; client: string; desc: string }[]; index: number } | null;

function ProjectLightbox({ state, onClose, onPrev, onNext }: { state: LightboxState; onClose: () => void; onPrev: () => void; onNext: () => void }) {
  useEffect(() => {
    if (!state) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [state, onClose, onPrev, onNext]);
  if (!state) return null;
  const current = state.images[state.index];
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 backdrop-blur-sm" onClick={onClose}>
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center border border-white/20 bg-black/60 text-white text-xl transition-all hover:border-accent hover:text-accent sm:left-8" aria-label="Anterior">←</button>
      <div className="relative mx-16 max-h-[85vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
        <img src={current.src} alt={current.client} className="max-h-[80vh] max-w-[85vw] object-contain shadow-2xl" />
        <div className="absolute inset-x-0 bottom-0 bg-black/50 px-5 py-2 backdrop-blur-sm flex items-center justify-between gap-4">
          <p className="font-display text-base text-white truncate">{current.client} <span className="text-accent text-xs uppercase tracking-widest">— {current.desc}</span></p>
          <p className="text-xs text-white/50 shrink-0">{state.index + 1} / {state.images.length}</p>
        </div>
      </div>
      <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center border border-white/20 bg-black/60 text-white text-xl transition-all hover:border-accent hover:text-accent sm:right-8" aria-label="Siguiente">→</button>
      <button onClick={onClose} className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center border border-white/20 bg-black/60 text-white transition-all hover:border-accent hover:text-accent sm:right-8 sm:top-8" aria-label="Cerrar">✕</button>
    </div>
  );
}

// ─── WhatsApp ─────────────────────────────────────────────────────────────────
function WhatsAppBubble() {
  const href = `https://wa.me/525547861767?text=${encodeURIComponent("¡Hola Julio! Me gustaría platicar sobre un proyecto.")}`;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="group fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-[#25D366] px-5 py-3 shadow-[0_8px_30px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_40px_rgba(37,211,102,0.6)]" aria-label="Contactar por WhatsApp">
      <svg className="h-6 w-6 shrink-0 fill-white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
      <span className="text-sm font-medium text-white">Platiquemos</span>
    </a>
  );
}

// ─── ContactForm ──────────────────────────────────────────────────────────────
function ContactForm({ time }: { time: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "c049967e-8dfd-486f-a7e5-37d6380ae582");
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const data = await res.json() as { success: boolean };
      if (data.success) { setStatus("ok"); formRef.current?.reset(); } else setStatus("error");
    } catch { setStatus("error"); }
  };
  return (
    <div className="grid gap-20 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <FadeUp><p className="text-xs uppercase tracking-[0.25em] text-background/50">— Contacto</p></FadeUp>
        <RevealText as="h2" className="mt-6 font-display text-[clamp(2.5rem,6vw,6rem)] leading-[0.95] tracking-tight" lines={["¿Tienes un proyecto", "en mente?", <em key="em" className="italic text-accent">Platiquemos.</em>]} />
        <FadeUp delay={200}><p className="mt-10 max-w-md text-base leading-relaxed text-background/70">Escríbeme y cuéntame acerca de tu proyecto — a la brevedad me pondré en contacto contigo para definir alcance, tiempos y la mejor estrategia.</p></FadeUp>
        <FadeUp delay={300}>
          <div className="mt-14 space-y-6">
            <a href="mailto:hola@juliocardona.net" className="group block border-b border-background/20 pb-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-background/50">E-mail</p>
              <p className="mt-2 font-display text-2xl transition-colors group-hover:text-accent sm:text-3xl">hola@juliocardona.net</p>
            </a>
            <div className="grid grid-cols-2 gap-6 border-b border-background/20 pb-4">
              <div><p className="text-[10px] uppercase tracking-[0.25em] text-background/50">Ubicación</p><p className="mt-2 text-lg">Ciudad de México · MX</p></div>
              <div><p className="text-[10px] uppercase tracking-[0.25em] text-background/50">Hora local</p><p className="mt-2 text-lg">{time || "—"} CDMX</p></div>
            </div>
          </div>
        </FadeUp>
      </div>
      <form ref={formRef} onSubmit={onSubmit} className="lg:col-span-6 lg:pl-10">
        <div className="space-y-8">
          {[
            { id: "name", name: "name", label: "01 — Tu nombre", type: "text", placeholder: "Nombre completo", required: true },
            { id: "email", name: "email", label: "02 — Correo electrónico", type: "email", placeholder: "tu@correo.com", required: true },
            { id: "subject", name: "subject", label: "03 — Asunto", type: "text", placeholder: "Proyecto de branding…", required: false },
          ].map((f, i) => (
            <FadeUp key={f.id} delay={i * 80}>
              <label htmlFor={f.id} className="text-[10px] uppercase tracking-[0.25em] text-background/50">{f.label}</label>
              <input id={f.id} name={f.name} type={f.type} placeholder={f.placeholder} required={f.required} className="mt-3 w-full border-0 border-b border-background/20 bg-transparent pb-3 text-lg text-background placeholder:text-background/30 focus:border-accent focus:outline-none" />
            </FadeUp>
          ))}
          <FadeUp delay={240}>
            <label htmlFor="message" className="text-[10px] uppercase tracking-[0.25em] text-background/50">04 — Tu mensaje (opcional)</label>
            <textarea id="message" name="message" rows={4} placeholder="Cuéntame brevemente sobre tu proyecto…" className="mt-3 w-full resize-none border-0 border-b border-background/20 bg-transparent pb-3 text-lg text-background placeholder:text-background/30 focus:border-accent focus:outline-none" />
          </FadeUp>
          <FadeUp delay={300}>
            <div className="flex flex-col gap-4">
              <button type="submit" disabled={status === "sending"} className="group inline-flex items-center gap-4 border border-background/30 bg-transparent px-8 py-5 text-xs uppercase tracking-[0.25em] transition-all hover:border-accent hover:bg-accent hover:text-foreground disabled:opacity-50">
                {status === "sending" ? "Enviando…" : "Enviar mensaje"}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </button>
              {status === "ok" && <p className="text-sm text-emerald-400 tracking-wide">✓ Mensaje enviado — ¡nos ponemos en contacto pronto!</p>}
              {status === "error" && <p className="text-sm text-red-400 tracking-wide">✕ Algo salió mal. Escríbeme directo a hola@juliocardona.net</p>}
            </div>
          </FadeUp>
        </div>
      </form>
    </div>
  );
}

// ─── Index ────────────────────────────────────────────────────────────────────
function Index() {
  const [time, setTime] = useState("");
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  useEffect(() => {
    const fmt = () => new Intl.DateTimeFormat("es-MX", { hour: "2-digit", minute: "2-digit", timeZone: "America/Mexico_City" }).format(new Date());
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  const openLightbox = useCallback((items: Project[], idx: number) => {
    setLightbox({ images: items.map((p) => ({ src: p.img, client: p.client, desc: p.desc })), index: idx });
  }, []);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prevImage = useCallback(() => setLightbox((prev) => prev ? { ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length } : prev), []);
  const nextImage = useCallback(() => setLightbox((prev) => prev ? { ...prev, index: (prev.index + 1) % prev.images.length } : prev), []);

  return (
    <div id="home-root" className="min-h-screen bg-background text-foreground antialiased">
      <ProjectLightbox state={lightbox} onClose={closeLightbox} onPrev={prevImage} onNext={nextImage} />
      <WhatsAppBubble />

      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-xl bg-background/75 border-b border-border/60">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-3.5 sm:px-6 sm:py-4 lg:px-12">
          <a href="#top" className="flex shrink-0 items-center gap-3">
            <img src={logo} alt="Julio Cardona Estudio" className="h-8 w-auto" />
          </a>
          <nav className="hidden items-center gap-8 text-sm lg:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="relative text-foreground/70 transition-colors duration-300 hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-accent after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100">{n.label}</a>
            ))}
          </nav>
          <a href="#contact" className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-foreground/20 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] transition-all duration-300 hover:border-accent hover:bg-accent hover:text-accent-foreground sm:px-4 sm:py-2 sm:text-xs">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Disponible
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-40">
        <div aria-hidden className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full opacity-[0.18] blur-3xl" style={{ background: "radial-gradient(closest-side, #ff6200, transparent 70%)" }} />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-20 h-[420px] w-[420px] rounded-full opacity-[0.08] blur-3xl" style={{ background: "radial-gradient(closest-side, #ff6200, transparent 70%)" }} />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <FadeUp>
                <div className="inline-flex items-center gap-3 rounded-full border border-foreground/15 bg-background/60 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-muted-foreground backdrop-blur">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  Portafolio · 2026
                </div>
              </FadeUp>
              <div className="mt-8 text-[clamp(3.25rem,9vw,9rem)] leading-[0.88] tracking-[-0.02em] select-none" style={{ fontFamily: "'Arial Black', 'Helvetica Neue', Impact, sans-serif", fontWeight: 900 }}>
                {/* "Diseño con" — image clipped inside letters */}
                {[
                  { text: "Diseño con", delay: 100 },
                  { text: "marcas que", delay: 300 },
                  { text: "perduran.", delay: 400 },
                ].map(({ text, delay }) => (
                  <div key={text} className="block overflow-hidden">
                    <div
                      style={{
                        backgroundImage: `url(${CDN}/KRMN_Moodboard.jpg)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        animation: `heroReveal 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms both`,
                      }}
                    >
                      {text}
                    </div>
                  </div>
                ))}
                {/* "criterio," — accent color, italic */}
                <div className="block overflow-hidden">
                  <div style={{ animation: "heroReveal 0.75s cubic-bezier(0.16,1,0.3,1) 200ms both" }}>
                    <em style={{ color: "#ff6200", fontStyle: "italic", fontFamily: "'Arial Black', 'Helvetica Neue', Impact, sans-serif", fontWeight: 900 }}>criterio</em>
                    <span style={{ color: "inherit" }}>,</span>
                  </div>
                </div>
              </div>
              <style>{`
                @keyframes heroReveal {
                  from { transform: translateY(110%); opacity: 0; }
                  to   { transform: translateY(0);    opacity: 1; }
                }
              `}</style>
              <FadeUp delay={500}>
                <p className="mt-10 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Soy Julio Cardona, diseñador gráfico senior especializado en{" "}
                  <span className="text-foreground">branding, packaging, web y UX/UI</span>. Durante más de una década he desarrollado identidades, sistemas visuales y experiencias digitales para marcas en México, EE.UU. y LATAM, combinando estrategia, ejecución y sensibilidad visual con resultados medibles.
                </p>
              </FadeUp>
              <FadeUp delay={650}>
                <div className="mt-12 flex flex-wrap items-center gap-4">
                  <a href="#work" className="group relative inline-flex items-center gap-3 overflow-hidden bg-foreground px-7 py-4 text-sm uppercase tracking-[0.2em] text-background transition-all duration-500 hover:shadow-[0_20px_60px_-20px_rgba(255,98,0,0.5)]">
                    <span className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-500 ease-out group-hover:translate-x-0" />
                    <span className="relative">Ver portafolio</span>
                    <span aria-hidden className="relative transition-transform duration-500 group-hover:translate-x-1">→</span>
                  </a>
                  <a href="#contact" className="inline-flex items-center gap-2 px-2 py-4 text-sm uppercase tracking-[0.2em] text-foreground/70 underline underline-offset-8 decoration-foreground/20 transition-colors duration-300 hover:text-accent hover:decoration-accent">Iniciar un proyecto</a>
                </div>
              </FadeUp>
            </div>
            <div className="relative lg:col-span-5">
              <ParticleCanvas />
              <div className="absolute -left-4 -bottom-4 hidden bg-background px-5 py-4 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)] sm:block">
                <p className="font-display text-3xl leading-none">10<sup className="text-accent">+</sup></p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Años de experiencia</p>
              </div>
              <div className="absolute -right-2 -top-2 hidden rotate-3 bg-accent px-3 py-2 text-accent-foreground shadow-[0_15px_40px_-10px_rgba(255,98,0,0.5)] sm:block">
                <p className="text-[10px] uppercase tracking-[0.2em] font-medium">Senior Designer</p>
              </div>
            </div>
          </div>
          <div className="mt-20 sm:mt-28 grid grid-cols-2 gap-px border-y border-border bg-border lg:grid-cols-4">
            {[["120+", "Proyectos entregados"], ["10+", "Años de experiencia"], ["3", "Países atendidos"], ["28", "Casos destacados"]].map(([k, v]) => (
              <div key={v} className="group bg-background px-6 py-10 transition-colors duration-500 hover:bg-foreground hover:text-background">
                <p className="font-display text-4xl tracking-tight transition-colors duration-500 group-hover:text-accent">{k}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-500 group-hover:text-background/70">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative py-32 lg:py-44">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <FadeUp><p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">— Acerca de mí</p></FadeUp>
              <RevealText as="h2" className="mt-6 font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl" lines={["Visión estratégica,", "precisión técnica."]} />
              <FadeUp delay={200}>
                <div className="mt-10 space-y-6 text-base leading-relaxed text-muted-foreground">
                  <p>Diseñador Gráfico Senior especializado en <span className="text-foreground">UX/UI, branding y empaque</span>. Con más de una década de experiencia colaborando con marcas líderes en México, EE. UU. y LATAM, combino visión estratégica, precisión técnica y sensibilidad creativa para entregar proyectos que superan expectativas.</p>
                  <p>Cada proyecto comienza con escuchar — y termina con piezas medibles, claras y con personalidad propia.</p>
                </div>
              </FadeUp>
              <FadeUp delay={350}>
                <div className="mt-12 grid grid-cols-2 gap-6 text-sm">
                  <div><p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Basado en</p><p className="mt-2">Ciudad de México · {time || "—"}</p></div>
                  <div><p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Idiomas</p><p className="mt-2">Español · Inglés</p></div>
                </div>
              </FadeUp>
            </div>
            <div className="lg:col-span-7">
              <div className="grid grid-cols-3 gap-4 lg:gap-6">
                {[`${CDN}/cert1.png`, `${CDN}/cert2.png`, `${CDN}/cert3.png`].map((c, i) => (
                  <FadeUp key={c} delay={i * 100}>
                    <figure className="group lift-card relative flex aspect-[3/4] items-center justify-center bg-card p-6 ring-1 ring-border hover:ring-accent">
                      <img src={c} alt={`Certificación ${i + 1}`} loading="lazy" className="max-h-full max-w-full object-contain" />
                      <figcaption className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Cert · 0{i + 1}</figcaption>
                    </figure>
                  </FadeUp>
                ))}
              </div>
              <FadeUp delay={350}><p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">Certificaciones internacionales en diseño y experiencia de usuario</p></FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative bg-paper py-32 lg:py-44">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <FadeUp><p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">— Expertise</p></FadeUp>
              <RevealText as="h2" className="mt-6 font-display text-5xl leading-[1.05] tracking-tight sm:text-7xl" lines={["Seis disciplinas,", <span key="lang"><em className="italic text-accent">un solo lenguaje</em>.</span>]} />
            </div>
            <FadeUp delay={200}><p className="max-w-md text-sm leading-relaxed text-muted-foreground">Servicios pensados para marcas que buscan coherencia entre lo que dicen, lo que muestran y cómo se experimentan.</p></FadeUp>
          </div>
          <div className="mt-20 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <article key={s.n} className="group relative flex flex-col bg-background p-10 transition-colors duration-500 hover:bg-foreground hover:text-background">
                <div className="flex items-start justify-between">
                  <span className="font-display text-2xl text-accent">{s.n}</span>
                  <span aria-hidden className="text-xl opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 -translate-x-2">↗</span>
                </div>
                <h3 className="mt-12 font-display text-3xl leading-tight tracking-tight">{s.title}</h3>
                <ul className="mt-8 space-y-2 text-sm">
                  {s.items.map((it) => (
                    <li key={it} className="flex gap-3 text-muted-foreground transition-colors group-hover:text-background/70">
                      <span className="mt-2 h-px w-3 shrink-0 bg-current opacity-50" />{it}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="relative py-32 lg:py-44">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <FadeUp><p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">— Proyectos destacados</p></FadeUp>
              <RevealText as="h2" className="mt-6 font-display text-5xl leading-[1.05] tracking-tight sm:text-7xl" lines={["Trabajo seleccionado."]} />
            </div>
            <FadeUp delay={200}>
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <span>{projects.length.toString().padStart(2, "0")} casos</span>
                <span className="h-px w-12 bg-foreground/30" />
                <span>2024 — 2026</span>
              </div>
            </FadeUp>
          </div>
          <div className="mt-20 space-y-32">
            {workGroups.map((g) => {
              const items = projects.filter((p) => p.category === g.category);
              return (
                <div key={g.id} id={g.id} className="scroll-mt-24">
                  <div className="flex flex-col gap-6 border-t border-border pt-10 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                      <FadeUp><p className="text-xs uppercase tracking-[0.25em] text-accent">{g.eyebrow}</p></FadeUp>
                      <RevealText as="h3" className="mt-4 font-display text-4xl leading-tight tracking-tight sm:text-6xl" lines={[g.title]} />
                    </div>
                    <FadeUp delay={150}><p className="max-w-md text-sm leading-relaxed text-muted-foreground">{g.desc}</p></FadeUp>
                  </div>
                  <div className="mt-12 grid auto-rows-[280px] grid-cols-1 gap-4 sm:auto-rows-[340px] sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                    {items.map((p, i) => {
                      const span = p.span === "wide" ? "sm:col-span-2 lg:col-span-2" : p.span === "tall" ? "sm:row-span-2" : "";
                      return (
                        <button type="button" key={`${p.client}-${i}`} onClick={() => openLightbox(items, i)} className={`lift-card group relative block w-full overflow-hidden bg-card ring-1 ring-border hover:ring-accent/60 cursor-zoom-in text-left ${span}`}>
                          <img src={p.img} alt={`${p.client} — ${p.desc}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]" />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                          <div className="absolute inset-x-0 bottom-0 grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-end gap-3 p-5 text-background opacity-0 transition-all duration-500 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100">
                            <div className="min-w-0">
                              <p className="text-[10px] uppercase tracking-[0.2em] text-accent">{p.category}</p>
                              <h4 className="mt-1 truncate font-display text-2xl">{p.client}</h4>
                              <p className="truncate text-xs text-background/70">{p.desc}</p>
                            </div>
                            <span aria-hidden className="shrink-0 text-2xl">⊕</span>
                          </div>
                          <div className="absolute left-4 top-4 bg-background/90 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-foreground backdrop-blur">{String(i + 1).padStart(2, "0")}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* UX / UI */}
      <section id="uxui" className="relative bg-paper py-32 lg:py-44">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <FadeUp><p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">— UX / UI</p></FadeUp>
              <RevealText as="h2" className="mt-6 font-display text-5xl leading-[1.02] tracking-tight sm:text-7xl" lines={["Diseño de", <span key="prod"><em className="italic text-accent">producto</em> digital.</span>]} />
              <FadeUp delay={200}><p className="mt-10 max-w-md text-base leading-relaxed text-muted-foreground">Diseño experiencias digitales centradas en el usuario — desde la investigación inicial hasta prototipos Hi-Fi listos para desarrollo. Procesos medibles para productos que se usan, se entienden y convierten.</p></FadeUp>
              <FadeUp delay={300}><a href="#contact" className="mt-10 inline-flex items-center gap-3 border-b border-foreground/30 pb-2 text-xs uppercase tracking-[0.22em] transition-colors hover:border-accent hover:text-accent">Iniciar un proyecto UX <span aria-hidden>→</span></a></FadeUp>
            </div>
            <ol className="lg:col-span-7 lg:pl-10">
              {uxProcess.map((s, i) => (
                <li key={s.n} className={`group grid grid-cols-[auto_1fr_auto] items-start gap-6 py-8 ${i === 0 ? "" : "border-t border-border"}`}>
                  <span className="font-display text-2xl text-accent">{s.n}</span>
                  <div className="min-w-0">
                    <h3 className="font-display text-2xl tracking-tight sm:text-3xl">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  </div>
                  <span aria-hidden className="hidden shrink-0 text-foreground/30 transition-all duration-500 group-hover:translate-x-1 group-hover:text-accent sm:inline">↗</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-20 sm:mt-24 grid gap-6 sm:grid-cols-2">
            {uxProjects.map((p, i) => (
              <Link to="/proyectos/$slug" params={{ slug: p.slug }} key={p.slug} className="lift-card group relative block overflow-hidden bg-background ring-1 ring-border hover:ring-accent/60">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={p.cover} alt={`${p.client} — ${p.tagline}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]" />
                </div>
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 p-6 sm:p-7">
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-accent">{p.category} · {p.year}</p>
                    <h3 className="mt-2 truncate font-display text-2xl tracking-tight transition-colors duration-300 group-hover:text-accent sm:text-3xl">{p.client}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
                    <p className="mt-3 text-xs uppercase tracking-[0.18em] text-foreground/60">{p.role.join(" · ")}</p>
                  </div>
                  <span aria-hidden className="shrink-0 text-2xl text-foreground/40 transition-all duration-500 group-hover:translate-x-1 group-hover:text-accent">↗</span>
                </div>
                <div className="absolute left-4 top-4 bg-background/90 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-foreground backdrop-blur">{String(i + 1).padStart(2, "0")} / {uxProjects.length}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative bg-foreground py-32 text-background lg:py-44">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <ContactForm time={time} />
          <div className="mt-32 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6 border-t border-background/15 pt-10 text-xs uppercase tracking-[0.2em] text-background/50 sm:flex sm:justify-between">
            <p className="min-w-0">© {new Date().getFullYear()} Julio Cardona · Estudio de diseño</p>
            <p className="shrink-0">Ciudad de México · MX</p>
          </div>
        </div>
      </section>
    </div>
  );
}

