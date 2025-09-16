import Head from 'next/head';

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Head>
        <title>Terms & Conditions - FraudChecker</title>
        <meta name="description" content="FraudChecker Terms & Conditions - Read our terms of service and usage guidelines" />
      </Head>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">শর্তাবলী</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            FraudChecker ব্যবহারের শর্তাবলী এবং নিয়মাবলী
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
                এই শর্তাবলী (শর্তাবলী) FraudChecker প্ল্যাটফর্ম ব্যবহারের জন্য প্রযোজ্য। 
                আমাদের সেবা ব্যবহার করার মাধ্যমে আপনি এই শর্তাবলী মেনে চলতে সম্মত হচ্ছেন। 
                যদি আপনি এই শর্তাবলীর সাথে একমত না হন, তাহলে আমাদের সেবা ব্যবহার করবেন না।
              </p>
            </section>

            {/* Service Description */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">সেবার বিবরণ</h2>
              
              <div className="space-y-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-2">FraudChecker কি</h3>
                  <p className="text-gray-300">
                    FraudChecker একটি ডিজিটাল প্ল্যাটফর্ম যা ব্যবহারকারীদের প্রতারণামূলক কার্যকলাপ 
                    রিপোর্ট এবং যাচাই করার সুবিধা প্রদান করে। আমরা একটি নিরাপদ এবং স্বচ্ছ পরিবেশ 
                    তৈরি করেছি যেখানে কমিউনিটি একসাথে কাজ করে প্রতারণা থেকে সুরক্ষিত থাকে।
                  </p>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-2">আমাদের সেবা</h3>
                  <ul className="text-gray-300 space-y-2 ml-4">
                    <li>• প্রতারণার রিপোর্ট সাবমিট করা</li>
                    <li>• রিপোর্ট যাচাই এবং যাচাইকরণ</li>
                    <li>• প্রতারণামূলক কার্যকলাপ অনুসন্ধান</li>
                    <li>• কমিউনিটি সতর্কতা এবং শিক্ষা</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* User Responsibilities */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">ব্যবহারকারীর দায়িত্ব</h2>
              
              <div className="space-y-4">
                <div className="bg-blue-900 bg-opacity-30 border border-blue-500 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">সঠিক তথ্য প্রদান</h3>
                  <p className="text-gray-300">
                    আপনি যে তথ্য প্রদান করেন তা সঠিক, সত্য এবং আপ-টু-ডেট হতে হবে। 
                    ভুল বা বিভ্রান্তিকর তথ্য প্রদান করা নিষিদ্ধ।
                  </p>
                </div>

                <div className="bg-blue-900 bg-opacity-30 border border-blue-500 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">নৈতিক ব্যবহার</h3>
                  <p className="text-gray-300">
                    প্ল্যাটফর্মটি শুধুমাত্র বৈধ উদ্দেশ্যে ব্যবহার করুন। 
                    অন্য ব্যবহারকারীদের ক্ষতি বা বিরক্তির জন্য ব্যবহার করবেন না।
                  </p>
                </div>

                <div className="bg-blue-900 bg-opacity-30 border border-blue-500 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">রিপোর্টের সত্যতা</h3>
                  <p className="text-gray-300">
                    প্রতারণার রিপোর্ট করার সময় সত্য ঘটনা এবং প্রমাণ প্রদান করুন। 
                    মিথ্যা বা উদ্দেশ্যমূলক রিপোর্ট করা কঠোরভাবে নিষিদ্ধ।
                  </p>
                </div>
              </div>
            </section>

            {/* Prohibited Activities */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">নিষিদ্ধ কার্যকলাপ</h2>
              
              <div className="space-y-4">
                <div className="bg-red-900 bg-opacity-30 border border-red-500 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-400 mb-2">মিথ্যা রিপোর্ট</h3>
                  <p className="text-gray-300">
                    ভুল, মিথ্যা বা উদ্দেশ্যমূলক রিপোর্ট সাবমিট করা কঠোরভাবে নিষিদ্ধ। 
                    এর ফলে আপনার অ্যাকাউন্ট স্থায়ীভাবে বন্ধ হয়ে যেতে পারে।
                  </p>
                </div>

                <div className="bg-red-900 bg-opacity-30 border border-red-500 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-400 mb-2">অপব্যবহার</h3>
                  <p className="text-gray-300">
                    প্ল্যাটফর্মের নিরাপত্তা বা কার্যকারিতা ক্ষতিগ্রস্ত করার চেষ্টা করা নিষিদ্ধ।
                  </p>
                </div>

                <div className="bg-red-900 bg-opacity-30 border border-red-500 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-400 mb-2">অনুপযুক্ত কন্টেন্ট</h3>
                  <p className="text-gray-300">
                    ঘৃণামূলক, আক্রমণাত্মক বা অবৈধ কন্টেন্ট আপলোড বা শেয়ার করা নিষিদ্ধ।
                  </p>
                </div>

                <div className="bg-red-900 bg-opacity-30 border border-red-500 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-400 mb-2">অনুমতি ছাড়া তথ্য সংগ্রহ</h3>
                  <p className="text-gray-300">
                    অন্যান্য ব্যবহারকারীদের ব্যক্তিগত তথ্য সংগ্রহ বা ব্যবহার করা নিষিদ্ধ।
                  </p>
                </div>
              </div>
            </section>

            {/* Content Moderation */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">কন্টেন্ট মডারেশন</h2>
              
              <div className="space-y-4">
                <div className="bg-yellow-900 bg-opacity-30 border border-yellow-500 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-400 mb-2">রিপোর্ট যাচাই</h3>
                  <p className="text-gray-300">
                    আমরা প্রতিটি রিপোর্ট সাবধানে যাচাই করি। শুধুমাত্র যাচাইকৃত রিপোর্টই প্রকাশ করা হয়।
                  </p>
                </div>

                <div className="bg-yellow-900 bg-opacity-30 border border-yellow-500 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-400 mb-2">কন্টেন্ট অপসারণ</h3>
                  <p className="text-gray-300">
                    আমরা অনুপযুক্ত বা নিয়মবিরুদ্ধ কন্টেন্ট অপসারণের অধিকার রাখি।
                  </p>
                </div>

                <div className="bg-yellow-900 bg-opacity-30 border border-yellow-500 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-400 mb-2">আপিল প্রক্রিয়া</h3>
                  <p className="text-gray-300">
                    আপনি যদি মনে করেন যে আপনার কন্টেন্ট ভুলভাবে অপসারণ হয়েছে, 
                    তাহলে আমাদের সাথে যোগাযোগ করে আপিল করতে পারেন।
                  </p>
                </div>
              </div>
            </section>

            {/* User Accounts */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">ব্যবহারকারী অ্যাকাউন্ট</h2>
              
              <div className="space-y-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-2">অ্যাকাউন্ট নিরাপত্তা</h3>
                  <p className="text-gray-300">
                    আপনার অ্যাকাউন্টের নিরাপত্তার জন্য আপনি দায়ী। শক্তিশালী পাসওয়ার্ড ব্যবহার করুন 
                    এবং আপনার লগইন তথ্য অন্যদের সাথে শেয়ার করবেন না।
                  </p>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-2">একাধিক অ্যাকাউন্ট</h3>
                  <p className="text-gray-300">
                    একজন ব্যক্তি শুধুমাত্র একটি অ্যাকাউন্ট তৈরি করতে পারবেন। 
                    একাধিক অ্যাকাউন্ট তৈরি করা নিষিদ্ধ।
                  </p>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-2">অ্যাকাউন্ট বন্ধ</h3>
                  <p className="text-gray-300">
                    আপনি যেকোনো সময় আপনার অ্যাকাউন্ট বন্ধ করতে পারেন। 
                    অ্যাকাউন্ট বন্ধ করার পর আপনার তথ্য আমাদের গোপনীয়তা নীতি অনুযায়ী সংরক্ষিত থাকবে।
                  </p>
                </div>
              </div>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">মেধাস্বত্ব</h2>
              
              <div className="space-y-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-2">আমাদের কন্টেন্ট</h3>
                  <p className="text-gray-300">
                    FraudChecker প্ল্যাটফর্মের সমস্ত কন্টেন্ট, ডিজাইন এবং সফটওয়্যার আমাদের মেধাস্বত্বের অধীনে রয়েছে।
                  </p>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-2">ব্যবহারকারী কন্টেন্ট</h3>
                  <p className="text-gray-300">
                    আপনি যে কন্টেন্ট আপলোড করেন তার মেধাস্বত্ব আপনার কাছে থাকবে, 
                    তবে আপনি আমাদের সেবার মাধ্যমে এটি শেয়ার করার অধিকার প্রদান করেন।
                  </p>
                </div>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">দায়িত্বের সীমাবদ্ধতা</h2>
              
              <div className="bg-orange-900 bg-opacity-30 border border-orange-500 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-orange-400 mb-4">গুরুত্বপূর্ণ সতর্কতা</h3>
                <ul className="text-gray-300 space-y-3">
                  <li className="flex items-start">
                    <span className="text-orange-400 mr-2">⚠</span>
                    <span>আমরা রিপোর্টের সত্যতা নিশ্চিত করতে চেষ্টা করি, কিন্তু ১০০% নিশ্চিততা দিতে পারি না</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-400 mr-2">⚠</span>
                    <span>আপনার সিদ্ধান্তের জন্য আপনি নিজে দায়ী</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-400 mr-2">⚠</span>
                    <span>আমরা কোনো আর্থিক ক্ষতির জন্য দায়ী নই</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-400 mr-2">⚠</span>
                    <span>সেবা যেমন আছে ভিত্তিতে প্রদান করা হয়</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">গোপনীয়তা</h2>
              <p className="text-gray-300 leading-relaxed">
                আপনার গোপনীয়তা আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ। 
                আমাদের গোপনীয়তা নীতি আমাদের ওয়েবসাইটে পাওয়া যাবে এবং 
                এই শর্তাবলীর অংশ হিসেবে বিবেচিত হবে।
              </p>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">সেবা বন্ধ</h2>
              
              <div className="space-y-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-2">আপনার অধিকার</h3>
                  <p className="text-gray-300">
                    আপনি যেকোনো সময় আমাদের সেবা ব্যবহার বন্ধ করতে পারেন।
                  </p>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-2">আমাদের অধিকার</h3>
                  <p className="text-gray-300">
                    আমরা নিয়ম ভঙ্গের ক্ষেত্রে আপনার অ্যাকাউন্ট স্থায়ী বা অস্থায়ীভাবে বন্ধ করতে পারি।
                  </p>
                </div>
              </div>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">শর্তাবলী পরিবর্তন</h2>
              <p className="text-gray-300 leading-relaxed">
                আমরা সময়ে সময়ে এই শর্তাবলী আপডেট করতে পারি। 
                গুরুত্বপূর্ণ পরিবর্তনের ক্ষেত্রে আমরা ব্যবহারকারীদের জানাব। 
                আপডেট হওয়া শর্তাবলী কার্যকর হওয়ার পর সেবা ব্যবহার করার মাধ্যমে 
                আপনি নতুন শর্তাবলী মেনে চলতে সম্মত হচ্ছেন।
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">আইনগত বিধান</h2>
              <p className="text-gray-300 leading-relaxed">
                এই শর্তাবলী বাংলাদেশের আইন দ্বারা পরিচালিত হবে। 
                কোনো বিরোধের ক্ষেত্রে বাংলাদেশের আদালতের এখতিয়ার থাকবে।
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">যোগাযোগ</h2>
              <div className="bg-gray-700 p-6 rounded-lg">
                <p className="text-gray-300 mb-4">
                  এই শর্তাবলী সংক্রান্ত কোনো প্রশ্ন থাকলে আমাদের সাথে যোগাযোগ করুন:
                </p>
                <div className="space-y-2 text-gray-300">
                  <p>ইমেইল: legal@FraudChecker.com</p>
                  <p>ফোন: +880-XXX-XXXXXX</p>
                  <p>ঠিকানা: ঢাকা, বাংলাদেশ</p>
                </div>
              </div>
            </section>

            {/* Agreement */}
            <section>
              <div className="bg-blue-900 bg-opacity-30 border border-blue-500 p-6 rounded-lg text-center">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">সম্মতি</h3>
                <p className="text-gray-300">
                  এই শর্তাবলী পড়ার পর যদি আপনি আমাদের সেবা ব্যবহার করেন, 
                  তাহলে আপনি এই সমস্ত শর্তাবলী মেনে চলতে সম্মত হচ্ছেন।
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
