'use client'
import { useState } from 'react';
import Head from 'next/head';

export default function PendingReports() {
  const [selectedReport, setSelectedReport] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [reports, setReports] = useState([
    {
      id: 'FR-001',
      identity: 'Verified User',
      reporterName: 'John Smith',
      reporterEmail: 'john@example.com',
      reporterPhone: '+1 (555) 123-4567',
      submissionDate: '2023-05-15T14:30:00',
      description: 'This is a detailed description of the fraudulent activity. The user reported suspicious transactions on their account from an unrecognized device. They noticed three transactions totaling $450 that they did not authorize.',
      evidence: ['/placeholder-evidence1.jpg', '/placeholder-evidence2.jpg', '/placeholder-evidence3.jpg'],
      status: 'pending'
    },
    {
      id: 'FR-002',
      identity: 'Anonymous',
      reporterName: 'Jane Doe',
      reporterEmail: 'jane@example.com',
      reporterPhone: '+1 (555) 987-6543',
      submissionDate: '2023-05-16T09:15:00',
      description: 'Another fraudulent activity report with different details. The user claims their identity was stolen and used to open new credit accounts.',
      evidence: ['/placeholder-evidence4.jpg'],
      status: 'pending'
    },
    {
      id: 'FR-003',
      identity: 'Verified Business',
      reporterName: 'Robert Johnson',
      reporterEmail: 'robert@business.com',
      reporterPhone: '+1 (555) 456-7890',
      submissionDate: '2023-05-17T16:45:00',
      description: 'A business account reporting suspicious vendor payments that were not authorized by the accounting department.',
      evidence: ['/placeholder-evidence5.jpg', '/placeholder-evidence6.jpg'],
      status: 'pending'
    }
  ]);

  const openReport = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  const approveReport = (id) => {
    setReports(reports.map(report => 
      report.id === id ? {...report, status: 'approved'} : report
    ));
    setShowModal(false);
  };

  const rejectReport = (id, reason) => {
    // In a real app, you would capture the reason
    setReports(reports.map(report => 
      report.id === id ? {...report, status: 'rejected'} : report
    ));
    setShowModal(false);
  };

  const requestMoreInfo = (id) => {
    // In a real app, you would prompt for information request
    alert(`Request more information for report ${id}`);
    setShowModal(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Pending Fraud Reports</title>
        <meta name="description" content="Manage pending fraud reports" />
      </Head>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pending Fraud Reports</h1>
          <p className="text-lg text-gray-600">Review and manage submitted fraud reports</p>
        </div>

        {/* Reports Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Report ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted Identity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reporter Information
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submission Date/Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reports.filter(r => r.status === 'pending').map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {report.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.identity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{report.reporterName}</div>
                      <div className="text-gray-400">{report.reporterEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(report.submissionDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => openReport(report)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        View
                      </button>
                      <button
                        onClick={() => approveReport(report.id)}
                        className="text-green-600 hover:text-green-900 mr-3"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectReport(report.id, 'No reason provided')}
                        className="text-red-600 hover:text-red-900"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty state */}
        {reports.filter(r => r.status === 'pending').length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🎉</div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No pending reports</h3>
            <p className="text-gray-500">All reports have been processed.</p>
          </div>
        )}
      </div>

      {/* Detailed Review Modal */}
      {showModal && selectedReport && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setShowModal(false)}></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Fraud Report: {selectedReport.id}
                    </h3>
                    
                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-2">Reporter Information</h4>
                        <div className="bg-gray-50 p-4 rounded-md">
                          <p><span className="font-medium">Name:</span> {selectedReport.reporterName}</p>
                          <p><span className="font-medium">Email:</span> {selectedReport.reporterEmail}</p>
                          <p><span className="font-medium">Phone:</span> {selectedReport.reporterPhone}</p>
                          <p><span className="font-medium">Identity:</span> {selectedReport.identity}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-md font-medium text-gray-900 mb-2">Submission Details</h4>
                        <div className="bg-gray-50 p-4 rounded-md">
                          <p><span className="font-medium">Date/Time:</span> {formatDate(selectedReport.submissionDate)}</p>
                          <p><span className="font-medium">Status:</span> <span className="capitalize">{selectedReport.status}</span></p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-md font-medium text-gray-900 mb-2">Fraud Description</h4>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="whitespace-pre-line">{selectedReport.description}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-md font-medium text-gray-900 mb-2">Evidence</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                        {selectedReport.evidence.map((img, index) => (
                          <div key={index} className="border rounded-md overflow-hidden">
                            {/* In a real app, you would use next/image */}
                            <div className="bg-gray-200 h-40 flex items-center justify-center">
                              <span className="text-gray-500">Evidence {index + 1}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => approveReport(selectedReport.id)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Approve Report
                </button>
                <button
                  type="button"
                  onClick={() => rejectReport(selectedReport.id, 'No reason provided')}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Reject Report
                </button>
                <button
                  type="button"
                  onClick={() => requestMoreInfo(selectedReport.id)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Request More Info
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}