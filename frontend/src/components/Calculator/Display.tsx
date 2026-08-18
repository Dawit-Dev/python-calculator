type DisplayProps = {
  expression: string
  display: string
  theme: "light" | "dark"
}

export default function Display({ expression, display, theme }: DisplayProps) {
  return (
    <div
      className={`
    mb-6
    rounded-2xl
    p-6
    text-right
    shadow-2xl
    transition-colors
    duration-300
    ${
      theme === "dark"
        ? "bg-gradient-to-b from-zinc-800 to-zinc-950 border border-zinc-700 shadow-[0_0_25px_rgba(255,255,255,0.08)]"
        : "bg-gradient-to-b from-white to-zinc-100 border border-zinc-200"
    }
  `}
    >
      <div
        className={`
            min-h-8
            text-lg
            font-medium
            tracking-wide
            ${theme === "dark" ? "text-zinc-400" : "text-zinc-500"}
          `}
              >
        {expression}
      </div>

      <div
        className={`
            mb-3
            min-w-0
            overflow-hidden
            whitespace-nowrap
            font-extrabold
            tracking-tight
            ${
              display.length > 12
                ? "text-4xl"
                : display.length > 9
                ? "text-5xl"
                : "text-6xl"
            }
            ${theme === "dark" ? "text-white" : "text-zinc-900"}
          `}
              >
        {display}
      </div>
    </div>
  )
}
