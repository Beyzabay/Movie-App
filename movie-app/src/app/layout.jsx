import React, { Suspense, lazy } from 'react';
import './globals.css';

const Header = lazy(() => import('./components/Header'));
const Providers = lazy(() => import('./Providers'));
const Tabs = lazy(() => import('./components/Tabs'));

const Layout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <Providers>
            <Header />
            <Tabs />
            {children}
          </Providers>
        </Suspense>
      </body>
    </html>
  );
};

export default Layout;