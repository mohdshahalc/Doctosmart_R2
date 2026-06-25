import { useState, useEffect, useCallback } from 'react';
import { patientService } from '../services/patientService';

export const usePatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPatients = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await patientService.getPatients();
      
      // The API returns the list inside data.result
      const patientList = Array.isArray(data) ? data : (data.result || data.data || data.patients || []);
      
      setPatients(patientList);
    } catch (err) {
      setError(err.message || 'Failed to fetch patients. Please try again later.');
      console.error('Error fetching patients:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch data on mount
  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const refresh = () => {
    fetchPatients();
  };

  return {
    patients,
    loading,
    error,
    refresh
  };
};
