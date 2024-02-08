import { Sorting } from '@/enums/table'
import { sortList } from '@/helpers/utils'
import { KeyOfTableList } from '@/types/table'
import { useState, useMemo, useEffect, useRef } from 'react'

export const useSortedList = <T>(
  items: T[], 
  initial = {},
  sortFn = sortList
) => {
  const sortFnRef = useRef(sortFn)

  useEffect(() => {
    sortFnRef.current = sortFn
  }, [sortFn])

  const [sort, setSort] = useState({
    sortDir: Sorting.Ascending,
    sortKey: '',
    ...initial
  })

  const onSort = (newSortKey: KeyOfTableList<T>) => {
    const isAscending = sort.sortKey === newSortKey && sort.sortDir === Sorting.Ascending
    setSort({
      sortKey: newSortKey,
      sortDir: isAscending ? Sorting.Descending : Sorting.Ascending
    })
  }
  const sortedList = useMemo(
    () => sortFnRef.current(items, sort.sortKey as KeyOfTableList<T>, sort.sortDir),
    [items, sort]
  )

  return {
    sortedList,
    onSort,
    ...sort
  }
}
