"use client"
import Navbar from '@/components/home/navbar'
import React from 'react'

const HomeLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <main>
        {children}
    </main>
  )
}

export default HomeLayout