import React from 'react'
import Headers from './component/header'

const layout = ({children}) => {
  return (
    <html>
      <body>
        <Headers/>
        {children}
      </body>
    </html>
  )
}

export default layout