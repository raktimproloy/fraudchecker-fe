'use client';

import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '@/components/Layouts/AdminLayout';
import useAdminApi from '@/hooks/useAdminApi';

export default function AdminReports() {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    identityType: '',
    page: 1,
    limit: 10
  });
  const adminApi = useAdminApi();

  const fetchReports = useCallback(async () => {
    try {
      const data = await adminApi.getReports(filters);
      setReports(data.data.reports);
      setPagination(data.data.pagination);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Reports error:', error);
    }
  }, [filters]);

      // Manual refresh function
      const forceUpdate = useCallback(() => {
        fetchReports();
      }, [fetchReports]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filtering
    }));
  };

  const handlePageChange = (page) => {
    setFilters(prev => ({
      ...prev,
      page
    }));
  };

      const handleReportAction = async (reportId, action, rejectionReason = null) => {
        try {
          await adminApi.updateReportStatus(reportId, action, rejectionReason);
          // Refresh the reports after action
          fetchReports();
          // Show success message
          alert(`Report ${action.toLowerCase()}d successfully!`);
        } catch (error) {
          console.error('Error updating report:', error);
          alert(`Failed to ${action.toLowerCase()} report: ${error.message}`);
        }
      };

  const getStatusBadge = (status) => {
    const statusConfig = {
      PENDING: { color: 'bg-yellow-100 text-yellow-800', text: 'Pending' },
      APPROVED: { color: 'bg-green-100 text-green-800', text: 'Approved' },
      REJECTED: { color: 'bg-red-100 text-red-800', text: 'Rejected' }
    };
    
    const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', text: status };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const getIdentityDisplay = (report) => {
    const identities = [];
    if (report.email) identities.push(`Email: ${report.email}`);
    if (report.phone) identities.push(`Phone: ${report.phone}`);
    if (report.facebook_id) identities.push(`Facebook: ${report.facebook_id}`);
    return identities.join(', ');
  };

  const getIdentityTypes = (report) => {
    const types = [];
    if (report.email) types.push('EMAIL');
    if (report.phone) types.push('PHONE');
    if (report.facebook_id) types.push('FACEBOOK');
    return types;
  };

  const getTypeBadge = (type) => {
    const typeConfig = {
      PHONE: { color: 'bg-blue-100 text-blue-800', text: 'Phone' },
      EMAIL: { color: 'bg-purple-100 text-purple-800', text: 'Email' },
      FACEBOOK: { color: 'bg-indigo-100 text-indigo-800', text: 'Facebook' }
    };
    
    const config = typeConfig[type] || { color: 'bg-gray-100 text-gray-800', text: type };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    );
  };

  if (adminApi.isLoading && reports.length === 0) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading reports...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-bold text-gray-900">Fraud Reports</h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage and review all fraud reports submitted by users.
            </p>
          </div>
              <div className="flex items-center space-x-4">
                {lastUpdated && (
                  <p className="text-sm text-gray-500">
                    Last updated: {lastUpdated.toLocaleTimeString()}
                  </p>
                )}
                <button
                  onClick={forceUpdate}
                  disabled={adminApi.isLoading}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {adminApi.isLoading ? 'Updating...' : 'Refresh'}
                </button>
              </div>
        </div>

        {/* Filters */}
        <div className="mt-6 bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
              >
                <option value="">All Statuses</option>
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>

            <div>
              <label htmlFor="identityType" className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <select
                id="identityType"
                value={filters.identityType}
                onChange={(e) => handleFilterChange('identityType', e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
              >
                <option value="">All Types</option>
                <option value="PHONE">Phone</option>
                <option value="EMAIL">Email</option>
                <option value="FACEBOOK">Facebook</option>
              </select>
            </div>

            <div>
              <label htmlFor="limit" className="block text-sm font-medium text-gray-700">
                Per Page
              </label>
              <select
                id="limit"
                value={filters.limit}
                onChange={(e) => handleFilterChange('limit', parseInt(e.target.value))}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Report ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Identity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reporter
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reports.map((report) => (
                      <tr key={report.report_id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{report.report_id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex flex-wrap gap-1">
                            {getIdentityTypes(report).map(type => (
                              <span key={type}>
                                {getTypeBadge(type)}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                          <div className="truncate" title={getIdentityDisplay(report)}>
                            {getIdentityDisplay(report)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{report.user?.name || 'Unknown'}</div>
                            <div className="text-sm text-gray-500">{report.user?.email || ''}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {getStatusBadge(report.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(report.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <a
                            href={`/admin/reports/${report.report_id}`}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            View
                          </a>
                          {report.status === 'PENDING' && (
                            <>
                              <button 
                                onClick={() => handleReportAction(report.report_id, 'APPROVED')}
                                className="text-green-600 hover:text-green-900 mr-2"
                              >
                                Approve
                              </button>
                              <button 
                                onClick={() => {
                                  const reason = prompt('Enter rejection reason (optional):');
                                  if (reason !== null) {
                                    handleReportAction(report.report_id, 'REJECTED', reason);
                                  }
                                }}
                                className="text-red-600 hover:text-red-900"
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page <= 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page >= pagination.pages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{' '}
                  <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span>
                  {' '}to{' '}
                  <span className="font-medium">
                    {Math.min(pagination.page * pagination.limit, pagination.total)}
                  </span>
                  {' '}of{' '}
                  <span className="font-medium">{pagination.total}</span>
                  {' '}results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        page === pagination.page
                          ? 'z-10 bg-red-50 border-red-500 text-red-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            <p>Error loading reports: {error}</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
