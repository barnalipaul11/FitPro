import {
  Users,
  UserCheck,
  Dumbbell,
  BarChart3,
  LayoutDashboard,
  Bell
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar"
import { useNavigate } from "react-router-dom"; // Adjust import path as necessary

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, key: "/" },
  { title: "Members", icon: Users, key: "/member" },
  { title: "Staff", icon: UserCheck, key: "/staff" },
  { title: "Equipment", icon: Dumbbell, key: "/equipment" },
  { title: "Analytics", icon: BarChart3, key: "/info" },
  { title: "Notification", icon: Bell, key: "/notifications" },
]

export function AppSidebar({ activeTab, setActiveTab }) {
   const navigate = useNavigate();
  return (
    <Sidebar className="border-r border-slate-200 dark:border-slate-700">
      <SidebarHeader className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
            <Dumbbell className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              GymPro
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Admin Dashboard
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(item => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    onClick={() => navigate(item.key)}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center space-x-3 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">A</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
              Admin User
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              admin@gym.com
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
