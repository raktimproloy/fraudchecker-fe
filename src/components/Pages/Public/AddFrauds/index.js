'use client'
import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import apiService from '@/services/api';
import { useApi } from '@/hooks/useApi';
import ImagePreview from '@/components/Common/ImagePreview';

export default function ExperiencePage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const { loading: submitLoading, error: submitError, execute: submitReport } = useApi();
  
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [facebookId, setFacebookId] = useState('');
  const [description, setDescription] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const processFiles = (files) => {
    const validFiles = [];
    const processedImages = [];

    console.log('Processing files:', files);

    Array.from(files).forEach(file => {
      console.log('Processing file:', file.name, file.type, file.size);

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert(`File ${file.name} is not a valid image file.`);
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is 5MB.`);
        return;
      }

      // Validate total number of files
      if (validFiles.length + uploadedImages.length >= 5) {
        alert('Maximum 5 images allowed.');
        return;
      }

      validFiles.push(file);

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      console.log('Created preview URL:', previewUrl);

      const imageData = {
        file: file,
        name: file.name,
        size: file.size,
        preview: previewUrl
      };

      processedImages.push(imageData);
    });

    console.log('Processed images:', processedImages);

    if (validFiles.length > 0) {
      setSelectedFiles(prev => [...prev, ...validFiles]);
      setUploadedImages(prev => {
        const newImages = [...prev, ...processedImages];
        console.log('Updated uploadedImages:', newImages);
        return newImages;
      });
    }
  };

  const handleImageUpload = (e) => {
    processFiles(e.target.files);
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    processFiles(e.dataTransfer.files);
  };

  const handleRemoveImage = (index) => {
    // Revoke object URL to prevent memory leaks
    if (uploadedImages[index].preview) {
      URL.revokeObjectURL(uploadedImages[index].preview);
    }

    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUploadAreaClick = () => {
    fileInputRef.current?.click();
  };

  // Cleanup object URLs on component unmount
  useEffect(() => {
    return () => {
      uploadedImages.forEach(image => {
        if (image.preview) {
          URL.revokeObjectURL(image.preview);
        }
      });
    };
  }, [uploadedImages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Validate that at least one identity field is provided
    if (!email.trim() && !phone.trim() && !facebookId.trim()) {
      alert('Please provide at least one identity (email, phone, or Facebook profile)');
      return;
    }

    try {
      // Submit the fraud report
      const reportData = {
        email: email.trim() || null,
        phone: phone.trim() || null,
        facebook_id: facebookId.trim() || null,
        description: description
      };

      const result = await submitReport(() => apiService.submitFraudReport(reportData));
      
      // If there are images, upload them
      if (selectedFiles.length > 0 && result.data) {
        const formData = new FormData();
        formData.append('reportId', result.data.report_id);
        selectedFiles.forEach(file => {
          formData.append('images', file);
        });
        
        await apiService.uploadReportImages(result.data.report_id, formData);
      }

      setSuccessMessage('Report submitted successfully! Thank you for your contribution.');
      
      // Clean up object URLs before reset
      uploadedImages.forEach(image => {
        if (image.preview) {
          URL.revokeObjectURL(image.preview);
        }
      });
      
      // Reset form
      setEmail('');
      setPhone('');
      setFacebookId('');
      setDescription('');
      setUploadedImages([]);
      setSelectedFiles([]);
      
      // Redirect to home after 3 seconds
      setTimeout(() => {
        router.push('/');
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting report:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Head>
        <title>Report Fraud - FraudShield</title>
        <meta name="description" content="Report fraudulent activities to help protect others" />
      </Head>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">প্রতারণার সন্দেহ রিপোর্ট করুন</h1>
            <p className="text-xl mb-8 opacity-90">
            আপনার অভিজ্ঞতা শেয়ার করে অন্যদের রক্ষা করতে সাহায্য করুন। আপনার রিপোর্ট কারো ভুক্তভোগী হওয়া রোধ করতে পারে।
            </p>
            <div className="bg-blue-500 bg-opacity-20 p-6 rounded-lg border border-blue-400 border-opacity-30">
              <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                গুরুত্বপূর্ণ নির্দেশনা
              </h2>
              <ul className="text-left list-disc list-inside space-y-2 text-blue-100">
                <li>শুধুমাত্র সঠিক এবং সত্য তথ্য প্রদান করুন।</li>
                <li>রিপোর্ট যাচাইয়ে সহায়তার জন্য যত বড়ো-বড়ো বিস্তারিত দিন।</li>
                <li>বর্ণনায় ব্যক্তিগত সংবেদনশীল তথ্য (যেমন: পাসওয়ার্ড, ব্যাংক পিন) অন্তর্ভুক্ত করবেন না।</li>
                <li>মিথ্যা বা ক্ষতিকর রিপোর্ট করলে অ্যাকাউন্ট স্থগিত বা আইনি ব্যবস্থা হতে পারে।</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 mt-10 ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-700">
              <div className="p-6 border-b border-gray-600">
                <h2 className="text-2xl font-bold text-white">Fraud Report Form</h2>
                <p className="text-gray-300">Complete all sections to submit your report</p>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Identity Fields */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Reported Identities</h3>
                  <p className="text-sm text-gray-300 mb-4">Provide at least one identity that was used in the fraudulent activity. You can provide multiple identities if they are related to the same fraud case.</p>
                  
                  <div className="space-y-4">
                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Email Address (Optional)</label>
                      <input 
                        type="email" 
                        placeholder="Enter email address (e.g. example@domain.com)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400"
                        disabled={submitLoading}
                      />
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Phone Number (Optional)</label>
                      <input 
                        type="tel" 
                        placeholder="Enter phone number (e.g. +1234567890)"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400"
                        disabled={submitLoading}
                      />
                    </div>

                    {/* Facebook ID Field */}
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Facebook Profile (Optional)</label>
                      <input 
                        type="url" 
                        placeholder="Enter Facebook profile URL (e.g. https://facebook.com/username)"
                        value={facebookId}
                        onChange={(e) => setFacebookId(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400"
                        disabled={submitLoading}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-900 bg-opacity-20 border border-blue-500 border-opacity-30 rounded-lg">
                    <p className="text-sm text-blue-200">
                      <strong>Note:</strong> At least one identity field must be filled. You can provide multiple identities if they are all related to the same fraudulent activity.
                    </p>
                  </div>
                </div>
                
                {/* Description Field */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Fraud Description</label>
                  <div className="border border-gray-600 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                    <div className="flex border-b border-gray-600 bg-gray-700 px-4 py-2">
                      <button type="button" className="p-1 text-gray-300 hover:text-blue-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9h14a2 2 0 012 2v2m0 0H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v6m0 0l-4 4m4-4l-4-4" />
                        </svg>
                      </button>
                      <button type="button" className="p-1 text-gray-300 hover:text-blue-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                      </button>
                      <button type="button" className="p-1 text-gray-300 hover:text-blue-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                      </button>
                      <button type="button" className="p-1 text-gray-300 hover:text-blue-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      </button>
                    </div>
                    <textarea 
                      rows="6" 
                      placeholder="Provide a detailed description of the fraudulent activity. Include what happened, when it occurred, and how you were contacted."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-3 resize-none focus:outline-none bg-gray-700 text-white placeholder-gray-400"
                      required
                      disabled={submitLoading}
                    ></textarea>
                  </div>
                </div>
                
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Supporting Evidence (Optional)
                    <span className="text-gray-400 text-sm font-normal ml-2">
                      ({uploadedImages.length}/5 images)
                    </span>
                  </label>
                  
                  <div
                    className={`upload-area rounded-lg p-8 text-center cursor-pointer border-2 border-dashed transition-all duration-200 ${
                      isDragOver 
                        ? 'border-blue-500 bg-blue-900 bg-opacity-20' 
                        : 'border-gray-600 hover:border-blue-500 hover:bg-gray-700'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleUploadAreaClick}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="font-medium text-white">
                      {isDragOver ? 'Drop images here' : 'Drag & drop images here or click to browse'}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Maximum 5 images (JPEG, PNG, WebP). Max 5MB each.
                    </p>
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      className="hidden" 
                      multiple 
                      accept="image/*" 
                      onChange={handleImageUpload}
                      disabled={submitLoading}
                    />
                  </div>
                  
                  {/* Image Previews */}
                  {uploadedImages.length > 0 && (
                    <div className="mt-4">
                      <ImagePreview
                        images={uploadedImages}
                        onRemove={handleRemoveImage}
                        maxImages={5}
                      />
                    </div>
                  )}
                </div>
                
                {/* Success Message */}
                {successMessage && (
                  <div className="bg-green-900 border border-green-700 rounded-lg p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-green-300">{successMessage}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {submitError && (
                  <div className="bg-red-900 border border-red-700 rounded-lg p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-300">{submitError}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={submitLoading || !isAuthenticated}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
                  >
                    {submitLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting Report...
                      </>
                    ) : !isAuthenticated ? (
                      'Please Login to Submit Report'
                    ) : (
                      'Submit Report for Review'
                    )}
                  </button>
                  <p className="text-xs text-center text-gray-400 mt-3">
                    By submitting, you confirm that the information provided is accurate to the best of your knowledge.
                  </p>
                </div>
              </form>
            </div>
          </div>
          
          {/* Information Section */}
          <div className="space-y-6">
            {/* Guidelines */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl border border-gray-700 border-l-4 border-l-blue-500">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                যা তুমি ফর্মে রাখবে
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">সংক্ষিপ্ত ও স্পষ্ট (উদাহরণ: “বেইমান বুকিং — নম্বর 017xxxxxxx”)</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">কি ঘটেছিল, কখন এবং কোথায় — ৩–৫ বাক্যে লিখুন।</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">অনুগ্রহ করে স্পষ্ট ছবি দিন — অপ্রমাণিত কেস বাতিল হতে পারে।</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">নম্বর / ইমেইল / ফেসবুক প্রোফাইল লিংক দিন।</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">অপ্রমাণিত বা বদনাম করার উদ্দেশ্যে করা সাবমিট বাতিল করা হবে।</span>
                </li>
              </ul>
            </div>
            
            {/* Process */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                কিভাবে কাজ করে?
              </h2>
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center mr-4">1</div>
                  <div>
                    <h3 className="font-semibold text-white">স্টোরি সাবমিট করুন</h3>
                    <p className="text-sm text-gray-300">সংক্ষিপ্ত কাহিনি লিখুন — কি ঘটলো তা পরিষ্কারভাবে বলুন।</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center mr-4">2</div>
                  <div>
                    <h3 className="font-semibold text-white">প্রমাণ আপলোড করুন</h3>
                    <p className="text-sm text-gray-300">স্ক্রিনশট, চ্যাট লোগ, রসিদ/ছবি ইত্যাদি দিন (কমপক্ষে ১টি)।</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center mr-4">3</div>
                  <div>
                    <h3 className="font-semibold text-white">কনট্যাক্ট দিন</h3>
                    <p className="text-sm text-gray-300">প্রতারণাকারীর নম্বর/ইমেইল/ফেসবুক আইডি দিন</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center mr-4">4</div>
                  <div>
                    <h3 className="font-semibold text-white">অ্যাডমিন যাচাই করবে</h3>
                    <p className="text-sm text-gray-300">আমাদের টিম প্রমাণ দেখে সত্যতা নিশ্চিত করবে।</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center mr-4">5</div>
                  <div>
                    <h3 className="font-semibold text-white">প্রকাশ / না প্রকাশ</h3>
                    <p className="text-sm text-gray-300">যাচাই হলে পোস্ট পাবলিশ ও সার্চেবল হবে — যাচাই না হলে প্রদর্শিত হবে না।</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Community Guidelines */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                ভিজিটরের জন্য ছোট সতর্কবাণী
              </h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-gray-300">আমরা কেবল যাচাই হওয়া তথ্য প্রকাশ করি — তাই আপনার দেয়া প্রমাণ জরুরি।</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-gray-300">অসত্য সাবমিশন করলে আইনি অভিযোগ হতে পারে — সতর্কতার সাথে তথ্য দিন।</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-gray-300">আমাদের লক্ষ্য: প্রতারণা কমানো ও মানুষকে সুরক্ষিত রাখা।</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}