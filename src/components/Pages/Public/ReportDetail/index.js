'use client'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import apiService from '@/services/api'
import { useApiState } from '@/hooks/useApi'

export default function ReportDetail({ reportId }) {
  const router = useRouter()
  const { data: report, loading, error, execute: loadReport } = useApiState()
  const [selectedImage, setSelectedImage] = useState(null)
  const [showImageModal, setShowImageModal] = useState(false)

  useEffect(() => {
    if (reportId) {
      loadReport(() => apiService.getPublicReport(reportId))
    }
  }, [reportId, loadReport])

  const openImageModal = (image) => {
    setSelectedImage(image)
    setShowImageModal(true)
  }

  const closeImageModal = () => {
    setShowImageModal(false)
    setSelectedImage(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading report details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Report Not Found</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  if (!report || !report.data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-300">No report data available</p>
        </div>
      </div>
    )
  }

  const reportData = report.data

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Head>
        <title>Report Details - FraudShield</title>
        <meta name="description" content="View detailed fraud report information" />
      </Head>

      {/* Header */}
      <div className="bg-gray-800 shadow-sm border-b border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Fraud Report Details</h1>
              <p className="text-gray-300">Report ID: #{reportData.report_id}</p>
            </div>
            <button
              onClick={() => router.back()}
              className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Report Card */}
          <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-700">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    {reportData.identity_type}: {reportData.identity_value}
                  </h2>
                  <p className="text-blue-100">
                    Reported by {reportData.user?.name || 'Anonymous'} on{' '}
                    {new Date(reportData.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    reportData.status === 'APPROVED' 
                      ? 'bg-green-900 text-green-300' 
                      : reportData.status === 'REJECTED'
                      ? 'bg-red-900 text-red-300'
                      : 'bg-yellow-900 text-yellow-300'
                  }`}>
                    {reportData.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <p className="text-gray-300 leading-relaxed">{reportData.description}</p>
                </div>
              </div>

              {/* Report Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-2">Reported Identities</h4>
                  <div className="space-y-2">
                    {reportData.email && (
                      <div className="flex items-center">
                        <span className="text-sm text-gray-400 mr-2">Email:</span>
                        <p className="text-lg text-white font-mono break-all">{reportData.email}</p>
                      </div>
                    )}
                    {reportData.phone && (
                      <div className="flex items-center">
                        <span className="text-sm text-gray-400 mr-2">Phone:</span>
                        <p className="text-lg text-white font-mono break-all">{reportData.phone}</p>
                      </div>
                    )}
                    {reportData.facebook_id && (
                      <div className="flex items-center">
                        <span className="text-sm text-gray-400 mr-2">Facebook:</span>
                        <p className="text-lg text-white font-mono break-all">{reportData.facebook_id}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-2">Report Date</h4>
                  <p className="text-lg text-white">
                    {new Date(reportData.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-2">Status</h4>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    reportData.status === 'APPROVED' 
                      ? 'bg-green-900 text-green-300' 
                      : reportData.status === 'REJECTED'
                      ? 'bg-red-900 text-red-300'
                      : 'bg-yellow-900 text-yellow-300'
                  }`}>
                    {reportData.status}
                  </span>
                </div>
              </div>

              {/* Admin Review Info */}
              {reportData.status !== 'PENDING' && reportData.admin && (
                <div className="border-t border-gray-600 pt-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Review Information</h4>
                  <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Reviewed by</p>
                        <p className="font-medium text-white">{reportData.admin.username}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Review Date</p>
                        <p className="font-medium text-white">
                          {reportData.approved_at 
                            ? new Date(reportData.approved_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })
                            : 'N/A'
                          }
                        </p>
                      </div>
                    </div>
                    {reportData.rejection_reason && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-400">Rejection Reason</p>
                        <p className="text-gray-300 mt-1">{reportData.rejection_reason}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Images */}
              {reportData.report_images && reportData.report_images.length > 0 && (
                <div className="border-t border-gray-600 pt-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Supporting Evidence</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {reportData.report_images.map((image, index) => (
                      <div key={index} className="aspect-square bg-gray-700 rounded-lg overflow-hidden cursor-pointer group relative border border-gray-600" onClick={() => openImageModal(image)}>
                        <img
                          src={`http://localhost:5000/uploads/images/${image.image_filename}`}
                          alt={`Evidence ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          onError={(e) => {
                            e.target.src = '/placeholder-image.png';
                          }}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/add-fraud')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Report Similar Fraud
            </button>
            <button
              onClick={() => router.push('/')}
              className="bg-gray-700 text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Search More Reports
            </button>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4" onClick={closeImageModal}>
          <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeImageModal}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={`http://localhost:5000/uploads/images/${selectedImage.image_filename}`}
              alt="Evidence"
              className="max-w-full max-h-full object-contain rounded-lg border border-gray-600"
              onError={(e) => {
                e.target.src = '/placeholder-image.png';
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
