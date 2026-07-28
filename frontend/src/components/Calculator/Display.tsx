type DisplayProps = {
    expression: string
    display: string
}

export default function Display({
    expression,
    display,
}: DisplayProps) {
    return (
      <div className='mb-6 rounded-2xl bg-gradient-to-b from-zinc-800 to-black p-6 text-right shadow-2xl'>
        <div className='min-h-8 text-lg font-medium tracking-wide text-zinc-500'>
          {expression}
        </div>

        <div className='mb-3 text-6xl font-extrabold tracking-tight text-white'>
          {display}
        </div>
      </div>
    )
}