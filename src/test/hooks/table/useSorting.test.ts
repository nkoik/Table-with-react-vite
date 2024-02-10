import { renderHook, act } from '@testing-library/react'
import { useSortedList } from '@/hooks/table/useSorting'
import { Sorting } from '@/enums/table'
import { sortList } from '@/helpers/utils'
import { vi, describe, beforeEach, it, expect } from 'vitest'

vi.mock('@/helpers/utils', () => ({
  sortList: vi.fn()
}))

describe('useSortedList hook', () => {
  const initialList = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 24 },
    { name: 'Eve', age: 40 }
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('sorts the list ascending when a sortKey is given', () => {
    const sort = vi.fn().mockReturnValue([...initialList].reverse())
    const { result } = renderHook(() =>
      useSortedList(
        initialList,
        { sortKey: 'age', sortDir: Sorting.Ascending },
        sort
      )
    )

    expect(sort).toHaveBeenCalledTimes(1)
    expect(result.current.sortedList).toEqual([...initialList].reverse())
    expect(result.current.sortDir).toBe(Sorting.Ascending)
  })

  it('toggles sort direction on onSort when the same key is clicked', () => {
    const { result } = renderHook(() =>
      useSortedList(initialList, { sortKey: 'age', sortDir: Sorting.Ascending })
    )

    act(() => {
      result.current.onSort('age')
    })

    expect(result.current.sortDir).toBe(Sorting.Descending)
  })

  it('changes sort key on onSort when a different key is clicked', () => {
    const { result } = renderHook(() =>
      useSortedList(initialList, {
        sortKey: 'age',
        sortDir: Sorting.Descending
      })
    )

    act(() => {
      result.current.onSort('name')
    })

    expect(result.current.sortKey).toBe('name')
    expect(result.current.sortDir).toBe(Sorting.Ascending)
  })

  it('uses the provided sorting function', () => {
    const customSortFn = vi.fn()
    renderHook(() =>
      useSortedList(
        initialList,
        { sortKey: 'age', sortDir: Sorting.Ascending },
        customSortFn
      )
    )

    expect(customSortFn).toHaveBeenCalled()
  })

  it('updates sortedList when items change', () => {
    const { rerender } = renderHook(({ items }) => useSortedList(items), {
      initialProps: { items: initialList }
    })

    const updatedList = [...initialList, { name: 'Dave', age: 33 }]
    rerender({ items: updatedList })

    expect(sortList).toHaveBeenCalledWith(updatedList, '', Sorting.Ascending)
  })
})
