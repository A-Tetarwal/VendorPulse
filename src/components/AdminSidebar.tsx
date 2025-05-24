
import { useState } from "react"
import { BarChart3, Users, Package, CreditCard, Settings, Menu, X, Shield } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

const menuItems = [
  { title: "Dashboard", url: "/admin", icon: BarChart3 },
  { title: "Product Listings", url: "/admin/products", icon: Package },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Transactions", url: "/admin/transactions", icon: CreditCard },
  { title: "Settings", url: "/admin/settings", icon: Settings },
]

export function AdminSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (path: string) => currentPath === path
  const isExpanded = menuItems.some((item) => isActive(item.url))
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary text-primary-foreground font-medium" : "hover:bg-muted/50"

  const collapsed = state === "collapsed"

  return (
    <Sidebar
      className={collapsed ? "w-14" : "w-60"}
      collapsible="icon"
    >
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          {!collapsed && <span className="font-bold text-lg">Admin Panel</span>}
        </div>
      </div>

      <SidebarTrigger className="m-2 self-end" />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
