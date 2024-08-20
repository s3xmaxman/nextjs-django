"use client";

import useSWR from "swr";
import { useAuth } from "@/components/authProvider";
import { ThemeToggleButton } from "@/components/themeToggleButton";
import WaitlistForm from "./waitlists/forms";
import fetcher from "@/lib/fetcher";

export default function Home() {
  const auth = useAuth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div />
      <div>
        <WaitlistForm />
      </div>
      <div>
        {auth.isAuthenticated ? `Hello ${auth.username}` : "Hello guest"}
      </div>
      <div>
        <ThemeToggleButton />
      </div>
    </main>
  );
}
