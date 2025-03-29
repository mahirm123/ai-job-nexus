
import api from './index';

export const submitApplication = async (applicationData: {
  jobId: string;
  resume: string;
  coverLetter?: string;
}) => {
  const response = await api.post('/applications', applicationData);
  return response.data;
};

export const getUserApplications = async () => {
  const response = await api.get('/applications/user');
  return response.data;
};

export const getJobApplications = async (jobId: string) => {
  const response = await api.get(`/applications/job/${jobId}`);
  return response.data;
};

export const updateApplicationStatus = async (
  id: string,
  updateData: {
    status: string;
    notes?: string;
  }
) => {
  const response = await api.put(`/applications/${id}`, updateData);
  return response.data;
};
