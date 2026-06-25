import React from 'react';
import { Mail, Phone, MapPin, Calendar, Copy, Check } from 'lucide-react';
import { formatDate, formatAge } from '../../utils/formatters';
import StatusBadge from '../common/StatusBadge';

const PatientCard = ({ patient, onCardClick }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyId = (e, id) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      onClick={() => onCardClick(patient)}
      className="card p-4 sm:hidden hover:shadow-md cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-700 dark:text-primary-300 font-bold text-xl shadow-sm">
            {patient.patient_name?.charAt(0)?.toUpperCase() || 'P'}
          </div>
          <div className="ml-3">
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">
              {patient.patient_name}
            </h3>
            <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              <span>ID: {patient.registration_id}</span>
              {patient.registration_id && (
                <button 
                  onClick={(e) => handleCopyId(e, patient.registration_id)}
                  className="ml-1.5 text-slate-400 hover:text-primary-600 transition-colors focus:outline-none"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              )}
            </div>
          </div>
        </div>
        <StatusBadge type={patient.gender || 'Unknown'}>
          {patient.gender || 'Unknown'}
        </StatusBadge>
      </div>

      <div className="grid grid-cols-1 gap-2 border-t border-slate-100 dark:border-slate-700/50 pt-3">
        <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
          <Phone className="mr-2 h-4 w-4 text-slate-400" />
          {patient.mobile_no || 'N/A'}
        </div>
        
        <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
          <Calendar className="mr-2 h-4 w-4 text-slate-400" />
          {formatDate(patient.date_of_birth)}
          <span className="ml-2 text-xs bg-slate-100 dark:bg-dark-700 px-1.5 py-0.5 rounded text-slate-500 dark:text-slate-400">
            {formatAge(patient.date_of_birth)}y
          </span>
        </div>
        
        {patient.email && (
          <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
            <Mail className="mr-2 h-4 w-4 text-slate-400" />
            <span className="truncate">{patient.email}</span>
          </div>
        )}
        
        {patient.address && (
          <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
            <MapPin className="mr-2 h-4 w-4 text-slate-400" />
            <span className="truncate">{patient.address}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientCard;
