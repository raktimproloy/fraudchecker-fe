'use client';

import { useState, useEffect } from 'react';
import { useAuthSession } from '../../../hooks/useAuthSession';
import { apiService } from '../../../services/api';
import SuccessMessage from '../../Common/SuccessMessage';
import ReportCard from '../../Common/ReportCard';
import ReportFilters from '../../Common/ReportFilters';
import StatusUpdateModal from '../../Common/StatusUpdateModal';

const MyReports = () => {
  const { user, isAuthenticated } = useAuthSession();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    page: 1,
    limit: 10
  });
  const [refreshing, setRefreshing] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  // Load user reports
  const loadReports = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);
      
      const response = await apiService.getUserReports(filters);
      
      if (response.success) {
        setReports(response.data.reports || []);
        setPagination(response.data.pagination || {
          page: 1,
          limit: 10,
          total: 0,
          pages: 0
        });
      } else {
        setError(response.error || 'Failed to load reports');
      }
    } catch (err) {
      setError('Failed to load reports. Please try again.');
      console.error('Error loading reports:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Refresh reports
  const refreshReports = () => {
    loadReports(true);
  };

  // Update report status
  const updateReportStatus = async (reportId, newStatus) => {
    try {
      setUpdatingStatus(reportId);
      setError(null);
      
      const response = await apiService.updateUserReportStatus(reportId, newStatus);
      
      if (response.success) {
        setSuccessMessage(`Report status updated to ${newStatus.toLowerCase()}`);
        
        // Update the report in the list
        setReports(prevReports => 
          prevReports.map(report => 
            report.report_id === reportId 
              ? { ...report, status: newStatus, updated_at: response.data.updated_at }
              : report
          )
        );
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError(response.error || 'Failed to update report status');
      }
    } catch (err) {
      setError('Failed to update report status. Please try again.');
      console.error('Error updating report status:', err);
    } finally {
      setUpdatingStatus(null);
    }
  };

  // Delete report
  const deleteReport = async (reportId) => {
    if (!window.confirm('Are you sure you want to delete this report? This action cannot be undone.')) {
      return;
    }

    try {
      setUpdatingStatus(reportId);
      setError(null);
      
      const response = await apiService.deleteUserReport(reportId);
      
      if (response.success) {
        setSuccessMessage('Report deleted successfully');
        
        // Remove the report from the list
        setReports(prevReports => 
          prevReports.filter(report => report.report_id !== reportId)
        );
        
        // Update pagination
        setPagination(prev => ({
          ...prev,
          total: prev.total - 1,
          pages: Math.ceil((prev.total - 1) / prev.limit)
        }));
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError(response.error || 'Failed to delete report');
      }
    } catch (err) {
      setError('Failed to delete report. Please try again.');
      console.error('Error deleting report:', err);
    } finally {
      setUpdatingStatus(null);
    }
  };

  // Handle opening modal
  const handleOpenModal = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  // Handle closing modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedReport(null);
  };

  // Handle filter change
  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  // Load reports when filters change
  useEffect(() => {
    if (isAuthenticated) {
      loadReports();
    }
  }, [filters, isAuthenticated]);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Authentication Required</h2>
          <p className="text-gray-300 mb-6">Please log in to view your reports.</p>
          <a 
            href="/login" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">My Reports</h1>
              <p className="text-gray-300">View and manage your submitted fraud reports</p>
            </div>
            <button
              onClick={refreshReports}
              disabled={refreshing || loading}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <svg 
                className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <SuccessMessage 
            message={successMessage} 
            onClose={() => setSuccessMessage('')} 
          />
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900 bg-opacity-20 border border-red-500 border-opacity-30 rounded-lg">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {/* Filters */}
        <ReportFilters 
          filters={filters}
          onFilterChange={handleFilterChange}
          totalReports={pagination.total}
        />

        {/* Reports List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : reports.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No Reports Found</h3>
            <p className="text-gray-400 mb-6">You haven{`'`}t submitted any reports yet.</p>
            <a
              href="/add-fraud"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Submit Your First Report
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {refreshing && (
              <div className="flex justify-center items-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                <span className="ml-2 text-gray-400">Refreshing reports...</span>
              </div>
            )}
            {reports.map((report) => (
              <ReportCard
                key={report.report_id}
                report={report}
                onUpdateStatus={updateReportStatus}
                onDelete={deleteReport}
                isUpdating={updatingStatus === report.report_id}
                onOpenModal={handleOpenModal}
              />
            ))}

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page <= 1 || loading}
                    className="px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  <span className="text-gray-300 px-4">
                    Page {pagination.page} of {pagination.pages}
                  </span>
                  
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page >= pagination.pages || loading}
                    className="px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
                
                <div className="text-sm text-gray-400">
                  Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} reports
                </div>
              </div>
            )}
          </div>
        )}

        {/* Status Update Modal */}
        {showModal && selectedReport && (
          <StatusUpdateModal
            isOpen={showModal}
            onClose={handleCloseModal}
            currentStatus={selectedReport.status}
            onUpdate={updateReportStatus}
            reportId={selectedReport.report_id}
            isUpdating={updatingStatus === selectedReport.report_id}
          />
        )}
      </div>
    </div>
  );
};

export default MyReports;