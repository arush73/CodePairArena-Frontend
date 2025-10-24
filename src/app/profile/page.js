"use client";
import React, { useEffect } from "react";
import ProfilePage from "./profilePage";
import NavBar from "@/app/components/Navbar";
import { useAuthStore } from "../store/useAuthStore";
import { useRouter } from "next/navigation";
import { LoaderOne } from "@/components/ui/loader";

const Page = () => {
  const router = useRouter();

  const { user } = useAuthStore();

  useEffect(() => {
    if (!user || user === null) {
      router.push("/");
    }
  }, [user]);

  return (
    <>
      {!user ? (
        <LoaderOne />
      ) : (
        <>
          <NavBar />
          <ProfilePage
            user={{
              username: user?.email,
              handle: user?.username,
              rank: "Gold",
              level: "Advanced",
              streak: 21,
              progress: 75,
              easySolved: 150,
              mediumSolved: 90,
              hardSolved: 30,
              languages: ["C++", "Python", "TypeScript"],
              bio: "Coding like a monk, debugging like a demon.",
              avatar: user?.avatar,
            }}
          />
        </>
      )}
    </>
  );
};

export default Page;
