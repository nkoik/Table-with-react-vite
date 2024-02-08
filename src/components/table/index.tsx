import { TableColumn, TableHead } from '@/components/table/Table.Head'
import { TableBody, TableCell, TableRow } from '@/components/table/Table.Body'
import { ReactNode } from 'react'

const Table = ({ children, ...rest }: { children: ReactNode, className: string }) => {
    return (
        <table {...rest}>
            {children}
        </table>
    )
}

Table.Body = TableBody
Table.Row = TableRow
Table.Cell = TableCell
Table.Header = TableHead
Table.Column = TableColumn

export default Table
