import useStore from '@/helpers/store'
import dynamic from 'next/dynamic'

import React, { useRef, useEffect, useState, Suspense } from 'react'

//R3F
import { Canvas } from '@react-three/fiber'

//components
import ResponsiveHeader from '../components/responsiveHeader'

import Footer from '../components/footer'
import Loader from '../components/Loader'

//scene
import Lights from '../components/Lights'
import Group from '../components/canvas/Group'

//state
import scrollState from '../components/state'

//sections
import HeroSection from '../sections/hero'
import ProcessSection from '../sections/process'
import LandingSection from '../sections/landing'
import DevelopmentSection from '../sections/development'

const Page = ({ title }) => {
  useStore.setState({ title })
  const [events, setEvents] = useState()

  const domContent = useRef()
  const scrollArea = useRef()

  const onScroll = (e) => (scrollState.top.current = e.target.scrollTop)
  useEffect(() => void onScroll({ target: scrollArea.current }), [])

  return (
    <>
      <ResponsiveHeader />

      <Lights r3f />

      <Group
        r3f
        domContent={domContent}
        bgColor="#f1d8f5 url('background.png') no-repeat"
        modelPath='/website_avatar_vers_v1Draco.gltf'
        position={250}
      >
        <HeroSection />
      </Group>
      <Group
        r3f
        domContent={domContent}
        bgColor="#FECEE9 url('background4.png') no-repeat"
        modelPath='/website_avatar_fruits_v7Draco.gltf'
        position={0}
      >
        <ProcessSection />
      </Group>
      <Group
        r3f
        domContent={domContent}
        bgColor="#f1d8f5 url('background5.png') no-repeat"
        modelPath='/website_avatar_soph_v5Draco.gltf'
        position={-250}
      >
        <LandingSection />
      </Group>
      <Group
        r3f
        domContent={domContent}
        bgColor="#f2f3fc url('background4.png') no-repeat"
        modelPath='/website_avatar_lanc_v15Draco.gltf'
        position={-500}
      >
        <DevelopmentSection />
      </Group>

      <Loader r3f />
      <div
        className='scrollArea'
        ref={scrollArea}
        onScroll={onScroll}
        {...events}
      >
        <div style={{ position: 'sticky', top: 0 }} ref={domContent} />
        <div style={{ height: `${scrollState.pages * 100}vh` }} />
      </div>
      <Footer />
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Index',
    },
  }
}
