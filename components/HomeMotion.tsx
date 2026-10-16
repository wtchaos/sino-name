"use client";

import { useEffect } from "react";

export function HomeMotion() {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    const revealItems = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          const direction = element.dataset.reveal;
          const delay = Number(element.dataset.delay ?? 0);
          const from =
            direction === "line"
              ? {
                  opacity: 0,
                  transform: "translate3d(-56px, 0, 0)",
                  filter: "blur(8px)",
                }
              : direction === "scale"
                ? {
                    opacity: 0,
                    transform: "scale(0.91) rotate(-1.5deg)",
                    filter: "blur(10px)",
                  }
                : {
                    opacity: 0,
                    transform: "translate3d(0, 54px, 0)",
                    filter: "blur(9px)",
                  };

          element.animate(
            [from, { opacity: 1, transform: "none", filter: "blur(0)" }],
            {
              duration: 900,
              delay,
              easing: "cubic-bezier(0.16, 1, 0.3, 1)",
              fill: "both",
            },
          );
          observer.unobserve(element);
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );
    revealItems.forEach((item) => observer.observe(item));

    const sceneItems = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scene]"),
    );
    const sceneProgress = new Map<HTMLElement, number>();
    const clamp = (value: number, min = 0, max = 1) =>
      Math.min(max, Math.max(min, value));
    const segment = (value: number, start: number, end: number) =>
      clamp((value - start) / (end - start));
    const ease = (value: number) => 1 - Math.pow(1 - clamp(value), 4);

    const setReveal = (
      element: HTMLElement | SVGElement | null,
      value: number,
      options: {
        x?: number;
        y?: number;
        scale?: number;
        rotate?: number;
        blur?: number;
        clip?: "left" | "right" | "bottom";
      } = {},
    ) => {
      if (!element) return;
      const progress = ease(value);
      const hidden = 1 - progress;
      const x = (options.x ?? 0) * hidden;
      const y = (options.y ?? 0) * hidden;
      const scale = 1 - (1 - (options.scale ?? 1)) * hidden;
      const rotate = (options.rotate ?? 0) * hidden;
      element.style.opacity = progress.toFixed(3);
      element.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)}) rotate(${rotate.toFixed(2)}deg)`;
      element.style.filter = `blur(${((options.blur ?? 0) * hidden).toFixed(2)}px)`;
      if (options.clip === "bottom") {
        element.style.clipPath = `inset(0 0 ${(hidden * 100).toFixed(2)}% 0)`;
      }
      if (options.clip === "left") {
        element.style.clipPath = `inset(0 ${(hidden * 100).toFixed(2)}% 0 0)`;
      }
      if (options.clip === "right") {
        element.style.clipPath = `inset(0 0 0 ${(hidden * 100).toFixed(2)}%)`;
      }
    };

    const setCurtain = (element: HTMLElement | null, value: number) => {
      if (!element) return;
      const progress = ease(value);
      const x = -112 + progress * 224;
      const skew = -Math.sin(progress * Math.PI * 2) * 8;
      element.style.transform = `translate3d(${x.toFixed(2)}%, 0, 0) skewX(${skew.toFixed(2)}deg)`;
    };

    const renderScene = (scene: HTMLElement, progress: number) => {
      if (scene.dataset.scene === "method") {
        setCurtain(
          scene.querySelector<HTMLElement>(".method-curtain"),
          segment(progress, 0, 0.42),
        );
        const copy = scene.querySelectorAll<HTMLElement>(
          ".method-heading > *, .method-summary > *",
        );
        copy.forEach((element, index) => {
          const start = 0.16 + index * 0.055;
          setReveal(element, segment(progress, start, start + 0.35), {
            y: 64,
            blur: 10,
            clip: "bottom",
          });
        });
      }

      if (scene.dataset.scene === "steps") {
        setReveal(
          scene.querySelector<HTMLElement>(".section-heading"),
          segment(progress, 0.02, 0.3),
          { y: 72, scale: 0.97, blur: 12 },
        );
        const rows = scene.querySelectorAll<HTMLElement>(".steps-list > li");
        rows.forEach((row, index) => {
          const direction = index % 2 === 0 ? -1 : 1;
          const start = 0.18 + index * 0.105;
          const rowProgress = segment(progress, start, start + 0.34);
          setReveal(row, rowProgress, {
            x: direction * 110,
            rotate: direction * 1.2,
            blur: 10,
            clip: direction < 0 ? "left" : "right",
          });
          setReveal(
            row.querySelector<HTMLElement>(".step-number"),
            segment(progress, start + 0.035, start + 0.33),
            { scale: 2.8, rotate: -18 },
          );
        });
      }

      if (scene.dataset.scene === "inside") {
        setCurtain(
          scene.querySelector<HTMLElement>(".inside-curtain"),
          segment(progress, 0, 0.4),
        );
        const glyphs = scene.querySelector<HTMLElement>(".inside-glyphs");
        if (glyphs) {
          const glyphProgress = ease(segment(progress, 0.06, 0.58));
          glyphs.style.opacity = (glyphProgress * 0.045).toFixed(4);
          glyphs.style.transform = `scale(${(0.68 + glyphProgress * 0.32).toFixed(4)}) rotate(${(-8 + glyphProgress * 8).toFixed(2)}deg)`;
        }
        setReveal(
          scene.querySelector<HTMLElement>(".inside-intro"),
          segment(progress, 0.18, 0.55),
          { x: -84, blur: 12 },
        );
        const rows = scene.querySelectorAll<HTMLElement>(".feature-lines > div");
        rows.forEach((row, index) => {
          const start = 0.27 + index * 0.085;
          setReveal(row, segment(progress, start, start + 0.3), {
            x: 100,
            blur: 9,
          });
          setReveal(
            row.querySelector<SVGElement>("svg"),
            segment(progress, start + 0.035, start + 0.31),
            { scale: 0.35, rotate: -30 },
          );
        });
      }

      if (scene.dataset.scene === "final") {
        setReveal(scene, segment(progress, 0, 0.72), {
          scale: 0.92,
          blur: 14,
        });
        const seal = scene.querySelector<SVGSVGElement>(".final-cta-mark");
        const sealProgress = segment(progress, 0.06, 0.58);
        setReveal(seal, sealProgress, { scale: 0.55, rotate: -22 });
        seal?.querySelectorAll<SVGGeometryElement>("circle, path").forEach(
          (line, index) => {
            const drawProgress = ease(
              segment(progress, 0.12 + index * 0.065, 0.6 + index * 0.04),
            );
            line.style.strokeDasharray = "360";
            line.style.strokeDashoffset = `${((1 - drawProgress) * 360).toFixed(2)}`;
            line.style.opacity = `${(0.2 + drawProgress * 0.8).toFixed(3)}`;
          },
        );
        const copy = scene.querySelectorAll<HTMLElement>("h2, p, .button");
        copy.forEach((element, index) => {
          const start = 0.22 + index * 0.07;
          setReveal(element, segment(progress, start, start + 0.34), { y: 44 });
        });
      }
    };

    const parallaxItems = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]"),
    );
    const scrollProgress = document.querySelector<HTMLElement>(
      ".scroll-progress > span",
    );
    const ribbonTrack = document.querySelector<HTMLElement>(
      "[data-scroll-track]",
    );
    let frame = 0;
    const updateParallax = () => {
      let needsAnotherFrame = false;
      for (const scene of sceneItems) {
        const rect = scene.getBoundingClientRect();
        const start = window.innerHeight * 0.9;
        const end = window.innerHeight * 0.16;
        const target = clamp((start - rect.top) / (start - end));
        const previous = sceneProgress.get(scene);
        const current =
          previous === undefined
            ? target
            : previous + (target - previous) * 0.18;
        const settled = Math.abs(target - current) < 0.001;
        const displayed = settled ? target : current;
        sceneProgress.set(scene, displayed);
        renderScene(scene, displayed);
        needsAnotherFrame ||= !settled;
      }
      for (const element of parallaxItems) {
        const rect = element.getBoundingClientRect();
        const depth = Number(element.dataset.parallax ?? 1);
        const distance =
          (rect.top + rect.height / 2 - window.innerHeight / 2) /
          window.innerHeight;
        const bounded = Math.max(-1, Math.min(1, distance));
        element.style.setProperty(
          "--scroll-shift",
          `${(-bounded * 26 * depth).toFixed(2)}px`,
        );
        element.style.setProperty(
          "--scroll-turn",
          `${(bounded * 2.2 * depth).toFixed(2)}deg`,
        );
      }
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      if (scrollProgress) {
        scrollProgress.style.transform = `scaleX(${Math.max(0, Math.min(1, progress))})`;
      }
      if (ribbonTrack) {
        ribbonTrack.style.setProperty(
          "--ribbon-shift",
          `${(-window.scrollY * 0.2).toFixed(2)}px`,
        );
      }
      if (needsAnotherFrame) {
        frame = window.requestAnimationFrame(updateParallax);
      } else {
        frame = 0;
      }
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <span className="scroll-progress" aria-hidden="true">
      <span />
    </span>
  );
}
