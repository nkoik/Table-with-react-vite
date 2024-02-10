import { renderHook, waitFor } from '@testing-library/react'
import { useGetRequest } from '@/hooks/useRequest'
import { vi, describe, it, expect } from 'vitest'

const responseData = [{ id: 1, name: 'Test data' }]
const testDataError = 'Network Error'

vi.mock('@/services', () => ({
  HttpService: vi.fn().mockImplementation(() => ({
    service: () => ({
      get: vi
        .fn()
        .mockImplementation((data: string) =>
          data === '/success'
            ? Promise.resolve(responseData)
            : Promise.reject(testDataError)
        )
    })
  }))
}))

describe('useGetRequest', () => {
  it('should return data when the request is successful', async () => {

    const { result } = renderHook(() => useGetRequest('/success'))

    await waitFor(() => {
      expect(result.current.isLoaded).toBe(true)
      expect(result.current.error).toBeNull()
      expect(result.current.data).toEqual(responseData)
    })
  })

  it('should start with isLoaded as false and empty data', () => {
    const { result } = renderHook(() => useGetRequest('/test-endpoint'))

    expect(result.current.isLoaded).toBe(false)
    expect(result.current.error).toBeNull()
    expect(result.current.data).toEqual([])
  })

  it('should return an error when the request fails', async () => {

    const { result } = renderHook(() => useGetRequest('/test-endpoint'))
    await waitFor(() => {
      expect(result.current.isLoaded).toBe(true)
      expect(result.current.error).toEqual(testDataError)
      expect(result.current.data).toEqual([])
    })
  })
})
