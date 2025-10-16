"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Flame, Code, Calendar, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function ProfilePage({ user }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 text-white p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-6 mb-10"
      >
        <img
          src={
            user?.avatar ||
            "https://api.dicebear.com/7.x/avataaars/svg?seed=leetuser"
          }
          alt="avatar"
          className="w-32 h-32 rounded-full border-4 border-yellow-500 shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold">
            {user?.username || "Anonymous Coder"}
          </h1>
          <p className="text-zinc-400">@{user?.handle || "unknown"}</p>
          <div className="flex gap-3 mt-3">
            <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
              {user?.rank || "Silver"}
            </Badge>
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
              {user?.level || "Intermediate"}
            </Badge>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* Stats */}
        <Card className="bg-zinc-800/50 backdrop-blur border-zinc-700">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Flame className="text-orange-400" /> Streak & Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Current Streak</span>
              <span className="font-semibold text-orange-400">
                {user?.streak || 14} days 🔥
              </span>
            </div>
            <div>
              <Progress
                value={user?.progress || 68}
                className="h-2 bg-zinc-700"
              />
              <p className="text-xs text-zinc-400 mt-1">
                {user?.progress || 68}% of yearly goal completed
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Problems Solved */}
        <Card className="bg-zinc-800/50 backdrop-blur border-zinc-700">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Code className="text-blue-400" /> Problems Solved
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>Easy</span>
              <span className="text-green-400 font-semibold">
                {user?.easySolved || 134}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Medium</span>
              <span className="text-yellow-400 font-semibold">
                {user?.mediumSolved || 82}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Hard</span>
              <span className="text-red-400 font-semibold">
                {user?.hardSolved || 27}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-zinc-800/50 backdrop-blur border-zinc-700">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Calendar className="text-violet-400" /> Recent Submissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {(
                user?.recent || [
                  { title: "Two Sum", status: "Accepted" },
                  { title: "Valid Parentheses", status: "Wrong Answer" },
                  { title: "Merge Intervals", status: "Accepted" },
                ]
              ).map((sub, i) => (
                <li
                  key={i}
                  className="flex justify-between border-b border-zinc-700/50 pb-1"
                >
                  <span>{sub.title}</span>
                  <span
                    className={`${
                      sub.status === "Accepted"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {sub.status}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Footer Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-5xl mx-auto mt-10 grid md:grid-cols-2 gap-6"
      >
        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="text-yellow-400" /> Languages Used
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {(user?.languages || ["Python", "JavaScript", "C++"]).map(
              (lang, i) => (
                <Badge
                  key={i}
                  className="bg-zinc-700 text-white border-zinc-600 hover:bg-zinc-600"
                >
                  {lang}
                </Badge>
              )
            )}
          </CardContent>
        </Card>

        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {user?.bio ||
                "Passionate developer solving algorithmic puzzles and exploring the art of clean, elegant code. Always chasing mastery."}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
