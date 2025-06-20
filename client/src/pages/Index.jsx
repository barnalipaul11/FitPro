import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Header } from "@/components/Header"
import { StatsCard } from "@/components/StatsCard"
import { StaffManagement } from "@/components/StaffManagement"
import { Analytics } from "@/components/Analytics"
import { NotificationsPanel } from "@/components/NotificationsPanel"
import { EquipmentTracking } from "@/components/EquipmentTracking"
//import utils from "../../lib/utils";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  const renderContent = () => {
    switch (activeTab) {
       case "staff":
          return <StaffManagement />
      case "equipment":
         return <EquipmentTracking />
      case "analytics":
       return <Analytics />
      case "notifications":
       return <NotificationsPanel />
      default:
        return (
          <div className="space-y-6">
            <StatsCard />
            <div className="w-full grid gap-6">
                <Analytics />
            </div>
          </div>
        )
    }
  }

  return (
    <div >
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
          <AppSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <main className="flex-1 overflow-auto">
            <Header
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
            />
            <div className="p-6">{renderContent()}</div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  )
}

export default Index
