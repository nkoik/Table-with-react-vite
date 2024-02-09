import { Children, FC, PropsWithChildren, cloneElement } from 'react'
import { Sorting } from '@/enums/table'
import arrowDown from '@/assets/icons/arrow-down.svg'
import arrowUp from '@/assets/icons/arrow-up.svg'
import { KeyOfTableList } from '@/types/table'
import { Data } from '@/types/services'

const TableHeadDefaultProps = {
  sortKey: '',
  sortDir: Sorting.Descending,
  onSort: (_: KeyOfTableList<Data>) => {},
  className: ''
}

const TableColumnDefaultProps = {
  sortable: true,
  sortDir: Sorting.Descending,
  onSort: (_: KeyOfTableList<Data>) => {},
  className: '',
  cellProps: {},
  id: ''
}

export const TableHead: FC<PropsWithChildren<typeof TableHeadDefaultProps>> = ({
  sortKey,
  sortDir,
  onSort,
  children,
  ...rest
}) => {
  const hasSorting: boolean = !!(sortDir && sortKey)
  const headers = !hasSorting
    ? children
    : Children.map(children, (child) => {
        return cloneElement(child, {
          onSort,
          sortDir: child?.props.id === sortKey ? sortDir : false,
          sortable: !hasSorting ? false : child?.props.sortable
        })
      })
  return (
    <thead {...rest}>
      <tr>{headers}</tr>
    </thead>
  )
}

TableHead.defaultProps = TableHeadDefaultProps

export const TableColumn: FC<
  PropsWithChildren<typeof TableColumnDefaultProps>
> = ({ id, children, cellProps, className, sortable, sortDir, onSort }) => {
  return (
    <th
      key={id}
      align="left"
      className={'nowrap cursor-pointer ' + className}
      {...cellProps}
    >
      {sortable ? (
        <span onClick={() => onSort(id)}>
          {children}
          {sortable && !!sortDir ? (
            <img
              className="inline px-1"
              src={sortDir === Sorting.Descending ? arrowDown : arrowUp}
              width={20}
              height={20}
            />
          ) : null}
        </span>
      ) : (
        children
      )}
    </th>
  )
}

TableColumn.defaultProps = TableColumnDefaultProps

export default TableColumn
