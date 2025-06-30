import React, { useState } from "react";
import {
  Users,
  UserCheck,
  Dumbbell,
  BarChart3,
  LayoutDashboard,
  Bell,
} from "lucide-react";
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
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button"
const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, key: "/" },
  { title: "Members", icon: Users, key: "/member" },
  { title: "Staff", icon: UserCheck, key: "/staff" },
  { title: "Equipment", icon: Dumbbell, key: "/equipment" },
  { title: "Analytics", icon: BarChart3, key: "/info" },
  { title: "Notification", icon: Bell, key: "/notifications" },
];

export function AppSidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login");
  }
  const sidebarContent = (
    <>
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
                    onClick={() => {
                      navigate(item.key);
                      if (isMobile) setOpen(false);
                    }}
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
           <Button onClick={handleLogout}> LogOut </Button>
          </div>
        </div>
      </SidebarFooter>
    </>
  );
  if (isMobile) {
    return (
      <aside className="fixed top-0 left-0 h-full w-16 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 flex flex-col items-center py-4 z-50">
        {menuItems.map(item => (
          <button
            key={item.key}
            onClick={() => navigate(item.key)}
            className="mb-6 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full flex items-center justify-center"
            aria-label={item.title}
          >
            <item.icon className="w-6 h-6 text-slate-700 dark:text-slate-200" />
          </button>
        ))}
      </aside>
    );
  }

  // Desktop: show sidebar always
  return (
    <Sidebar className="border-r border-slate-200 dark:border-slate-700 h-full">
      {sidebarContent}
    </Sidebar>
  );
}
