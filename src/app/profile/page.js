"use client"
import React from 'react'
import ProfilePage from './profilePage'
import NavBar from '@/app/components/Navbar'

const Page = () => {
  return (
    <>
    <NavBar/>
    <ProfilePage
      user={{
        username: "tpga",
        handle: "tpga32",
        rank: "Gold",
        level: "Advanced",
        streak: 21,
        progress: 75,
        easySolved: 150,
        mediumSolved: 90,
        hardSolved: 30,
        languages: ["C++", "Python", "TypeScript"],
        bio: "Coding like a monk, debugging like a demon.",
      }}
      />
      </>
  );
}

export default Page
