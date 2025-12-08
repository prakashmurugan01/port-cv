import React, { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { ProjectsManager } from '@/components/admin/projects-manager'
import { SkillsManager } from '@/components/admin/skills-manager'
import { ContactMessagesManager } from '@/components/admin/contact-messages-manager'
import { PortfolioContentManager } from '@/components/admin/portfolio-content-manager'
import { LogOut, User } from 'lucide-react'

export const AdminLayout = () => {
  const [activeSection, setActiveSection] = useState('projects')
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'projects':
        return <ProjectsManager />
      case 'skills':
        return <SkillsManager />
      case 'contact':
        return <ContactMessagesManager />
      case 'content':
        return <PortfolioContentManager />
      default:
        return <ProjectsManager />
    }
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection}
        />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                {user?.email}
              </div>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 bg-muted/10">
            {renderActiveSection()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}