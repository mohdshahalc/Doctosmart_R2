export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://demo.lupinary.com/api';
export const API_USERNAME = import.meta.env.VITE_API_USERNAME;
export const API_PASSWORD = import.meta.env.VITE_API_PASSWORD;

export const ROUTES = {
  DASHBOARD: '/',
  PATIENTS: '/patients',
};

export const GENDER_COLORS = {
  Male: 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/20 dark:text-blue-300 dark:ring-blue-800/30',
  Female: 'bg-pink-50 text-pink-700 ring-1 ring-inset ring-pink-700/10 dark:bg-pink-900/20 dark:text-pink-300 dark:ring-pink-800/30',
  Other: 'bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-700/10 dark:bg-purple-900/20 dark:text-purple-300 dark:ring-purple-800/30',
  Unknown: 'bg-slate-50 text-slate-600 ring-1 ring-inset ring-slate-500/10 dark:bg-slate-800/50 dark:text-slate-400 dark:ring-slate-700/50',
};
