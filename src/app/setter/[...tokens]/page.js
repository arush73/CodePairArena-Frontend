"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { LoaderFour } from "@/components/ui/loader";
const Page = () => {
  const params = useParams();
const router = useRouter()
  const accessToken = params.tokens[0];
  const refreshToken = params.tokens[1];

  useEffect(() => {
    if (
      accessToken !== null &&
      accessToken !== undefined &&
      refreshToken !== null &&
      accessToken !== undefined
    ) {
      // console.log("Setting the access token: ", accessToken)
      // const expirationDate = new Date();
      // expirationDate.setDate(expirationDate.getDate() + 7);
      // document.cookie =
      //   "accessToken=" +
      //   accessToken +
      //   "; expires=" +
      //   expirationDate.toUTCString() +
      //   "; path=/";
      axiosInstance.post("/auth/cookie-setter", {
        accessToken,
        refreshToken,
      });
    }

    if (false) {
      console.log("Setting the refresh token: ", refreshToken);
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);
      document.cookie =
        "refreshToken=" +
        refreshToken +
        "; expires=" +
        expirationDate.toUTCString() +
        "; path=/";
    }

    console.log("This is the accessToken: (from useEffect)", accessToken);
    console.log("This is the refreshToken: (from useEffect)", refreshToken);

    router.replace("/");
  }, [accessToken, refreshToken]);

  return <div><LoaderFour/></div>;
};

export default Page;
