import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Header } from "@/components/Header"
import { Analytics } from "@/components/Analytics"
import { MemberManagement } from "@/components/MemberManagement"
import { EnrollmentForm } from "@/components/forms/EnrollmentForm"
const Info = () => {

    const [darkMode, setDarkMode] = useState(false)
    const [enrollmentOpen, setEnrollmentOpen] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
        document.documentElement.classList.toggle("dark")
    }

    return (
        <div>
            <SidebarProvider>
                <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
                    <AppSidebar  />
                    <main className="flex-1 overflow-auto">
                        <Header
                            darkMode={darkMode}
                            toggleDarkMode={toggleDarkMode}
                        />
                        <div className="p-6">
                            <Analytics onOpenEnrollment={() => setEnrollmentOpen(true)} />
                            <EnrollmentForm open={enrollmentOpen} onOpenChange={setEnrollmentOpen} />
                        </div>  
                    </main>
                </div>
            </SidebarProvider>
        </div>
    )
}


export default Info