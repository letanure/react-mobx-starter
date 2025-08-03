import { useState } from "react"
import reactLogo from "@/assets/icons/react.svg"
import viteLogo from "@/assets/icons/vite.svg"

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="flex items-center gap-8 mb-8">
        <a
          href="https://vite.dev"
          target="_blank"
          rel="noopener"
          className="block hover:opacity-80 transition-opacity"
        >
          <img src={viteLogo} className="w-24 h-24" alt="Vite logo" />
        </a>
        <a
          href="https://react.dev"
          target="_blank"
          rel="noopener"
          className="block hover:opacity-80 transition-opacity"
        >
          <img
            src={reactLogo}
            className="w-24 h-24 animate-spin [animation-duration:20s]"
            alt="React logo"
          />
        </a>
      </div>

      <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-8">
        Vite + React
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <button
          type="button"
          onClick={() => setCount((count) => count + 1)}
          className="bg-accent-500 hover:bg-accent-400 text-white py-2 px-6 rounded-[10px] transition-all duration-200 mb-6"
        >
          count is {count}
        </button>
        <p className="text-gray-600 dark:text-gray-300">
          Edit{" "}
          <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm font-mono">
            src/App.tsx
          </code>{" "}
          and save to test HMR
        </p>
      </div>

      <p className="text-gray-500 dark:text-gray-400 text-sm mt-8">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}
