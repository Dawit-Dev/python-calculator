"use client"

type HistoryItem = {
  first: number
  operation: string
  second: number
  result: number
}

type HistoryProps = {
    history: HistoryItem[]
    onClearHistory: () => void
}

export default function History({
    history,
    onClearHistory,
}: HistoryProps) {
  return (
    <div className='mt-6 border-t border-zinc-700 pt-4'>
      <div className='mb-3 flex items-center justify-between'>
        <h2 className='text-sm font-semibold uppercase tracking-wide text-zinc-400'>
          History
        </h2>
        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className='cursor-pointer rounded-md bg-red-500 px-2 py-1 text-xs font-semibold text-white transition hover:bg-red-600'
          >
            Clear
          </button>
        )}
      </div>

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
