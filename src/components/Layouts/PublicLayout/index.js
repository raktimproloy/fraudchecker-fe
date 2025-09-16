'use client';

import React from 'react';
import PublicNavbar from './Navbar';
import PublicFooter from './Footer';

const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-grow">
        {children}
      </main>
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;
