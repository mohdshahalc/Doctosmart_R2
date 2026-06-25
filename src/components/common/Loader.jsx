import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = ({ fullScreen = false, text = 'Loading...' }) => {
  const containerClass = fullScreen 
    ? 'fixed inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-dark-900/80 z-50 backdrop-blur-sm'
    : 'flex flex-col items-center justify-center p-8';

  return (
    <div className={containerClass}>
      <Loader2 className="h-10 w-10 animate-spin text-primary-500 mb-4" />
      {text && <p className="text-slate-600 dark:text-slate-400 font-medium animate-pulse">{text}</p>}
    </div>
  );
};

export default Loader;
