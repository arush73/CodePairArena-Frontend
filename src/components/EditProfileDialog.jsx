"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit2, Loader2 } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";

const profileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  bio: z.string().max(250, "Bio must be less than 250 characters").optional(),
  location: z.string().optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  github: z.string().url("Invalid URL").optional().or(z.literal("")),
  linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
  twitter: z.string().url("Invalid URL").optional().or(z.literal("")),
  skills: z.string().optional(), // Comma separated string for input
});

export function EditProfileDialog({ user, onProfileUpdate }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      bio: "",
      location: "",
      website: "",
      github: "",
      linkedin: "",
      twitter: "",
      skills: "",
    },
  });

  // Update form values when user prop changes
  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        bio: user.bio || "",
        location: user.location || "",
        website: user.website || "",
        github: user.socialLinks?.github || "",
        linkedin: user.socialLinks?.linkedin || "",
        twitter: user.socialLinks?.twitter || "",
        skills: user.skills?.join(", ") || "",
      });
    }
  }, [user, form]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Transform skills string back to array
      const formattedData = {
        ...data,
        skills: data.skills.split(",").map((s) => s.trim()).filter(Boolean),
        socialLinks: {
          github: data.github,
          linkedin: data.linkedin,
          twitter: data.twitter,
        },
      };

      // Remove flat social fields
      delete formattedData.github;
      delete formattedData.linkedin;
      delete formattedData.twitter;

      const response = await axiosInstance.patch("/profile", formattedData);

      toast.success("Profile updated successfully");
      onProfileUpdate(response.data.data);
      setOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="shadow-lg hover:bg-white/90">
          <Edit2 className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" {...form.register("firstName")} />
              {form.formState.errors.firstName && (
                <p className="text-sm text-red-500">{form.formState.errors.firstName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" {...form.register("lastName")} />
              {form.formState.errors.lastName && (
                <p className="text-sm text-red-500">{form.formState.errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" {...form.register("bio")} />
            {form.formState.errors.bio && (
              <p className="text-sm text-red-500">{form.formState.errors.bio.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" {...form.register("location")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" {...form.register("website")} placeholder="https://..." />
              {form.formState.errors.website && (
                <p className="text-sm text-red-500">{form.formState.errors.website.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Social Links</Label>
            <div className="grid gap-2">
              <div className="space-y-1">
                <Input {...form.register("github")} placeholder="GitHub URL" />
                {form.formState.errors.github && (
                  <p className="text-sm text-red-500">{form.formState.errors.github.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <Input {...form.register("linkedin")} placeholder="LinkedIn URL" />
                {form.formState.errors.linkedin && (
                  <p className="text-sm text-red-500">{form.formState.errors.linkedin.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <Input {...form.register("twitter")} placeholder="Twitter URL" />
                {form.formState.errors.twitter && (
                  <p className="text-sm text-red-500">{form.formState.errors.twitter.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Skills (comma separated)</Label>
            <Input id="skills" {...form.register("skills")} placeholder="React, Node.js, Python" />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
