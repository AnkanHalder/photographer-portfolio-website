"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "./Layout";
export default function RouteCheck({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authenticated");
    if (isAuthenticated) {
      setAuthenticated(true);
    } else {
      router.push("/Admin");
    }
  }, []);

  return authenticated ? <Layout>{children}</Layout>:<div>Loading...</div>
}
