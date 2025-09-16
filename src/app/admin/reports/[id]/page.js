'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AdminLayout from '@/components/Layouts/AdminLayout';
import useAdminApi from '@/hooks/useAdminApi';

export default function ReportDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [error, setError] = useState(null);
  const reportId = params.id;
  const [report, setReport] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const adminApi = useAdminApi();

  const fetchReport = useCallback(async () => {
    try {
      const data = await adminApi.getReport(reportId);
      setReport(data.data);
    } catch (error) {
      console.error('Error fetching report:', error);
    }
  }, [reportId]);

  useEffect(() => {
    if (reportId) {
      fetchReport();
    }
  }, [fetchReport, reportId]);

  const handleStatusUpdate = async (status, rejectionReason = null) => {
    try {
      setIsProcessing(true);
      await adminApi.updateReportStatus(reportId, status, rejectionReason);
      // Refresh the report data
      await fetchReport();
      // Show success message
      alert(`Report ${status.toLowerCase()} successfully!`);
    } catch (error) {
      console.error('Error updating report status:', error);
      alert(`Failed to update report: ${error.message}`);
    } finally {
      setIsProcessing(false);
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

  if (adminApi.isLoading && !report) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading report...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (adminApi.error && !report) {
    return (
      <AdminLayout>
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          <p>Error loading report: {adminApi.error}</p>
        </div>
      </AdminLayout>
    );
  }

  if (!report) {
    return (
      <AdminLayout>
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-600 px-4 py-3 rounded-md">
          <p>Report not found</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Report #{report.report_id}</h1>
            <p className="mt-1 text-sm text-gray-500">
              Submitted on {new Date(report.created_at).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {getStatusBadge(report.status)}
            <button
              onClick={() => router.back()}
              className="px-4 py-2 text-sm bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Back to Reports
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Report Details */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Report Details</h3>
              </div>
              <div className="px-6 py-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Identity Types</label>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {getIdentityTypes(report).map(type => (
                      <span key={type}>
                        {getTypeBadge(type)}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Reported Identities</label>
                  <div className="mt-1 space-y-2">
                    {report.email && (
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-2">Email:</span>
                        <p className="text-sm text-gray-900 font-mono break-all">{report.email}</p>
                      </div>
                    )}
                    {report.phone && (
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-2">Phone:</span>
                        <p className="text-sm text-gray-900 font-mono break-all">{report.phone}</p>
                      </div>
                    )}
                    {report.facebook_id && (
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-2">Facebook:</span>
                        <p className="text-sm text-gray-900 font-mono break-all">{report.facebook_id}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-900 whitespace-pre-wrap">{report.description}</p>
                  </div>
                </div>

                {report.rejection_reason && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Rejection Reason</label>
                    <div className="mt-1 p-3 bg-red-50 rounded-md">
                      <p className="text-sm text-red-900">{report.rejection_reason}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Images */}
            {report.report_images && report.report_images.length > 0 && (
              <div className="mt-6 bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Attached Images</h3>
                </div>
                <div className="px-6 py-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {report.report_images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/images/${image.image_filename}`}
                          alt={`Report image ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src = '/placeholder-image.png';
                          }}
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 rounded-b-lg">
                          {image.image_filename}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Reporter Info */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Reporter Information</h3>
              </div>
              <div className="px-6 py-4 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="mt-1 text-sm text-gray-900">{report.user?.name || 'Unknown'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-sm text-gray-900">{report.user?.email || 'Unknown'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Report Count</label>
                  <p className="mt-1 text-sm text-gray-900">{report.user?._count?.fraud_reports || 0}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            {report.status === 'PENDING' && (
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Actions</h3>
                </div>
                <div className="px-6 py-4 space-y-3">
                  <button
                    onClick={() => handleStatusUpdate('APPROVED')}
                    disabled={isProcessing}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                  >
                    {isProcessing ? 'Processing...' : 'Approve Report'}
                  </button>
                  <button
                    onClick={() => {
                      const reason = prompt('Enter rejection reason:');
                      if (reason && reason.trim()) {
                        handleStatusUpdate('REJECTED', reason.trim());
                      }
                    }}
                    disabled={isProcessing}
                    className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                  >
                    {isProcessing ? 'Processing...' : 'Reject Report'}
                  </button>
                </div>
              </div>
            )}

            {/* Report Status Info */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Status Information</h3>
              </div>
              <div className="px-6 py-4 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Status</label>
                  <div className="mt-1">
                    {getStatusBadge(report.status)}
                  </div>
                </div>
                {report.approved_at && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Processed Date</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(report.approved_at).toLocaleDateString()}
                    </p>
                  </div>
                )}
                {report.admin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Processed By</label>
                    <p className="mt-1 text-sm text-gray-900">{report.admin.username}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
