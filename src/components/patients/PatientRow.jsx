import React from 'react';
import { Mail, Phone, MapPin, Calendar, MoreVertical, Copy, Check } from 'lucide-react';
import { formatDate, formatAge } from '../../utils/formatters';
import StatusBadge from '../common/StatusBadge';

const PatientRow = ({ patient, onRowClick }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyId = (e, id) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <tr 
      onClick={() => onRowClick(patient)}
      className="group bg-white dark:bg-dark-800 hover:bg-slate-50 dark:hover:bg-dark-700/50 border-b border-slate-200 dark:border-slate-700/80 transition-colors cursor-pointer last:border-b-0"
    >
      <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-700 dark:text-primary-300 font-bold text-lg">
            {patient.patient_name?.charAt(0)?.toUpperCase() || 'P'}
          </div>
          <div className="ml-4">
            <div className="font-medium text-slate-900 dark:text-white flex items-center gap-2">
              {patient.patient_name}
              {patient.registration_id && (
                <button 
                  onClick={(e) => handleCopyId(e, patient.registration_id)}
                  className="text-slate-400 hover:text-primary-600 transition-colors focus:outline-none"
                  title="Copy Registration ID"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              )}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              ID: {patient.registration_id}
            </div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-4">
        <StatusBadge type={patient.gender || 'Unknown'}>
          {patient.gender || 'Unknown'}
        </StatusBadge>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 dark:text-slate-400">
        <div className="flex items-center">
          <Phone className="mr-1.5 h-3.5 w-3.5 text-slate-400" />
          {patient.mobile_no || 'N/A'}
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 dark:text-slate-400">
        <div className="flex items-center">
          <Calendar className="mr-1.5 h-3.5 w-3.5 text-slate-400" />
          {formatDate(patient.date_of_birth)}
          <span className="ml-1.5 text-xs bg-slate-100 dark:bg-dark-700 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-300">
            {formatAge(patient.date_of_birth)}y
          </span>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 dark:text-slate-400">
        <div className="flex items-center max-w-[150px] truncate" title={patient.email}>
          <Mail className="mr-1.5 h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
          <span className="truncate">{patient.email || 'N/A'}</span>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 dark:text-slate-400">
        <div className="flex items-center max-w-[150px] truncate" title={patient.address}>
          <MapPin className="mr-1.5 h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
          <span className="truncate">{patient.address || 'N/A'}</span>
        </div>
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
          <MoreVertical className="h-5 w-5" />
        </button>
      </td>
    </tr>
  );
};

export default PatientRow;
