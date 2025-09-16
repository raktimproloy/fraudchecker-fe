'use client';

const ReportFilters = ({ 
  filters, 
  onFilterChange, 
  totalReports = 0 
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Filters</h3>
          <p className="text-sm text-gray-400">
            {totalReports} report{totalReports !== 1 ? 's' : ''} found
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => onFilterChange({ status: e.target.value })}
              className="px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Reports</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportFilters;
