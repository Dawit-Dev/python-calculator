type ThemeToggleProps = {
  theme: "light" | "dark"
  onToggle: () => void
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`
        rounded-lg
        px-3
        py-2
        transition-all
        duration-300
        ${
          theme === "dark"
            ? "bg-zinc-800 text-white"
            : "bg-white text-zinc-900 border border-zinc-300"
        }
      `}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  )
}
