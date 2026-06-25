import api from './api';

export const patientService = {
  getPatients: async () => {
    const params = {
      user_id: 1,
      clinic_id: 1,
      page_no: 0
    };

    const response = await api.get('/patients', { params });
    return response.data;
  }
};
