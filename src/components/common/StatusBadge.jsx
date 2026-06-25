import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { GENDER_COLORS } from '../../utils/constants';

export const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};

const StatusBadge = ({ children, className, type }) => {
  const badgeType = type || 'Unknown';
  let colorClass = 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400';
  
  if (badgeType && GENDER_COLORS[badgeType]) {
    colorClass = GENDER_COLORS[badgeType];
  }

  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', colorClass, className)}>
      {children}
    </span>
  );
};

export default StatusBadge;
