"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Dashboard from "@/components/Dashboard";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const adminToken = Cookies.get("admin_token");
    if (!adminToken) {
      // Redirect to /admin if token exists
      router.push("/");
    }
  }, [router]);

  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default Page;
