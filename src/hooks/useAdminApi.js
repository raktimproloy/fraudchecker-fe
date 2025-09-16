import { useState, useEffect } from 'react';

const useAdminApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAdminToken = () => {
    return localStorage.getItem('adminAccessToken');
  };

  const makeRequest = async (endpoint, options = {}) => {
    const token = getAdminToken();
    if (!token) {
      throw new Error('Admin not authenticated');
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Dashboard API
  const getDashboardStats = () => makeRequest('/api/admin/dashboard');

  // Reports API
  const getReports = (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return makeRequest(`/api/admin/reports${queryString ? `?${queryString}` : ''}`);
  };

  const getPendingReports = (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return makeRequest(`/api/admin/reports/pending${queryString ? `?${queryString}` : ''}`);
  };

  const getReport = (reportId) => makeRequest(`/api/admin/reports/${reportId}`);

  const updateReportStatus = (reportId, status, rejectionReason = null) => {
    return makeRequest(`/api/admin/reports/${reportId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, rejectionReason }),
    });
  };

  // Users API
  const getUsers = (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return makeRequest(`/api/admin/users${queryString ? `?${queryString}` : ''}`);
  };

  const updateUserStatus = (userId, status) => {
    return makeRequest(`/api/admin/users/${userId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  };

  const getUserStats = () => makeRequest('/api/admin/users/stats');

  const searchUsers = (query, params = {}) => {
    const searchParams = { ...params, query };
    const queryString = new URLSearchParams(searchParams).toString();
    return makeRequest(`/api/admin/users/search${queryString ? `?${queryString}` : ''}`);
  };

  const getUserActivity = (userId) => makeRequest(`/api/admin/users/${userId}/activity`);

  const deleteUser = (userId) => {
    return makeRequest(`/api/admin/users/${userId}`, {
      method: 'DELETE',
    });
  };

  return {
    isLoading,
    error,
    getDashboardStats,
    getReports,
    getPendingReports,
    getReport,
    updateReportStatus,
    getUsers,
    updateUserStatus,
    getUserStats,
    searchUsers,
    getUserActivity,
    deleteUser,
  };
};

export default useAdminApi;
