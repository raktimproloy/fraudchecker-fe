// API service layer for all backend calls
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add authorization header if token exists
    if (typeof window !== 'undefined') {
      let token = localStorage.getItem('accessToken');
      
      // Fallback: check user object in localStorage
      if (!token) {
        try {
          const user = localStorage.getItem('user');
          if (user) {
            const userData = JSON.parse(user);
            token = userData.accessToken;
          }
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Public APIs
  async searchFraudRecords(query, searchFields = ['email', 'phone', 'facebook_id']) {
    const params = new URLSearchParams({ query });
    if (searchFields && searchFields.length > 0) {
      params.append('fields', searchFields.join(','));
    }
    
    return this.request(`/api/search?${params.toString()}`);
  }

  async getSiteStats() {
    return this.request('/api/stats');
  }

  async getRecentReports(limit = 10) {
    return this.request(`/api/recent?limit=${limit}`);
  }

  async getPublicReport(reportId) {
    return this.request(`/api/report/${reportId}`);
  }

  async getLanguageContent(language) {
    return this.request(`/api/language/${language}`);
  }

  // Authentication APIs
  async googleAuth(googleData) {
    return this.request('/api/auth/google', {
      method: 'POST',
      body: JSON.stringify(googleData),
    });
  }

  async refreshToken() {
    return this.request('/api/auth/refresh', {
      method: 'POST',
    });
  }

  async logout() {
    return this.request('/api/auth/logout', {
      method: 'POST',
    });
  }

  async adminLogin(credentials) {
    return this.request('/api/auth/admin/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  // User APIs (protected)
  async getUserProfile() {
    return this.request('/api/user/profile');
  }

  async updateUserProfile(profileData) {
    return this.request('/api/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async getUserReports(options = {}) {
    const params = new URLSearchParams();
    if (options.page) params.append('page', options.page);
    if (options.limit) params.append('limit', options.limit);
    if (options.status) params.append('status', options.status);
    
    return this.request(`/api/user/reports?${params.toString()}`);
  }

  async getUserReport(reportId) {
    return this.request(`/api/user/reports/${reportId}`);
  }

  async deleteUserReport(reportId) {
    return this.request(`/api/user/reports/${reportId}`, {
      method: 'DELETE',
    });
  }

  // Update user report status
  async updateUserReportStatus(reportId, status) {
    return this.request(`/api/fraud/reports/${reportId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // Fraud Report APIs
  async submitFraudReport(reportData) {
    return this.request('/api/user/reports', {
      method: 'POST',
      body: JSON.stringify(reportData),
    });
  }

  async uploadReportImages(reportId, formData) {
    let token = null;
    
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('accessToken');
      
      // Fallback: check user object in localStorage
      if (!token) {
        try {
          const user = localStorage.getItem('user');
          if (user) {
            const userData = JSON.parse(user);
            token = userData.accessToken;
          }
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    }
    
    return this.request('/api/user/reports/upload', {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });
  }

  // Admin APIs (protected)
  async getAdminDashboard() {
    return this.request('/api/admin/dashboard');
  }

  async getAllUsers(options = {}) {
    const params = new URLSearchParams();
    if (options.page) params.append('page', options.page);
    if (options.limit) params.append('limit', options.limit);
    if (options.status) params.append('status', options.status);
    if (options.search) params.append('search', options.search);
    if (options.sortBy) params.append('sortBy', options.sortBy);
    if (options.sortOrder) params.append('sortOrder', options.sortOrder);
    
    return this.request(`/api/admin/users?${params.toString()}`);
  }

  async updateUserStatus(userId, status) {
    return this.request(`/api/admin/users/${userId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  async getAllReports(options = {}) {
    const params = new URLSearchParams();
    if (options.page) params.append('page', options.page);
    if (options.limit) params.append('limit', options.limit);
    if (options.status) params.append('status', options.status);
    if (options.identityType) params.append('identityType', options.identityType);
    if (options.dateFrom) params.append('dateFrom', options.dateFrom);
    if (options.dateTo) params.append('dateTo', options.dateTo);
    if (options.sortBy) params.append('sortBy', options.sortBy);
    if (options.sortOrder) params.append('sortOrder', options.sortOrder);
    
    return this.request(`/api/admin/reports?${params.toString()}`);
  }

  async getPendingReports(options = {}) {
    const params = new URLSearchParams();
    if (options.page) params.append('page', options.page);
    if (options.limit) params.append('limit', options.limit);
    
    return this.request(`/api/admin/reports/pending?${params.toString()}`);
  }

  async getReport(reportId) {
    return this.request(`/api/admin/reports/${reportId}`);
  }

  async updateReportStatus(reportId, status, rejectionReason = null) {
    return this.request(`/api/admin/reports/${reportId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, rejectionReason }),
    });
  }

  async getUserStats() {
    return this.request('/api/user/stats');
  }

  async searchUsers(query, options = {}) {
    const params = new URLSearchParams({ query });
    if (options.page) params.append('page', options.page);
    if (options.limit) params.append('limit', options.limit);
    if (options.sortBy) params.append('sortBy', options.sortBy);
    if (options.sortOrder) params.append('sortOrder', options.sortOrder);
    
    return this.request(`/api/user/search?${params.toString()}`);
  }

  async getUserActivity(userId) {
    return this.request(`/api/user/activity/${userId}`);
  }

  async deleteUser(userId) {
    return this.request(`/api/user/users/${userId}`, {
      method: 'DELETE',
    });
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
