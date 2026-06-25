import React from 'react';
import { Menu, Moon, Sun, Bell, User } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Navbar = ({ onMenuClick }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <header className="bg-white/80 dark:bg-dark-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700/80 sticky top-0 z-30 transition-all duration-200 shadow-sm">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <div className="flex items-center">
          <button
            type="button"
            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 focus:outline-none lg:hidden"
            onClick={onMenuClick}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
          
          <div className="flex-shrink-0 flex items-center ml-4 lg:ml-0">
            <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <span className="ml-2 text-xl font-bold text-slate-900 dark:text-white hidden sm:block">
              Docto<span className="text-primary-600 dark:text-primary-400">smart</span>
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-dark-700 focus:outline-none transition-colors"
          >
            <span className="sr-only">Toggle dark mode</span>
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          
          <button className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-dark-700 focus:outline-none transition-colors relative">
            <span className="sr-only">View notifications</span>
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-dark-800" />
          </button>

          <div className="flex items-center ml-2 border-l pl-4 border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                <User className="h-5 w-5 text-slate-500 dark:text-slate-400" />
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 hidden md:block">Admin User</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
