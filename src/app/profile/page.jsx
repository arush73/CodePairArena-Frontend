"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  MapPin,
  Link as LinkIcon,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Calendar,
  Trophy,
  Code,
  Flame,
  Zap,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowLeft,
  Medal,
  Star,
  Award
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { axiosInstance } from "@/lib/axios";
import { EditProfileDialog } from "@/components/EditProfileDialog";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);
  const [recentActivity, setRecentActivity] = useState([]);

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get("/profile");
      setUser(response.data.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentActivity = async () => {
    try {
      const response = await axiosInstance.get("/submission/my-submissions?limit=5");
      setRecentActivity(response.data.data);
    } catch (error) {
      console.error("Error fetching recent activity:", error);
    }
  };

  const fetchSubmissions = async () => {
    setLoadingSubmissions(true);
    try {
      const response = await axiosInstance.get("/submission/my-submissions");
      setSubmissions(response.data.data);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      toast.error("Failed to load submissions");
    } finally {
      setLoadingSubmissions(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchRecentActivity();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Failed to load profile.</p>
      </div>
    );
  }

  // Helper to get initials
  const getInitials = () => {
    const first = user.firstName?.[0] || "";
    const last = user.lastName?.[0] || "";
    return (first + last).toUpperCase() || "U";
  };

  // Helper for time ago
  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  };

  // Mock Badges Data
  const badges = [
    { id: 1, name: "Problem Solver", icon: Code, color: "text-blue-500", bg: "bg-blue-500/10", description: "Solved 10+ problems" },
    { id: 2, name: "Streak Master", icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10", description: "7 day streak" },
    { id: 3, name: "Speed Demon", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-500/10", description: "Fast submission" },
    { id: 4, name: "Early Adopter", icon: Star, color: "text-purple-500", bg: "bg-purple-500/10", description: "Joined early" },
  ];

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="relative mb-12">
          {/* Back Button */}
          <div className="absolute top-4 left-4 z-10">
            <Button 
              variant="ghost" 
              size="icon" 
              className="bg-background/50 hover:bg-background/80 backdrop-blur-sm text-foreground rounded-full"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </div>

          {/* Cover Image */}
          <div className="h-48 md:h-64 w-full rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-x"></div>
          
          {/* Profile Info Overlay */}
          <div className="absolute -bottom-16 left-6 md:left-12 flex items-end space-x-6">
            <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-background shadow-xl">
              <AvatarImage src={user.avatar} alt={user.firstName} />
              <AvatarFallback className="text-4xl">{getInitials()}</AvatarFallback>
            </Avatar>
            <div className="mb-4 hidden md:block">
              <h1 className="text-3xl font-bold text-white drop-shadow-md">
                {user?.firstName} {user?.lastName}
              </h1>
            </div>
          </div>
          
          <div className="absolute bottom-4 right-6 hidden md:block">
            <EditProfileDialog user={user} onProfileUpdate={setUser} />
          </div>
        </div>

        {/* Mobile Header Info (visible only on small screens) */}
        <div className="md:hidden mt-16 px-2">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">
                {user?.firstName} {user?.lastName}
              </h1>
            </div>
            <EditProfileDialog user={user} onProfileUpdate={setUser} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: About & Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {user.bio || "No bio provided."}
                </p>
                
                <div className="space-y-3 pt-4">
                  {user.location && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2 text-primary" />
                      {user.location}
                    </div>
                  )}
                  {user.website && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <LinkIcon className="w-4 h-4 mr-2 text-primary" />
                      <a href={user.website} target="_blank" rel="noreferrer" className="hover:underline hover:text-primary transition-colors">
                        {user.website.replace('https://', '').replace('http://', '')}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2 text-primary" />
                    Joined {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <Separator />

                <div className="flex space-x-4 pt-2">
                  {user.socialLinks?.github && (
                    <a href={user.socialLinks.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {user.socialLinks?.linkedin && (
                    <a href={user.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-blue-600 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {user.socialLinks?.twitter && (
                    <a href={user.socialLinks.twitter} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-blue-400 transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  <a href={`mailto:${user.email}`} className="text-muted-foreground hover:text-red-500 transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {user?.skills && user.skills.length > 0 ? (
                    user.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-default">
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No skills listed.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Stats & Activity */}
          <div className="md:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                    <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
                    Global Ranking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    #{user?.solvedStats?.ranking?.toLocaleString() || "N/A"}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Top 5% of users</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                    <Code className="w-4 h-4 mr-2 text-green-500" />
                    Problems Solved
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {user?.solvedStats?.total || 0}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Across all difficulties</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-red-500/10 to-pink-500/10 border-red-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                    <Flame className="w-4 h-4 mr-2 text-red-500" />
                    Current Streak
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {user.solvedStats?.streak || 0} Days
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Keep it up!</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="overview" className="w-full" onValueChange={(value) => {
              if (value === "submissions" && submissions.length === 0) {
                fetchSubmissions();
              }
            }}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="submissions">Submissions</TabsTrigger>
                <TabsTrigger value="badges">Badges</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Problem Solving Stats</CardTitle>
                    <CardDescription>Your progress across different difficulty levels</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-green-500">Easy</span>
                        <span className="text-muted-foreground">{user.solvedStats?.easy || 0} / 500</span>
                      </div>
                      <Progress value={((user.solvedStats?.easy || 0) / 500) * 100} className="h-2 bg-secondary" indicatorClassName="bg-green-500" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-yellow-500">Medium</span>
                        <span className="text-muted-foreground">{user.solvedStats?.medium || 0} / 1000</span>
                      </div>
                      <Progress value={((user.solvedStats?.medium || 0) / 1000) * 100} className="h-2 bg-secondary" indicatorClassName="bg-yellow-500" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-red-500">Hard</span>
                        <span className="text-muted-foreground">{user.solvedStats?.hard || 0} / 300</span>
                      </div>
                      <Progress value={((user.solvedStats?.hard || 0) / 300) * 100} className="h-2 bg-secondary" indicatorClassName="bg-red-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.length > 0 ? (
                        recentActivity.map((activity) => (
                          <div key={activity._id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                            <div className="flex items-center space-x-4">
                              <div className="p-2 bg-secondary rounded-full">
                                <Zap className={`w-4 h-4 ${activity.status === 'ACCEPTED' ? 'text-yellow-500' : 'text-red-500'}`} />
                              </div>
                              <div>
                                <p className="text-sm font-medium">
                                  {activity.status === 'ACCEPTED' ? 'Solved' : 'Attempted'} "{activity.problemId?.title || 'Unknown Problem'}"
                                </p>
                                <p className="text-xs text-muted-foreground">{timeAgo(activity.createdAt)}</p>
                              </div>
                            </div>
                            <Badge 
                              variant="outline" 
                              className={`
                                ${activity.problemId?.difficulty === 'Easy' ? 'text-green-500 border-green-500/20 bg-green-500/10' : ''}
                                ${activity.problemId?.difficulty === 'Medium' ? 'text-yellow-500 border-yellow-500/20 bg-yellow-500/10' : ''}
                                ${activity.problemId?.difficulty === 'Hard' ? 'text-red-500 border-red-500/20 bg-red-500/10' : ''}
                              `}
                            >
                              {activity.problemId?.difficulty || 'Unknown'}
                            </Badge>
                          </div>
                        ))
                      ) : (
                         <div className="flex flex-col items-center justify-center py-6 text-muted-foreground">
                            <p className="text-sm">No recent activity.</p>
                         </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="submissions" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Submissions</CardTitle>
                    <CardDescription>History of your problem submissions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loadingSubmissions ? (
                      <div className="flex justify-center py-8">
                        <Loader2 className="w-6 h-6 animate-spin text-primary" />
                      </div>
                    ) : submissions.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Problem</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Language</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead className="text-right">Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {submissions.map((submission) => (
                            <TableRow key={submission._id}>
                              <TableCell className="font-medium">
                                {submission.problemId?.title || "Unknown Problem"}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  {submission.status === "ACCEPTED" ? (
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                                  ) : (
                                    <XCircle className="w-4 h-4 text-red-500 mr-2" />
                                  )}
                                  <span className={submission.status === "ACCEPTED" ? "text-green-500" : "text-red-500"}>
                                    {submission.status}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>{submission.language}</TableCell>
                              <TableCell>
                                <div className="flex items-center text-muted-foreground">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {submission.time !== "NONE" ? `${submission.time}ms` : "-"}
                                </div>
                              </TableCell>
                              <TableCell className="text-right text-muted-foreground">
                                {new Date(submission.createdAt).toLocaleDateString()}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                        <Code className="w-12 h-12 mb-4 opacity-20" />
                        <p>No submissions found.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="badges" className="mt-6">
                 <Card>
                  <CardHeader>
                    <CardTitle>Earned Badges</CardTitle>
                    <CardDescription>Achievements and milestones</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                       {badges.map((badge) => (
                         <div key={badge.id} className="flex flex-col items-center p-4 border rounded-lg bg-secondary/20 hover:bg-secondary/40 transition-colors text-center">
                           <div className={`w-12 h-12 rounded-full ${badge.bg} flex items-center justify-center mb-3 shadow-sm`}>
                             <badge.icon className={`w-6 h-6 ${badge.color}`} />
                           </div>
                           <span className="text-sm font-medium">{badge.name}</span>
                           <span className="text-xs text-muted-foreground mt-1">{badge.description}</span>
                         </div>
                       ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
