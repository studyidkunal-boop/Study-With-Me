"use client";

import { useMemo, useState, useEffect } from "react";
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

  const [current, setCurrent] = useState(orderedVideos[0] || null);
  const [completedVideos, setCompletedVideos] = useState<string[]>([]);
  const [bookmarkedVideos, setBookmarkedVideos] = useState<string[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "completed" | "pending" | "bookmarked">("all");
  const [currentNote, setCurrentNote] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSavedIndicator, setIsSavedIndicator] = useState(false);

  // Load from localStorage
  useEffect(() => {
    setMounted(true);
    const savedCompleted = localStorage.getItem("dsa_completed");
    if (savedCompleted) setCompletedVideos(JSON.parse(savedCompleted));

    const savedBookmarked = localStorage.getItem("dsa_bookmarked");
    if (savedBookmarked) setBookmarkedVideos(JSON.parse(savedBookmarked));

    const savedNotes = localStorage.getItem("dsa_notes");
    if (savedNotes) setNotes(JSON.parse(savedNotes));
  }, []);

  // Update selected video if data changes
  useEffect(() => {
    if (orderedVideos.length > 0 && !current) {
      setCurrent(orderedVideos[0]);
    }
  }, [orderedVideos, current]);

  // Load note for current video
  useEffect(() => {
    if (current && notes) {
      setCurrentNote(notes[current.id] || "");
    }
  }, [current, notes]);

  const handleNoteChange = (val: string) => {
    if (!current) return;
    setCurrentNote(val);
    const updatedNotes = { ...notes, [current.id]: val };
    setNotes(updatedNotes);
    localStorage.setItem("dsa_notes", JSON.stringify(updatedNotes));
    
    // Show a temporary "Saved" badge
    setIsSavedIndicator(true);
    const timer = setTimeout(() => setIsSavedIndicator(false), 800);
    return () => clearTimeout(timer);
  };

  const toggleCompleted = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = completedVideos.includes(id)
      ? completedVideos.filter((vId) => vId !== id)
      : [...completedVideos, id];
    setCompletedVideos(updated);
    localStorage.setItem("dsa_completed", JSON.stringify(updated));
  };

  const toggleBookmarked = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = bookmarkedVideos.includes(id)
      ? bookmarkedVideos.filter((vId) => vId !== id)
      : [...bookmarkedVideos, id];
    setBookmarkedVideos(updated);
    localStorage.setItem("dsa_bookmarked", JSON.stringify(updated));
  };

  const selectVideo = (video: typeof orderedVideos[0]) => {
    setCurrent(video);
    setIsSidebarOpen(false);
  };

  const exportNotes = () => {
    const text = Object.entries(notes)
      .map(([id, noteText]) => {
        const video = orderedVideos.find((v) => v.id === id);
        return `### ${video?.title || id}\n\n${noteText}\n\n---\n`;
      })
      .join("\n");
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "DSA_Course_Notes.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  // Filter video list
  const filteredVideos = useMemo(() => {
    return orderedVideos.filter((v) => {
      const titleLower = v.title?.toLowerCase() || "";
      const matchesSearch = titleLower.includes(search.toLowerCase());

      if (filter === "completed") {
        return matchesSearch && completedVideos.includes(v.id);
      }
      if (filter === "pending") {
        return matchesSearch && !completedVideos.includes(v.id);
      }
      if (filter === "bookmarked") {
        return matchesSearch && bookmarkedVideos.includes(v.id);
      }
      return matchesSearch;
    });
  }, [orderedVideos, search, filter, completedVideos, bookmarkedVideos]);

  const progressPercent = useMemo(() => {
    if (orderedVideos.length === 0) return 0;
    return Math.round((completedVideos.length / orderedVideos.length) * 100);
  }, [completedVideos, orderedVideos]);

  if (!mounted) {
    return (
      <div className="h-screen bg-[#06060c] flex flex-col items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
        <p className="text-zinc-400 font-medium">Booting Workspace...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-white flex flex-col md:flex-row relative">
      
      {/* Mobile Navigation Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-zinc-950/70 border-b border-zinc-800/80 backdrop-blur-md sticky top-0 z-40">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-sm px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 transition"
        >
          {isSidebarOpen ? "✕ Close" : "☰ Lectures"}
        </button>
        <span className="font-bold text-sm bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent glow-text-indigo">
          Love Babbar DSA
        </span>
        <span className="text-xs text-zinc-400 font-semibold bg-zinc-900 px-2.5 py-1 rounded-full border border-zinc-800">
          {completedVideos.length}/{orderedVideos.length} Done
        </span>
      </header>

      {/* Backdrop for mobile menu */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar Panel */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-30 w-80 md:w-96 glass-panel border-r border-zinc-800/60 flex flex-col transform transition-transform duration-300 md:relative md:translate-x-0
          ${isSidebarOpen ? "translate-x-0 top-[57px] md:top-0 h-[calc(100vh-57px)] md:h-screen" : "-translate-x-full md:translate-x-0 h-screen"}
        `}
      >
        <div className="p-5 border-b border-zinc-800/50 bg-zinc-950/20">
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-300 via-indigo-100 to-purple-300 bg-clip-text text-transparent flex items-center gap-2">
            <span>📚</span> Love Babbar Java DSA
          </h1>
          
          {/* Progress Section */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-zinc-400 mb-1.5 font-medium">
              <span>Course Progress</span>
              <span>{progressPercent}% ({completedVideos.length}/{orderedVideos.length})</span>
            </div>
            <div className="w-full bg-zinc-900 rounded-full h-2 border border-zinc-800/50 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Search bar */}
          <div className="mt-4 relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500 text-sm">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search lectures..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-zinc-900/60 border border-zinc-800 rounded-lg text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500/80 transition"
            />
          </div>

          {/* Filter Navigation */}
          <div className="flex gap-1 mt-4 p-1 bg-zinc-950/60 rounded-lg border border-zinc-800/80 text-xs font-semibold">
            {(["all", "completed", "pending", "bookmarked"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`flex-1 py-1.5 rounded-md capitalize transition ${
                  filter === t
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Video items list */}
        <div className="overflow-y-auto flex-1 divide-y divide-zinc-900/40">
          {filteredVideos.length === 0 ? (
            <div className="p-8 text-center text-zinc-500 text-sm">
              No lectures found
            </div>
          ) : (
            filteredVideos.map((video) => {
              const lectureMatch = video.title?.match(/Lecture\s*(\d+)/i);
              const cleanTitle = video.title
                ?.replace(/Lecture\s*\d+:\s*/i, "")
                .replace(/\|\|.*/, "")
                .trim();
              const isCompleted = completedVideos.includes(video.id);
              const isBookmarked = bookmarkedVideos.includes(video.id);
              const isActive = current?.id === video.id;

              return (
                <div
                  key={video.id}
                  onClick={() => selectVideo(video)}
                  className={`w-full text-left p-4 flex items-start gap-3 cursor-pointer transition-all duration-200 relative group
                  ${
                    isActive
                      ? "bg-indigo-950/25 border-l-2 border-indigo-500"
                      : "hover:bg-zinc-900/35 border-l-2 border-transparent"
                  }`}
                >
                  {/* Status Checkbox */}
                  <button
                    onClick={(e) => toggleCompleted(video.id, e)}
                    className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border text-xs transition-colors shrink-0
                      ${
                        isCompleted
                          ? "bg-indigo-600 border-indigo-500 text-white shadow shadow-indigo-600/20"
                          : "border-zinc-700 hover:border-zinc-500 bg-zinc-900/60"
                      }`}
                  >
                    {isCompleted && "✓"}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded
                        ${
                          isActive 
                            ? "bg-indigo-900/60 text-indigo-300"
                            : "bg-zinc-800/80 text-zinc-400"
                        }`}>
                        {lectureMatch ? `Lec ${lectureMatch[1]}` : "Intro"}
                      </span>
                    </div>

                    <p className={`mt-1.5 text-sm font-medium leading-relaxed truncate-2-lines transition-colors
                      ${isActive ? "text-indigo-200" : "text-zinc-300 group-hover:text-zinc-100"}`}>
                      {cleanTitle}
                    </p>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => toggleBookmarked(video.id, e)}
                    className={`mt-0.5 p-1 rounded-lg text-sm transition-colors opacity-60 hover:opacity-100 hover:bg-zinc-800 shrink-0
                      ${isBookmarked ? "text-amber-400 opacity-100" : "text-zinc-500"}`}
                  >
                    ★
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Sync Status / Info Footer */}
        <div className="p-3 bg-zinc-950/30 border-t border-zinc-800/40 text-center text-[10px] text-zinc-500 font-semibold tracking-wider uppercase">
          ⚡ auto-saved to local workspace
        </div>
      </aside>

      {/* Video Player & Notes Area */}
      {current ? (
        <main className="flex-1 p-4 md:p-8 flex flex-col gap-6 md:gap-8 overflow-y-auto max-w-7xl mx-auto w-full">
          
          {/* Header Info */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/50 pb-5">
            <div>
              <span className="text-xs uppercase font-extrabold text-indigo-400 tracking-wider">
                Now Playing
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-zinc-100 mt-1 font-sans">
                {current.title}
              </h2>
            </div>
            
            {/* Quick Actions */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={(e) => toggleCompleted(current.id, e as any)}
                className={`flex items-center gap-2 text-sm px-4 py-2 rounded-xl border transition-all duration-200 font-medium
                  ${
                    completedVideos.includes(current.id)
                      ? "bg-indigo-600/15 border-indigo-500 text-indigo-300 font-bold"
                      : "bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200"
                  }`}
              >
                <span>{completedVideos.includes(current.id) ? "✓ Completed" : "Mark Complete"}</span>
              </button>
              
              <button
                onClick={(e) => toggleBookmarked(current.id, e as any)}
                className={`flex items-center gap-1 text-sm px-4 py-2 rounded-xl border transition-all duration-200 font-medium
                  ${
                    bookmarkedVideos.includes(current.id)
                      ? "bg-amber-500/15 border-amber-500/50 text-amber-400 font-bold"
                      : "bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-zinc-500"
                  }`}
                title="Bookmark Lecture"
              >
                ★ <span className="hidden sm:inline">Bookmark</span>
              </button>
            </div>
          </div>

          {/* Iframe Video Container */}
          <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl border border-zinc-800/80 aspect-video relative group">
            <iframe
              className="w-full h-full relative z-10"
              src={`https://www.youtube.com/embed/${current.id}?autoplay=0&rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Study Notes Section */}
          <section className="glass-panel border border-zinc-800/80 rounded-2xl p-5 md:p-6 shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">📝</span>
                <div>
                  <h3 className="font-bold text-base text-zinc-100">Study Notes</h3>
                  <p className="text-xs text-zinc-500 font-medium">Notes are saved automatically for this lecture</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {isSavedIndicator && (
                  <span className="text-[11px] text-emerald-400 font-bold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20 animate-fade-in-out">
                    Saved
                  </span>
                )}
                <button
                  onClick={exportNotes}
                  className="text-xs font-semibold px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition"
                >
                  📥 Export All Notes
                </button>
              </div>
            </div>

            <textarea
              className="w-full min-h-[160px] bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/60 leading-relaxed transition"
              placeholder="Jot down notes, code snippets, algorithms, and key insights here..."
              value={currentNote}
              onChange={(e) => handleNoteChange(e.target.value)}
            />
          </section>

        </main>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-zinc-500">
          <p className="text-lg">No video selected</p>
          <p className="text-sm mt-1">Select a lecture from the sidebar to start studying.</p>
        </div>
      )}

    </div>
  );
}