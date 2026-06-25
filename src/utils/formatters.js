import { format, parseISO } from 'date-fns';

export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    // Check if it's already a valid date or parseable
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return format(date, 'MMM dd, yyyy');
  } catch (error) {
    return dateString;
  }
};

export const formatPhoneNumber = (phone) => {
  if (!phone) return 'N/A';
  // Simple format, can be extended based on requirements
  return phone;
};

export const formatAge = (dobString) => {
  if (!dobString) return 'N/A';
  try {
    const dob = new Date(dobString);
    const diff_ms = Date.now() - dob.getTime();
    const age_dt = new Date(diff_ms); 
  
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  } catch (error) {
    return 'N/A';
  }
};
