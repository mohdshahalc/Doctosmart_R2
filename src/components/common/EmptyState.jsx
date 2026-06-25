import React from 'react';
import { FileSearch } from 'lucide-react';

const EmptyState = ({ title = "No data found", description = "Get started by creating a new record.", action }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-dark-800 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-dark-700 mb-4">
        <FileSearch className="h-8 w-8 text-slate-500 dark:text-slate-400" />
      </div>
      <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-6">
        {description}
      </p>
      {action && (
        <div className="mt-2">
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
