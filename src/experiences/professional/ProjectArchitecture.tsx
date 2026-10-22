import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  archEdges,
  archFlows,
  archNodes,
  type ArchNode,
  type NodeId,
} from "@/data/ticketeraArchitecture";

const NODE_W = 190;
const NODE_H = 76;

function center(node: ArchNode) {
  return { x: node.x + NODE_W / 2, y: node.y + NODE_H / 2 };
}

function byId(id: NodeId) {
  return archNodes.find((node) => node.id === id)!;
}

/** Point where the line from `a` to `b` leaves the box of `a`. */
function edgePoints(from: NodeId, to: NodeId) {
  const a = center(byId(from));
  const b = center(byId(to));
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const scale = Math.min(
    dx === 0 ? Infinity : NODE_W / 2 / Math.abs(dx),
    dy === 0 ? Infinity : NODE_H / 2 / Math.abs(dy),
  );
  const startScale = scale + 0.02;
  const endScale = 1 - scale - 0.02;
  return {
    x1: a.x + dx * startScale,
    y1: a.y + dy * startScale,
    x2: a.x + dx * endScale,
    y2: a.y + dy * endScale,
  };
}

/**
 * "How it works inside": one architecture diagram, three flows. Picking a flow
 * lights up the parts it touches and lists the steps — the same boxes tell a
 * different story each time, which is the point: the decisions live in the
 * flows, not in the boxes.
 */
export default function ProjectArchitecture() {
  const [flowIndex, setFlowIndex] = useState(0);
  const flow = archFlows[flowIndex];
  const activeNodes = new Set<NodeId>(flow.nodes);
  const activeEdges = new Set(flow.edges.map(([a, b]) => `${a}>${b}`));

  return (
    <div className="flex min-w-0 flex-col gap-5 border-t border-border pt-5">
      <div className="flex flex-col gap-1">
        <h4 className="font-heading text-lg font-semibold">
          Cómo funciona por dentro
        </h4>
        <p className="text-sm text-pretty text-muted-foreground">
          Un mismo sistema, tres recorridos. Elegí uno para ver qué partes
          toca y qué decisión lo protege.
        </p>
      </div>

      <div
        role="tablist"
        aria-label="Flujos de Ticketera"
        className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap"
      >
        {archFlows.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={index === flowIndex}
            onClick={() => setFlowIndex(index)}
            className={cn(
              "shrink-0 rounded-full border px-3.5 py-1.5 text-sm whitespace-nowrap transition-colors",
              index === flowIndex
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <svg
          viewBox="0 0 920 300"
          role="img"
          aria-label={`Diagrama de arquitectura: ${flow.label}`}
          className="w-full rounded-lg border border-border bg-muted/40"
        >
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0 0L10 5L0 10z" fill="currentColor" />
            </marker>
          </defs>

          {archEdges.map((edge) => {
            const active = activeEdges.has(`${edge.from}>${edge.to}`);
            const { x1, y1, x2, y2 } = edgePoints(edge.from, edge.to);
            // A reply (mp → api) is drawn slightly below its request so the
            // two arrows don't sit on top of each other.
            const offset = edge.dashed ? 14 : 0;
            return (
              <line
                key={`${edge.from}-${edge.to}`}
                x1={x1}
                y1={y1 + offset}
                x2={x2}
                y2={y2 + offset}
                stroke="currentColor"
                strokeWidth={active ? 2.5 : 1.5}
                strokeDasharray={edge.dashed ? "6 5" : undefined}
                markerEnd="url(#arrow)"
                className={cn(
                  "transition-opacity",
                  active ? "text-foreground" : "text-muted-foreground opacity-25",
                )}
              />
            );
          })}

          {archNodes.map((node) => {
            const active = activeNodes.has(node.id);
            return (
              <g
                key={node.id}
                className={cn(
                  "transition-opacity",
                  active ? "opacity-100" : "opacity-30",
                )}
              >
                <rect
                  x={node.x}
                  y={node.y}
                  width={NODE_W}
                  height={NODE_H}
                  rx={10}
                  className={cn(
                    "fill-card",
                    active ? "stroke-foreground" : "stroke-border",
                  )}
                  strokeWidth={active ? 2.5 : 1.5}
                />
                <text
                  x={node.x + NODE_W / 2}
                  y={node.y + 33}
                  textAnchor="middle"
                  className="fill-foreground text-[23px] font-semibold"
                >
                  {node.label}
                </text>
                <text
                  x={node.x + NODE_W / 2}
                  y={node.y + 57}
                  textAnchor="middle"
                  className="fill-muted-foreground text-[18px]"
                >
                  {node.detail}
                </text>
              </g>
            );
          })}

          <text x={22} y={286} className="fill-muted-foreground text-[15px]">
            Línea punteada: aviso que llega desde afuera (webhook).
          </text>
        </svg>

        <div className="flex min-w-0 flex-col gap-4">
          <p className="rounded-md border border-border bg-muted/40 px-4 py-3 text-sm font-medium text-pretty">
            {flow.guarantee}
          </p>
          <ol className="flex flex-col gap-3">
            {flow.steps.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span
                  className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-foreground text-[0.7rem] font-semibold text-background"
                  aria-hidden
                >
                  {index + 1}
                </span>
                <span className="text-sm leading-relaxed text-pretty">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
