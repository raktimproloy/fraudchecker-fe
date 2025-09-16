import Head from 'next/head';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Head>
        <title>Privacy Policy - FraudChecker</title>
        <meta name="description" content="FraudChecker Privacy Policy - Learn how we protect your data and privacy" />
      </Head>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">গোপনীয়তা নীতি</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            আপনার গোপনীয়তা আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ। জানুন আমরা কিভাবে আপনার তথ্য সুরক্ষিত রাখি।
          </p>
          <p className="text-sm text-center mt-4 opacity-90">
            সর্বশেষ আপডেট: {new Date().toLocaleDateString('bn-BD')}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gray-800 rounded-lg p-8 space-y-8">
            
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">ভূমিকা</h2>
              <p className="text-gray-300 leading-relaxed">
                FraudChecker ("আমরা", "আমাদের", "সার্ভিস") আপনার গোপনীয়তা রক্ষা করতে প্রতিশ্রুতিবদ্ধ। 
                এই গোপনীয়তা নীতি ব্যাখ্যা করে যে আমরা কিভাবে আপনার ব্যক্তিগত তথ্য সংগ্রহ, ব্যবহার, 
                এবং সুরক্ষিত রাখি যখন আপনি আমাদের ওয়েবসাইট এবং সেবা ব্যবহার করেন।
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">আমরা কি তথ্য সংগ্রহ করি</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-blue-400 mb-3">ব্যক্তিগত তথ্য</h3>
                  <ul className="text-gray-300 space-y-2 ml-4">
                    <li>• নাম এবং যোগাযোগের তথ্য (ইমেইল, ফোন নম্বর)</li>
                    <li>• অ্যাকাউন্ট তৈরি করার সময় প্রদত্ত তথ্য</li>
                    <li>• প্রতারণার রিপোর্ট করার সময় প্রদত্ত বিবরণ</li>
                    <li>• প্রোফাইল ছবি (যদি আপলোড করা হয়)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-blue-400 mb-3">প্রযুক্তিগত তথ্য</h3>
                  <ul className="text-gray-300 space-y-2 ml-4">
                    <li>• IP ঠিকানা এবং ব্রাউজার তথ্য</li>
                    <li>• ডিভাইসের ধরন এবং অপারেটিং সিস্টেম</li>
                    <li>• ওয়েবসাইট ব্যবহারের প্যাটার্ন</li>
                    <li>• কুকিজ এবং অনুরূপ ট্র্যাকিং টেকনোলজি</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-blue-400 mb-3">রিপোর্ট সংক্রান্ত তথ্য</h3>
                  <ul className="text-gray-300 space-y-2 ml-4">
                    <li>• প্রতারণার বিবরণ এবং প্রমাণ</li>
                    <li>• আপলোড করা ছবি এবং ডকুমেন্ট</li>
                    <li>• রিপোর্টের তারিখ এবং সময়</li>
                    <li>• প্রতারণার ধরন এবং পরিমাণ</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">আমরা তথ্য কিভাবে ব্যবহার করি</h2>
              
              <div className="space-y-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-2">সেবা প্রদান</h3>
                  <p className="text-gray-300">আপনার অ্যাকাউন্ট পরিচালনা এবং প্রতারণা রিপোর্ট প্রক্রিয়াকরণের জন্য</p>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-2">নিরাপত্তা এবং যাচাই</h3>
                  <p className="text-gray-300">রিপোর্টের সত্যতা যাচাই এবং প্রতারণামূলক কার্যকলাপ সনাক্তকরণের জন্য</p>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-2">কমিউনিটি সুরক্ষা</h3>
                  <p className="text-gray-300">অন্যান্য ব্যবহারকারীদের সতর্ক করার জন্য (ব্যক্তিগত তথ্য ছাড়াই)</p>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-2">সেবা উন্নতি</h3>
                  <p className="text-gray-300">আমাদের প্ল্যাটফর্মের কার্যকারিতা এবং নিরাপত্তা উন্নত করার জন্য</p>
                </div>
              </div>
            </section>

            {/* Data Protection */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">তথ্য সুরক্ষা</h2>
              
              <div className="space-y-4">
                <div className="bg-green-900 bg-opacity-30 border border-green-500 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-400 mb-2">এনক্রিপশন</h3>
                  <p className="text-gray-300">আমরা SSL/TLS এনক্রিপশন ব্যবহার করে আপনার তথ্য সুরক্ষিত রাখি</p>
                </div>

                <div className="bg-green-900 bg-opacity-30 border border-green-500 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-400 mb-2">নিরাপদ সার্ভার</h3>
                  <p className="text-gray-300">আপনার তথ্য শুধুমাত্র নিরাপদ এবং সুরক্ষিত সার্ভারে সংরক্ষিত হয়</p>
                </div>

                <div className="bg-green-900 bg-opacity-30 border border-green-500 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-400 mb-2">সীমিত অ্যাক্সেস</h3>
                  <p className="text-gray-300">শুধুমাত্র প্রয়োজনীয় কর্মচারীরা আপনার তথ্যে অ্যাক্সেস পায়</p>
                </div>
              </div>
            </section>

            {/* Report Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">রিপোর্ট সাবমিশনের গোপনীয়তা</h2>
              
              <div className="bg-blue-900 bg-opacity-30 border border-blue-500 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">আমাদের প্রতিশ্রুতি</h3>
                <ul className="text-gray-300 space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">✓</span>
                    <span>আপনার ব্যক্তিগত পরিচয় কখনো প্রকাশ করা হয় না</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">✓</span>
                    <span>রিপোর্ট শুধুমাত্র যাচাইয়ের পর প্রকাশ করা হয়</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">✓</span>
                    <span>প্রকাশিত রিপোর্টে শুধুমাত্র প্রয়োজনীয় তথ্য থাকে</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">✓</span>
                    <span>আপনি যেকোনো সময় আপনার রিপোর্ট মুছে ফেলতে পারেন</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Data Sharing */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">তথ্য শেয়ারিং</h2>
              
              <div className="space-y-4">
                <div className="bg-red-900 bg-opacity-30 border border-red-500 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-400 mb-2">আমরা তথ্য বিক্রি করি না</h3>
                  <p className="text-gray-300">আপনার ব্যক্তিগত তথ্য কখনো তৃতীয় পক্ষের কাছে বিক্রি করা হয় না</p>
                </div>

                <div className="bg-yellow-900 bg-opacity-30 border border-yellow-500 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-400 mb-2">সীমিত শেয়ারিং</h3>
                  <p className="text-gray-300">আমরা শুধুমাত্র আইনি বাধ্যবাধকতা বা নিরাপত্তার প্রয়োজনে তথ্য শেয়ার করি</p>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">আপনার অধিকার</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-2">তথ্য দেখার অধিকার</h3>
                  <p className="text-gray-300 text-sm">আপনার সম্পর্কে আমাদের কাছে যে তথ্য আছে তা দেখতে পারবেন</p>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-2">তথ্য সংশোধনের অধিকার</h3>
                  <p className="text-gray-300 text-sm">ভুল তথ্য সংশোধন করার অধিকার আপনার আছে</p>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-2">তথ্য মুছে ফেলার অধিকার</h3>
                  <p className="text-gray-300 text-sm">আপনার তথ্য মুছে ফেলার অনুরোধ করতে পারবেন</p>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-2">অ্যাকাউন্ট বন্ধ করার অধিকার</h3>
                  <p className="text-gray-300 text-sm">যেকোনো সময় আপনার অ্যাকাউন্ট বন্ধ করতে পারবেন</p>
                </div>
              </div>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">কুকিজ এবং ট্র্যাকিং</h2>
              <p className="text-gray-300 leading-relaxed">
                আমরা আপনার অভিজ্ঞতা উন্নত করার জন্য কুকিজ ব্যবহার করি। আপনি আপনার ব্রাউজার সেটিংস 
                পরিবর্তন করে কুকিজ নিষ্ক্রিয় করতে পারেন, তবে এটি আমাদের সেবার কার্যকারিতা প্রভাবিত করতে পারে।
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">যোগাযোগ</h2>
              <div className="bg-gray-700 p-6 rounded-lg">
                <p className="text-gray-300 mb-4">
                  গোপনীয়তা সংক্রান্ত কোনো প্রশ্ন বা উদ্বেগ থাকলে আমাদের সাথে যোগাযোগ করুন:
                </p>
                <div className="space-y-2 text-gray-300">
                  <p>ইমেইল: privacy@FraudChecker.com</p>
                  <p>ফোন: +880-XXX-XXXXXX</p>
                  <p>ঠিকানা: ঢাকা, বাংলাদেশ</p>
                </div>
              </div>
            </section>

            {/* Policy Updates */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">নীতি আপডেট</h2>
              <p className="text-gray-300 leading-relaxed">
                আমরা সময়ে সময়ে এই গোপনীয়তা নীতি আপডেট করতে পারি। কোনো পরিবর্তন হলে আমরা 
                ওয়েবসাইটে বিজ্ঞপ্তি দেব এবং গুরুত্বপূর্ণ পরিবর্তনের ক্ষেত্রে ইমেইলের মাধ্যমে জানাব।
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
