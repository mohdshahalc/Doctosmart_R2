import React, { useState, useMemo } from 'react';
import { Download, RefreshCw, Plus, Filter } from 'lucide-react';
import { usePatients } from '../hooks/usePatients';
import { exportToCSV } from '../utils/helpers';
import SearchBar from '../components/common/SearchBar';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import PatientTable from '../components/patients/PatientTable';
import PatientDetailsModal from '../components/patients/PatientDetailsModal';

const Patients = () => {
  const { 
    patients, 
    loading, 
    error, 
    refresh 
  } = usePatients();

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  
  // Local Filtering State
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('All');

  const filteredPatients = useMemo(() => {
    let result = [...patients];

    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      result = result.filter(patient => 
        patient.patient_name?.toLowerCase().includes(lowercasedSearch) ||
        patient.registration_id?.toLowerCase().includes(lowercasedSearch) ||
        patient.mobile_no?.toLowerCase().includes(lowercasedSearch)
      );
    }

    if (genderFilter !== 'All') {
      result = result.filter(patient => {
        const pGender = patient.gender || 'Unknown';
        return pGender === genderFilter;
      });
    }

    return result;
  }, [patients, searchTerm, genderFilter]);

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const handleExport = () => {
    setIsExporting(true);
    // Use the currently visible patients
    exportToCSV(filteredPatients, `patients_export`);
    setTimeout(() => setIsExporting(false), 500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Patients</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your patient records and details.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={refresh}
            className="p-2 text-slate-500 hover:text-slate-700 bg-white dark:bg-dark-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-dark-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors shadow-sm focus:outline-none"
            title="Refresh Data"
          >
            <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
          
          <button 
            onClick={handleExport}
            disabled={!patients.length || isExporting}
            className="btn-secondary hidden sm:flex"
          >
            <Download className="h-4 w-4 mr-2" />
            {isExporting ? 'Exporting...' : 'Export CSV'}
          </button>
          
          <button className="btn-primary">
            <Plus className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Add Patient</span>
          </button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="card">
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50 dark:bg-dark-800/50">
          <div className="flex-1 max-w-md">
            <SearchBar 
              value={searchTerm} 
              onChange={setSearchTerm} 
              placeholder="Search by name, ID, or mobile..."
            />
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Filter className="h-4 w-4 text-slate-400" />
              </div>
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="block w-full rounded-xl border-0 py-2.5 pl-10 pr-10 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 dark:ring-slate-700 dark:bg-dark-900 dark:text-white transition-all duration-200 cursor-pointer appearance-none bg-white"
              >
                <option value="All">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Unknown">Unknown</option>
              </select>
            </div>

            <div className="flex items-center gap-2 sm:hidden">
              <button 
                onClick={handleExport}
                disabled={!filteredPatients.length || isExporting}
                className="btn-secondary w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Data Area */}
        <div className="min-h-[400px] relative">
          {error ? (
            <div className="p-6">
              <ErrorMessage message={error.message} type={error.type} onRetry={refresh} />
            </div>
          ) : loading && patients.length === 0 ? (
            <Loader fullScreen={false} text="Loading patients..." />
          ) : (
            <>
              <PatientTable 
                patients={filteredPatients} 
                onPatientClick={handlePatientClick}
              />
            </>
          )}
          
          {/* Overlay loader when data is already present but fetching new page */}
          {loading && patients.length > 0 && (
            <div className="absolute inset-0 bg-white/50 dark:bg-dark-900/50 backdrop-blur-sm z-10 flex items-center justify-center">
              <Loader fullScreen={false} text="" />
            </div>
          )}
        </div>
      </div>

      {/* Patient Details Modal */}
      <PatientDetailsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        patient={selectedPatient} 
      />
    </div>
  );
};

export default Patients;
