import type { ButtonVariant } from "@/types/button"

type ButtonProps = {
  label: string
  variant: ButtonVariant
  size?: "normal" | "wide" | "extraWide"
  theme: "light" | "dark"
  onClick: () => void
}

export default function Button({
  label,
  variant,
  size = "normal",
  theme,
  onClick,
}: ButtonProps) {
  const styles = {
    number:
      theme === "dark"
        ? "bg-zinc-600 text-white hover:bg-zinc-600 border border-zinc-600 shadow-[0_0_12px_rgba(255,255,255,0.08)]"
        : "bg-white text-zinc-900 border border-zinc-200 hover:bg-white hover:ring-2 hover:ring-zinc-100",

    operator: "bg-orange-500 text-white hover:bg-orange-600",

    action: "bg-red-500 text-white hover:bg-red-600",

    backspace: "bg-purple-500 text-white hover:bg-purple-600",

    equals: "bg-blue-500 text-white hover:bg-blue-600",
  }

  const sizeStyles = {
    normal: "",
    wide: "col-span-2",
    extraWide: "col-span-3",
  }

  return (
    <button
      onClick={onClick}
      className={`
        rounded-xl
        p-4
        text-xl
        font-semibold
        cursor-pointer
        shadow-lg
        transition-all
        duration-150
        hover:brightness-110
        hover:scale-105
        hover:shadow-xl
        active:translate-y-1
        active:shadow-md
        ${styles[variant]}
        ${sizeStyles[size]}
      `}
    >
      {label}
    </button>
  )
}
