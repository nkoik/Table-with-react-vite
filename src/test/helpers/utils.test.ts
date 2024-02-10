import { Sorting } from '@/enums/table'
import { camelCaseString, sortList } from '@/helpers/utils'
import { describe, it, expect } from 'vitest'

type MockData = {
  name: string
  age: number
}

describe('sortList', () => {
  const list: MockData[] = [
    { name: 'Charlie', age: 30 },
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 20 }
  ]

  it('should sort the list by a given key in ascending order', () => {
    const sortedByNameAsc = sortList(list, 'name', Sorting.Ascending)
    expect(sortedByNameAsc.map((item) => item.name)).toEqual([
      'Alice',
      'Bob',
      'Charlie'
    ])
    const sortedByAgeAsc = sortList(list, 'age', Sorting.Ascending)
    expect(sortedByAgeAsc.map((item) => item.age)).toEqual([20, 25, 30])
  })

  it('should sort the list by a given key in descending order', () => {
    const sortedByNameDesc = sortList(list, 'name', Sorting.Descending)
    expect(sortedByNameDesc.map((item) => item.name)).toEqual([
      'Charlie',
      'Bob',
      'Alice'
    ])
    const sortedByAgeDesc = sortList(list, 'age', Sorting.Descending)
    expect(sortedByAgeDesc.map((item) => item.age)).toEqual([30, 25, 20])
  })

  it('should handle sorting when some objects have the same key value', () => {
    const customList: MockData[] = [...list, { name: 'Alice', age: 22 }]
    const sortedByName = sortList(customList, 'name', Sorting.Ascending)
    expect(sortedByName.map((item) => item.name)).toEqual([
      'Alice',
      'Alice',
      'Bob',
      'Charlie'
    ])
  })

  it('should default to ascending sort when no direction is given', () => {
    const sortedByNameDefault = sortList(list, 'name')
    expect(sortedByNameDefault.map((item) => item.name)).toEqual([
      'Alice',
      'Bob',
      'Charlie'
    ])
  })

  it('should sort numerically if the key values are numeric strings', () => {
    const numericStringList = [{ name: '2' }, { name: '10' }, { name: '1' }]
    const sortedList = sortList(numericStringList, 'name')
    expect(sortedList.map((item) => item.name)).toEqual(['1', '2', '10'])
  })
})

describe('camelCaseString', () => {
  it('should capitalize the first letter of a string', () => {
    expect(camelCaseString('string')).toBe('String')
  })

  it('should return an empty string when given an empty string', () => {
    expect(camelCaseString('')).toBe('')
  })

  it('should handle non-alphabetic characters', () => {
    expect(camelCaseString('123')).toBe('123')
    expect(camelCaseString('!@#')).toBe('!@#')
  })
})
