import React from 'react'
import './globals.css'
import Header from './components/Header'
import Providers from './Providers'

const layout = ({children}) => {
  return (
    <html lang='en'>
        <body>
          <Providers>
          <Header/>
            {children}
            </Providers>
        </body>
    </html>
  )
}

export default layout