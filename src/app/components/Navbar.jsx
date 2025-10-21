"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
// import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Avatar } from "@/components/ui/avatar";
import { BackgroundGradient } from "@/components/ui/background-gradient";

export default function Some() {
  const router = useRouter();
  const { user, logOut } = useAuthStore();

  const handleLogout = async () => {
    logOut();
  };
  // useEffect(() => {
  //   checkUser();
  // }, []);
  const navItems = [
    {
      name: "problems",
      link: "/problems",
    },
    {
      name: "Pricing",
      link: "/pricing",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <BackgroundGradient className={" rounded-[10px] bg-black"}>
              <NavbarButton
                // onClick={() => {
                //   user ? console.log() : router.push("/login");
                // }}
                className="bg-transparent"
              >
                {/* {!user ? (
                "Login"
              ) : ( */}
                <DropdownMenu className="bg-black">
                  <DropdownMenuTrigger className="" asChild>
                    <Image
                      src={"/defaultUser.svg"}
                      alt={"nahh"}
                      width={20}
                      height={20}
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="start">
                    {user ? (
                      <>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuGroup>
                          <Link href="/profile">
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                          </Link>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                              Invite users
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem>Email</DropdownMenuItem>
                                <DropdownMenuItem>Message</DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuItem disabled>API</DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem onClick={handleLogout}>
                          Log out
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                        <DropdownMenuGroup>
                          <Link href="/login">
                            <DropdownMenuItem>login</DropdownMenuItem>
                          </Link>
                        </DropdownMenuGroup>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* )} */}
              </NavbarButton>
            </BackgroundGradient>

            {/* <NavbarButton variant="primary">Book a call</NavbarButton> */}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        {/* <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Login
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Book a call
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav> */}
      </Navbar>
      <DummyContent />
      {/* Navbar */}
    </div>
  );
}

const DummyContent = () => {
  return <div className="container mx-auto p-2"></div>;
};
