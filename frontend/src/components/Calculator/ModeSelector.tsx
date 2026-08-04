type ModeSelectorProps = {
  mode: string
  onChange: (mode: string) => void
}

export default function ModeSelector({ mode, onChange }: ModeSelectorProps) {
  return (
    <select
      value={mode}
      onChange={(e) => onChange(e.target.value)}
      className='
        rounded-lg
        bg-zinc-800
        px-3
        py-2
        text-sm
        text-white
        outline-none
      '
    >
      <option value='standard'>Standard</option>

      <option value='scientific'>Scientific</option>

      <option value='programmer'>Programmer</option>
    </select>
  )
}
