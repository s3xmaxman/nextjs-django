"use client";
import useSWR from "swr";

const WAITLIST_API_URL = "/api/waitlists/";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export default function Home() {
  const { data, error, isLoading } = useSWR(WAITLIST_API_URL, fetcher);
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
