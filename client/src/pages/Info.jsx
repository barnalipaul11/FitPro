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
    const [enrollmentPredictions, setEnrollmentPredictions] = useState([]);

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
                            <EnrollmentForm
                              open={enrollmentOpen}
                              onOpenChange={setEnrollmentOpen}
                              onPrediction={result => setEnrollmentPredictions(prev => [...prev, result])}
                            />
                            <div className="mt-8">
                              <h3 className="text-lg font-semibold mb-4">Enrollment Predictions</h3>
                              <div className="overflow-x-auto">
                                <table className="min-w-full bg-white dark:bg-slate-800 rounded shadow">
                                  <thead>
                                    <tr>
                                      <th className="py-2 px-4 border-b text-center whitespace-nowrap">Month</th>
                                      <th className="py-2 px-4 border-b text-center whitespace-nowrap">Campaign</th>
                                      <th className="py-2 px-4 border-b text-center whitespace-nowrap">New Enrollments</th>
                                      <th className="py-2 px-4 border-b text-center whitespace-nowrap">Predicted Output</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {enrollmentPredictions.length === 0 ? (
                                      <tr>
                                        <td colSpan={4} className="text-center py-4 text-slate-500">
                                          No data available
                                        </td>
                                      </tr>
                                    ) : (
                                      enrollmentPredictions.map((row, idx) => (
                                        <tr key={idx} className="border-b">
                                          <td className="py-2 px-4 text-center whitespace-nowrap">{row.current_month}</td>
                                          <td className="py-2 px-4 text-center whitespace-nowrap">{row.marketing_campaign === 1 ? "Yes" : "No"}</td>
                                          <td className="py-2 px-4 text-center whitespace-nowrap">{row.current_enrollment}</td>
                                          <td className="py-2 px-4 text-center font-semibold whitespace-nowrap">{row.predicted_enrollment}</td>
                                        </tr>
                                      ))
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                        </div>  
                    </main>
                </div>
            </SidebarProvider>
        </div>
    )
}


export default Info