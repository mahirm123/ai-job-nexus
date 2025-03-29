
import api from './index';

export const getAllJobs = async (params: {
  search?: string;
  location?: string;
  type?: string;
  tags?: string;
  sort?: string;
  page?: number;
  limit?: number;
}) => {
  const response = await api.get('/jobs', { params });
  return response.data;
};

export const getJobById = async (id: string) => {
  const response = await api.get(`/jobs/${id}`);
  return response.data;
};

export const createJob = async (jobData: {
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  salary: string;
  tags: string[];
  type: string;
}) => {
  const response = await api.post('/jobs', jobData);
  return response.data;
};

export const saveJob = async (jobId: string) => {
  const response = await api.post(`/jobs/${jobId}/save`);
  return response.data;
};

export const unsaveJob = async (jobId: string) => {
  const response = await api.delete(`/jobs/${jobId}/save`);
  return response.data;
};
