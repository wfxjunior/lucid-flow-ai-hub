import { ReactNode } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MobileTable, MobileTableItem } from "./mobile-table"

interface ResponsiveTableProps {
  children: ReactNode
  className?: string
}

interface ResponsiveTableHeaderProps {
  children: ReactNode
}

interface ResponsiveTableBodyProps {
  children: ReactNode
}

interface ResponsiveTableRowProps {
  children: ReactNode
  mobileCard?: ReactNode
  className?: string
  onClick?: () => void
}

export function ResponsiveTable({ children, className }: ResponsiveTableProps) {
  const isMobile = useIsMobile()
  
  if (isMobile) {
    return <MobileTable className={className}>{children}</MobileTable>
  }
  
  return (
    <div className={className}>
      <Table>{children}</Table>
    </div>
  )
}

export function ResponsiveTableHeader({ children }: ResponsiveTableHeaderProps) {
  const isMobile = useIsMobile()
  
  // On mobile, headers are not shown as they're integrated into cards
  if (isMobile) {
    return null
  }
  
  return (
    <TableHeader>
      <TableRow>{children}</TableRow>
    </TableHeader>
  )
}

export function ResponsiveTableBody({ children }: ResponsiveTableBodyProps) {
  const isMobile = useIsMobile()
  
  if (isMobile) {
    return <>{children}</>
  }
  
  return <TableBody>{children}</TableBody>
}

export function ResponsiveTableRow({ children, mobileCard, className, onClick }: ResponsiveTableRowProps) {
  const isMobile = useIsMobile()
  
  if (isMobile) {
    return (
      <MobileTableItem className={className} onClick={onClick}>
        {mobileCard || children}
      </MobileTableItem>
    )
  }
  
  return (
    <TableRow className={className} onClick={onClick}>
      {children}
    </TableRow>
  )
}

export function ResponsiveTableCell({ children, className }: { children: ReactNode, className?: string }) {
  const isMobile = useIsMobile()
  
  // On mobile, cells are handled by the mobile card layout
  if (isMobile) {
    return null
  }
  
  return <TableCell className={className}>{children}</TableCell>
}

export function ResponsiveTableHead({ children, className }: { children: ReactNode, className?: string }) {
  const isMobile = useIsMobile()
  
  // On mobile, headers are not shown
  if (isMobile) {
    return null
  }
  
  return <TableHead className={className}>{children}</TableHead>
}