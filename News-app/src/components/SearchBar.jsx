import { useState } from 'react'

export default function SearchBar({ initialValue = '', onSearch }) {
  const [value, setValue] = useState(initialValue)

  function handleSubmit(e) {
    e.preventDefault()
    onSearch(value.trim())
  }

  return (
    <form className="flex max-w-[480px] gap-2" onSubmit={handleSubmit} role="search">
      <input
        type="text"
        className="flex-1 rounded-sm border border-rule px-3.5 py-2.5 font-body text-[0.95rem]"
        placeholder="Search articles…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Search articles"
      />
      <button
        type="submit"
        className="rounded-sm bg-navy px-[18px] py-2.5 text-sm font-semibold text-paper hover:bg-blue"
      >
        Search
      </button>
    </form>
  )
}
