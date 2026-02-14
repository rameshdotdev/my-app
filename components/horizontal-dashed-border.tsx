import { borderHeight } from "@/constant";

function HorizontalDashedBorder({
  height = borderHeight,
}: {
  height?: number;
}) {
  return (
    <div
      className="w-full"
      style={{
        height: `${height}px`,
        backgroundImage: `repeating-linear-gradient(
          to right,
          var(--border) 0px,
          var(--border) 6px,
          transparent 6px,
          transparent 14px
        )`,
        backgroundSize: `100% ${height}px`,
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}

export default HorizontalDashedBorder;
