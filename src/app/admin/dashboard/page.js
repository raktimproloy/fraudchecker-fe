'use client';

import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '@/components/Layouts/AdminLayout';
import useAdminApi from '@/hooks/useAdminApi';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentReports, setRecentReports] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const adminApi = useAdminApi();

  // Helper functions for new schema
  const getIdentityTypes = (report) => {
    const types = [];
    if (report.email) types.push('EMAIL');
    if (report.phone) types.push('PHONE');
    if (report.facebook_id) types.push('FACEBOOK');
    return types;
  };

  const getIdentityDisplay = (report) => {
    const identities = [];
    if (report.email) identities.push(`Email: ${report.email}`);
    if (report.phone) identities.push(`Phone: ${report.phone}`);
    if (report.facebook_id) identities.push(`Facebook: ${report.facebook_id}`);
    return identities.join(', ');
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

  const fetchDashboardData = useCallback(async () => {
    try {
      const data = await adminApi.getDashboardStats();
      setStats(data.data);
      setRecentReports(data.data.recentReports || []);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Dashboard error:', error);
    }
  }, []);

      // Manual refresh function
      const forceUpdate = useCallback(() => {
        fetchDashboardData();
      }, [fetchDashboardData]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (adminApi.isLoading && !stats) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (adminApi.error && !stats) {
    return (
      <AdminLayout>
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          <p>Error loading dashboard: {adminApi.error}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Overview of your fraud checker system
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

        {/* Stats Grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-bold">👥</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats?.overview?.totalUsers || 0}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-bold">📋</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Reports</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats?.overview?.totalReports || 0}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-bold">⏳</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Pending Reports</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats?.overview?.pendingReports || 0}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✅</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Approved Reports</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats?.overview?.approvedReports || 0}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="mt-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Pending Reports</h3>
              <div className="mt-5">
                {recentReports.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No pending reports</p>
                ) : (
                  <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
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
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {recentReports.map((report) => (
                          <tr key={report.report_id}>
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
                              {report.user?.name || 'Unknown'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(report.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <a
                                href={`/admin/reports/${report.report_id}`}
                                className="text-red-600 hover:text-red-900"
                              >
                                View
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-bold">📊</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <Link
                    href="/admin/reports"
                    className="text-sm font-medium text-gray-900 hover:text-gray-700"
                  >
                    View All Reports
                  </Link>
                  <p className="text-sm text-gray-500">Manage all fraud reports</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-indigo-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-bold">👥</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <a
                    href="/admin/users"
                    className="text-sm font-medium text-gray-900 hover:text-gray-700"
                  >
                    Manage Users
                  </a>
                  <p className="text-sm text-gray-500">View and manage user accounts</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-pink-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-bold">⚙️</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <a
                    href="/admin/settings"
                    className="text-sm font-medium text-gray-900 hover:text-gray-700"
                  >
                    Settings
                  </a>
                  <p className="text-sm text-gray-500">Configure system settings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
