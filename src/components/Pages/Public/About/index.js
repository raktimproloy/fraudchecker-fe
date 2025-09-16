import Head from 'next/head';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Head>
        <title>About Us - FraudChecker</title>
        <meta name="description" content="Learn about FraudChecker's mission, how our service works, and our commitment to your privacy and security" />
      </Head>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">FraudChecker সম্পর্কে</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
          স্বচ্ছতা, প্রযুক্তি এবং বিশ্বাসের মাধ্যমে প্রতারণা থেকে কমিউনিটিকে সুরক্ষিত রাখা
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">আমাদের লক্ষ্য</h2>
            <p className="text-lg text-gray-300 mb-8">
            FraudChecker-এ আমাদের লক্ষ্য হলো একটি নিরাপদ ডিজিটাল পরিবেশ তৈরি করা, যেখানে ব্যক্তি ও প্রতিষ্ঠান উভয়ই প্রতারণামূলক কার্যকলাপ চিহ্নিত, রিপোর্ট এবং নিজেদের সুরক্ষিত রাখতে সক্ষম হয়। আমরা বিশ্বাস করি স্বচ্ছতা, কমিউনিটির সহযোগিতা এবং অনলাইনে যার সাথে যোগাযোগ করছেন তাকে জানার অধিকার সবার রয়েছে।
            </p>
            <div className="bg-blue-900 p-6 rounded-lg border-l-4 border-blue-500 text-left">
              <p className="text-blue-200 font-medium">
              আমরা এমন এক পৃথিবী গড়ে তুলছি যেখানে প্রতারকরা কোথাও লুকোতে পারবে না, আর সৎ মানুষ নিশ্চিন্তে লেনদেন করতে পারবে।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12">আমাদের সার্ভিস কিভাবে কাজ করে</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-700 rounded-lg border border-gray-600">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">সার্চ ও যাচাই করুন</h3>
              <p className="text-gray-300">
              ইমেইল ঠিকানা, ফোন নম্বর অথবা সামাজিক প্রোফাইল সার্চ করে দেখুন, এদের বিরুদ্ধে কোনো প্রতারণার রিপোর্ট আছে কিনা।
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-700 rounded-lg border border-gray-600">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">সন্দেহজনক কার্যকলাপ রিপোর্ট করুন</h3>
              <p className="text-gray-300">
              আপনার অভিজ্ঞতা শেয়ার করুন এবং অন্যদের প্রতারণা থেকে সুরক্ষিত রাখতে সাহায্য করুন।
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-700 rounded-lg border border-gray-600">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">নিরাপদ থাকুন</h3>
              <p className="text-gray-300">
              সতর্কতা ও রিসোর্স পান যাতে প্রতারণার শিকার হওয়া এড়াতে পারেন।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Privacy Section */}
      <section className="py-12 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12">আমাদের নিরাপত্তা ও গোপনীয়তার প্রতিশ্রুতি</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-600">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                ডেটা সুরক্ষা
              </h3>
              <p className="text-gray-300">
              আমরা ইন্ডাস্ট্রি-স্ট্যান্ডার্ড এনক্রিপশন এবং নিরাপত্তা ব্যবস্থা ব্যবহার করি। আপনার ব্যক্তিগত তথ্য কখনো তৃতীয় পক্ষের কাছে বিক্রি করা হয় না।
              </p>
            </div>
            
            <div className="bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-600">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                স্বচ্ছতা
              </h3>
              <p className="text-gray-300">
              আমরা খোলাখুলি জানাই আমাদের সিস্টেম কিভাবে কাজ করে এবং আমরা কি ডেটা সংগ্রহ করি। আমাদের মডারেশন প্রক্রিয়া ন্যায্য ও নিরপেক্ষভাবে পরিচালিত হয়।
              </p>
            </div>
            
            <div className="bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-600">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                ব্যবহারকারীর নিয়ন্ত্রণ
              </h3>
              <p className="text-gray-300">
              আপনি আপনার ডেটার উপর পূর্ণ নিয়ন্ত্রণ রাখেন। আপনার সম্পর্কে আমাদের কাছে যে তথ্য রয়েছে তা দেখতে বা মুছে ফেলার জন্য অনুরোধ করতে পারবেন।
              </p>
            </div>
            
            <div className="bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-600">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                নৈতিক চর্চা
              </h3>
              <p className="text-gray-300">
              প্রতিটি রিপোর্ট যাচাইয়ের পরই প্রকাশ করা হয় এবং যারা মনে করেন তারা ভুলভাবে রিপোর্টেড হয়েছেন, তাদের জন্য আপিল করার সুযোগ রয়েছে।
              </p>
            </div>
            
            <div className="bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-600">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                রিপোর্ট সাবমিশনের গোপনীয়তা
              </h3>
              <p className="text-gray-300">
              আমরা আপনার রিপোর্ট সাবমিশনের সম্পূর্ণ গোপনীয়তা রক্ষা করি। আপনার ব্যক্তিগত তথ্য এবং পরিচয় কখনো প্রকাশ করা হয় না। শুধুমাত্র প্রয়োজনীয় তথ্য (যেমন প্রতারণার ধরন, তারিখ) প্রকাশ করা হয় যাতে অন্যদের সতর্ক করা যায়।
              </p>
            </div>
            
            <div className="bg-gray-700 p-6 rounded-lg shadow-sm border border-gray-600">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                কমিউনিটি সুরক্ষা
              </h3>
              <p className="text-gray-300">
              আপনার রিপোর্ট আমাদের কমিউনিটিকে সুরক্ষিত রাখতে সাহায্য করে। প্রতিটি রিপোর্ট যাচাই করে আমরা নিশ্চিত করি যে সঠিক তথ্য শেয়ার করা হচ্ছে এবং কেউ ভুলভাবে ক্ষতিগ্রস্ত হচ্ছে না।
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/privacy-policy" className="text-blue-400 hover:text-blue-300 font-medium">
                গোপনীয়তা নীতি পড়ুন
              </a>
              <span className="text-gray-400 hidden sm:block">|</span>
              <a href="/terms-conditions" className="text-blue-400 hover:text-blue-300 font-medium">
                শর্তাবলী পড়ুন
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}