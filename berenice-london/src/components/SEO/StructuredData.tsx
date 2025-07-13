"use client"

import { useEffect } from 'react'

interface StructuredDataProps {
  data: Record<string, unknown> | Record<string, unknown>[]
  id?: string
}

export function StructuredData({ data, id }: StructuredDataProps) {
  useEffect(() => {
    // Create or update script tag with structured data
    const scriptId = id || 'structured-data'

    // Remove existing script if it exists
    const existingScript = document.getElementById(scriptId)
    if (existingScript) {
      existingScript.remove()
    }

    // Create new script tag
    const script = document.createElement('script')
    script.id = scriptId
    script.type = 'application/ld+json'
    script.innerHTML = JSON.stringify(data, null, 2)

    // Append to head
    document.head.appendChild(script)

    // Cleanup on unmount
    return () => {
      const scriptToRemove = document.getElementById(scriptId)
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [data, id])

  return null // This component doesn't render anything
}

// Server-side version for static generation
export function StaticStructuredData({ data, id }: StructuredDataProps) {
  const scriptId = id || 'structured-data'

  return (
    <script
      id={scriptId}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 2)
      }}
    />
  )
}

// Multiple structured data blocks
export function MultipleStructuredData({
  dataBlocks
}: {
  dataBlocks: Array<{ data: Record<string, unknown> | Record<string, unknown>[], id?: string }>
}) {
  return (
    <>
      {dataBlocks.map((block, index) => (
        <StructuredData
          key={block.id || `structured-data-${index}`}
          data={block.data}
          id={block.id || `structured-data-${index}`}
        />
      ))}
    </>
  )
}
