import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, X } from 'lucide-react';
import { ROUTES } from '../../utils/constants';
import { cn } from '../common/StatusBadge';

const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { name: 'Dashboard', path: ROUTES.DASHBOARD, icon: LayoutDashboard },
    { name: 'Patients', path: ROUTES.PATIENTS, icon: Users },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/80 backdrop-blur-sm lg:hidden transition-opacity" 
          onClick={onClose}
        />
      )}

      {/* Sidebar component */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-dark-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200 dark:border-slate-800 lg:hidden">
          <span className="text-xl font-bold text-slate-900 dark:text-white">Menu</span>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="overflow-y-auto h-full py-4 px-3">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => cn(
                  "group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-colors",
                  isActive 
                    ? "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400" 
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-dark-800"
                )}
                onClick={() => {
                  if (window.innerWidth < 1024) onClose();
                }}
              >
                <item.icon 
                  className={cn(
                    "mr-3 flex-shrink-0 h-5 w-5 transition-colors",
                    // You would need useLocation or Match to know if active here easily, 
                    // or rely on group-hover, but NavLink provides isActive
                  )} 
                  aria-hidden="true" 
                />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="bg-slate-50 dark:bg-dark-800 rounded-xl p-4">
            <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-1">Need Help?</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Check our docs or contact support.</p>
            <button className="w-full text-xs font-medium bg-white dark:bg-dark-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-dark-600 transition-colors">
              Documentation
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
