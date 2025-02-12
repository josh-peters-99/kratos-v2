"use client";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (!session) return <p>Access Denied</p>;

  return (
    <section className="px-5 bg-black">

      {/* !!!MAKE THIS A COMPONENT!!! Most Recent Workout */}
      <div className="w-full flex flex-col pt-10">
        <h1 className="font-bold text-lg text-white">Most Recent Workout</h1>
        <div className="flex w-full justify-between mt-2 bg-black p-5 rounded-lg items-center h-fit shadow-sm shadow-auburn">
          <div className="bg-auburn rounded-full p-2 flex items-center">
            <img src="/chest.png" className="w-8 h-8" />
          </div>
          <div className="flex flex-col flex-grow px-4 justify-start">
            <p className="font-thin text-white text-sm">January 15, 2025</p>
            <h2 className="text-white font-bold text-xl">Difficult Push Day</h2>
          </div>
          <div className="bg-gray flex items-center h-fit p-1 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6 fill-current text-black">
              <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="w-full border-b border-gray my-10"></div>

      {/* Goal Progress Chart */}
      <div className="w-full flex flex-col h-fit">
        <h1 className="font-bold text-lg text-white">Goals</h1>

        <div className="flex w-full justify-between text-white text-sm mt-3">
          <div className="bg-auburn px-2 py-1 rounded-full">
            Bench Press
          </div>
          <div>
            Pull-ups
          </div>
          <div>
            Squat
          </div>
          <div>
            Deadlift
          </div>
        </div>
      </div>

      <div className="w-full border-b border-gray my-10"></div>

      {/* Feed */}
      <div className="w-full h-fit">
        <h1 className="font-bold text-lg text-white">Workout Feed</h1>
      </div>

    </section>
  );
}
