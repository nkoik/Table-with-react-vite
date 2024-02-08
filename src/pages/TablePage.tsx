import type { Data } from '@/types/services'
import { useGetRequest } from '@/hooks/useRequest'
import { Endpoint } from '@/enums/services/endpoints'
import { useTable } from '@/hooks/table/Table.Hooks'
import { Sorting } from '@/enums/table'

function TablePage() {
  const { data } = useGetRequest<Data[]>(Endpoint.Sample)
  const { list, sorting: { onSort } } = useTable(data, {
    sortKey: 'ticker',
    sortDir: Sorting.Descending
  })

  return <></>
}

export default TablePage
