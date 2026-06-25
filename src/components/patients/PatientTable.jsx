import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import PatientRow from './PatientRow';
import PatientCard from './PatientCard';
import EmptyState from '../common/EmptyState';

const PatientTable = ({ patients, onPatientClick }) => {
  if (!patients || patients.length === 0) {
    return <EmptyState title="No patients found" description="Try adjusting your search or filters." />;
  }

  return (
    <div className="w-full">
      {/* Mobile Cards View */}
      <div className="grid grid-cols-1 gap-4 sm:hidden">
        {patients.map((patient) => (
          <PatientCard 
            key={patient.id || patient.registration_id} 
            patient={patient} 
            onCardClick={onPatientClick} 
          />
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block">
        <div className="hidden sm:block overflow-x-auto rounded-xl border border-slate-200/80 dark:border-slate-700/80">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          <thead className="bg-slate-50/80 dark:bg-dark-800/80 backdrop-blur-sm">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-widest dark:text-slate-400 sm:pl-6">
                Patient Name
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-widest dark:text-slate-400">
                Gender
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-widest dark:text-slate-400">
                Mobile
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-widest dark:text-slate-400">
                Date of Birth
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-widest dark:text-slate-400">
                Email
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-widest dark:text-slate-400">
                Address
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/80 dark:divide-slate-700/80 bg-white dark:bg-dark-900/50">
              {patients.map((patient) => (
                <PatientRow 
                  key={patient.id || patient.registration_id} 
                  patient={patient} 
                  onRowClick={onPatientClick} 
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientTable;
