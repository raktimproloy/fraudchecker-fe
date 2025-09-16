'use client';

const ReportCard = ({ 
  report, 
  onUpdateStatus, 
  onDelete,
  isUpdating = false,
  onOpenModal 
}) => {
  // Get status badge styling
  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-semibold";
    
    switch (status) {
      case 'PENDING':
        return `${baseClasses} bg-yellow-900 text-yellow-200 border border-yellow-700`;
      case 'APPROVED':
        return `${baseClasses} bg-green-900 text-green-200 border border-green-700`;
      case 'REJECTED':
        return `${baseClasses} bg-red-900 text-red-200 border border-red-700`;
      default:
        return `${baseClasses} bg-gray-700 text-gray-300 border border-gray-600`;
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get identity display text
  const getIdentityDisplay = (report) => {
    const identities = [];
    if (report.email) identities.push(`Email: ${report.email}`);
    if (report.phone) identities.push(`Phone: ${report.phone}`);
    if (report.facebook_id) identities.push(`Facebook: ${report.facebook_id}`);
    return identities.join(', ');
  };

  // Check if status can be updated
  const canUpdateStatus = (status) => {
    return status === 'PENDING' || status === 'REJECTED';
  };

  // Check if report can be deleted
  const canDelete = (status) => {
    return status === 'PENDING' || status === 'REJECTED';
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-white">
              Report #{report.report_id}
            </h3>
            <span className={getStatusBadge(report.status)}>
              {report.status}
            </span>
          </div>
          <p className="text-sm text-gray-400 mb-2">
            Submitted on {formatDate(report.created_at)}
          </p>
          {report.updated_at && report.updated_at !== report.created_at && (
            <p className="text-sm text-gray-400 mb-2">
              Last updated on {formatDate(report.updated_at)}
            </p>
          )}
        </div>
      </div>

      {/* Identities */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-300 mb-2">Reported Identities:</h4>
        <p className="text-white">{getIdentityDisplay(report)}</p>
      </div>

      {/* Description */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-300 mb-2">Description:</h4>
        <p className="text-white">{report.description}</p>
      </div>

      {/* Rejection Reason */}
      {report.rejection_reason && (
        <div className="mb-4 p-3 bg-red-900 bg-opacity-20 border border-red-500 border-opacity-30 rounded-lg">
          <h4 className="text-sm font-medium text-red-200 mb-1">Rejection Reason:</h4>
          <p className="text-red-300">{report.rejection_reason}</p>
        </div>
      )}

      {/* Images Count */}
      {report._count && report._count.report_images > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-400">
            {report._count.report_images} image(s) attached
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex gap-3">
          {canUpdateStatus(report.status) && (
            <button
              onClick={() => onOpenModal(report)}
              disabled={isUpdating}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? 'Updating...' : 'Update Status'}
            </button>
          )}

          {canDelete(report.status) && onDelete && (
            <button
              onClick={() => onDelete(report.report_id)}
              disabled={isUpdating}
              className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? 'Deleting...' : 'Delete Report'}
            </button>
          )}
        </div>

        {report.status === 'APPROVED' && (
          <div className="text-sm text-green-400 font-medium flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            This report has been approved and is now public
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportCard;
