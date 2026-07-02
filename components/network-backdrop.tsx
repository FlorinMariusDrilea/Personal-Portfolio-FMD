"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient "service mesh" backdrop. Scattered nodes drift like idle services
 * and blip occasionally like health checks; the cursor acts as a gateway —
 * nearby nodes link up and stream request packets toward it, rippling on
 * delivery. Runs only for fine pointers (mouse) and skips entirely when the
 * user prefers reduced motion.
 */

const LINK_RADIUS = 220;
const MESH_RADIUS = 110;
const PACKET_EVERY_MS = 160;
const MAX_PACKETS = 12;
const BLIP_MS = 900;

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  blipAt: number; // when the next idle "health check" pulse starts
};

type Packet = { node: Node; t: number; speed: number };
type Ripple = { x: number; y: number; t: number };

export function NetworkBackdrop() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    let nodes: Node[] = [];
    const packets: Packet[] = [];
    const ripples: Ripple[] = [];
    const mouse = { x: -1e4, y: -1e4, in: false };
    let presence = 0; // eased 0..1 so links fade out when the pointer leaves
    let lastPacketAt = 0;

    // Canvas can't consume var(--accent) directly, so resolve the theme
    // colors up front and again whenever the .dark class flips.
    let accent = "#ef4444";
    let dot = "#a1a1aa";
    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      accent = s.getPropertyValue("--accent").trim() || accent;
      dot = s.getPropertyValue("--muted-foreground").trim() || dot;
    };
    readColors();
    const themeObserver = new MutationObserver(readColors);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Density scales with viewport area, capped to stay cheap.
      const target = Math.min(90, Math.round((width * height) / 16000));
      while (nodes.length < target) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          r: 1 + Math.random() * 1.2,
          blipAt: performance.now() + Math.random() * 8000,
        });
      }
      nodes = nodes.slice(0, target);
    };

    const frame = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      presence += ((mouse.in ? 1 : 0) - presence) * 0.06;

      // Nodes: drift, wrap at the edges, blip, and light up near the cursor.
      const near: Array<[Node, number]> = [];
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -10) n.x = width + 10;
        else if (n.x > width + 10) n.x = -10;
        if (n.y < -10) n.y = height + 10;
        else if (n.y > height + 10) n.y = -10;

        const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        const inRange = d < LINK_RADIUS;
        if (inRange) near.push([n, d]);

        let blip = 0;
        if (now >= n.blipAt) {
          const p = (now - n.blipAt) / BLIP_MS;
          if (p >= 1) n.blipAt = now + 5000 + Math.random() * 9000;
          else blip = Math.sin(p * Math.PI);
        }

        const proximity = inRange ? (1 - d / LINK_RADIUS) * presence : 0;
        ctx.globalAlpha = Math.min(1, 0.22 + blip * 0.4 + proximity * 0.55);
        ctx.fillStyle = proximity > 0.05 ? accent : dot;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + blip * 1.2 + proximity, 0, Math.PI * 2);
        ctx.fill();

        if (blip > 0) {
          ctx.globalAlpha = (1 - blip) * 0.25;
          ctx.strokeStyle = accent;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 3 + blip * 10, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Links: node → cursor spokes, plus a faint local mesh between the
      // nodes the cursor has "woken up".
      if (presence > 0.02) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = accent;
        for (const [n, d] of near) {
          ctx.globalAlpha = (1 - d / LINK_RADIUS) * 0.45 * presence;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
        const meshed = near.slice(0, 12);
        for (let i = 0; i < meshed.length; i++) {
          for (let j = i + 1; j < meshed.length; j++) {
            const a = meshed[i][0];
            const b = meshed[j][0];
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d > MESH_RADIUS) continue;
            ctx.globalAlpha = (1 - d / MESH_RADIUS) * 0.16 * presence;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Packets: spawn from a random connected node and travel to the cursor.
      if (
        mouse.in &&
        near.length > 0 &&
        packets.length < MAX_PACKETS &&
        now - lastPacketAt > PACKET_EVERY_MS
      ) {
        lastPacketAt = now;
        packets.push({
          node: near[Math.floor(Math.random() * near.length)][0],
          t: 0,
          speed: 0.012 + Math.random() * 0.014,
        });
      }
      ctx.fillStyle = accent;
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.t += p.speed;
        if (p.t >= 1) {
          ripples.push({ x: mouse.x, y: mouse.y, t: 0 });
          packets.splice(i, 1);
          continue;
        }
        const e = p.t * p.t * (3 - 2 * p.t); // smoothstep
        ctx.globalAlpha = 0.85 * presence;
        ctx.beginPath();
        ctx.arc(
          p.node.x + (mouse.x - p.node.x) * e,
          p.node.y + (mouse.y - p.node.y) * e,
          1.8,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }

      // Delivery ripples at the cursor.
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.t += 0.04;
        if (r.t >= 1) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = (1 - r.t) * 0.3 * presence;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 4 + r.t * 16, 0, Math.PI * 2);
        ctx.stroke();
      }

      // The gateway itself: a small accent core with a soft glow.
      if (presence > 0.02) {
        const glow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          70,
        );
        glow.addColorStop(0, accent);
        glow.addColorStop(1, "transparent");
        ctx.globalAlpha = 0.1 * presence;
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 70, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 0.5 * presence;
        ctx.fillStyle = accent;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.in = true;
    };
    const onLeave = () => {
      mouse.in = false;
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
