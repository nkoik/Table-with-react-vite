import BodyWrapper from 'components/style/BodyWrapper'
import TablePage from '@/pages/TablePage'

function App() {
  return (
    <BodyWrapper>
      <div className="mb-4">React Table</div>
      <div className="p-8 border radius-2">
        <TablePage />
      </div>
    </BodyWrapper>
  )
}

export default App
