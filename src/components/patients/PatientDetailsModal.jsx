import React, { useEffect } from 'react';
import { X, Mail, Phone, MapPin, Calendar, User as UserIcon } from 'lucide-react';
import { formatDate, formatAge } from '../../utils/formatters';
import StatusBadge from '../common/StatusBadge';

const PatientDetailsModal = ({ patient, isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !patient) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative bg-white dark:bg-dark-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden transform transition-all">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-dark-900/50">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Patient Details</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 focus:outline-none transition-colors p-1 rounded-md hover:bg-slate-200 dark:hover:bg-dark-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="px-6 py-6">
          <div className="flex items-start space-x-4 mb-6">
            <div className="h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-700 dark:text-primary-300 font-bold text-2xl shadow-sm border-2 border-white dark:border-dark-800">
              {patient.patient_name?.charAt(0)?.toUpperCase() || 'P'}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{patient.patient_name}</h2>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-dark-700 px-2 py-0.5 rounded-md">
                  ID: {patient.registration_id}
                </span>
                <StatusBadge type={patient.gender || 'Unknown'}>
                  {patient.gender || 'Unknown'}
                </StatusBadge>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-dark-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
              <div className="flex items-center text-slate-400 mb-1">
                <Phone className="h-4 w-4 mr-2" />
                <span className="text-xs font-medium uppercase tracking-wider">Mobile</span>
              </div>
              <p className="text-sm font-medium text-slate-900 dark:text-white ml-6">
                {patient.mobile_no || 'Not provided'}
              </p>
            </div>
            
            <div className="bg-slate-50 dark:bg-dark-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
              <div className="flex items-center text-slate-400 mb-1">
                <Mail className="h-4 w-4 mr-2" />
                <span className="text-xs font-medium uppercase tracking-wider">Email</span>
              </div>
              <p className="text-sm font-medium text-slate-900 dark:text-white ml-6 break-all">
                {patient.email || 'Not provided'}
              </p>
            </div>
            
            <div className="bg-slate-50 dark:bg-dark-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
              <div className="flex items-center text-slate-400 mb-1">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-xs font-medium uppercase tracking-wider">Date of Birth</span>
              </div>
              <p className="text-sm font-medium text-slate-900 dark:text-white ml-6">
                {formatDate(patient.date_of_birth)}
                <span className="ml-2 text-xs text-slate-500 font-normal">({formatAge(patient.date_of_birth)} years)</span>
              </p>
            </div>
            
            <div className="bg-slate-50 dark:bg-dark-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
              <div className="flex items-center text-slate-400 mb-1">
                <UserIcon className="h-4 w-4 mr-2" />
                <span className="text-xs font-medium uppercase tracking-wider">Gender</span>
              </div>
              <p className="text-sm font-medium text-slate-900 dark:text-white ml-6">
                {patient.gender || 'Not specified'}
              </p>
            </div>
          </div>
          
          <div className="mt-4 bg-slate-50 dark:bg-dark-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
            <div className="flex items-center text-slate-400 mb-1">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="text-xs font-medium uppercase tracking-wider">Address</span>
            </div>
            <p className="text-sm font-medium text-slate-900 dark:text-white ml-6">
              {patient.address || 'Not provided'}
            </p>
          </div>
        </div>
        
        <div className="px-6 py-4 bg-slate-50 dark:bg-dark-900/80 border-t border-slate-200 dark:border-slate-700 flex justify-end">
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsModal;
