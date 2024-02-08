import { ReactNode } from 'react'

export default function BodyWrapper({
  children
}: {
  children: ReactNode
}): ReactNode {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {children}
    </div>
  )
}
