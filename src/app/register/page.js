"use client";

import AuthImagePattern from "../components/AuthImagePattern";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect, useState } from "react";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { LoaderFour } from "@/components/ui/loader";
import Link from "next/link";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { baseUrl } from "@/lib/axios";

const registerSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[@$!%*?&#]/, "Must contain at least one special character"),
  // name: z.string().min(3, "Name must be atleast 3 character"),
});

export default function Register() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    registerUser,
    isRegistering,
    user,
    checkUser,
    SSOHandler,
    isSSO,
    isRegistrationSuccessfull,
  } = useAuthStore();

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (isRegistrationSuccessfull) router.push("/");
  }, [isRegistrationSuccessfull, router]);

  const handleSSO = async (name) => {
    // await SSOHandler(name);
    if (name === "github") {
      toast("currently not working");
      return;
    }
    
    window.location.href = `${baseUrl}/auth/${name}`;
    // window.location.href = `http://localhost:8080/api/v1/auth/${name}`;
    
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data) => {
    console.log("the function for " + name + " is running fine");
    await registerUser(data);
  };

  return (
    <div className="flex flex-col items-center justify-start ">
      <div className="h-screen grid lg:grid-cols-2">
        <div className="flex flex-col justify-center items-center p-6 sm:p-12">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              {/* <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            
          </div> */}
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold mt-2"
              >
                Welcome{" "}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-base-content/60"
              >
                Sign Up to your account
              </motion.p>
            </div>
          </div>
          <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  placeholder="you@example.com"
                  type="email"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="none"
                  {...register("email", { required: true })}
                  className={`input input-bordered w-full pl-10 ${
                    errors.email ? "input-error" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </LabelInputContainer>

              <LabelInputContainer className="mb-4">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  {...register("password", { required: true })}
                  className={`input input-bordered w-full pl-10 ${
                    errors.password ? "input-error" : ""
                  }
                }`}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </LabelInputContainer>

              <button
                className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                type="submit"
                disabled={isRegistering}
              >
                {!isRegistering ? (
                  "Register"
                ) : (
                  <LoaderFour text="registering" />
                )}
                <BottomGradient />
              </button>
            </motion.div>

            <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex flex-col space-y-4">
                <button
                  className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
                  disabled={isSSO}
                  type="button"
                  onClick={() => handleSSO("github")}
                >
                  <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">
                    GitHub
                  </span>
                  <BottomGradient />
                </button>
                <button
                  className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
                  disabled={isSSO}
                  type="button"
                  onClick={() => handleSSO("google")}
                >
                  <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">
                    Google
                  </span>
                  <BottomGradient />
                </button>
                <div className="text-center">
                  <p className="text-base-content/60">
                    Already have an account?{" "}
                    <Link href="/login" className="link link-primary">
                      Log in
                    </Link>
                  </p>
                </div>
              </div>
            </motion.div>
          </form>
        </div>
        <AuthImagePattern
          title={"Welcome to our platform!"}
          subtitle={
            "Sign up to access our platform and start using our services."
          }
        />
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
