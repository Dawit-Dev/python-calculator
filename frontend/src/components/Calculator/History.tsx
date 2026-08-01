"use client"

type HistoryItem = {
  first: number
  operation: string
  second: number
  result: number
}

type HistoryProps = {
  history: HistoryItem[]
}

export default function History({ history }: HistoryProps) {
  return (
    <div className='mt-6 border-t border-zinc-700 pt-4'>
      <h2 className='mb-3 text-left text-sm font-semibold uppercase tracking-wide text-zinc-400'>
        History
      </h2>

      {history.length === 0 ? (
        <p className='text-left text-sm text-zinc-500'>No calculations yet.</p>
      ) : (
        <ul className='max-h-40 space-y-2 overflow-y-auto pr-1'>
          {[...history].reverse().map((item, index) => (
            <li
              key={index}
              className='
                rounded-lg
                bg-zinc-800
                px-3
                py-2
                text-left
                text-sm
                text-zinc-200
                shadow-sm
                transition
                hover:bg-zinc-700
              '
            >
              {item.first} {item.operation} {item.second} ={" "}
              <span className='font-semibold text-white'>{item.result}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
