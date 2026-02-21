"use client"

import * as React from "react"
import {
  BookOpen,
  CreditCard,
  Dumbbell,
  Settings2,
  Users,
  LayoutDashboard,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=John%20Doe",
  },
  teams: [
    {
      name: "One-Gym",
      logo: Dumbbell,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Members",
      url: "/dashboard/members",
      icon: Users,
    },
    {
      title: "Plans",
      url: "/dashboard/plans",
      icon: BookOpen,
    },
    {
      title: "Billing",
      url: "/dashboard/billing",
      icon: CreditCard,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings2,
      items: [
        {
          title: "Members",
          url: "/dashboard/members",
        },
        {
          title: "Plans",
          url: "/dashboard/plans",
        },
        {
          title: "Billing",
          url: "/dashboard/billing",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
