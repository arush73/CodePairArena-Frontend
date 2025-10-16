"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted text-foreground flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl"
      >
        <Card className="shadow-xl border-muted/40 rounded-2xl backdrop-blur-sm bg-card/70">
          <CardHeader className="text-center space-y-3">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              Contact Us
            </CardTitle>
            <p className="text-muted-foreground">
              We&apos;d love to hear from you! Whether you have a question,
              feedback, or just want to say hello — drop us a message.
            </p>
          </CardHeader>

          <CardContent className="grid md:grid-cols-2 gap-8">
            {/* Left Side — Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <span>support@leetcodeclone.dev</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <span>+91 99999 99999</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Bangalore, India</span>
              </div>
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-5 h-5 text-primary" />
                <span>Let&pos;s build something awesome together 🚀</span>
              </div>
            </div>

            {/* Right Side — Contact Form */}
            <form className="space-y-4">
              <Input placeholder="Your Name" required />
              <Input placeholder="Your Email" type="email" required />
              <Textarea placeholder="Your Message" rows={4} required />
              <Button type="submit" className="w-full font-medium">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      <p className="mt-8 text-sm text-muted-foreground">
        © {new Date().getFullYear()} LeetClone — All rights reserved.
      </p>
    </div>
  );
}
