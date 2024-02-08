import type { Data } from '@/types/services'
import { useGetRequest } from '@/hooks/useRequest'
import { Endpoint } from '@/enums/services/endpoints'
import { useTable } from '@/hooks/table/Table.Hooks'
import { Sorting } from '@/enums/table'
import Table from '@/components/table'
import { sortList } from '@/helpers/utils'

function TablePage() {
  const { data } = useGetRequest<Data[]>(Endpoint.Sample)
  const { list, sorting } = useTable(data, {
    sortKey: 'ticker',
    sortDir: Sorting.Ascending,
    customSort: onSortAsset
  })

  function onSortAsset(
    list: Data[],
    sortKey: keyof Data,
    sortDir: `${Sorting}`
  ) {
    console.log('sortKey', sortKey)
    console.log('sortDir', sortDir)
    return sortKey === 'ticker' ? list : sortList(list, sortKey, sortDir)
  }

  return (
    <>
      <Table className="shadow-lg bg-white border-collapse table-auto max-h-[800px] overflow-y-auto block">
        <Table.Header
          {...sorting}
          className="bg-gray-50 border-b sticky top-0"
        >
          <Table.Column
            className="px-6 py-3"
            id="ticker"
          >
            Ticker
          </Table.Column>
          <Table.Column
            className="px-6 py-3"
            id="price"
          >
            Price
          </Table.Column>
          <Table.Column
            className="px-6 py-3"
            id="assetClass"
          >
            Asset
          </Table.Column>
        </Table.Header>
        <Table.Body className="h-[800px] overflow-y-auto">
          {list.map(({ ticker, price, assetClass }) => (
            <Table.Row key={ticker}>
              <Table.Cell>{ticker}</Table.Cell>
              <Table.Cell>{price}</Table.Cell>
              <Table.Cell>{assetClass}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  )
}

export default TablePage
