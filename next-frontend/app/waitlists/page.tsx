"use client";
import { useAuth } from "@/components/authProvider";
import { useEffect } from "react";
import useSWR from "swr";

const WAITLIST_API_URL = "/api/waitlists/";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export default function Page() {
  const auth = useAuth();
  const { data, error, isLoading } = useSWR(WAITLIST_API_URL, fetcher);

  useEffect(() => {
    if (error?.status === 401) {
      auth.loginRequiredRedirect();
    }
  }, [auth, error]);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <p>{JSON.stringify(data)}</p>
      </div>
    </main>
  );
}
