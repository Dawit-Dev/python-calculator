import type { ButtonVariant } from "@/types/button"

type ButtonProps = {
  label: string
  variant: ButtonVariant
  onClick: () => void
}

export default function Button({ label, variant, onClick }: ButtonProps) {
  const styles = {
    number: "bg-zinc-100 text-zinc-900 hover:bg-white",

    operator: "bg-orange-500 text-white hover:bg-orange-600",

    action: "bg-red-500 text-white hover:bg-red-600",

    equals: "bg-blue-500 text-white hover:bg-blue-600",
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
        active:translate-y-1
        active:shadow-md
        ${styles[variant]}
      `}
    >
      {label}
    </button>
  )
}
