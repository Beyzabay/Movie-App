import React, { Suspense } from 'react'
import './globals.css'
import Header from './components/Header'
import Providers from './Providers'

const Tabs = React.lazy(() => import('./components/Tabs'))

const Layout = ({ children }) => {
  return (
    <Providers>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Tabs />
      </Suspense>
      {children}
    </Providers>
  )
}

export default Layout
