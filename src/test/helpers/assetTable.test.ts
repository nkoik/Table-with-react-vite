import '@testing-library/jest-dom'
import { Sorting } from '@/enums/table'
import { Data } from '@/types/services'
import { KeyOfTableList } from '@/types/table'
import { rowClasses, cellClasses, sortListByAsset } from '@/helpers/assetTable'
import { describe, it, expect } from 'vitest'

describe('rowClasses function', () => {
  it('returns the correct class for Equities', () => {
    expect(rowClasses({ assetClass: 'Equities' } as Data)).toBe(
      'bg-blue-200 text-slate-500'
    )
  })

  it('returns the correct class for Credit', () => {
    expect(rowClasses({ assetClass: 'Credit' } as Data)).toBe(
      'bg-green-200 text-slate-500'
    )
  })

  it('returns the correct class for Macro', () => {
    expect(rowClasses({ assetClass: 'Macro' } as Data)).toBe(
      'bg-white text-slate-500'
    )
  })
})

describe('cellClasses function', () => {
  const row = { price: 100 }

  it('returns the correct class for positive price', () => {
    expect(cellClasses(row as Data, 'price')).toBe('text-blue-600')
  })

  it('returns the correct class for negative price', () => {
    expect(cellClasses({ ...row, price: -100 } as Data, 'price')).toBe(
      'text-red-600'
    )
  })
})

describe('sortListByAsset function', () => {
  const list = [
    { asset: 'Bond', price: 20 },
    { asset: 'Stock', price: 10 },
    { asset: 'Test', price: 5 }
  ]
  const weights = {
    sortKey: 'asset' as KeyOfTableList<{ asset: string; price: number }>,
    data: { Stock: 3, Bond: 2, Test: 1 }
  }

  it('sorts the list ascending by default', () => {
    expect(sortListByAsset(list, weights)).toEqual([
      { asset: 'Stock', price: 10 },
      { asset: 'Bond', price: 20 },
      { asset: 'Test', price: 5 }
    ])
  })

  it('sorts the list descending', () => {
    expect(sortListByAsset(list, weights, Sorting.Descending)).toEqual([
      { asset: 'Test', price: 5 },
      { asset: 'Bond', price: 20 },
      { asset: 'Stock', price: 10 }
    ])
  })

  it('sorts the list by numerical value when weights are equal', () => {
    const equalWeightList = [
      { asset: 'Currency', price: 30 },
      { asset: 'Currency', price: 40 }
    ]
    const equalWeights = {
      sortKey: 'asset' as KeyOfTableList<{ asset: string; price: number }>,
      data: { Currency: 3 }
    }
    expect(sortListByAsset(equalWeightList, equalWeights)).toEqual([
      { asset: 'Currency', price: 30 },
      { asset: 'Currency', price: 40 }
    ])
  })

  it('sorts with missing weight data default to a weight of zero', () => {
    const missingWeightList = [
      { asset: 'Option', price: 30 },
      { asset: 'Futures', price: 40 }
    ]
    const missingWeights = {
      sortKey: 'asset' as KeyOfTableList<{ asset: string; price: number }>,
      data: {}
    }
    expect(sortListByAsset(missingWeightList, missingWeights)).toEqual([
      { asset: 'Futures', price: 40 },
      { asset: 'Option', price: 30 }
    ])
  })

  it('sorts correctly with mixed weights and missing weight data', () => {
    const mixedWeightList = [
      { asset: 'Commodity', price: 30 },
      { asset: 'Index', price: 40 }
    ]
    const mixedWeights = {
      sortKey: 'asset' as KeyOfTableList<{ asset: string; price: number }>,
      data: { Index: 2 }
    }
    expect(sortListByAsset(mixedWeightList, mixedWeights)).toEqual([
      { asset: 'Index', price: 40 },
      { asset: 'Commodity', price: 30 }
    ])
  })
})
