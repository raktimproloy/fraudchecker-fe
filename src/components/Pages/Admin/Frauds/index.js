'use client'
import { useState } from 'react';
import Head from 'next/head';

export default function FraudRecordsManagement() {
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [expandedRecord, setExpandedRecord] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock fraud records data
  const fraudRecords = [
    {
      id: 'FR-001',
      identity: 'john.doe@example.com',
      identityType: 'email',
      submissionDate: '2023-10-15',
      status: 'active',
      description: 'This email was used in a phishing scheme targeting bank customers. The scam attempted to gather login credentials through a fake security alert.',
      evidence: ['/phishing-email.png', '/fake-login-page.png'],
      reporter: 'USR-001'
    },
    {
      id: 'FR-002',
      identity: '+1 (555) 123-4567',
      identityType: 'phone',
      submissionDate: '2023-10-12',
      status: 'pending',
      description: 'This phone number has been reported for making fraudulent calls claiming to be from the IRS and demanding immediate payment.',
      evidence: ['/call-log.png'],
      reporter: 'USR-002'
    },
    {
      id: 'FR-003',
      identity: 'facebook.com/jane.smith.fake',
      identityType: 'facebook',
      submissionDate: '2023-10-08',
      status: 'rejected',
      description: 'Profile was reported for impersonating a public figure and soliciting donations for a fake charity.',
      evidence: ['/fake-profile-1.jpg', '/fake-profile-2.jpg'],
      reporter: 'USR-003'
    },
    {
      id: 'FR-004',
      identity: 'support@amazon-security.com',
      identityType: 'email',
      submissionDate: '2023-10-05',
      status: 'active',
      description: 'Fake Amazon security email requesting account verification and payment information.',
      evidence: ['/amazon-phishing.png'],
      reporter: 'USR-004'
    },
    {
      id: 'FR-005',
      identity: '+1 (555) 987-6543',
      identityType: 'phone',
      submissionDate: '2023-10-01',
      status: 'pending',
      description: 'Reported for tech support scam claiming the user\'s computer is infected with viruses.',
      evidence: ['/tech-support-call.png'],
      reporter: 'USR-005'
    },
  ];

  // Filter records based on search and status
  const filteredRecords = fraudRecords.filter(record => {
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    const matchesSearch = searchQuery === '' || 
      record.identity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const toggleRecordSelection = (recordId) => {
    if (selectedRecords.includes(recordId)) {
      setSelectedRecords(selectedRecords.filter(id => id !== recordId));
    } else {
      setSelectedRecords([...selectedRecords, recordId]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedRecords.length === filteredRecords.length) {
      setSelectedRecords([]);
    } else {
      setSelectedRecords(filteredRecords.map(record => record.id));
    }
  };

  const updateRecordStatus = (recordId, newStatus) => {
    // In a real application, this would make an API call to update the record status
    alert(`Updating record ${recordId} to status: ${newStatus}`);
  };

  const bulkUpdateStatus = (newStatus) => {
    if (selectedRecords.length === 0) {
      alert('Please select at least one record to update');
      return;
    }
    
    // In a real application, this would make an API call to update multiple records
    alert(`Updating ${selectedRecords.length} records to status: ${newStatus}`);
  };

  const toggleExpandRecord = (recordId) => {
    if (expandedRecord === recordId) {
      setExpandedRecord(null);
    } else {
      setExpandedRecord(recordId);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getIdentityIcon = (type) => {
    switch (type) {
      case 'email':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'phone':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        );
      case 'facebook':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Fraud Records Management - FraudShield</title>
        <meta name="description" content="Manage and review fraud reports" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Fraud Records Management</h1>
        
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search Records
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="search"
                  placeholder="Search by ID or identity"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* Status Filter */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Status
              </label>
              <select
                id="status"
                className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            
            {/* Bulk Actions */}
            <div>
              <label htmlFor="bulk-actions" className="block text-sm font-medium text-gray-700 mb-1">
                Bulk Actions
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => bulkUpdateStatus('active')}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Approve Selected
                </button>
                <button
                  onClick={() => bulkUpdateStatus('rejected')}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Reject Selected
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Records Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      checked={selectedRecords.length === filteredRecords.length && filteredRecords.length > 0}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Record ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reported Identity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submission Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record) => (
                    <>
                      <tr key={record.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                            checked={selectedRecords.includes(record.id)}
                            onChange={() => toggleRecordSelection(record.id)}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {record.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            {getIdentityIcon(record.identityType)}
                            <span className="ml-2">{record.identity}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {record.submissionDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(record.status)}`}>
                            {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => toggleExpandRecord(record.id)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              {expandedRecord === record.id ? 'Hide Details' : 'View Details'}
                            </button>
                            {record.status !== 'active' && (
                              <button 
                                onClick={() => updateRecordStatus(record.id, 'active')}
                                className="text-green-600 hover:text-green-900"
                              >
                                Approve
                              </button>
                            )}
                            {record.status !== 'rejected' && (
                              <button 
                                onClick={() => updateRecordStatus(record.id, 'rejected')}
                                className="text-red-600 hover:text-red-900"
                              >
                                Reject
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                      {expandedRecord === record.id && (
                        <tr>
                          <td colSpan="6" className="px-6 py-4 bg-gray-50">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="md:col-span-2">
                                <h4 className="font-medium text-gray-700 mb-2">Report Description</h4>
                                <p className="text-sm text-gray-600">{record.description}</p>
                                <div className="mt-4">
                                  <h4 className="font-medium text-gray-700 mb-2">Evidence</h4>
                                  <div className="flex space-x-2">
                                    {record.evidence.map((evidence, index) => (
                                      <div key={index} className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center">
                                        <span className="text-xs text-gray-500">Evidence {index + 1}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-700 mb-2">Report Information</h4>
                                <div className="text-sm text-gray-600 space-y-1">
                                  <p>Reporter: {record.reporter}</p>
                                  <p>Type: {record.identityType}</p>
                                  <p>Submitted: {record.submissionDate}</p>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                      No fraud records found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredRecords.length}</span> of{' '}
                  <span className="font-medium">{filteredRecords.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    1
                  </a>
                  <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}