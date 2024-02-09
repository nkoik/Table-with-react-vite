import { Sorting } from '@/enums/table'
import { Data } from '@/types/services'
import { KeyOfTableList } from '@/types/table'

export const rowClasses = (row: Data) => {
  switch (row.assetClass) {
    case 'Equities':
      return 'bg-blue-200 text-slate-500'
    case 'Credit':
      return 'bg-green-200 text-slate-500'
    case 'Macro':
      return 'bg-white text-slate-500'
    default:
      return 'bg-slate-500 text-white'
  }
}

export const cellClasses = (row: Data, key: keyof Data) =>
  key === 'price' ? (row.price >= 0 ? 'text-blue-600' : 'text-red-600') : null

export const sortListByWeight = <T>(
  list: T[],
  weights: {
    sortKey: KeyOfTableList<T>
    data: Record<string, number>
  },
  sortDir: `${Sorting}` = Sorting.Ascending
): T[] => {
  return list.sort((a, b) => {
    const aValue = String(a[weights.sortKey])
    const bValue = String(b[weights.sortKey])
    let comparison = (weights.data[bValue] || 0) - (weights.data[aValue] || 0)
    if (!comparison) {
      comparison = aValue.localeCompare(bValue, undefined, { numeric: true })
    }
    if (sortDir === Sorting.Descending) {
      comparison *= -1
    }
    return comparison
  })
}
