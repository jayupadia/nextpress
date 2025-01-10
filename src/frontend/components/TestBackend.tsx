'use client'

import { useState } from 'react'
import { Button } from './shared/Button'

export const TestBackend: React.FC = () => {
  const [result, setResult] = useState<string>('')

  const testBackend = async () => {
    try {
      const response = await fetch('/api/test')
      const data = await response.json()
      setResult(JSON.stringify(data, null, 2))
    } catch (error) {
      setResult('Error: Failed to connect to the backend')
    }
  }

  return (
    <div className="mt-4">
      <Button onClick={testBackend}>Test Backend Connection</Button>
      {result && (
        <pre className="mt-4 p-4 bg-gray-100 rounded-md overflow-auto">
          {result}
        </pre>
      )}
    </div>
  )
}

