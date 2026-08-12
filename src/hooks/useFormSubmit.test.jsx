import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useFormSubmit } from './useFormSubmit.js'

beforeEach(() => { vi.restoreAllMocks() })

describe('useFormSubmit', () => {
  it('starts idle', () => {
    const { result } = renderHook(() => useFormSubmit('/api/inquiry'))
    expect(result.current.status).toBe('idle')
    expect(result.current.error).toBe(null)
  })

  it('transitions to success on ok response', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, json: async () => ({ ok: true }) })))
    const { result } = renderHook(() => useFormSubmit('/api/inquiry'))
    let returned
    await act(async () => { returned = await result.current.submit({ type: 'contact' }) })
    expect(returned).toBe(true)
    await waitFor(() => expect(result.current.status).toBe('success'))
  })

  it('surfaces an error message on failure', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: false, json: async () => ({ error: 'Nope.' }) })))
    const { result } = renderHook(() => useFormSubmit('/api/inquiry'))
    let returned
    await act(async () => { returned = await result.current.submit({ type: 'contact' }) })
    expect(returned).toBe(false)
    await waitFor(() => expect(result.current.status).toBe('error'))
    expect(result.current.error).toBe('Nope.')
  })
})
