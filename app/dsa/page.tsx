"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { dsaModules, DSAModule, Lecture } from "@/data/dsaData";
import Link from "next/link";

export default function DSAPage() {
  // Client state
  const [selectedModuleId, setSelectedModuleId] = useState(dsaModules[0]?.id || "");
  const [activeTab, setActiveTab] = useState<"lectures" | "notes" | "practice">("lectures");
  
  // Selected module
  const selectedModule = useMemo(() => {
    return dsaModules.find((m) => m.id === selectedModuleId) || dsaModules[0];
  }, [selectedModuleId]);

  // Selected lecture in the current module
  const [selectedLectureId, setSelectedLectureId] = useState<string>("");

  const currentLecture = useMemo(() => {
    if (!selectedModule) return null;
    const lectures = selectedModule.lectures;
    if (lectures.length === 0) return null;
    return lectures.find((l) => l.id === selectedLectureId) || lectures[0];
  }, [selectedModule, selectedLectureId]);

  // If selected module changes, reset the selected lecture to the first lecture of the new module
  const handleModuleChange = (id: string) => {
    setSelectedModuleId(id);
    const newModule = dsaModules.find((m) => m.id === id);
    if (newModule && newModule.lectures.length > 0) {
      setSelectedLectureId(newModule.lectures[0].id);
    } else {
      setSelectedLectureId("");
    }
  };

  // Custom Video Player Url input state (allow user to paste YouTube link)
  const [customUrl, setCustomUrl] = useState("");
  const [overrideYoutubeId, setOverrideYoutubeId] = useState<string | null>(null);

  const handleLoadCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl) return;

    // Try to extract youtube video ID
    // Supports: 
    // - https://www.youtube.com/watch?v=VIDEO_ID
    // - https://youtu.be/VIDEO_ID
    // - plain VIDEO_ID
    let videoId = customUrl.trim();
    
    try {
      if (videoId.includes("youtube.com/watch")) {
        const urlParams = new URLSearchParams(new URL(videoId).search);
        videoId = urlParams.get("v") || videoId;
      } else if (videoId.includes("youtu.be/")) {
        videoId = videoId.split("youtu.be/")[1]?.split("?")[0] || videoId;
      } else if (videoId.includes("youtube.com/embed/")) {
        videoId = videoId.split("youtube.com/embed/")[1]?.split("?")[0] || videoId;
      }
    } catch (e) {
      // If parsing fails, fall back to literal string
    }

    if (videoId) {
      setOverrideYoutubeId(videoId);
      setCustomUrl("");
    }
  };

  // Get current active youtube ID (either from custom override or current lecture)
  const activeYoutubeId = useMemo(() => {
    if (overrideYoutubeId) return overrideYoutubeId;
    return currentLecture?.youtubeId || "X2NVOSNBbxU";
  }, [overrideYoutubeId, currentLecture]);

  // Track completed practice problems
  const [completedProblems, setCompletedProblems] = useState<Record<string, boolean>>({});

  const toggleProblemCompleted = (problemTitle: string) => {
    setCompletedProblems((prev) => ({
      ...prev,
      [problemTitle]: !prev[problemTitle]
    }));
  };

  return (
    <div className="flex-1 flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6 md:gap-8">
        
        {/* Course Header Banner */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/60 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase font-extrabold text-indigo-400 tracking-wider">
              <span>Syllabus Category</span>
              <span>•</span>
              <span>AKTU 3rd Semester</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-100 mt-1 font-sans">
              Data Structures and Algorithms (DSA)
            </h1>
            <p className="text-xs md:text-sm text-zinc-400 mt-1.5 font-normal max-w-2xl leading-relaxed">
              Explore key modules designed to teach algorithmic efficiency. Click on modules to view lectures, download revision notes, and solve core interview questions.
            </p>
          </div>

          <Link
            href="/dsa/player"
            className="shrink-0 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-indigo-500/35 bg-indigo-950/20 hover:bg-indigo-900/30 text-indigo-300 hover:text-indigo-200 text-xs md:text-sm font-semibold transition"
          >
            <span>📚</span> Love Babbar DSA Tracker
          </Link>
        </section>

        {/* Desktop Split Layout & Mobile Stack Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar / Modules List (Span 4) */}
          <aside className="lg:col-span-4 flex flex-col gap-4">
            <h3 className="text-xs font-extrabold tracking-widest text-zinc-500 uppercase px-1">
              Modules & Categories
            </h3>
            
            <div className="flex flex-col gap-2.5">
              {dsaModules.map((mod) => {
                const isActive = mod.id === selectedModuleId;
                return (
                  <button
                    key={mod.id}
                    onClick={() => handleModuleChange(mod.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex flex-col gap-2 glass-panel-interactive
                      ${
                        isActive
                          ? "bg-indigo-950/25 border-indigo-500/80 shadow-md shadow-indigo-600/10"
                          : "border-zinc-800/80"
                      }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className={`text-sm font-bold transition-colors ${
                        isActive ? "text-indigo-300" : "text-zinc-300"
                      }`}>
                        {mod.title}
                      </span>
                      <span className="text-[10px] font-semibold text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800/50 shrink-0">
                        {mod.estimatedTime}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed truncate-2-lines font-normal">
                      {mod.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Module Main Panel (Span 8) */}
          <section className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Header info for selected module */}
            <div className="p-6 rounded-2xl glass-panel border border-zinc-800/60 flex flex-col gap-3.5">
              <div>
                <h2 className="text-xl font-bold text-zinc-100">
                  {selectedModule.title}
                </h2>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  {selectedModule.description}
                </p>
              </div>

              {/* Key concepts tags */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-900/60">
                <span className="text-[10px] font-extrabold tracking-wider text-zinc-500 uppercase mr-1">
                  Key Concepts:
                </span>
                {selectedModule.concepts.map((concept, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-bold text-zinc-300 bg-zinc-900 border border-zinc-850 px-2.5 py-1 rounded"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </div>

            {/* TAB Navigation */}
            <div className="flex border-b border-zinc-800/80 gap-6 text-sm font-bold">
              {(["lectures", "notes", "practice"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 capitalize transition-all relative ${
                    activeTab === tab
                      ? "text-indigo-400 border-b-2 border-indigo-500"
                      : "text-zinc-500 hover:text-zinc-350"
                  }`}
                >
                  {tab === "practice" ? "Practice Problems" : tab === "notes" ? "Study Materials" : "Lectures & Player"}
                </button>
              ))}
            </div>

            {/* Tab content area */}
            <div className="min-h-[400px]">
              
              {/* Tab 1: Lectures & Video Player */}
              {activeTab === "lectures" && (
                <div className="flex flex-col gap-6">
                  
                  {/* Dynamic Video Player / Placeholder */}
                  <div className="glass-panel border border-zinc-800/80 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
                    
                    {/* Video Display Area */}
                    <div className="aspect-video w-full bg-zinc-950 relative flex items-center justify-center border-b border-zinc-900">
                      {activeYoutubeId ? (
                        <iframe
                          className="w-full h-full relative z-10"
                          src={`https://www.youtube.com/embed/${activeYoutubeId}?autoplay=0&rel=0`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <div className="text-center p-8 flex flex-col items-center">
                          <span className="text-4xl mb-2">🎥</span>
                          <p className="text-sm text-zinc-400">Video Player Placeholder</p>
                          <p className="text-xs text-zinc-500 mt-1">Select a lecture below or paste a custom URL.</p>
                        </div>
                      )}
                    </div>

                    {/* Metadata & Custom URL Input */}
                    <div className="p-5 flex flex-col gap-4 bg-zinc-950/20">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-bold text-indigo-400 tracking-wide uppercase">
                            Currently Viewing
                          </span>
                          <h4 className="text-base font-bold text-zinc-200 mt-0.5 truncate">
                            {currentLecture?.title || "No Lecture Selected"}
                          </h4>
                          <p className="text-xs text-zinc-400 mt-1">
                            {currentLecture?.description || "Select a lecture from the list to start watching."}
                          </p>
                        </div>

                        {overrideYoutubeId && (
                          <button
                            onClick={() => setOverrideYoutubeId(null)}
                            className="text-xs font-semibold px-2.5 py-1 bg-red-950/20 hover:bg-red-950/40 text-red-400 border border-red-500/20 rounded-md transition self-start"
                          >
                            Reset to Default
                          </button>
                        )}
                      </div>

                      {/* Video URL Placeholder Customizer */}
                      <form onSubmit={handleLoadCustomUrl} className="flex gap-2 border-t border-zinc-900/60 pt-4 items-center">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide shrink-0">
                          Add Youtube URL:
                        </label>
                        <input
                          type="text"
                          placeholder="https://www.youtube.com/watch?v=..."
                          value={customUrl}
                          onChange={(e) => setCustomUrl(e.target.value)}
                          className="flex-grow text-xs px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-300 placeholder-zinc-650 focus:outline-none focus:border-indigo-500/50"
                        />
                        <button
                          type="submit"
                          className="text-xs font-bold px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition"
                        >
                          Load
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Lectures List */}
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xs font-extrabold tracking-widest text-zinc-500 uppercase px-1">
                      Module Lectures ({selectedModule.lectures.length})
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {selectedModule.lectures.map((lec) => {
                        const isActive = currentLecture?.id === lec.id;
                        return (
                          <div
                            key={lec.id}
                            onClick={() => {
                              setSelectedLectureId(lec.id);
                              setOverrideYoutubeId(null); // Clear custom url when changing lectures
                            }}
                            className={`p-4 rounded-xl border text-left cursor-pointer transition flex items-start gap-3 glass-panel-interactive
                              ${
                                isActive
                                  ? "bg-indigo-950/15 border-indigo-500/80 shadow"
                                  : "border-zinc-800/80"
                              }`}
                          >
                            <span className="text-lg shrink-0 mt-0.5">▶️</span>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center w-full">
                                <span className={`text-xs font-extrabold tracking-wider px-1.5 py-0.5 rounded
                                  ${isActive ? "bg-indigo-900/60 text-indigo-300" : "bg-zinc-900 text-zinc-400"}`}>
                                  {lec.duration}
                                </span>
                              </div>
                              <h5 className={`text-sm font-semibold mt-1.5 truncate ${
                                isActive ? "text-indigo-200" : "text-zinc-300"
                              }`}>
                                {lec.title}
                              </h5>
                              <p className="text-xs text-zinc-400 mt-1 font-normal line-clamp-1 leading-normal">
                                {lec.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              )}

              {/* Tab 2: Study Materials */}
              {activeTab === "notes" && (
                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-extrabold tracking-widest text-zinc-500 uppercase px-1">
                    Study Notes & Resources
                  </h3>

                  {selectedModule.resources.length === 0 ? (
                    <div className="p-8 text-center glass-panel border border-zinc-800/60 rounded-xl text-zinc-500 text-sm">
                      No notes available for this module yet.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedModule.resources.map((res, idx) => (
                        <div
                          key={idx}
                          className="p-5 rounded-2xl glass-panel border border-zinc-800/60 bg-zinc-950/20 flex items-center justify-between gap-4 group"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">📝</span>
                            <div>
                              <h4 className="text-sm font-bold text-zinc-200 group-hover:text-white transition">
                                {res.title}
                              </h4>
                              <div className="flex gap-2 items-center mt-1">
                                <span className="text-[10px] font-extrabold uppercase bg-zinc-900 border border-zinc-850 px-1.5 py-0.5 rounded text-zinc-400">
                                  {res.type}
                                </span>
                                {res.size && (
                                  <span className="text-[10px] text-zinc-500 font-semibold">
                                    {res.size}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <a
                            href={res.url}
                            className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-150 transition self-center shrink-0"
                            title="Download Notes"
                          >
                            📥
                          </a>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Notes Placeholder */}
                  <div className="mt-4 p-5 rounded-2xl border border-zinc-850 border-dashed bg-zinc-950/10 text-center flex flex-col items-center justify-center gap-2">
                    <span className="text-2xl">➕</span>
                    <h4 className="text-sm font-bold text-zinc-300">Have notes to contribute?</h4>
                    <p className="text-xs text-zinc-500 max-w-sm">
                      We support collaborative markdown, PDF, or drive link uploads. You can easily insert notes links into the code structure later.
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 3: Practice Problems */}
              {activeTab === "practice" && (
                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-extrabold tracking-widest text-zinc-500 uppercase px-1">
                    LeetCode & GeeksforGeeks Core Problems
                  </h3>

                  {selectedModule.practiceProblems.length === 0 ? (
                    <div className="p-8 text-center glass-panel border border-zinc-800/60 rounded-xl text-zinc-500 text-sm">
                      No practice problems listed for this module yet.
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {selectedModule.practiceProblems.map((prob, idx) => {
                        const isDone = completedProblems[prob.title] || false;
                        
                        return (
                          <div
                            key={idx}
                            className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-4 glass-panel-interactive
                              ${isDone ? "border-emerald-500/20 bg-emerald-950/5" : "border-zinc-800/80"}`}
                          >
                            <div className="flex items-center gap-3">
                              {/* Status Checkbox */}
                              <button
                                onClick={() => toggleProblemCompleted(prob.title)}
                                className={`w-5 h-5 rounded-md flex items-center justify-center border text-xs transition shrink-0
                                  ${
                                    isDone
                                      ? "bg-emerald-600 border-emerald-500 text-white shadow shadow-emerald-600/20"
                                      : "border-zinc-700 hover:border-zinc-500 bg-zinc-900"
                                  }`}
                              >
                                {isDone && "✓"}
                              </button>

                              <div>
                                <h4 className={`text-sm font-bold transition-colors ${
                                  isDone ? "text-zinc-400 line-through" : "text-zinc-200"
                                }`}>
                                  {prob.title}
                                </h4>
                                <span className="text-[10px] text-zinc-500 font-semibold">{prob.platform}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border ${
                                prob.difficulty === "Easy"
                                  ? "bg-emerald-950/40 text-emerald-400 border-emerald-500/20"
                                  : prob.difficulty === "Medium"
                                  ? "bg-amber-950/40 text-amber-400 border-amber-500/20"
                                  : "bg-rose-950/40 text-rose-400 border-rose-500/20"
                              }`}>
                                {prob.difficulty}
                              </span>

                              <a
                                href={prob.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 hover:text-zinc-100 font-bold transition flex items-center gap-1.5"
                              >
                                Solve 🔗
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

            </div>
          </section>

        </div>

      </main>

      <Footer />
    </div>
  );
}
