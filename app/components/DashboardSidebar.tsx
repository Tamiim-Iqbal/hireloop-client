"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  Bookmark,
  BriefcaseBusiness,
  Building2,
  FileText,
  LayoutDashboard,
  PlusCircle,
  Search,
  Settings,
  UserRound,
  Users,
  Wallet,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useSession } from "@/lib/auth-client"

type UserRole = "seeker" | "recruiter" | "admin"

type MenuItem = {
  name: string
  url: string
  icon: LucideIcon
}

const menuItemsByRole: Record<UserRole, MenuItem[]> = {
  seeker: [
    { name: "Dashboard", url: "/dashboard/seeker", icon: LayoutDashboard },
    { name: "Find Jobs", url: "/dashboard/seeker/jobs", icon: Search },
    {
      name: "My Applications",
      url: "/dashboard/seeker/applications",
      icon: FileText,
    },
    { name: "Saved Jobs", url: "/dashboard/seeker/saved", icon: Bookmark },
    { name: "My Profile", url: "/dashboard/seeker/profile", icon: UserRound },
    { name: "Billing", url: "/dashboard/seeker/billing", icon: Wallet },
    { name: "Settings", url: "/dashboard/seeker/settings", icon: Settings },
  ],
  recruiter: [
    {
      name: "Dashboard",
      url: "/dashboard/recruiter",
      icon: LayoutDashboard,
    },
    {
      name: "Post a Job",
      url: "/dashboard/recruiter/jobs/new",
      icon: PlusCircle,
    },
    {
      name: "Manage Jobs",
      url: "/dashboard/recruiter/jobs",
      icon: BriefcaseBusiness,
    },
    {
      name: "Applications",
      url: "/dashboard/recruiter/applications",
      icon: FileText,
    },
    {
      name: "Company Profile",
      url: "/dashboard/recruiter/company",
      icon: Building2,
    },  
  ],
  admin: [
    { name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
    { name: "Users", url: "/dashboard/admin/users", icon: Users },
    { name: "Companies", url: "/dashboard/admin/companies", icon: Building2 },
    { name: "Jobs", url: "/dashboard/admin/jobs", icon: BriefcaseBusiness },
    { name: "Payments", url: "/dashboard/admin/reports", icon: Wallet  },
    { name: "Settings", url: "/dashboard/admin/settings", icon: Settings },
  ],
}

const DashboardSidebar = () => {
  const { data: session } = useSession()
  const role: UserRole = session?.user?.role ?? "seeker"

  return (
    <Sidebar>
      <SidebarHeader />

      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />

        <SidebarGroup>
          <SidebarMenu>
            {menuItemsByRole[role].map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton render={<a href={item.url} />}>
                  <item.icon />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  )
}

export default DashboardSidebar
