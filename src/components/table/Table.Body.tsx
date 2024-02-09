import { FC, PropsWithChildren } from 'react'

export const TableBody: FC<PropsWithChildren & { className: string }> = ({
  children,
  ...rest
}) => {
  return <tbody {...rest}>{children}</tbody>
}

export const TableRow: FC<PropsWithChildren & { className: string }> = ({
  children,
  ...rest
}) => {
  return (
    <tr
      tabIndex={-1}
      {...rest}
    >
      {children}
    </tr>
  )
}

export const TableCell: FC<PropsWithChildren & { className: string }> = ({
  children,
  ...rest
}) => {
  return (
    <td
      align="left"
      {...rest}
    >
      {children}
    </td>
  )
}
