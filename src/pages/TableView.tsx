import type { Data } from '@/types/services'
import { useGetRequest } from "@/services/requestHooks"
import { Endpoint } from '@/enums/endpoints'
import List from 'rc-virtual-list'

function TableView() {
  const { data } = useGetRequest<Data[]>(Endpoint.Sample)

  return (
    <>
      <h3>Table</h3>
      <List className="w-full" data={data} itemHeight={30} itemKey="ticker">
        {({price}) => <div>{price}</div>}
      </List>
    </>
  )
}

export default TableView