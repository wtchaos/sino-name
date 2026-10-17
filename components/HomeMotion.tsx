"use client";

import { useEffect } from "react";

export function HomeMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".home-page");
    if (!root) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const groups = Array.from(root.querySelectorAll<HTMLElement>("[data-depth-scene]")).map((scene) => ({
      scene,
      layers: Array.from(scene.querySelectorAll<HTMLElement>("[data-scroll-layer]")).map((element) => ({
        element,
        depth: Number(element.dataset.scrollLayer ?? 0),
        axis: element.dataset.scrollAxis === "x" ? "x" : "y",
        limit: Number(element.dataset.scrollLimit ?? 90),
      })),
    }));
    const progress = root.querySelector<HTMLElement>(".scroll-progress > span");
    let frame = 0;
    let disposed = false;
    const clamp = (value: number, limit: number) => Math.max(-limit, Math.min(limit, value));

    const reset = () => {
      groups.forEach(({ layers }) => layers.forEach(({ element }) => {
        element.style.removeProperty("translate");
        element.style.removeProperty("will-change");
      }));
      progress?.style.removeProperty("transform");
    };

    const render = () => {
      frame = 0;
      if (preference.matches) {
        reset();
        return;
      }
      const viewport = window.innerHeight;
      const strength = window.innerWidth <= 900 ? 0.35 : 1;
      // Read scene geometry together before applying compositor-only translations.
      const positions = groups.map(({ scene, layers }) => ({ scene, layers, rect: scene.getBoundingClientRect() }));
      for (const { scene, layers, rect } of positions) {
        const active = rect.bottom > -viewport * 0.25 && rect.top < viewport * 1.25;
        const travel = scene.dataset.depthOrigin === "top"
          ? window.scrollY
          : (viewport - rect.height) / 2 - rect.top;
        for (const { element, depth, limit, axis } of layers) {
          const shift = clamp(travel * depth, limit) * strength;
          element.style.translate = axis === "x" ? `${shift.toFixed(2)}px 0` : `0 ${shift.toFixed(2)}px`;
          if (active) element.style.willChange = "translate";
          else element.style.removeProperty("will-change");
        }
      }
      const total = document.documentElement.scrollHeight - viewport;
      if (progress) progress.style.transform = `scaleX(${total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0})`;
    };
    const request = () => {
      if (!frame && !disposed) frame = window.requestAnimationFrame(render);
    };
    // Font and image layout changes can alter the scene positions without scrolling.
    const resize = new ResizeObserver(request);
    resize.observe(root);
    document.fonts.ready.then(request);
    render();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    window.addEventListener("pageshow", request);
    preference.addEventListener("change", request);
    return () => {
      disposed = true;
      if (frame) window.cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      window.removeEventListener("pageshow", request);
      preference.removeEventListener("change", request);
      reset();
    };
  }, []);

  return <span className="scroll-progress" aria-hidden="true"><span /></span>;
}
