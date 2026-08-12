import { useCallback, useState } from 'react'

export function useFormSubmit(endpoint) {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)

  const submit = useCallback(async (payload) => {
    setStatus('submitting')
    setError(null)
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok || !data.ok) {
        throw new Error(data.error || `Request failed: ${response.status}`)
      }
      setStatus('success')
      return true
    } catch (err) {
      setError(err.message)
      setStatus('error')
      return false
    }
  }, [endpoint])

  const reset = useCallback(() => { setStatus('idle'); setError(null) }, [])

  return { status, error, submit, reset }
}
