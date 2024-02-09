import type { Data } from '@/types/services'
import { useGetRequest } from '@/hooks/useRequest'
import { Endpoint } from '@/enums/services/endpoints'
import { useTable } from '@/hooks/table/Table.Hooks'
import { assetClassTable, Sorting } from '@/enums/table'
import Table from '@/components/table'
import { sortList, camelCaseString } from '@/helpers/utils'
import { rowClasses, cellClasses, sortListByAsset } from '@/helpers/assetTable'

function TablePage() {
  const sortTable = (
    list: Data[],
    sortKey: keyof Data,
    sortDir: `${Sorting}`
  ) =>
    sortKey === 'assetClass'
      ? sortListByAsset(list, assetClassTable.weight, sortDir)
      : sortList(list, sortKey, sortDir)

  const { data } = useGetRequest<Data[]>(Endpoint.Sample)

  const { list, sorting } = useTable(data, {
    sortKey: assetClassTable.defaultSortKey,
    sortDir: assetClassTable.defaultSortDir,
    customSort: sortTable
  })

  return (
    <>
      <Table className="shadow-lg bg-white border-collapse max-h-[800px] overflow-y-auto block">
        <Table.Header
          {...sorting}
          className="bg-gray-50 border-b sticky top-0"
        >
          {assetClassTable.columnIds.map((id) => (
            <Table.Column
              key={id}
              className="px-6 py-3 min-w-[200px] text-left font-bold uppercase text-xs text-gray-600 border-gray-100"
              id={id}
            >
              {camelCaseString(id)}
            </Table.Column>
          ))}
        </Table.Header>
        <Table.Body className="h-[800px] overflow-y-auto">
          {list.map((row) => (
            <Table.Row
              key={row.ticker}
              className={rowClasses(row)}
            >
              {assetClassTable.columnIds.map((key) => (
                <Table.Cell
                  key={key}
                  className={[
                    'border px-6 py-3 text-left text-sm',
                    cellClasses(row, key)
                  ].join(' ')}
                >
                  {row[key]}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  )
}

export default TablePage
