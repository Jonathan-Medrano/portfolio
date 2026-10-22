import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { ProjectGalleryGroup } from "@/data";
import { cn } from "@/lib/utils";

/**
 * Screenshots for a project, grouped by what they prove ("the buyer's flow",
 * "the owner's console"). Tabs pick the group; inside a `screen` group a large
 * viewer and a thumbnail strip let you walk through it, and the viewer opens
 * full size in a native <dialog> (Esc to close, arrows to move).
 *
 * `phone` groups are portrait and short, so they sit side by side instead of
 * going through the viewer.
 */
export default function ProjectGallery({
  groups,
}: {
  groups: ProjectGalleryGroup[];
}) {
  const [groupIndex, setGroupIndex] = useState(0);
  const [shotIndex, setShotIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const group = groups[groupIndex];
  const shot = group.shots[shotIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  function selectGroup(index: number) {
    setGroupIndex(index);
    setShotIndex(0);
  }

  function step(delta: number) {
    const total = group.shots.length;
    setShotIndex((current) => (current + delta + total) % total);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  }

  return (
    <div className="flex min-w-0 flex-col gap-4 border-t border-border pt-5">
      <div
        role="tablist"
        aria-label="Capturas del proyecto"
        className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap"
      >
        {groups.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={index === groupIndex}
            onClick={() => selectGroup(index)}
            className={cn(
              "shrink-0 rounded-full border px-3.5 py-1.5 text-sm whitespace-nowrap transition-colors",
              index === groupIndex
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {group.layout === "phone" ? (
        <ul className="flex snap-x gap-6 overflow-x-auto py-2 sm:flex-wrap sm:justify-center sm:gap-10 sm:overflow-visible">
          {group.shots.map((item) => (
            <li
              key={item.src}
              className="flex w-40 shrink-0 snap-center flex-col items-center gap-3 sm:w-48"
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="aspect-[390/664] w-full rounded-[1.6rem] border-4 border-foreground/85 object-cover object-top shadow-lg"
              />
              <p className="text-center text-xs leading-relaxed text-pretty text-muted-foreground">
                {item.caption}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col gap-3" onKeyDown={onKeyDown}>
          {/* A browser frame: it tells the reader these are real screens, not
              illustrations, and gives the image an edge on a white page. */}
          <figure className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
            <div
              className="flex items-center gap-1.5 border-b border-border bg-muted px-3 py-2"
              aria-hidden
            >
              <span className="size-2.5 rounded-full bg-foreground/15" />
              <span className="size-2.5 rounded-full bg-foreground/15" />
              <span className="size-2.5 rounded-full bg-foreground/15" />
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="group relative block w-full cursor-zoom-in"
              aria-label={`Ampliar: ${shot.alt}`}
            >
              <img
                key={shot.src}
                src={shot.src}
                alt={shot.alt}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover object-top"
              />
              <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-md bg-foreground/85 px-2.5 py-1 text-xs text-background opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <Maximize2 className="size-3" aria-hidden />
                Ampliar
              </span>
            </button>
          </figure>

          <p className="min-h-10 text-sm leading-relaxed text-pretty text-muted-foreground">
            {shot.caption}
          </p>

          <ul className="flex gap-2 overflow-x-auto pb-1">
            {group.shots.map((item, index) => (
              <li key={item.src} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setShotIndex(index)}
                  aria-label={item.alt}
                  aria-current={index === shotIndex}
                  className={cn(
                    "block overflow-hidden rounded-md border-2 transition-opacity",
                    index === shotIndex
                      ? "border-foreground"
                      : "border-transparent opacity-70 hover:opacity-100",
                  )}
                >
                  <img
                    src={item.src}
                    alt=""
                    loading="lazy"
                    className="aspect-[16/10] w-24 object-cover object-top sm:w-28"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        onKeyDown={onKeyDown}
        onClick={(event) => {
          if (event.target === dialogRef.current) setOpen(false);
        }}
        className="m-auto max-h-[92dvh] w-[min(1200px,94vw)] rounded-lg bg-background p-0 text-foreground backdrop:bg-black/70"
      >
        {group.layout === "screen" && (
          <div className="flex flex-col">
            <div className="overflow-hidden rounded-t-lg bg-neutral-950">
              <img
                src={shot.src}
                alt={shot.alt}
                className="max-h-[75dvh] w-full object-contain"
              />
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-border p-4">
              <p className="text-sm text-pretty text-muted-foreground">
                {shot.caption}
              </p>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Anterior"
                  className="rounded-md p-2 hover:bg-muted"
                >
                  <ChevronLeft className="size-5" aria-hidden />
                </button>
                <span className="min-w-12 text-center text-xs text-muted-foreground tabular-nums">
                  {shotIndex + 1} / {group.shots.length}
                </span>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Siguiente"
                  className="rounded-md p-2 hover:bg-muted"
                >
                  <ChevronRight className="size-5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar"
                  className="ml-2 rounded-md p-2 hover:bg-muted"
                >
                  <X className="size-5" aria-hidden />
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
