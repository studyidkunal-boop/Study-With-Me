"use client";

import { useMemo, useState } from "react";
import { videos } from "@/data/videos";

export default function Home() {
  const orderedVideos = useMemo(() => {
    return [...videos]
      .filter((v) => v.title && v.id) // remove null title
      .sort((a, b) => {
        const getNo = (title: string) => {
          if (title.includes("Complete Series")) return 0;

          const m = title.match(/Lecture\s*(\d+)/i);

          return m ? Number(m[1]) : 9999;
        };

        return getNo(a.title!) - getNo(b.title!);
      });
  }, []);

  const [current, setCurrent] = useState(orderedVideos[0]);

  return (
    <div className="h-screen bg-zinc-950 text-white flex">

      {/* Sidebar */}
      <aside className="w-96 border-r border-zinc-800 flex flex-col">

        <div className="p-5 border-b border-zinc-800">
          <h1 className="text-2xl font-bold">
            📚 Love Babbar DSA
          </h1>

          <p className="text-zinc-400 mt-1">
            {orderedVideos.length} Lectures
          </p>
        </div>

        <div className="overflow-y-auto flex-1">

          {orderedVideos.map((video) => {

            const lecture = video.title?.match(/Lecture\s*(\d+)/i);

            return (
              <button
                key={video.id}
                onClick={() => setCurrent(video)}
                className={`w-full text-left p-4 border-b border-zinc-800 transition
                ${
                  current.id === video.id
                    ? "bg-blue-600"
                    : "hover:bg-zinc-800"
                }`}
              >

                <div className="text-xs text-zinc-400">
                  {lecture
                    ? `Lecture ${lecture[1]}`
                    : "Introduction"}
                </div>

                <div className="mt-1 text-sm">
                  {video.title
                    ?.replace(/Lecture\s*\d+:\s*/i, "")
                    .replace(/\|\|.*/, "")
                    .trim()}
                </div>

              </button>
            );
          })}

        </div>

      </aside>

      {/* Player */}

      <main className="flex-1 p-8">

        <h2 className="text-3xl font-bold mb-5">
          {current.title}
        </h2>

        <div className="rounded-xl overflow-hidden shadow-xl border border-zinc-800">

          <iframe
            className="w-full aspect-video"
            src={`https://www.youtube.com/embed/${current.id}`}
            allowFullScreen
          />

        </div>

      </main>

    </div>
  );
}