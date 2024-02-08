import { Sorting } from '@/enums/table'
import { useSortedList } from '@/hooks/table/useSorting'
import { TableOptions } from '@/types/table'

export const useTable = <T>(
  list: T[],
  {
    sortKey,
    sortDir = Sorting.Descending,
    customSort
  }: TableOptions<T>,
) => {
  const { sortedList, ...sorting } = useSortedList(list, {
    sortKey,
    sortDir
  },
  customSort
  )

  const stats = {
    total: list.length
  }

  return {
    list: sortedList,
    sorting,
    stats
  }
}
