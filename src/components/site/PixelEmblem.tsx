/**
 * PixelEmblem — handcrafted pixel mark for the McKWork guild.
 * Rendered as an SVG of 1px squares, scaled crisply.
 */
export function PixelEmblem({ size = 28, className }: { size?: number; className?: string }) {
  // 11x11 grid. 'g'=gold, 'd'=dark gold, '.'=transparent, 'b'=burgundy
  const grid = [
    "....ggg....",
    "...gddgg...",
    "..gddgggg..",
    ".gddggdggg.",
    ".gdgggdgggg",
    ".ggbgbbgggg",
    ".ggbbbggggg",
    "..gggggggg.",
    "...gggggg..",
    "....gggg...",
    "....gddg...",
  ];
  const px = size / 11;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      shapeRendering="crispEdges"
      className={className}
      aria-hidden
    >
      {grid.map((row, y) =>
        row.split("").map((c, x) => {
          if (c === ".") return null;
          const fill = c === "g" ? "#C9A87C" : c === "d" ? "#8a7350" : "#2B1015";
          return <rect key={`${x}-${y}`} x={x * px} y={y * px} width={px} height={px} fill={fill} />;
        }),
      )}
    </svg>
  );
}
