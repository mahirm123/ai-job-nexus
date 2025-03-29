
import api from './index';

export const getAllCompanies = async (params?: {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}) => {
  const response = await api.get('/companies', { params });
  return response.data;
};

export const getCompanyById = async (id: string) => {
  const response = await api.get(`/companies/${id}`);
  return response.data;
};

export const createCompany = async (companyData: {
  name: string;
  description?: string;
  logo?: string;
  website?: string;
  location?: string;
}) => {
  const response = await api.post('/companies', companyData);
  return response.data;
};

export const updateCompany = async (id: string, companyData: {
  name?: string;
  description?: string;
  logo?: string;
  website?: string;
  location?: string;
  status?: string;
}) => {
  const response = await api.put(`/companies/${id}`, companyData);
  return response.data;
};

export const deleteCompany = async (id: string) => {
  const response = await api.delete(`/companies/${id}`);
  return response.data;
};

export const verifyCompany = async (id: string) => {
  const response = await api.put(`/companies/${id}/verify`);
  return response.data;
};
