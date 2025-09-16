'use client';

import React from 'react';
import Link from 'next/link';

const PublicFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        

        {/* Bottom Bar */}
        <div className="">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-300">
              © {currentYear} FraudChecker. All rights reserved.
            </p>
            <div className="text-center md:text-right">
              <p className="text-xs text-gray-400 mt-1">
                Made with ❤️ in Bangladesh
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
