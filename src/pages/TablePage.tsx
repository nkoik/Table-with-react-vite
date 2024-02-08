import type { Data } from '@/types/services'
import { useGetRequest } from '@/hooks/useRequest'
import { Endpoint } from '@/enums/services/endpoints'

function TablePage() {
  const { data } = useGetRequest<Data[]>(Endpoint.Sample)

  return <></>
}

export default TablePage
