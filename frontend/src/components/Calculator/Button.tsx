type ButtonProps = {
  label: string
  onClick: () => void
  className: string
}

export default function Button({ label, onClick, className }: ButtonProps) {
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
            ${className}
            `}
    >
      {label}
    </button>
  )
}
