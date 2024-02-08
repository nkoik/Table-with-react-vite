import { ReactNode } from "react"

export const TableBody = ({ children, ...rest }: { children: ReactNode }) => {
    return (
      <tbody
        {...rest}
      >
        {children}
      </tbody>
    )
  }

export const TableRow = ({ children, ...rest }: { children: ReactNode }) => {
  return (
    <tr
      className="hover:bg-gray-50"
      tabIndex={-1}
      {...rest}
    >
      {children}
    </tr>
  )
}

export const TableCell = ({ children, ...rest }: { children: ReactNode }) => {
  return (
    <td
      className="border px-8 py-4"
      align="left"
      {...rest}
    >
      {children}
    </td>
  )
}