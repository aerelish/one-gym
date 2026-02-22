import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type Member = {
  name: string
  email: string
  active: boolean
  createdDate: string
}

const members: Member[] = [
  {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    active: true,
    createdDate: '2025-09-03',
  },
  {
    name: 'Sofia Martinez',
    email: 'sofia.martinez@example.com',
    active: true,
    createdDate: '2025-09-11',
  },
  {
    name: 'Daniel Kim',
    email: 'daniel.kim@example.com',
    active: false,
    createdDate: '2025-09-18',
  },
  {
    name: 'Priya Singh',
    email: 'priya.singh@example.com',
    active: true,
    createdDate: '2025-10-02',
  },
  {
    name: 'Liam O\'Connor',
    email: 'liam.oconnor@example.com',
    active: true,
    createdDate: '2025-10-15',
  },
  {
    name: 'Maya Patel',
    email: 'maya.patel@example.com',
    active: false,
    createdDate: '2025-10-23',
  },
  {
    name: 'Noah Brown',
    email: 'noah.brown@example.com',
    active: true,
    createdDate: '2025-11-01',
  },
  {
    name: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    active: true,
    createdDate: '2025-11-12',
  },
  {
    name: 'Ethan Davis',
    email: 'ethan.davis@example.com',
    active: false,
    createdDate: '2025-11-20',
  },
  {
    name: 'Olivia Garcia',
    email: 'olivia.garcia@example.com',
    active: true,
    createdDate: '2025-12-01',
  },
  {
    name: 'James Miller',
    email: 'james.miller@example.com',
    active: true,
    createdDate: '2025-12-14',
  },
  {
    name: 'Ava Thompson',
    email: 'ava.thompson@example.com',
    active: false,
    createdDate: '2025-12-20',
  },
  {
    name: 'Lucas Anderson',
    email: 'lucas.anderson@example.com',
    active: true,
    createdDate: '2026-01-04',
  },
  {
    name: 'Isabella Thomas',
    email: 'isabella.thomas@example.com',
    active: true,
    createdDate: '2026-01-17',
  },
  {
    name: 'Benjamin White',
    email: 'benjamin.white@example.com',
    active: false,
    createdDate: '2026-01-29',
  },
]

const columns: ColumnDef<Member>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'active',
    header: 'Active',
    cell: ({ row }) => (row.original.active ? 'Yes' : 'No'),
  },
  {
    accessorKey: 'createdDate',
    header: 'Join Date',
    cell: ({ row }) =>
      new Date(row.original.createdDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      }),
  },
]

function MembersTab() {
  const table = useReactTable({
    data: members,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  })

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Members</h2>
        <p className="text-muted-foreground text-sm">
          Members list with dummy data.
        </p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="h-24 text-center" colSpan={columns.length}>
                  No members found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MembersTab
