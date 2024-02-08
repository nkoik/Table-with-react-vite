import { Sorting } from "@/enums/table";
import { useSortedList } from "@/hooks/table/useSorting"
import { KeyOfTableList } from "@/types/table";

export const useTable = <T>(
  list: T[],
  { sortKey, sortDir = Sorting.Descending }: { sortKey: KeyOfTableList<T>, sortDir: `${Sorting}` }
) => {
  const { sortedList, ...sorting } = useSortedList(list, {
    sortKey,
    sortDir
  })

  const stats = {
    total: list.length,
  }

  return {
    list: sortedList,
    sorting,
    stats
  };
}
