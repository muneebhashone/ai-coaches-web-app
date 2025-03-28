"use client"

import * as React from "react"
import { useState } from "react"
import {
  IconCalendar,
  IconChevronDown,
  IconDotsVertical,
  IconEdit,
  IconEye,
  IconLanguage,

  IconTrash,
} from "@tabler/icons-react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { format } from "date-fns"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toggle } from "@/components/ui/toggle"

// Define the session data type
export type Session = {
  id: number
  userId: string
  userName: string
  sessionDate: string
  coachName: string
  sessionNotes: string
  sessionNotesKorean: string
  progress: number
  status: string
  tags: string[]
  nextSession?: string
}

interface SessionHistoryTableProps {
  data: Session[]
}

export function SessionHistoryTable({ data }: SessionHistoryTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [language, setLanguage] = useState<"english" | "korean">("english")
  const [viewSession, setViewSession] = useState<Session | null>(null)

  // Define columns for the table
  const columns: ColumnDef<Session>[] = [
    {
      accessorKey: "userName",
      header: language === "english" ? "User Name" : "사용자 이름",
      cell: ({ row }) => <div className="font-medium">{row.getValue("userName")}</div>,
    },
    {
      accessorKey: "sessionDate",
      header: language === "english" ? "Session Date" : "세션 날짜",
      cell: ({ row }) => {
        const date = new Date(row.getValue("sessionDate"))
        return <div>{format(date, "PPP")}</div>
      },
    },
    {
      accessorKey: "coachName",
      header: language === "english" ? "Coach" : "코치",
    },
    {
      accessorKey: "status",
      header: language === "english" ? "Status" : "상태",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge
            variant={
              status === "Completed"
                ? "secondary"
                : status === "In Progress"
                ? "default"
                : "outline"
            }
          >
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "progress",
      header: language === "english" ? "Progress" : "진행 상황",
      cell: ({ row }) => {
        const progress = row.getValue("progress") as number
        return (
          <div className="w-full bg-muted rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )
      },
    },
    {
      accessorKey: "tags",
      header: language === "english" ? "Tags" : "태그",
      cell: ({ row }) => {
        const tags = row.getValue("tags") as string[]
        return (
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 2}
              </Badge>
            )}
          </div>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const session = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <IconDotsVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setViewSession(session)}>
                <IconEye className="mr-2 h-4 w-4" />
                {language === "english" ? "View Details" : "세부 정보 보기"}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconEdit className="mr-2 h-4 w-4" />
                {language === "english" ? "Edit" : "편집"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => {
                  toast.error(
                    language === "english"
                      ? "Session deleted"
                      : "세션이 삭제되었습니다"
                  )
                }}
              >
                <IconTrash className="mr-2 h-4 w-4" />
                {language === "english" ? "Delete" : "삭제"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{language === "english" ? "Session History" : "세션 기록"}</CardTitle>
        <div className="flex items-center gap-2">
          <Toggle
            aria-label="Toggle language"
            pressed={language === "korean"}
            onPressedChange={(pressed) => setLanguage(pressed ? "korean" : "english")}
          >
            <IconLanguage className="h-4 w-4 mr-2" />
            {language === "english" ? "English" : "한국어"}
          </Toggle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder={language === "english" ? "Search sessions..." : "세션 검색..."}
              value={(table.getColumn("userName")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("userName")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <Select
              value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
              onValueChange={(value) =>
                table.getColumn("status")?.setFilterValue(value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={language === "english" ? "All statuses" : "모든 상태"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {language === "english" ? "All statuses" : "모든 상태"}
                </SelectItem>
                <SelectItem value="Completed">
                  {language === "english" ? "Completed" : "완료됨"}
                </SelectItem>
                <SelectItem value="In Progress">
                  {language === "english" ? "In Progress" : "진행 중"}
                </SelectItem>
                <SelectItem value="Just Started">
                  {language === "english" ? "Just Started" : "방금 시작됨"}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <IconCalendar className="h-4 w-4" />
              {language === "english" ? "Date Range" : "날짜 범위"}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  {language === "english" ? "Columns" : "열"}
                  <IconChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuItem
                        key={column.id}
                        className="capitalize"
                        onClick={() =>
                          column.toggleVisibility(!column.getIsVisible())
                        }
                      >
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={column.getIsVisible()}
                          onChange={() => {}}
                        />
                        {column.id}
                      </DropdownMenuItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    {language === "english" ? "No sessions found." : "세션을 찾을 수 없습니다."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="text-sm text-muted-foreground">
            {language === "english" 
              ? `Page ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}` 
              : `페이지 ${table.getState().pagination.pageIndex + 1} / ${table.getPageCount()}`}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {language === "english" ? "Previous" : "이전"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {language === "english" ? "Next" : "다음"}
          </Button>
        </div>
      </CardContent>

      {/* Session Details Dialog */}
      <Dialog open={!!viewSession} onOpenChange={(open) => !open && setViewSession(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {language === "english" ? "Session Details" : "세션 세부 정보"}
            </DialogTitle>
            <DialogDescription>
              {viewSession?.userName} - {viewSession && format(new Date(viewSession.sessionDate), "PPP")}
            </DialogDescription>
          </DialogHeader>
          
          {viewSession && (
            <Tabs defaultValue="english" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="english">English</TabsTrigger>
                <TabsTrigger value="korean">한국어</TabsTrigger>
              </TabsList>
              <TabsContent value="english" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium">Coach</h4>
                    <p className="text-sm">{viewSession.coachName}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Status</h4>
                    <Badge
                      variant={
                        viewSession.status === "Completed"
                          ? "secondary"
                          : viewSession.status === "In Progress"
                          ? "default"
                          : "outline"
                      }
                    >
                      {viewSession.status}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Progress</h4>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div
                          className="bg-primary h-2.5 rounded-full"
                          style={{ width: `${viewSession.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{viewSession.progress}%</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Next Session</h4>
                    <p className="text-sm">
                      {viewSession.nextSession
                        ? format(new Date(viewSession.nextSession), "PPP")
                        : "Not scheduled"}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium">Session Notes</h4>
                  <p className="text-sm mt-1">{viewSession.sessionNotes}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium">Tags</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {viewSession.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="korean" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium">코치</h4>
                    <p className="text-sm">{viewSession.coachName}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">상태</h4>
                    <Badge
                      variant={
                        viewSession.status === "Completed"
                          ? "secondary"
                          : viewSession.status === "In Progress"
                          ? "default"
                          : "outline"
                      }
                    >
                      {viewSession.status === "Completed" 
                        ? "완료됨" 
                        : viewSession.status === "In Progress"
                        ? "진행 중"
                        : "방금 시작됨"}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">진행 상황</h4>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div
                          className="bg-primary h-2.5 rounded-full"
                          style={{ width: `${viewSession.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{viewSession.progress}%</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">다음 세션</h4>
                    <p className="text-sm">
                      {viewSession.nextSession
                        ? format(new Date(viewSession.nextSession), "PPP")
                        : "예약되지 않음"}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium">세션 노트</h4>
                  <p className="text-sm mt-1">{viewSession.sessionNotesKorean}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium">태그</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {viewSession.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}
