// Sticker illustrations exported from the Figma file (public/stickers/*.svg).
export default function Sticker({ name, size = 48, rotate = 0, className = '', style }) {
  return (
    <img
      className={`sticker ${className}`}
      src={`/stickers/${name}.svg`}
      width={size}
      height={size}
      alt=""
      draggable="false"
      style={{ transform: `rotate(${rotate}deg)`, ...style }}
    />
  )
}
