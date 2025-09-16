"use client";
import { useState, useEffect } from 'react';
import Head from 'next/head';
import apiService from '@/services/api';
import { useApiState } from '@/hooks/useApi';
import ImageZoomModal from '@/components/Common/ImageZoomModal';
import Link from 'next/link';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [expandedCases, setExpandedCases] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);

  // API hooks for site stats and recent reports
  const { data: siteStats, loading: statsLoading, execute: loadStats } = useApiState();
  const { data: recentReports, loading: reportsLoading, execute: loadRecentReports } = useApiState();

  // Load initial data
  // useEffect(() => {
  //   loadStats(() => apiService.getSiteStats());
  //   loadRecentReports(() => apiService.getRecentReports(5));
  // }, [loadStats, loadRecentReports]);

  // Helper function to detect search type based on input
  const detectSearchType = (query) => {
    const trimmedQuery = query.trim().toLowerCase();
    
    // Check if it's a phone number (contains only digits, +, -, spaces, parentheses)
    if (/^[\+]?[\d\s\-\(\)]+$/.test(trimmedQuery)) {
      return ['phone'];
    }
    
    // Check if it's an email (contains @ and .)
    if (trimmedQuery.includes('@') && trimmedQuery.includes('.')) {
      return ['email'];
    }
    
    // Check if it's a Facebook profile (contains facebook.com or fb.com)
    if (trimmedQuery.includes('facebook.com') || trimmedQuery.includes('fb.com')) {
      return ['facebook_id'];
    }
    
    // Default to searching all fields
    return ['email', 'phone', 'facebook_id'];
  };

  // Helper function to get relevant identity information based on search type
  const getRelevantIdentityInfo = (report, searchType) => {
    const relevantInfo = [];
    
    // Show only the identity that matches the search type
    if (searchType.includes('email') && report.email) {
      relevantInfo.push(`Email: ${report.email}`);
    }
    if (searchType.includes('phone') && report.phone) {
      relevantInfo.push(`Phone: ${report.phone}`);
    }
    if (searchType.includes('facebook_id') && report.facebook_id) {
      relevantInfo.push(`Facebook: ${report.facebook_id}`);
    }
    
    return relevantInfo.join(', ');
  };

  // Helper function to check if search query matches the displayed identity
  const isSearchMatch = (report, searchType, query) => {
    const trimmedQuery = query.trim().toLowerCase();
    
    if (searchType.includes('email') && report.email && report.email.toLowerCase().includes(trimmedQuery)) {
      return true;
    }
    if (searchType.includes('phone') && report.phone && report.phone.toLowerCase().includes(trimmedQuery)) {
      return true;
    }
    if (searchType.includes('facebook_id') && report.facebook_id && report.facebook_id.toLowerCase().includes(trimmedQuery)) {
      return true;
    }
    
    return false;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      setSearchLoading(true);
      setSearchError(null);
      
      // Automatically detect search type based on input
      const searchType = detectSearchType(searchQuery);
      const results = await apiService.searchFraudRecords(searchQuery, searchType);
      setSearchResults(results);
      setExpandedCases([]);
    } catch (error) {
      setSearchError(error.message);
      setSearchResults(null);
    } finally {
      setSearchLoading(false);
    }
  };

  const toggleCase = (id) => {
    if (expandedCases.includes(id)) {
      setExpandedCases(expandedCases.filter(caseId => caseId !== id));
    } else {
      setExpandedCases([...expandedCases, id]);
    }
  };

  const openImageModal = (image, allImages = [], currentIndex = 0) => {
    setSelectedImage({
      ...image,
      allImages,
      currentIndex
    });
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setSelectedImage(null);
  };

  const goToPreviousImage = () => {
    if (selectedImage && selectedImage.allImages && selectedImage.currentIndex > 0) {
      const newIndex = selectedImage.currentIndex - 1;
      setSelectedImage({
        ...selectedImage.allImages[newIndex],
        allImages: selectedImage.allImages,
        currentIndex: newIndex
      });
    }
  };

  const goToNextImage = () => {
    if (selectedImage && selectedImage.allImages && selectedImage.currentIndex < selectedImage.allImages.length - 1) {
      const newIndex = selectedImage.currentIndex + 1;
      setSelectedImage({
        ...selectedImage.allImages[newIndex],
        allImages: selectedImage.allImages,
        currentIndex: newIndex
      });
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Head>
        <title>FraudShield - Protect Yourself from Scams</title>
        <meta name="description" content="Identify and report fraudulent activities to protect yourself and others" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-12 md:py-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">আপনি সতর্ক থাকুন <span className="text-blue-400">প্রতারণা বন্ধ করুন</span></h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          আপনি যদি কারো প্রতারণার শিকার হয়ে থাকেন — এখানে আপনার অভিজ্ঞতা, ছবি/স্ক্রিনশট এবং সংশ্লিষ্ট নম্বর/ইমেইল/ফেসবুক আইডি দিন। আমাদের অ্যাডমিন প্রমাণ দেখে নিশ্চিত হলে পোস্ট পাবলিশ হবে এবং সার্চে দেখা যাবে — যাতে অন্যরা সতর্ক থাকতে পারে।
          </p>
          <Link href="/join-now" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300">
            Get Started Now
          </Link>
        </section>

        {/* Search Section */}
        <section className="bg-gray-800 rounded-xl shadow-lg p-6 mb-12 max-w-4xl mx-auto border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Check for Fraud Reports</h2>
          
          <form onSubmit={handleSearch} className="space-y-6">
            
            {/* Search input and button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Enter email, phone, or Facebook profile to search"
                className="flex-grow px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={searchLoading}
              />
              <button
                type="submit"
                disabled={searchLoading || !searchQuery.trim()}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {searchLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </>
                ) : (
                  'Search Records'
                )}
              </button>
            </div>

            {/* Error message */}
            {searchError && (
              <div className="bg-red-900 border border-red-700 rounded-lg p-4">
                <p className="text-red-300 text-sm">{searchError}</p>
              </div>
            )}
          </form>
        </section>

        {/* Search Results */}
        {searchResults && (
          <section className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Search Results</h2>
            
            {searchResults.data && searchResults.data.reports && searchResults.data.reports.length > 0 ? (() => {
              const searchType = detectSearchType(searchQuery);
              const filteredReports = searchResults.data.reports.filter(report => isSearchMatch(report, searchType, searchQuery));
              return filteredReports.length > 0 ? (
                <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
                  <div className="p-6 border-b border-gray-600">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div>
                        <h3 className="text-xl font-semibold text-white">Search Query: {searchQuery}</h3>
                        <p className="text-gray-300">{filteredReports.length} fraud reports found</p>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <p className="text-sm text-gray-300">Searching in: {searchType.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="divide-y divide-gray-600">
                    {filteredReports.map((report) => (
                    <div key={report.report_id} className="p-6">
                      <div 
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleCase(report.report_id)}
                      >
                        <div>
                          <h4 className="font-medium text-white">
                            {getRelevantIdentityInfo(report, searchType)}
                          </h4>
                          <p className="text-sm text-gray-300">
                            Reported on {new Date(report.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <span className="text-blue-400">
                          {expandedCases.includes(report.report_id) ? 'Hide Details' : 'Show Details'}
                        </span>
                      </div>
                      
                      {expandedCases.includes(report.report_id) && (
                        <div className="mt-4 pl-2 border-l-4 border-blue-500">
                          <p className="text-gray-300 mb-4">{report.description}</p>
                          <p className="text-sm text-gray-400 mb-4">
                            Date of incident: {new Date(report.created_at).toLocaleDateString()}
                          </p>
                          
                          {/* Images */}
                          {report.report_images && report.report_images.length > 0 && (
                            <div className="mt-4">
                              <h5 className="text-sm font-medium text-white mb-2">Supporting Evidence:</h5>
                              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {report.report_images.map((image, index) => (
                                  <div key={index} className="relative group cursor-pointer" onClick={() => openImageModal({
                                    ...image,
                                    url: `http://localhost:5000/uploads/images/${image.image_filename}`,
                                    name: `Evidence ${index + 1}`
                                  }, report.report_images, index)}>
                                    <img
                                      src={`http://localhost:5000/uploads/images/${image.image_filename}`}
                                      alt={`Evidence ${index + 1}`}
                                      className="w-full h-24 object-cover rounded-lg border border-gray-600 hover:shadow-md transition-shadow"
                                      onError={(e) => {
                                        e.target.src = '/placeholder-image.png';
                                      }}
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
                                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      )}
                    </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-800 rounded-xl shadow-lg p-8 text-center border border-gray-700">
                  <div className="text-green-400 mb-4">
                    <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">No Matching Reports Found</h3>
                  <p className="text-gray-300">
                    No fraud reports were found matching {`"`}{searchQuery}{`"`} in {searchType.join(', ')}.
                  </p>
                </div>
              );
            })() : (
              <div className="bg-gray-800 rounded-xl shadow-lg p-8 text-center border border-gray-700">
                <div className="text-green-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No Fraud Reports Found</h3>
                <p className="text-gray-300">
                  Great news! No fraud reports were found for {`"`}{searchQuery}{`"`}. This identifier appears to be clean.
                </p>
              </div>
            )}
          </section>
        )}

      </main>

      {/* Image Zoom Modal */}
      {showImageModal && selectedImage && (
        <ImageZoomModal
          image={selectedImage}
          images={selectedImage.allImages || []}
          currentIndex={selectedImage.currentIndex || 0}
          onClose={closeImageModal}
          onPrevious={goToPreviousImage}
          onNext={goToNextImage}
        />
      )}
    </div>
  );
}