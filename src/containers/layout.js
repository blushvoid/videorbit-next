import React from 'react'

import ResponsiveHeader from '../components/responsiveHeader'
import Footer from '../components/footer'

const Layout = ({ children, ...props }) => {
  return (
    <>
      <ResponsiveHeader />
      <Footer />
    </>
  )
}

export default Layout
