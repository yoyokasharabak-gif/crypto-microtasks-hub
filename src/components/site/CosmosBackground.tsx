import { useEffect, useMemo, useRef, useState } from "react";

/**
 * CosmosBackground — slow celestial ballet.
 * Layers (back→front): velvet base, drifting nebulae, twinkling starfield,
 * occasional shooting stars, scanlines + grain.
 */
export function CosmosBackground() {
  const stars = useMemo(() => {
    const arr: { x: number; y: number; s: number; o: number; twinkle: boolean; delay: number }[] = [];
    for (let i = 0; i < 220; i++) {
      const edge = Math.random();
      // Bias density to edges, sparser at center
      const x = edge < 0.5 ? Math.random() * 22 + Math.random() * 10 : 100 - (Math.random() * 22 + Math.random() * 10);
      const xJitter = Math.random() < 0.4 ? Math.random() * 100 : x;
      arr.push({
        x: xJitter,
        y: Math.random() * 100,
        s: Math.random() < 0.92 ? 1 : 2,
        o: 0.2 + Math.random() * 0.6,
        twinkle: Math.random() < 0.12,
        delay: Math.random() * 6,
      });
    }
    return arr;
  }, []);

  const [meteors, setMeteors] = useState<{ id: number; top: number; left: number }[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    let cancelled = false;
    const schedule = () => {
      const wait = 12000 + Math.random() * 8000;
      const t = setTimeout(() => {
        if (cancelled) return;
        const id = ++idRef.current;
        setMeteors((m) => [...m, { id, top: Math.random() * 50, left: 50 + Math.random() * 50 }]);
        setTimeout(() => setMeteors((m) => m.filter((x) => x.id !== id)), 2400);
        schedule();
      }, wait);
      return t;
    };
    const handle = schedule();
    return () => {
      cancelled = true;
      if (handle) clearTimeout(handle);
    };
  }, []);

  const dust = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 30,
        duration: 40 + Math.random() * 40,
        key: i,
      })),
    [],
  );

  return (
    <div className="cosmos" aria-hidden>
      <div className="cosmos__nebula" />
      <div className="cosmos__nebula--slow" />
      <div className="cosmos__planet" />
      <div className="cosmos__planet--small" />

      {/* Starfield */}
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        {stars.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.s * 0.08}
            fill={s.s === 2 ? "#D4AF37" : "#F0F0F0"}
            opacity={s.o}
            className={s.twinkle ? "twinkle" : ""}
            style={s.twinkle ? { animationDelay: `${s.delay}s` } : undefined}
          />
        ))}
      </svg>

      {/* Stardust particles */}
      {dust.map((d) => (
        <span
          key={d.key}
          className="stardust"
          style={{
            left: `${d.left}%`,
            bottom: `-10px`,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
          }}
        />
      ))}

      {/* Meteors */}
      {meteors.map((m) => (
        <span
          key={m.id}
          className="meteor"
          style={{ top: `${m.top}%`, left: `${m.left}%` }}
        />
      ))}

      <div className="cosmos__scanlines" />
      <div className="cosmos__grain" />
      <div className="cosmos__vignette" />
    </div>
  );
}
