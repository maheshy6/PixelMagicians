import React, { useState } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import {
  LayoutDashboard,
  Car,
  Users,
  FileText,
  Settings,
  Sun,
  Moon,
  Menu,
  X,
  LucideIcon
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  color: string;
}

interface User {
  name: string;
  initials: string;
  avatar?: string;
}

interface NavbarProps {
  user?: User;
}

const Navbar: React.FC<NavbarProps> = ({ 
  user = {
    name: "John Doe",
    initials: "JD"
  }
}) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const navItems: NavItem[] = [
    { 
      name: 'Dashboard', 
      href: '/dashboard', 
      icon: LayoutDashboard,
      color: '#3b82f6' // blue-500
    },
    { 
      name: 'Vehicles', 
      href: '/vehicles', 
      icon: Car,
      color: 'currentColor'
    },
    { 
      name: 'Drivers', 
      href: '/drivers', 
      icon: Users,
      color: 'currentColor'
    },
    { 
      name: 'Reports', 
      href: '/reports', 
      icon: FileText,
      color: 'currentColor'
    },
    { 
      name: 'Settings', 
      href: '/settings', 
      icon: Settings,
      color: 'currentColor'
    },
  ];

  const renderNavItem = (item: NavItem, isMobile: boolean = false): JSX.Element => {
    const IconComponent = item.icon;
    const baseClasses = `flex items-center px-3 py-2 rounded-md font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-800 transition-colors duration-150`;
    const mobileClasses = isMobile ? 'text-base' : 'text-sm';

    return (
      <a
        key={item.name}
        href={item.href}
        className={`${baseClasses} ${mobileClasses}`}
      >
        <IconComponent className="w-4 h-4 mr-2" color={item.color} />
        {item.name}
      </a>
    );
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex shrink-0 items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              FleetManagerPro
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => renderNavItem(item))}
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors duration-150"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* User Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center">
                <div className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar || "/api/placeholder/32/32"} alt={user.name} />
                    <AvatarFallback className="bg-blue-600 text-white">{user.initials}</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline-block font-medium text-gray-700 dark:text-gray-200">
                    {user.name}
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="flex items-center space-x-2">
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center space-x-2">
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors duration-150"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-800">
            <div className="space-y-1 px-4 py-3">
              {navItems.map((item) => renderNavItem(item, true))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;