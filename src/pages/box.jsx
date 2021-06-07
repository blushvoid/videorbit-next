import Instructions from '@/components/dom/instructions'
import dynamic from 'next/dynamic'

import React from 'react'

import Group from '../components/canvas/Group'

//sections
import HeroSection from '../sections/hero'

const Box = dynamic(() => import('@/components/canvas/Box'), {
  ssr: false,
})

const Page = () => {
  const domContent = React.useRef()
  return (
    <>
      <Box r3f route='/' />
      <Instructions />
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Box',
    },
  }
}
