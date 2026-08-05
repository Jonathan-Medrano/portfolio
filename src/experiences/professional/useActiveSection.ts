import { useEffect, useState } from "react";

/**
 * Scroll-spy for the single-page navbar.
 *
 * Uses IntersectionObserver instead of a scroll listener on purpose: the
 * browser does the work off the main thread, so scrolling stays smooth even
 * with the section animations running.
 *
 * The rootMargin shrinks the viewport to a horizontal band around the upper
 * third: a section counts as "active" when it crosses that band, which matches
 * where the eye actually is while reading — not when it merely appears.
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // More than one section can be intersecting; pick the topmost one so
        // the highlight never flickers between neighbours.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];

        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));

    // The last section is usually too short to ever reach the observer band —
    // the page runs out of scroll first, so "Contacto" would never light up.
    // Once we're at the bottom, it's the section being read, by definition.
    const onScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 2;
      if (atBottom) setActive(ids[ids.length - 1]);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [ids]);

  return active;
}
