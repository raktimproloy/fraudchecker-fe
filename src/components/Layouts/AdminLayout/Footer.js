'use client';

import React from 'react';

const AdminFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Admin Info */}
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-400">Admin Panel</h3>
              <p className="text-sm text-gray-400">FraudChecker Management System</p>
            </div>
          </div>

          {/* System Status */}
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-300">System Online</span>
            </div>
            <div className="text-gray-400">
              Last updated: {new Date().toLocaleString()}
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right mt-4 md:mt-0">
            <p className="text-sm text-gray-400">
              © {currentYear} FraudChecker Admin Panel
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Restricted Access - Authorized Personnel Only
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-gray-800 rounded-lg p-3">
              <div className="text-2xl font-bold text-blue-400">1,234</div>
              <div className="text-xs text-gray-400">Total Reports</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-3">
              <div className="text-2xl font-bold text-green-400">89</div>
              <div className="text-xs text-gray-400">Verified Today</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-3">
              <div className="text-2xl font-bold text-yellow-400">23</div>
              <div className="text-xs text-gray-400">Pending Review</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-3">
              <div className="text-2xl font-bold text-red-400">567</div>
              <div className="text-xs text-gray-400">Active Users</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
