'use client';

import { useState } from 'react';

const StatusUpdateModal = ({ 
  isOpen, 
  onClose, 
  currentStatus, 
  onUpdate, 
  reportId, 
  isUpdating = false 
}) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedStatus !== currentStatus) {
      onUpdate(reportId, selectedStatus);
    }
    onClose();
  };

  const handleClose = () => {
    setSelectedStatus(currentStatus);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-semibold text-white mb-4">
          Update Report Status
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Current Status: 
              <span className={`ml-2 px-2 py-1 rounded text-xs ${
                currentStatus === 'PENDING' ? 'bg-yellow-900 text-yellow-200' :
                currentStatus === 'APPROVED' ? 'bg-green-900 text-green-200' :
                'bg-red-900 text-red-200'
              }`}>
                {currentStatus}
              </span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              New Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isUpdating}
            >
              <option value="PENDING">Pending</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isUpdating}
              className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition duration-300 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating || selectedStatus === currentStatus}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? 'Updating...' : 'Update Status'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StatusUpdateModal;
