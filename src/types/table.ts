import { Sorting } from "@/enums/table"

export type KeyOfTableList<T> = keyof T & string
export type TableOptions<T> = { sortKey: KeyOfTableList<T>, sortDir: `${Sorting}`, customSort?: TableSorting<T>}
export type TableSorting<T> = (list: T[], sortKey: KeyOfTableList<T>, sortDir: `${Sorting}`) => T[]