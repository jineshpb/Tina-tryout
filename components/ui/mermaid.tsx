"use client"

import mermaid from "mermaid"
import { useEffect, useRef } from "react"

mermaid.initialize({
  startOnLoad: true,
  theme: "default",
  securityLevel: "loose",
})

export default function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      mermaid.run({
        nodes: [ref.current],
      })
    }
  }, [chart])

  return (
    <div ref={ref} className="mermaid">
      {chart}
    </div>
  )
}
