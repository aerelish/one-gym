import { Plus, Search, SidebarIcon } from 'lucide-react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { AppSidebar } from '@/components/app-sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import BillingTab from '@/pages/dashboard/tabs/BillingTab'
import DashboardHomeTab from '@/pages/dashboard/tabs/DashboardHomeTab'
import MembersTab from '@/pages/dashboard/tabs/MembersTab'
import PlansTab from '@/pages/dashboard/tabs/PlansTab'
import SettingsTab from '@/pages/dashboard/tabs/SettingsTab'

function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1">
              <SidebarIcon />
            </SidebarTrigger>
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">Build Your Application</BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-[240px] sm:w-[300px]">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="pl-9" aria-label="Search" />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4" />
                  Add New...
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuItem>Member</DropdownMenuItem>
                <DropdownMenuItem>Plan</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <div className="flex flex-1 flex-col p-4">
          <Routes>
            <Route index element={<DashboardHomeTab />} />
            <Route path="members" element={<MembersTab />} />
            <Route path="plans" element={<PlansTab />} />
            <Route path="billing" element={<BillingTab />} />
            <Route path="settings/members" element={<SettingsTab />} />
            <Route path="settings/plans" element={<SettingsTab />} />
            <Route path="settings/billing" element={<SettingsTab />} />
            <Route path="*" element={<Navigate to="." replace />} />
          </Routes>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardPage
