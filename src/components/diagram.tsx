"use client";

import Link from "next/link";
import { useState } from "react";
import type { Diagram, DiagramNode, NodeKind } from "@/content/projects";

type Box = { x: number; y: number; w: number; h: number; col: number; node: DiagramNode };
type Edge = { from: string; to: string; d: string };
type Layout = { w: number; h: number; boxes: Map<string, Box>; edges: Edge[]; compact: boolean };

const H = { nodeW: 184, nodeH: 60, colGap: 64, rowGap: 16, pad: 14 };
const V = { width: 344, nodeH: 52, rowGap: 38, gap: 8, pad: 8 };

function place(d: Diagram, horizontal: boolean): Layout {
  const boxes = new Map<string, Box>();
  let w: number;
  let h: number;
  if (horizontal) {
    const heights = d.columns.map((c) => c.length * H.nodeH + (c.length - 1) * H.rowGap);
    h = Math.max(...heights) + H.pad * 2;
    w = H.pad * 2 + d.columns.length * H.nodeW + (d.columns.length - 1) * H.colGap;
    d.columns.forEach((col, i) => {
      const top = H.pad + (h - H.pad * 2 - heights[i]) / 2;
      col.forEach((node, j) =>
        boxes.set(node.id, { x: H.pad + i * (H.nodeW + H.colGap), y: top + j * (H.nodeH + H.rowGap), w: H.nodeW, h: H.nodeH, col: i, node }),
      );
    });
  } else {
    w = V.width;
    h = V.pad * 2 + d.columns.length * V.nodeH + (d.columns.length - 1) * V.rowGap;
    d.columns.forEach((col, i) => {
      const nw = Math.min(210, (w - V.pad * 2 - (col.length - 1) * V.gap) / col.length);
      const left = (w - (col.length * nw + (col.length - 1) * V.gap)) / 2;
      col.forEach((node, j) =>
        boxes.set(node.id, { x: left + j * (nw + V.gap), y: V.pad + i * (V.nodeH + V.rowGap), w: nw, h: V.nodeH, col: i, node }),
      );
    });
  }

  const edges = d.edges.map(([from, to]) => {
    const a = boxes.get(from)!;
    const b = boxes.get(to)!;
    let path: string;
    if (a.col === b.col) {
      // Same column (or row, when stacked): a short straight connector.
      path = horizontal
        ? `M ${a.x + a.w / 2} ${a.y + a.h} L ${b.x + b.w / 2} ${b.y}`
        : `M ${a.x + a.w} ${a.y + a.h / 2} L ${b.x} ${b.y + b.h / 2}`;
    } else if (horizontal) {
      const [x1, y1, x2, y2] = [a.x + a.w, a.y + a.h / 2, b.x, b.y + b.h / 2];
      const dx = (x2 - x1) / 2;
      path = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
    } else {
      const [x1, y1, x2, y2] = [a.x + a.w / 2, a.y + a.h, b.x + b.w / 2, b.y];
      const dy = (y2 - y1) / 2;
      path = `M ${x1} ${y1} C ${x1} ${y1 + dy}, ${x2} ${y2 - dy}, ${x2} ${y2}`;
    }
    return { from, to, d: path };
  });
  return { w, h, boxes, edges, compact: !horizontal };
}

const tone = (hue: number, l = 0.82, c = 0.13, a = 1) => `oklch(${l} ${c} ${hue} / ${a})`;

function nodeStyle(kind: NodeKind | undefined, hue: number) {
  switch (kind) {
    case "core":
      return { fill: tone(hue, 0.35, 0.06, 0.35), stroke: tone(hue, 0.8, 0.12, 0.55), dash: undefined };
    case "external":
      return { fill: "rgb(255 255 255 / 0.02)", stroke: "rgb(255 255 255 / 0.28)", dash: "4 4" };
    case "store":
      return { fill: "rgb(255 255 255 / 0.04)", stroke: "rgb(255 255 255 / 0.22)", dash: undefined };
    default:
      return { fill: "rgb(255 255 255 / 0.03)", stroke: "rgb(255 255 255 / 0.18)", dash: undefined };
  }
}

function Svg({
  layout, hue, label, active, setActive, interactive,
}: {
  layout: Layout; hue: number; label: string; active: string | null; setActive: (id: string | null) => void; interactive: boolean;
}) {
  const linked = (id: string) =>
    !active || id === active || layout.edges.some((e) => (e.from === active && e.to === id) || (e.to === active && e.from === id));
  return (
    <svg viewBox={`0 0 ${layout.w} ${layout.h}`} className="h-auto w-full overflow-visible" role="img" aria-label={label}>
      {layout.edges.map((e, i) => {
        const on = active && (e.from === active || e.to === active);
        return (
          <g key={`${e.from}-${e.to}`}>
            <path
              d={e.d}
              fill="none"
              stroke={on ? tone(hue, 0.84, 0.13, 0.9) : "rgb(255 255 255 / 0.16)"}
              strokeWidth={on ? 1.6 : 1.2}
              style={{ transition: "stroke 200ms, opacity 200ms", opacity: active && !on ? 0.35 : 1 }}
            />
            <g className="motion-deco">
              <circle r={4.5} fill={tone(hue, 0.84, 0.13, 0.18)}>
                <animateMotion dur={`${2.6 + (i % 4) * 0.45}s`} begin={`${(i * 0.37) % 2}s`} repeatCount="indefinite" path={e.d} />
              </circle>
              <circle r={1.9} fill={tone(hue, 0.9, 0.12)}>
                <animateMotion dur={`${2.6 + (i % 4) * 0.45}s`} begin={`${(i * 0.37) % 2}s`} repeatCount="indefinite" path={e.d} />
              </circle>
            </g>
          </g>
        );
      })}
      {[...layout.boxes.values()].map(({ x, y, w, h, node }) => {
        const s = nodeStyle(node.kind, hue);
        const showSub = node.sub && (!layout.compact || w >= 118);
        const titleSize = layout.compact ? (w < 90 ? 10 : 11) : 12.5;
        return (
          <g
            key={node.id}
            transform={`translate(${x} ${y})`}
            style={{ opacity: linked(node.id) ? 1 : 0.4, transition: "opacity 200ms", cursor: interactive ? "pointer" : undefined }}
            onMouseEnter={interactive ? () => setActive(node.id) : undefined}
            onMouseLeave={interactive ? () => setActive(null) : undefined}
            onFocus={interactive ? () => setActive(node.id) : undefined}
            onBlur={interactive ? () => setActive(null) : undefined}
            tabIndex={interactive ? 0 : undefined}
            role={interactive ? "button" : undefined}
            aria-label={interactive ? `${node.title}${node.sub ? ` — ${node.sub}` : ""}` : undefined}
          >
            <rect width={w} height={h} rx={10} fill="#0b0c0f" />
            <rect
              width={w}
              height={h}
              rx={10}
              fill={s.fill}
              stroke={active === node.id ? tone(hue, 0.86, 0.13) : s.stroke}
              strokeDasharray={s.dash}
              strokeWidth={active === node.id ? 1.5 : 1}
            />
            {node.kind === "store" ? (
              <path d={`M 10 8 Q ${w / 2} 14 ${w - 10} 8`} fill="none" stroke="rgb(255 255 255 / 0.18)" />
            ) : null}
            <text
              x={w / 2}
              y={showSub ? h / 2 - 3 : h / 2 + 4}
              textAnchor="middle"
              fill="#eceef1"
              fontSize={titleSize}
              fontWeight={550}
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              {node.title}
            </text>
            {showSub ? (
              <text x={w / 2} y={h / 2 + 13} textAnchor="middle" fill="#8b919b" fontSize={layout.compact ? 9 : 10} style={{ fontFamily: "var(--font-geist-mono)" }}>
                {node.sub}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

export type Caption = { title: string; body: string; links?: { label: string; href: string }[] };

export function FlowDiagram({
  diagram, hue = 190, label, captions, hint,
}: {
  diagram: Diagram; hue?: number; label: string; captions?: Record<string, Caption>; hint?: string;
}) {
  const [active, setHighlight] = useState<string | null>(null);
  // The caption stays on the last node visited, so its links can be clicked.
  const [last, setLast] = useState<string | null>(null);
  const setActive = (id: string | null) => {
    setHighlight(id);
    if (id) setLast(id);
  };
  const interactive = Boolean(captions);
  const wide = place(diagram, true);
  const tall = place(diagram, false);
  const caption = last && captions ? captions[last] : null;
  const names = new Map(diagram.columns.flat().map((n) => [n.id, n.title]));
  return (
    <div>
      <div className="hidden md:block">
        <Svg layout={wide} hue={hue} label={label} active={active} setActive={setActive} interactive={interactive} />
      </div>
      <div className="mx-auto max-w-sm md:hidden">
        <Svg layout={tall} hue={hue} label={label} active={active} setActive={setActive} interactive={interactive} />
      </div>
      <ul className="sr-only">
        {diagram.edges.map(([a, b]) => (
          <li key={`${a}-${b}`}>{names.get(a)} → {names.get(b)}</li>
        ))}
      </ul>
      {interactive ? (
        <div className="mt-5 min-h-[76px] rounded-xl border border-line bg-bg-2/70 px-4 py-3 text-sm" aria-live="polite">
          {caption ? (
            <div>
              <p className="font-medium text-fg">{caption.title}</p>
              <p className="mt-1 text-muted">
                {caption.body}
                {caption.links?.length ? (
                  <>
                    {" "}
                    <span className="text-faint">Built in </span>
                    {caption.links.map((l, i) => (
                      <span key={l.href}>
                        {i ? ", " : ""}
                        <Link href={l.href} className="text-accent underline-offset-4 hover:underline">{l.label}</Link>
                      </span>
                    ))}
                    .
                  </>
                ) : null}
              </p>
            </div>
          ) : (
            <p className="text-faint">{hint ?? "Hover or focus a node to see where it's used."}</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
