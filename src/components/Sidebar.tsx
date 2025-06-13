import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FileText, LayoutDashboard, Settings,
  History, FileCheck, ExternalLink
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  
  const menuItems = [
    {
      name: 'Process Term Sheets',
      icon: FileText,
      path: '/'
    },
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard'
    },
    {
      name: 'Past Data',
      icon: History,
      path: '/past-data'
    },
    {
      name: 'Settings',
      icon: Settings,
      path: '/settings'
    }
  ];

  return (
    <aside 
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-0 -translate-x-full'
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="flex-1 py-4">
          <nav className="px-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};