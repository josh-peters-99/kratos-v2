"use client";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (!session) return <p>Access Denied</p>;

  return (
    <div>
      <h1>Welcome, {session.user.username}!</h1>
      <button onClick={() => signOut()} className="w-full bg-red text-white px-6 py-3 rounded-full">Sign Out</button>
    </div>
  );
}
