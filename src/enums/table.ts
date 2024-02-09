export const enum Sorting {
  Ascending = 'asc',
  Descending = 'desc'
}

export const assetClassTable = {
  defaultSortKey: 'ticker',
  defaultSortDir: Sorting.Ascending,
  weight: {
    sortKey: 'assetClass',
    data: {
      Macro: 2,
      Equities: 1,
      Credit: 3
    }
  },
  columnIds: ['ticker', 'price', 'assetClass'] as const
} as const
