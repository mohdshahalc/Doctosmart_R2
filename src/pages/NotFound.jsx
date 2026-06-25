import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { ROUTES } from '../utils/constants';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="h-24 w-24 bg-slate-100 dark:bg-dark-800 rounded-full flex items-center justify-center mb-6">
        <span className="text-4xl font-bold text-primary-600 dark:text-primary-500">404</span>
      </div>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Page not found</h1>
      <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">
        Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
      </p>
      <Link 
        to={ROUTES.DASHBOARD}
        className="btn-primary"
      >
        <Home className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
