import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { API_URL } from './apiConfig'

async function fetchApiResponse(): Promise<string> {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`)
  }

  return await response.text()
}

function App() {
  const [responseText, setResponseText] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadResponse() {
      try {
        const text = await fetchApiResponse()
        if (isMounted) {
          setResponseText(text)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'Unknown error'
          setError(`API request failed: ${message}`)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    void loadResponse()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Test App</h1>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : (
            <p>{responseText}</p>
          )}
        </div>
      </section>
    </>
  )
}

export default App
