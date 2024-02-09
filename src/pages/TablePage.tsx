import type { Data } from '@/types/services'
import { useGetRequest } from '@/hooks/useRequest'
import { Endpoint } from '@/enums/services/endpoints'
import { useTable } from '@/hooks/table/Table.Hooks'
import { assetClassTable, Sorting } from '@/enums/table'
import Table from '@/components/table'
import { sortList, camelCaseString } from '@/helpers/utils'
import { rowClasses, cellClasses, sortListByWeight } from '@/helpers/assetTable'

function TablePage() {
  const onSortAsset = (
    list: Data[],
    sortKey: keyof Data,
    sortDir: `${Sorting}`
  ) =>
    sortKey === 'assetClass'
      ? sortListByWeight(list, assetClassTable.weight, sortDir)
      : sortList(list, sortKey, sortDir)

  const { data } = useGetRequest<Data[]>(Endpoint.Sample)

  const { list, sorting } = useTable(data, {
    sortKey: assetClassTable.defaultSortKey,
    sortDir: assetClassTable.defaultSortDir,
    customSort: onSortAsset
  })

  return (
    <>
      <Table className="shadow-lg bg-white border-collapse table-auto max-h-[800px] overflow-y-auto block">
        <Table.Header
          {...sorting}
          className="bg-gray-50 border-b sticky top-0"
        >
          {assetClassTable.columnIds.map((id) => (
            <Table.Column
              key={id}
              className="px-6 py-3"
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
                  className={['border px-8 py-4', cellClasses(row, key)].join(
                    ' '
                  )}
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
