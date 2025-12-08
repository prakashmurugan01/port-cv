import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { 
  FolderOpen, 
  Brain, 
  MessageSquare, 
  FileText,
  Home
} from 'lucide-react'

interface AdminSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const sidebarItems = [
  { id: 'projects', title: 'Projects', icon: FolderOpen },
  { id: 'skills', title: 'Skills', icon: Brain },
  { id: 'content', title: 'Portfolio Content', icon: FileText },
  { id: 'contact', title: 'Contact Messages', icon: MessageSquare },
]

export const AdminSidebar = ({ activeSection, onSectionChange }: AdminSidebarProps) => {
  const { collapsed } = useSidebar()

  return (
    <Sidebar className={collapsed ? 'w-14' : 'w-60'}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Portfolio Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/" 
                    className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <Home className="mr-2 h-4 w-4" />
                    {!collapsed && <span>View Site</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onSectionChange(item.id)}
                    className={`cursor-pointer ${
                      activeSection === item.id 
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                        : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    }`}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {!collapsed && <span>{item.title}</span>}
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