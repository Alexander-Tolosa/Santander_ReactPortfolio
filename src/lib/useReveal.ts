import { useLayoutEffect, type RefObject } from "react";
import { gsap, ScrollTrigger, reducedMotion } from "@/lib/gsap";

/** Reveals [data-reveal] children as they enter the viewport, staggered per batch. */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    if (!scope.current || reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.set("[data-reveal]", { y: 36, opacity: 0 });
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 88%",
        once: true,
        onEnter: (els) =>
          gsap.to(els, { y: 0, opacity: 1, duration: 0.9, ease: "expo.out", stagger: 0.09, overwrite: true }),
      });
    }, scope);
    return () => ctx.revert();
  }, [scope]);
}
