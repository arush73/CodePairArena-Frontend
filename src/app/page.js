// "use client";
// import React, { useEffect } from "react";
// import NavBar from "@/app/components/Navbar"
// import { Outlet } from "react-router-dom";
// import { useAuthStore } from "./store/useAuthStore";

// const Home = () => {
//   return (
//     <div>
//       <NavBar />
//       hi this is homepage
//     </div>
//   );
// };

// export default Home;

"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import NavBar from "@/app/components/Navbar";
import Link from "next/link";
import { useParams } from "next/navigation";


export default function HomePage() {
  // will either hardcode or fetch these stats from backend later will see
  const [sampleProblemId, setSampleProblemId] = React.useState(
    "68ea43cb79dd88ec4e999b22"
  );
  const stats = [
    { label: "Problems", value: "3.5k+" },
    { label: "Active Users", value: "120k+" },
    { label: "Contests / mo", value: "12" },
    { label: "Avg Success", value: "78%" },
  ];

  const features = [
    {
      title: "Real-time Editor",
      desc: "Fast, minimal editor with instant test-run and multi-language support.",
    },
    {
      title: "Detailed Insights",
      desc: "Problem breakdowns, time & space analysis, and community solutions.",
    },
    {
      title: "Contests & Leaderboards",
      desc: "Weekly contests to track progress and climb the global leaderboard.",
    },
    {
      title: "Collaborative Rooms",
      desc: "Pair-program and mock interviews with live audio/video rooms.",
    },
  ];

  const testimonials = [
    {
      name: "Rohan",
      role: "SDE @ ScaleX",
      text: "Solved 200+ problems using CodePairArena — interview-ready in 3 months.",
    },
    {
      name: "Maya",
      role: "Final-year CS",
      text: "The contest practice improved my speed & confidence massively.",
    },
  ];

  const params = useParams();
  let accessToken = params.accessToken;
  let refreshToken = params.refreshToken;
  useEffect(() => {
    refreshToken = params.refreshToken
    accessToken = params.accessToken
  }, [params])



  useEffect(() => {
if (accessToken) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7); // 7 days
  document.cookie =
    "accessToken=" +
    accessToken +
    "; expires=" +
    expirationDate.toUTCString() +
    "; path=/; HttpOnly; Secure; SameSite=None";
}
if (refreshToken) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7); // 7 days
  document.cookie =
    "refreshToken=" +
    accessToken +
    "; expires=" +
    expirationDate.toUTCString() +
    "; path=/; HttpOnly; Secure; SameSite=None";
}
  },[accessToken, refreshToken])

  

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 text-white">
        {/* NAV */}
        <nav className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center shadow-md">
              <span className="font-bold">LC</span>
            </div>
            <div className="hidden sm:block">
              <h3 className="font-semibold">CodePairArena</h3>
              <p className="text-xs text-zinc-400 -mt-1">
                Practice. Compete. Master.
              </p>
            </div>
          </div>

          {/* <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <a className="text-zinc-300 hover:text-white">Problems</a>
              <a className="text-zinc-300 hover:text-white">Contests</a>
              <a className="text-zinc-300 hover:text-white">Discuss</a>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <Button variant="ghost" className="text-zinc-300">
                Login
              </Button>
              <Button className="bg-indigo-600 hover:bg-indigo-500">
                Get Started
              </Button>
            </div>

            <div className="sm:hidden">
              <Button variant="ghost">Menu</Button>
            </div>
          </div> */}
        </nav>

        {/* HERO */}
        <header className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Sharpen your logic. <br /> Build your future.
              </h1>
              <p className="text-zinc-400 mt-4 max-w-xl">
                Practice curated problems, take contests, and join a community
                of engineers pushing limits. Editor, real-time rooms, and deep
                insights — everything in one place.
              </p>

              <div className="flex gap-3 mt-6">
                <Link href="/problems/68f727fa43e771f0ecfa3e39">
                  <Button className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3">
                    Start Coding
                  </Button>
                </Link>
                <Link href="/problems">
                  <Button variant="ghost" className="px-6 py-3">
                    Explore Problems
                  </Button>
                </Link>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Badge className="bg-zinc-800/60 text-gray-300">
                    Community-driven
                  </Badge>
                  <Badge className="bg-indigo-700/30 text-gray-300">
                    Realtime Editor
                  </Badge>
                  <Badge className="bg-yellow-700/20 text-gray-300">
                    Contests
                  </Badge>
                </div>
              </div>

              {/* Search bar */}
              <Link href="/pricing">
                <div className="mt-8 max-w-xl hover:bg-orange-500/40">
                  <div className="flex items-center justify-center bg-orange-500/50 rounded-lg p-2 gap-2">
                    {/* <Search className="w-5 h-5 text-zinc-400 ml-2" /> */}
                    {/* <Input placeholder="Search problems, tags, or topics" /> */}
                    {/* <Button variant="ghost"> */}
                    Get Ahead From Others
                    {/* </Button> */}
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="w-full h-72 md:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-700/30 to-pink-700/20 border border-zinc-700 p-4">
                {/* Mock editor / placeholders */}
                <div className="flex gap-4 h-full">
                  <div className="w-1/3 bg-zinc-900/50 rounded-md p-3 flex flex-col gap-3">
                    <div className="h-7 rounded bg-zinc-800" />
                    <div className="h-7 rounded bg-zinc-800 w-3/4" />
                    <div className="flex-1 bg-gradient-to-b from-zinc-900 to-transparent rounded" />
                  </div>

                  <div className="flex-1 bg-zinc-900/60 rounded-md p-3 flex flex-col gap-3">
                    <div className="h-6 w-60 rounded bg-zinc-800" />
                    <div className="flex-1 rounded bg-gradient-to-b from-zinc-800 to-transparent" />
                    <div className="h-8 w-40 rounded bg-indigo-600/60 self-end" />
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <Card className="p-3 bg-zinc-800/50 border-zinc-700/60">
                  <CardHeader>
                    <CardTitle className="text-sm">Next Contest</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-zinc-300">
                      Oct 25 • 7:30 PM
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-3 bg-zinc-800/50 border-zinc-700/60">
                  <CardHeader>
                    <CardTitle className="text-sm">Top Rank</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-zinc-300">Rohan • 982</div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </header>

        {/* STATS */}
        <section className="max-w-6xl mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-700/60"
              >
                <div className="text-sm text-zinc-400">{s.label}</div>
                <div className="text-2xl font-bold mt-2">{s.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <h3 className="text-2xl font-bold mb-4">What you&apos;ll get</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-zinc-800/40 border-zinc-700/60">
                  <CardContent>
                    <h4 className="font-semibold">{f.title}</h4>
                    <p className="text-zinc-400 mt-2">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS + CTA */}
        <section className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">
                Trusted by coders worldwide
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {testimonials.map((t) => (
                  <Card
                    key={t.name}
                    className="bg-zinc-800/40 border-zinc-700/60"
                  >
                    <CardContent>
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-xs text-zinc-400">{t.role}</div>
                      <p className="text-zinc-300 mt-2">{t.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="sticky top-24">
              <Card className="bg-gradient-to-br from-indigo-700/20 to-pink-700/10 border-zinc-700/60 p-6">
                <CardHeader>
                  <CardTitle>Start your journey</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-300 text-sm">
                    Create an account and solve your first problem in 60
                    seconds.
                  </p>
                  <div className="mt-4">
                    {/* <Input placeholder="Email address" /> */}
                    <Link href="/register">
                      <Button className="w-full mt-3 bg-indigo-600 hover:bg-indigo-500">
                        Create Account
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-zinc-800/60 mt-12 py-8">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-zinc-400">
              © {new Date().getFullYear()} CodePairArena — Built for builders
            </div>
            <div className="flex gap-4 items-center">
              <a className="text-zinc-300 hover:text-white">Privacy</a>
              <a className="text-zinc-300 hover:text-white">Terms</a>
              <a href="/contact" className="text-zinc-300 hover:text-white">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
