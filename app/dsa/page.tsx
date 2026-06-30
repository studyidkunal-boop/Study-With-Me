"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { videos as babbarVideos } from "@/data/videos";
import { striverVideos } from "@/data/striverVideos";

// Striver Roadmap modules
const STRIVER_SHEET = "https://dsa-sheet-all.vercel.app/";
const STRIVER_PLAYLIST = "https://youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz";

interface StriverModule {
  id: string;
  title: string;
  problemsCount: number;
  youtubeUrl: string;
  sheetUrl: string;
}

const striverModules: StriverModule[] = [
  { id: "str-basics", title: "1. Learn the Basics (Maths, Recursion, STL)", problemsCount: 15, youtubeUrl: STRIVER_PLAYLIST, sheetUrl: STRIVER_SHEET },
  { id: "str-sort", title: "2. Sorting Techniques", problemsCount: 7, youtubeUrl: STRIVER_PLAYLIST, sheetUrl: STRIVER_SHEET },
  { id: "str-arrays", title: "3. Arrays", problemsCount: 40, youtubeUrl: STRIVER_PLAYLIST, sheetUrl: STRIVER_SHEET },
  { id: "str-bs", title: "4. Binary Search", problemsCount: 30, youtubeUrl: STRIVER_PLAYLIST, sheetUrl: STRIVER_SHEET },
  { id: "str-strings", title: "5. Strings", problemsCount: 15, youtubeUrl: STRIVER_PLAYLIST, sheetUrl: STRIVER_SHEET },
  { id: "str-ll", title: "6. Linked List", problemsCount: 25, youtubeUrl: STRIVER_PLAYLIST, sheetUrl: STRIVER_SHEET },
  { id: "str-recursion", title: "7. Recursion & Backtracking", problemsCount: 20, youtubeUrl: STRIVER_PLAYLIST, sheetUrl: STRIVER_SHEET },
  { id: "str-bit", title: "8. Bit Manipulation", problemsCount: 12, youtubeUrl: STRIVER_PLAYLIST, sheetUrl: STRIVER_SHEET },
  { id: "str-stack", title: "9. Stack & Queue", problemsCount: 22, youtubeUrl: STRIVER_PLAYLIST, sheetUrl: STRIVER_SHEET },
  { id: "str-sliding", title: "10. Sliding Window & Two Pointer", problemsCount: 12, youtubeUrl: STRIVER_PLAYLIST, sheetUrl: STRIVER_SHEET },
  { id: "str-heap", title: "11. Heap & Priority Queue", problemsCount: 15, youtubeUrl: STRIVER_PLAYLIST, sheetUrl: STRIVER_SHEET },
  { id: "str-greedy", title: "12. Greedy Algorithms", problemsCount: 15, youtubeUrl: STRIVER_PLAYLIST, sheetUrl: STRIVER_SHEET },
  { id: "str-trees", title: "13. Binary Trees", problemsCount: 35, youtubeUrl: STRIVER_PLAYLIST, sheetUrl: STRIVER_SHEET },
  { id: "str-bst", title: "14. Binary Search Trees", problemsCount: 15, youtubeUrl: STRIVER_PLAYLIST, sheetUrl: STRIVER_SHEET },
  { id: "str-graphs", title: "15. Graphs", problemsCount: 30, youtubeUrl: STRIVER_PLAYLIST, sheetUrl: STRIVER_SHEET },
  { id: "str-dp", title: "16. Dynamic Programming", problemsCount: 50, youtubeUrl: STRIVER_PLAYLIST, sheetUrl: STRIVER_SHEET },
  { id: "str-trie", title: "17. Trie", problemsCount: 7, youtubeUrl: STRIVER_PLAYLIST, sheetUrl: STRIVER_SHEET }
];

// Love Babbar Sheet topics
interface BabbarTopic {
  id: string;
  name: string;
  problemsCount: number;
}

const babbarTopics: BabbarTopic[] = [
  { id: "bab-array", name: "Arrays & Sorting", problemsCount: 36 },
  { id: "bab-matrix", name: "Matrix Grid Space", problemsCount: 10 },
  { id: "bab-string", name: "Strings Analysis", problemsCount: 43 },
  { id: "bab-searchsort", name: "Searching & Sorting", problemsCount: 36 },
  { id: "bab-linkedlist", name: "Linked Lists structures", problemsCount: 36 },
  { id: "bab-bt", name: "Binary Trees", problemsCount: 35 },
  { id: "bab-bst", name: "Binary Search Trees", problemsCount: 22 },
  { id: "bab-greedy", name: "Greedy Allocations", problemsCount: 35 },
  { id: "bab-backtracking", name: "Backtracking & Recursion", problemsCount: 19 },
  { id: "bab-stackqueue", name: "Stacks & Queues", problemsCount: 38 },
  { id: "bab-heap", name: "Heaps / Priority Queues", problemsCount: 18 },
  { id: "bab-graph", name: "Graph traversals", problemsCount: 44 },
  { id: "bab-trie", name: "Tries & Trees", problemsCount: 6 },
  { id: "bab-dp", name: "Dynamic Programming", problemsCount: 60 },
  { id: "bab-bit", name: "Bit Manipulation", problemsCount: 10 }
];

// Other creator playlists
interface CreatorPlaylist {
  id: string;
  creator: string;
  title: string;
  description: string;
  url: string;
  icon: string;
}

const creatorPlaylists: CreatorPlaylist[] = [
  { id: "cre-neetcode", creator: "NeetCode", title: "NeetCode 150 Roadmap", description: "Curated 150 LeetCode problems covering all major structures, sorted by clean dependency trees.", url: "https://neetcode.io/practice", icon: "🚀" },
  { id: "cre-kunal", creator: "Kunal Kushwaha", title: "Java DSA Bootcamp", description: "Complete Git, Java, and DSA tutorials with comprehensive assignments and open source contributions.", url: "https://www.youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ", icon: "🎓" },
  { id: "cre-verma", creator: "Aditya Verma", title: "Dynamic Programming Playlist", description: "The most clear and detailed explanations of Dynamic Programming, recursion trees, and knapsacks.", url: "https://www.youtube.com/playlist?list=PL_z_8CaSLPWekqgliFrnawHwM27CSu57t", icon: "📊" },
  { id: "cre-gatesmashers", creator: "Gate Smashers", title: "DSA Course Playlists", description: "Excellent visual explanations of data structure fundamentals, graph matrices, and sort algorithms.", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiEwaANOg3uBxsjybGPclrF7", icon: "💻" }
];

export default function DSADashboard() {
  const [mounted, setMounted] = useState(false);
  
  // Tab states: maps to sheet trackers
  const [activeTab, setActiveTab] = useState<"striver" | "babbar" | "other">("striver");
  
  // Choose Mentor State
  const [preferredMentor, setPreferredMentor] = useState<"babbar" | "striver">("babbar");
  
  // States loaded from local storage
  const [striverSheetCompleted, setStriverSheetCompleted] = useState<string[]>([]);
  const [babbarSheetCompleted, setBabbarSheetCompleted] = useState<string[]>([]);
  const [creatorStatus, setCreatorStatus] = useState<Record<string, "Not Started" | "In Progress" | "Completed">>({});
  
  // Lecture completion lists
  const [babbarCompleted, setBabbarCompleted] = useState<string[]>([]);
  const [striverCompleted, setStriverCompleted] = useState<string[]>([]);

  // Load from local storage
  useEffect(() => {
    setMounted(true);
    
    // Mentor Selection
    const savedMentor = localStorage.getItem("preferred_dsa_teacher") as "babbar" | "striver" | null;
    if (savedMentor) {
      setPreferredMentor(savedMentor);
      // Auto reopen selection: sets active tab/roadmap view to match preference
      setActiveTab(savedMentor === "babbar" ? "babbar" : "striver");
    }

    // Checkoff progressions
    const savedStriverSheet = localStorage.getItem("dsa_striver_progress");
    if (savedStriverSheet) setStriverSheetCompleted(JSON.parse(savedStriverSheet));

    const savedBabbarSheet = localStorage.getItem("dsa_babbar_sheet_progress");
    if (savedBabbarSheet) setBabbarSheetCompleted(JSON.parse(savedBabbarSheet));

    const savedCreators = localStorage.getItem("dsa_creator_playlists");
    if (savedCreators) setCreatorStatus(JSON.parse(savedCreators));

    // Lecture completions
    const savedBabbarComp = localStorage.getItem("babbar_completed");
    if (savedBabbarComp) setBabbarCompleted(JSON.parse(savedBabbarComp));

    const savedStriverComp = localStorage.getItem("striver_completed");
    if (savedStriverComp) setStriverCompleted(JSON.parse(savedStriverComp));
    
    // Set active mode in storage
    localStorage.setItem("student_active_mode", "DSA");
  }, []);

  // Handlers
  const handleSelectMentor = (mentor: "babbar" | "striver") => {
    setPreferredMentor(mentor);
    localStorage.setItem("preferred_dsa_teacher", mentor);
    setActiveTab(mentor === "babbar" ? "babbar" : "striver");
  };

  const handleToggleStriverSheet = (moduleId: string) => {
    const updated = striverSheetCompleted.includes(moduleId)
      ? striverSheetCompleted.filter((id) => id !== moduleId)
      : [...striverSheetCompleted, moduleId];
    setStriverSheetCompleted(updated);
    localStorage.setItem("dsa_striver_progress", JSON.stringify(updated));
  };

  const handleToggleBabbarSheet = (topicId: string) => {
    const updated = babbarSheetCompleted.includes(topicId)
      ? babbarSheetCompleted.filter((id) => id !== topicId)
      : [...babbarSheetCompleted, topicId];
    setBabbarSheetCompleted(updated);
    localStorage.setItem("dsa_babbar_sheet_progress", JSON.stringify(updated));
  };

  const handleChangeCreatorStatus = (playlistId: string, status: "Not Started" | "In Progress" | "Completed") => {
    const updated = { ...creatorStatus, [playlistId]: status };
    setCreatorStatus(updated);
    localStorage.setItem("dsa_creator_playlists", JSON.stringify(updated));
  };

  // Dynamic progress calculations
  const babbarProgressPercent = useMemo(() => {
    if (babbarVideos.length === 0) return 0;
    return Math.round((babbarCompleted.length / babbarVideos.length) * 100);
  }, [babbarCompleted]);

  const striverProgressPercent = useMemo(() => {
    if (striverVideos.length === 0) return 0;
    return Math.round((striverCompleted.length / striverVideos.length) * 100);
  }, [striverCompleted]);

  const striverSheetPercent = useMemo(() => {
    if (striverModules.length === 0) return 0;
    return Math.round((striverSheetCompleted.length / striverModules.length) * 100);
  }, [striverSheetCompleted]);

  const babbarSheetPercent = useMemo(() => {
    if (babbarTopics.length === 0) return 0;
    return Math.round((babbarSheetCompleted.length / babbarTopics.length) * 100);
  }, [babbarSheetCompleted]);

  if (!mounted) {
    return (
      <div className="flex-1 flex flex-col min-h-screen bg-zinc-950">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full border-t-2 border-indigo-500 border-r-2 animate-spin" />
            <span className="text-sm font-semibold text-zinc-500">Loading DSA Trackers...</span>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-10">
        
        {/* Header Block */}
        <section className="border-b border-zinc-900 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-sm self-start">
              🚀 Coding Practice Dashboard
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-100 mt-2 font-sans">
              DSA Tracks & Roadmaps
            </h1>
            <p className="text-sm text-zinc-400 max-w-2xl font-normal leading-relaxed">
              Track problem sheets, explore famous creator checklists, and monitor your algorithm design skills.
            </p>
          </div>

          {/* Quick resume link to preferred player */}
          <Link
            href={preferredMentor === "babbar" ? "/dsa/player" : "/dsa/striver-player"}
            className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl border border-indigo-500/35 bg-indigo-950/20 hover:bg-indigo-900/30 text-indigo-300 hover:text-indigo-200 text-xs md:text-sm font-extrabold transition shadow-lg shadow-indigo-950 cursor-pointer"
          >
            <span>🎥</span> Resume Preferred Mentor Class
          </Link>
        </section>

        {/* MENTOR SELECTOR (Requirement 6) */}
        <section className="p-6 rounded-2xl glass-panel border border-zinc-800 bg-zinc-950/20 shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-sm font-extrabold text-zinc-200 uppercase tracking-wider">Choose Your DSA Mentor</h3>
            <p className="text-xs text-zinc-500 mt-0.5">Select a mentor. This preference will open automatically on next load.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSelectMentor("babbar")}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold tracking-wide transition-all cursor-pointer ${
                preferredMentor === "babbar"
                  ? "bg-indigo-600 text-white shadow shadow-indigo-650/20 scale-[1.02]"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Love Babbar
            </button>
            <button
              onClick={() => handleSelectMentor("striver")}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold tracking-wide transition-all cursor-pointer ${
                preferredMentor === "striver"
                  ? "bg-purple-650 text-white shadow shadow-purple-650/20 scale-[1.02]"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Striver
            </button>
          </div>
        </section>

        {/* DSA CARDS GRID (Requirement 11) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Babbar card */}
          <div className="p-6 rounded-2xl glass-panel border border-zinc-850 bg-zinc-950/25 flex flex-col justify-between h-[190px] relative overflow-hidden group hover:border-indigo-500/20 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-indigo-500/5 blur-xl group-hover:bg-indigo-500/10 transition" />
            <div>
              <h3 className="text-lg font-extrabold text-zinc-100">Love Babbar DSA</h3>
              <p className="text-xs text-zinc-400 font-bold mt-1">150+ Lectures</p>
            </div>
            
            <div className="w-full">
              <div className="flex justify-between items-center text-[10px] font-bold text-zinc-500 uppercase mb-1">
                <span>Progress {babbarProgressPercent}%</span>
                <span>{babbarCompleted.length}/{babbarVideos.length} Completed</span>
              </div>
              <div className="w-full bg-zinc-900 rounded-full h-2 overflow-hidden border border-zinc-850">
                <div className="bg-gradient-to-r from-indigo-500 to-indigo-400 h-full rounded-full" style={{ width: `${babbarProgressPercent}%` }} />
              </div>
            </div>

            <Link
              href="/dsa/player"
              onClick={() => handleSelectMentor("babbar")}
              className="w-full text-center py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition shadow shadow-indigo-600/10 cursor-pointer"
            >
              Open Player
            </Link>
          </div>

          {/* Striver card */}
          <div className="p-6 rounded-2xl glass-panel border border-zinc-850 bg-zinc-950/25 flex flex-col justify-between h-[190px] relative overflow-hidden group hover:border-purple-500/20 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-purple-500/5 blur-xl group-hover:bg-purple-500/10 transition" />
            <div>
              <h3 className="text-lg font-extrabold text-zinc-100">Striver A2Z DSA</h3>
              <p className="text-xs text-zinc-400 font-bold mt-1">Full Playlist</p>
            </div>
            
            <div className="w-full">
              <div className="flex justify-between items-center text-[10px] font-bold text-zinc-500 uppercase mb-1">
                <span>Progress {striverProgressPercent}%</span>
                <span>{striverCompleted.length}/{striverVideos.length} Completed</span>
              </div>
              <div className="w-full bg-zinc-900 rounded-full h-2 overflow-hidden border border-zinc-850">
                <div className="bg-gradient-to-r from-purple-500 to-purple-400 h-full rounded-full" style={{ width: `${striverProgressPercent}%` }} />
              </div>
            </div>

            <Link
              href="/dsa/striver-player"
              onClick={() => handleSelectMentor("striver")}
              className="w-full text-center py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition shadow shadow-purple-650/10 cursor-pointer"
            >
              Open Player
            </Link>
          </div>
        </section>

        {/* Tab Selection */}
        <div className="flex border-b border-zinc-900 gap-6 text-sm font-bold mt-4">
          <button
            onClick={() => setActiveTab("striver")}
            className={`pb-3 capitalize transition-all relative cursor-pointer ${
              activeTab === "striver"
                ? "text-indigo-400 border-b-2 border-indigo-500"
                : "text-zinc-500 hover:text-zinc-350"
            }`}
          >
            Striver A-Z Roadmap
          </button>
          <button
            onClick={() => setActiveTab("babbar")}
            className={`pb-3 capitalize transition-all relative cursor-pointer ${
              activeTab === "babbar"
                ? "text-indigo-400 border-b-2 border-indigo-500"
                : "text-zinc-500 hover:text-zinc-350"
            }`}
          >
            Love Babbar Sheet Topics
          </button>
          <button
            onClick={() => setActiveTab("other")}
            className={`pb-3 capitalize transition-all relative cursor-pointer ${
              activeTab === "other"
                ? "text-indigo-400 border-b-2 border-indigo-500"
                : "text-zinc-500 hover:text-zinc-350"
            }`}
          >
            Other Creator Playlists
          </button>
        </div>

        {/* TAB CONTENTS */}
        <div className="min-h-[300px]">
          
          {/* TAB 1: Striver A-Z Roadmap */}
          {activeTab === "striver" && (
            <div className="flex flex-col gap-6">
              
              {/* Striver Header Card */}
              <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-zinc-200">Striver A-Z DSA Sheet Tracker</h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed max-w-2xl font-normal">
                    Track your topic completion progress through Striver's comprehensive 17-step roadmap.
                  </p>
                </div>
                <div className="w-full md:w-56 flex flex-col gap-1.5 shrink-0">
                  <div className="flex justify-between items-center text-[10px] font-bold text-zinc-500 uppercase">
                    <span>Roadmap Progress</span>
                    <span>{striverSheetPercent}%</span>
                  </div>
                  <div className="w-full bg-zinc-950 rounded-full h-2 overflow-hidden border border-zinc-900">
                    <div className="bg-indigo-500 h-full rounded-full transition-all duration-300" style={{ width: `${striverSheetPercent}%` }} />
                  </div>
                  <span className="text-[10px] text-zinc-550 font-bold uppercase mt-1">
                    {striverSheetCompleted.length} of {striverModules.length} Modules Checked
                  </span>
                </div>
              </div>

              {/* Modules Listing Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {striverModules.map((mod) => {
                  const isDone = striverSheetCompleted.includes(mod.id);
                  return (
                    <div
                      key={mod.id}
                      className={`p-5 rounded-2xl border transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group
                        ${isDone 
                          ? "bg-indigo-950/5 border-indigo-500/20" 
                          : "border-zinc-850/80 bg-zinc-950/20"}`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <button
                          onClick={() => handleToggleStriverSheet(mod.id)}
                          className={`w-5 h-5 rounded-lg border flex items-center justify-center transition shrink-0 cursor-pointer
                            ${isDone 
                              ? "bg-indigo-650 border-indigo-500 text-white" 
                              : "border-zinc-700 bg-zinc-900/60 hover:border-zinc-500"}`}
                        >
                          {isDone && (
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                          )}
                        </button>
                        
                        <div className="min-w-0">
                          <h4 className={`text-xs font-bold truncate ${isDone ? "text-indigo-300 line-through opacity-70" : "text-zinc-200"}`}>
                            {mod.title}
                          </h4>
                          <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block mt-1">
                            {mod.problemsCount} Problems
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2 self-end md:self-center shrink-0">
                        <a
                          href={mod.youtubeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200 text-[10px] font-bold transition flex items-center gap-1"
                        >
                          <span>🎥</span> Playlist
                        </a>
                        <a
                          href={mod.sheetUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1.5 rounded-lg border border-indigo-500/20 bg-indigo-950/20 hover:bg-indigo-950/40 text-indigo-300 hover:text-indigo-200 text-[10px] font-bold transition flex items-center gap-1"
                        >
                          <span>📄</span> Sheet
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* TAB 2: Love Babbar Sheet */}
          {activeTab === "babbar" && (
            <div className="flex flex-col gap-6">
              
              {/* Sheet Header Card */}
              <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-zinc-200">Love Babbar 450 DSA Sheet Tracker</h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed max-w-2xl font-normal">
                    Check off topics as you finish sections in Love Babbar's official 450 sheet checklist.
                  </p>
                </div>
                <div className="w-full md:w-56 flex flex-col gap-1.5 shrink-0">
                  <div className="flex justify-between items-center text-[10px] font-bold text-zinc-500 uppercase">
                    <span>Sheet Progress</span>
                    <span>{babbarSheetPercent}%</span>
                  </div>
                  <div className="w-full bg-zinc-950 rounded-full h-2 overflow-hidden border border-zinc-900">
                    <div className="bg-emerald-500 h-full rounded-full transition-all duration-300" style={{ width: `${babbarSheetPercent}%` }} />
                  </div>
                  <span className="text-[10px] text-zinc-550 font-bold uppercase mt-1">
                    {babbarSheetCompleted.length} of {babbarTopics.length} Topics Checked
                  </span>
                </div>
              </div>

              {/* Topics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {babbarTopics.map((topic) => {
                  const isDone = babbarSheetCompleted.includes(topic.id);
                  return (
                    <button
                      key={topic.id}
                      onClick={() => handleToggleBabbarSheet(topic.id)}
                      className={`p-4 rounded-xl border text-left flex justify-between items-center gap-3 transition cursor-pointer
                        ${isDone 
                          ? "bg-emerald-950/10 border-emerald-500/30 text-emerald-350" 
                          : "border-zinc-850 bg-zinc-950/10 text-zinc-400 hover:text-zinc-250 hover:border-zinc-750"}`}
                    >
                      <div className="min-w-0">
                        <span className="text-xs font-bold block truncate leading-tight">
                          {topic.name}
                        </span>
                        <span className={`text-[9px] font-bold block mt-1 uppercase ${isDone ? "text-emerald-550" : "text-zinc-550"}`}>
                          {topic.problemsCount} Questions
                        </span>
                      </div>
                      
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition
                        ${isDone 
                          ? "bg-emerald-600 border-emerald-500 text-white" 
                          : "border-zinc-800 bg-zinc-955"}`}
                      >
                        {isDone && (
                          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

            </div>
          )}

          {/* TAB 3: Other Creator Playlists */}
          {activeTab === "other" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {creatorPlaylists.map((pl) => {
                const status = creatorStatus[pl.id] || "Not Started";
                return (
                  <div
                    key={pl.id}
                    className="p-6 rounded-2xl border border-zinc-850/80 bg-zinc-950/20 flex flex-col gap-4 shadow-sm group hover:border-zinc-700/50 transition-all duration-200"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xl shadow">
                          {pl.icon}
                        </div>
                        <div>
                          <span className="text-[10px] font-extrabold uppercase text-indigo-400 tracking-wider">
                            {pl.creator}
                          </span>
                          <h4 className="text-sm font-extrabold text-zinc-200 mt-0.5 leading-tight transition">
                            {pl.title}
                          </h4>
                        </div>
                      </div>

                      <select
                        value={status}
                        onChange={(e) => handleChangeCreatorStatus(pl.id, e.target.value as any)}
                        className={`text-[10px] font-extrabold uppercase tracking-wide px-2.5 py-1.5 rounded-lg border focus:outline-none transition-all cursor-pointer
                          ${status === "Completed"
                            ? "bg-emerald-950/20 border-emerald-500/20 text-emerald-400"
                            : status === "In Progress"
                              ? "bg-amber-950/20 border-amber-500/20 text-amber-400"
                              : "bg-zinc-900 border-zinc-800 text-zinc-500"}`}
                      >
                        <option value="Not Started" className="bg-zinc-950 text-zinc-400">Not Started</option>
                        <option value="In Progress" className="bg-zinc-950 text-zinc-400">In Progress</option>
                        <option value="Completed" className="bg-zinc-950 text-zinc-400">Completed</option>
                      </select>
                    </div>

                    <p className="text-xs text-zinc-400 font-normal leading-relaxed flex-grow">
                      {pl.description}
                    </p>

                    <a
                      href={pl.url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900 hover:bg-zinc-850 text-zinc-300 font-bold text-xs tracking-wide shadow-sm hover:scale-[1.01] transition-all text-center flex items-center justify-center gap-1.5"
                    >
                      <span>🔗 Open Creator Playlist Link</span>
                    </a>
                  </div>
                );
              })}
            </div>
          )}

        </div>

      </main>

      <Footer />
    </div>
  );
}
