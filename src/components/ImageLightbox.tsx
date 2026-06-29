import { useEffect, useRef, useState } from "react";

/**
 * Mounts a fullscreen lightbox that opens when any <img> inside the given
 * root selector is clicked. Shows the image at its natural 100% size with
 * pan-on-overflow and click/Esc to close.
 */
export function ImageLightbox({ rootSelector = "main" }: { rootSelector?: string }) {
  const [src, setSrc] = useState<string | null>(null);
  const [alt, setAlt] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.querySelector(rootSelector);
    if (!root) return;

    const onClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!(target instanceof HTMLImageElement)) return;
      // Always intercept image clicks for zoom — even inside <a>/<button>.
      e.preventDefault();
      e.stopPropagation();
      setSrc(target.currentSrc || target.src);
      setAlt(target.alt || "");
    };

    // Use capture phase so we beat anchor/button click handlers.
    root.addEventListener("click", onClick, true);
    return () => root.removeEventListener("click", onClick, true);
  }, [rootSelector]);

  // Mark every <img> in scope as zoomable (cursor) once mounted.
  useEffect(() => {
    const root = document.querySelector(rootSelector);
    if (!root) return;
    const apply = () => {
      root.querySelectorAll("img").forEach((img) => {
        (img as HTMLImageElement).style.cursor = "zoom-in";
      });
    };
    apply();
    const mo = new MutationObserver(apply);
    mo.observe(root, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, [rootSelector]);


  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSrc(null);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [src]);

  if (!src) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt || "Vista ampliada de imagen"}
      onClick={() => setSrc(null)}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 backdrop-blur-sm animate-in fade-in"
      style={{ cursor: "zoom-out" }}
    >
      <button
        type="button"
        aria-label="Cerrar"
        onClick={() => setSrc(null)}
        className="absolute right-5 top-5 z-[101] inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white transition-colors hover:bg-white hover:text-black"
      >
        ✕
      </button>
      <div
        ref={scrollRef}
        onClick={(e) => e.stopPropagation()}
        className="h-full w-full overflow-auto p-4 sm:p-8"
        style={{ cursor: "default" }}
      >
        <img
          src={src}
          alt={alt}
          className="mx-auto block max-w-none select-none"
          draggable={false}
        />
      </div>
    </div>
  );
}
