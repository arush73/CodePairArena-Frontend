"use client"
import React from 'react'
import ProfilePage from './profilePage'
import NavBar from '@/app/components/Navbar'
import { useAuthStore } from '../store/useAuthStore'

const Page = () => {
  const { user } = useAuthStore()
  
  console.log("this is the user: " ,user)
  return (
    <>
    <NavBar/>
    <ProfilePage
      user={{
        username: user?.email,
        handle: user?.email,
        rank: "Gold",
        level: "Advanced",
        streak: 21,
        progress: 75,
        easySolved: 150,
        mediumSolved: 90,
        hardSolved: 30,
        languages: ["C++", "Python", "TypeScript"],
          bio: "Coding like a monk, debugging like a demon.",
        avatar: user?.avatar
      }}
      />
      </>
  );
}

export default Page
