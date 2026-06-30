"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { videos as babbarVideos } from "@/data/videos";
import { striverVideos } from "@/data/striverVideos";
import { semesterSubjects } from "@/data/semesterData";
import { aktuSyllabus } from "@/data/aktuSyllabus";

// Define bookmark structure
interface Bookmark {
  id: string;
  type: "lecture" | "note" | "pdf" | "video";
  title: string;
  subtitle: string;
  url: string;
}

// Last opened lecture structure
interface LastOpened {
  title: string;
  subtitle: string;
  url: string;
  activeMode: "DSA" | "Semester";
}

// Motivational quotes list
const MOTIVATIONAL_QUOTES = [
  { text: "The only way to learn a new programming language is by writing programs in it.", author: "Dennis Ritchie" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  { text: "Consistency beats talent when talent doesn't work hard. Keep coding!", author: "Striver" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { text: "Your DSA practice is an investment, not a chore. Keep solving!", author: "Love Babbar" },
  { text: "Every great developer you know got there by solving problems they were unqualified to solve.", author: "Patrick McKenzie" },
  { text: "Algorithms + Data Structures = Programs.", author: "Niklaus Wirth" }
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  
  // Local state loaded from localStorage
  const [studentName, setStudentName] = useState("Student");
  const [activeMode, setActiveMode] = useState<"DSA" | "Semester">("DSA");
  
  // DSA Progress
  const [babbarCompleted, setBabbarCompleted] = useState<string[]>([]);
  const [striverCompleted, setStriverCompleted] = useState<string[]>([]);
  
  // Semester Progress
  const [completedSem, setCompletedSem] = useState<string[]>([]);
  
  // Bookmarks & History
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [lastOpened, setLastOpened] = useState<LastOpened | null>(null);

  // Quick Access States
  const [showPyqModal, setShowPyqModal] = useState(false);
  
  // Daily Streak and Study Time Tracker states
  const [streak, setStreak] = useState(1);
  const [studyMinutes, setStudyMinutes] = useState(0);

  // Select a quote for the session
  const quote = useMemo(() => {
    // Select quote based on day of the month
    const day = new Date().getDate();
    return MOTIVATIONAL_QUOTES[day % MOTIVATIONAL_QUOTES.length];
  }, []);

  // Determine Personalized Greeting based on local time
  const personalizedGreeting = useMemo(() => {
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 12) {
      return `Good Morning, ${studentName} ☀️`;
    } else if (hours >= 12 && hours < 17) {
      return `Good Afternoon, ${studentName} 🌤️`;
    } else {
      return `Good Evening, ${studentName} 🌙`;
    }
  }, [studentName]);

  // Load state on mount
  useEffect(() => {
    setMounted(true);
    
    // Load student name
    const name = localStorage.getItem("student_name");
    if (name) setStudentName(name);

    // Active mode
    const savedMode = localStorage.getItem("student_active_mode") as "DSA" | "Semester" | null;
    if (savedMode) setActiveMode(savedMode);

    // DSA completions
    const savedBabbarComp = localStorage.getItem("babbar_completed");
    if (savedBabbarComp) setBabbarCompleted(JSON.parse(savedBabbarComp));

    const savedStriverComp = localStorage.getItem("striver_completed");
    if (savedStriverComp) setStriverCompleted(JSON.parse(savedStriverComp));

    // Semester completions
    const savedSemComp = localStorage.getItem("sem_completed");
    if (savedSemComp) setCompletedSem(JSON.parse(savedSemComp));

    // Bookmarks
    const savedBookmarks = localStorage.getItem("student_bookmarks");
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }

    // Last Watched
    const savedLastOpened = localStorage.getItem("last_opened_lecture");
    if (savedLastOpened) setLastOpened(JSON.parse(savedLastOpened));

    // Streak tracker logic
    const todayStr = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const lastActivityDate = localStorage.getItem("last_activity_date");
    let currentStreak = Number(localStorage.getItem("daily_streak")) || 1;

    if (lastActivityDate) {
      if (lastActivityDate !== todayStr) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split("T")[0];

        if (lastActivityDate === yesterdayStr) {
          // Increment streak
          currentStreak += 1;
        } else {
          // Reset streak since a day was missed
          currentStreak = 1;
        }
        localStorage.setItem("daily_streak", currentStreak.toString());
      }
    } else {
      localStorage.setItem("daily_streak", "1");
    }
    localStorage.setItem("last_activity_date", todayStr);
    setStreak(currentStreak);

    // Study Time Tracker session logic
    const totalMinutes = Number(localStorage.getItem("study_minutes")) || 0;
    setStudyMinutes(totalMinutes);

    // Timer to increment study minutes every 60 seconds
    const interval = setInterval(() => {
      setStudyMinutes((prev) => {
        const updated = prev + 1;
        localStorage.setItem("study_minutes", updated.toString());
        return updated;
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Sync active mode to localStorage
  const handleToggleMode = (mode: "DSA" | "Semester") => {
    setActiveMode(mode);
    localStorage.setItem("student_active_mode", mode);
  };

  // Remove a bookmark (syncs with corresponding player storage)
  const handleRemoveBookmark = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = bookmarks.filter((b) => b.id !== id);
    setBookmarks(updated);
    localStorage.setItem("student_bookmarks", JSON.stringify(updated));

    // Sync with player-specific lists
    if (id.startsWith("babbar-")) {
      const videoId = id.replace("babbar-", "");
      const saved = localStorage.getItem("babbar_bookmarks");
      if (saved) {
        const parsed = JSON.parse(saved) as string[];
        localStorage.setItem("babbar_bookmarks", JSON.stringify(parsed.filter((v) => v !== videoId)));
      }
    } else if (id.startsWith("striver-")) {
      const videoId = id.replace("striver-", "");
      const saved = localStorage.getItem("striver_bookmarks");
      if (saved) {
        const parsed = JSON.parse(saved) as string[];
        localStorage.setItem("striver_bookmarks", JSON.stringify(parsed.filter((v) => v !== videoId)));
      }
    }
  };

  // Progress metrics calculation
  const totalDsaLectures = babbarVideos.length + striverVideos.length;
  
  const babbarProgressPercent = useMemo(() => {
    if (babbarVideos.length === 0) return 0;
    return Math.round((babbarCompleted.length / babbarVideos.length) * 100);
  }, [babbarCompleted]);

  const striverProgressPercent = useMemo(() => {
    if (striverVideos.length === 0) return 0;
    return Math.round((striverCompleted.length / striverVideos.length) * 100);
  }, [striverCompleted]);

  const semProgressPercent = useMemo(() => {
    let totalCount = 0;
    semesterSubjects.forEach((sub) => {
      sub.units.forEach((unit) => {
        totalCount += unit.lectures.length;
      });
    });
    if (totalCount === 0) return 0;
    return Math.round((completedSem.length / totalCount) * 100);
  }, [completedSem]);

  const handleOpenMentor = (mentor: "babbar" | "striver") => {
    localStorage.setItem("preferred_dsa_teacher", mentor);
  };

  if (!mounted) {
    return (
      <div className="flex-1 flex flex-col min-h-screen bg-zinc-950">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full border-t-2 border-indigo-500 border-r-2 animate-spin" />
            <span className="text-sm font-semibold text-zinc-500 tracking-wide">Loading Workspace...</span>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">
        
        {/* Welcome Section */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-900 pb-8">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-sm shadow-indigo-600/5">
              📈 Study Tracker Dashboard
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-100 mt-2 font-sans">
              {personalizedGreeting} 👋
            </h1>
            <p className="text-sm text-zinc-400 mt-1.5 max-w-xl font-normal leading-relaxed">
              Measure your progress, resume your lectures, and build healthy learning habits every day.
            </p>
          </div>
          
          {/* Active Learning Mode Selector */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl border border-zinc-800 bg-zinc-950/60 backdrop-blur shrink-0 self-start md:self-center shadow-lg">
            <span className="text-xs font-bold text-zinc-500 px-2.5 uppercase tracking-wider">Active Mode:</span>
            <button
              onClick={() => handleToggleMode("DSA")}
              className={`text-xs font-bold px-4 py-2 rounded-lg transition-all cursor-pointer ${
                activeMode === "DSA"
                  ? "bg-indigo-600/20 border border-indigo-500/40 text-indigo-200 shadow"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              💻 DSA
            </button>
            <button
              onClick={() => handleToggleMode("Semester")}
              className={`text-xs font-bold px-4 py-2 rounded-lg transition-all cursor-pointer ${
                activeMode === "Semester"
                  ? "bg-purple-600/20 border border-purple-500/40 text-purple-200 shadow"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              🎓 Semester
            </button>
          </div>
        </section>

        {/* Top Widgets Grid: Streak, Quote, Timer */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quote Widget */}
          <div className="p-6 rounded-2xl glass-panel border border-zinc-800 bg-zinc-950/20 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-indigo-500/5 blur-xl group-hover:bg-indigo-500/10 transition" />
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-wider">
              <span>💡</span>
              Daily Quote
            </div>
            <p className="text-sm italic font-medium leading-relaxed text-zinc-200 mt-4">
              "{quote.text}"
            </p>
            <span className="text-[11px] font-bold text-indigo-400 mt-3 text-right block">
              — {quote.author}
            </span>
          </div>

          {/* Daily Streak widget */}
          <div className="p-6 rounded-2xl glass-panel border border-zinc-800 bg-zinc-950/20 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-orange-500/5 blur-xl group-hover:bg-orange-500/10 transition" />
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-wider">
              <span>🔥</span>
              Study Streak
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                {streak} Days
              </span>
              <span className="text-xs text-zinc-400">active streak</span>
            </div>
            <p className="text-xs text-zinc-500 mt-3">
              Open the workspace daily to keep your learning streak alive!
            </p>
          </div>

          {/* Study time tracker widget */}
          <div className="p-6 rounded-2xl glass-panel border border-zinc-800 bg-zinc-950/20 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-emerald-500/5 blur-xl group-hover:bg-emerald-500/10 transition" />
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-wider">
              <span>⏱️</span>
              Study Time Tracker
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                {studyMinutes} Min
              </span>
              <span className="text-xs text-zinc-400">total time active</span>
            </div>
            <p className="text-xs text-zinc-500 mt-3">
              Timer active. Keeps running as you read lessons and watch code guides.
            </p>
          </div>
        </section>

        {/* Dashboard layout main columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Player Cards & Quick Access */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* Mentor Selection Cards */}
            <section className="flex flex-col gap-4">
              <h2 className="text-lg font-bold text-zinc-200 flex items-center gap-2">
                <span>💻</span> DSA Mentor Playlists
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Love Babbar Card */}
                <div className="p-6 rounded-2xl glass-panel border border-zinc-850 bg-zinc-950/20 flex flex-col justify-between h-[200px] relative overflow-hidden group hover:border-indigo-500/30 transition-all duration-300">
                  <div className="absolute -right-6 -top-6 w-20 h-20 rounded-full bg-indigo-500/5 blur-xl group-hover:bg-indigo-500/10 transition" />
                  <div>
                    <h3 className="text-lg font-extrabold text-zinc-200">Love Babbar DSA</h3>
                    <p className="text-xs font-bold text-indigo-400 mt-1">150+ Lectures</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center text-[10px] font-bold text-zinc-500 uppercase mb-1">
                      <span>Progress: {babbarProgressPercent}%</span>
                      <span>{babbarCompleted.length}/{babbarVideos.length} Lec</span>
                    </div>
                    <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden border border-zinc-800/40">
                      <div className="bg-gradient-to-r from-indigo-500 to-indigo-400 h-full rounded-full" style={{ width: `${babbarProgressPercent}%` }} />
                    </div>
                  </div>
                  <Link
                    href="/dsa/player"
                    onClick={() => handleOpenMentor("babbar")}
                    className="w-full mt-3 py-2.5 bg-indigo-650 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition text-center shadow-md shadow-indigo-650/10 hover:scale-[1.01] active:scale-95"
                  >
                    Open Player
                  </Link>
                </div>

                {/* Striver Card */}
                <div className="p-6 rounded-2xl glass-panel border border-zinc-850 bg-zinc-950/20 flex flex-col justify-between h-[200px] relative overflow-hidden group hover:border-purple-500/30 transition-all duration-300">
                  <div className="absolute -right-6 -top-6 w-20 h-20 rounded-full bg-purple-500/5 blur-xl group-hover:bg-purple-500/10 transition" />
                  <div>
                    <h3 className="text-lg font-extrabold text-zinc-200">Striver A2Z DSA</h3>
                    <p className="text-xs font-bold text-purple-400 mt-1">Full Playlist</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center text-[10px] font-bold text-zinc-500 uppercase mb-1">
                      <span>Progress: {striverProgressPercent}%</span>
                      <span>{striverCompleted.length}/{striverVideos.length} Lec</span>
                    </div>
                    <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden border border-zinc-800/40">
                      <div className="bg-gradient-to-r from-purple-500 to-purple-400 h-full rounded-full" style={{ width: `${striverProgressPercent}%` }} />
                    </div>
                  </div>
                  <Link
                    href="/dsa/striver-player"
                    onClick={() => handleOpenMentor("striver")}
                    className="w-full mt-3 py-2.5 bg-purple-650 hover:bg-purple-600 text-white rounded-xl text-xs font-bold transition text-center shadow-md shadow-purple-650/10 hover:scale-[1.01] active:scale-95"
                  >
                    Open Player
                  </Link>
                </div>
              </div>
            </section>

            {/* Currently Watching / Resume Learning Section */}
            <section className="flex flex-col gap-4">
              <h2 className="text-lg font-bold text-zinc-200 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
                Continue Learning
              </h2>

              {lastOpened ? (
                <div className="p-6 rounded-2xl border border-zinc-800 bg-gradient-to-r from-zinc-950 to-zinc-900/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent pointer-events-none" />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-extrabold tracking-widest uppercase bg-indigo-950/50 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded">
                      {lastOpened.activeMode} Course Lecture
                    </span>
                    <h3 className="text-base font-bold text-zinc-200 mt-2.5 truncate group-hover:text-white transition">
                      {lastOpened.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 font-medium flex items-center gap-1.5">
                      <span>Playlist: {lastOpened.subtitle}</span>
                    </p>
                  </div>

                  <Link
                    href={lastOpened.url}
                    className="shrink-0 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm tracking-wide shadow-md shadow-indigo-600/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Resume Class</span>
                    <span>🚀</span>
                  </Link>
                </div>
              ) : (
                <div className="p-8 rounded-2xl border border-dashed border-zinc-850 bg-zinc-950/20 text-center flex flex-col items-center justify-center gap-2.5">
                  <span className="text-3xl text-zinc-600">🎬</span>
                  <h4 className="text-sm font-bold text-zinc-350">No Lectures Opened Recently</h4>
                  <p className="text-xs text-zinc-500 max-w-sm">
                    Jump into academic courses or coding mentor tracks to begin logs.
                  </p>
                  <div className="flex gap-4 mt-2">
                    <Link
                      href="/study-material"
                      className="text-xs font-bold px-4 py-2 border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-lg transition"
                    >
                      Semester subjects
                    </Link>
                    <Link
                      href="/dsa"
                      className="text-xs font-bold px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition"
                    >
                      Start DSA
                    </Link>
                  </div>
                </div>
              )}
            </section>

            {/* Bookmarks Section */}
            <section className="flex flex-col gap-4">
              <h2 className="text-lg font-bold text-zinc-200 flex items-center gap-2">
                <span>🔖</span>
                Saved Bookmarks
              </h2>

              {bookmarks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {bookmarks.map((bookmark) => (
                    <Link
                      key={bookmark.id}
                      href={bookmark.url}
                      className="block p-5 rounded-2xl border border-zinc-850 bg-zinc-950/30 hover:bg-zinc-900/40 hover:border-zinc-700/60 shadow transition-all duration-200 relative group"
                    >
                      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-indigo-500/80" />
                      
                      <div className="flex justify-between items-start gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-base">🎬</span>
                            <span className="text-[10px] font-extrabold uppercase tracking-wide text-zinc-500">
                              {bookmark.id.split("-")[0]}
                            </span>
                          </div>
                          <h4 className="text-xs font-bold text-zinc-250 mt-2 truncate group-hover:text-indigo-400 transition">
                            {bookmark.title}
                          </h4>
                          <p className="text-[11px] text-zinc-400 mt-1 font-medium truncate">
                            {bookmark.subtitle}
                          </p>
                        </div>

                        <button
                          onClick={(e) => handleRemoveBookmark(bookmark.id, e)}
                          className="p-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-500 hover:text-red-400 hover:bg-red-950/20 hover:border-red-500/20 transition self-start"
                          title="Remove Bookmark"
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-8 rounded-2xl border border-dashed border-zinc-850 bg-zinc-950/20 text-center flex flex-col items-center justify-center gap-2.5">
                  <span className="text-3xl text-zinc-650">🔖</span>
                  <h4 className="text-sm font-bold text-zinc-350">No Saved Bookmarks</h4>
                  <p className="text-xs text-zinc-500 max-w-sm">
                    Bookmark lectures inside the players to find them here instantly.
                  </p>
                </div>
              )}
            </section>

          </div>

          {/* Right Column: Quick Access & Syllabus Widget (Span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Quick Access Panel */}
            <div className="p-6 rounded-2xl border border-zinc-850 bg-zinc-950/20 shadow-lg flex flex-col gap-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-indigo-500/5 blur-xl transition duration-300" />
              <h3 className="text-sm font-extrabold text-zinc-200 uppercase tracking-widest">
                ⚡ Quick Access Board
              </h3>
              <p className="text-xs text-zinc-500 font-medium">Quick links to workspace components</p>
              
              <div className="flex flex-col gap-2.5 mt-2">
                <Link
                  href="/dsa/player"
                  className="flex items-center justify-between p-3 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800 text-xs font-bold text-zinc-350 hover:text-zinc-100 transition"
                >
                  <span>🎥 Love Babbar Player</span>
                  <span>➜</span>
                </Link>
                <Link
                  href="/dsa/striver-player"
                  className="flex items-center justify-between p-3 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800 text-xs font-bold text-zinc-350 hover:text-zinc-100 transition"
                >
                  <span>🎥 Striver Player</span>
                  <span>➜</span>
                </Link>
                <Link
                  href="/dsa"
                  className="flex items-center justify-between p-3 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800 text-xs font-bold text-zinc-350 hover:text-zinc-100 transition"
                >
                  <span>💻 DSA Dashboard</span>
                  <span>➜</span>
                </Link>
                <Link
                  href="/study-material"
                  className="flex items-center justify-between p-3 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800 text-xs font-bold text-zinc-350 hover:text-zinc-100 transition"
                >
                  <span>🎓 Semester Subjects</span>
                  <span>➜</span>
                </Link>
                <button
                  onClick={() => setShowPyqModal(true)}
                  className="flex items-center justify-between p-3 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-850 text-left text-xs font-bold text-zinc-350 hover:text-zinc-100 transition cursor-pointer"
                >
                  <span>📄 Download PYQs</span>
                  <span>➜</span>
                </button>
              </div>
            </div>

            {/* AKTU Syllabus Section */}
            <div className="p-6 rounded-2xl border border-zinc-850 bg-zinc-950/20 shadow-lg flex flex-col gap-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-purple-500/5 blur-xl transition duration-300" />
              
              <div className="flex items-center gap-3">
                <span className="text-2xl">📄</span>
                <div>
                  <h3 className="text-sm font-extrabold text-zinc-200 uppercase tracking-widest">
                    AKTU CSE Syllabus
                  </h3>
                  <p className="text-[10px] text-zinc-550 font-bold uppercase mt-0.5">Official PDF Files</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-2">
                {aktuSyllabus.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-850 hover:border-zinc-700/60 flex items-center justify-between text-xs text-zinc-300 hover:text-white transition group/item"
                  >
                    <div className="flex flex-col truncate pr-2">
                      <span className="font-bold truncate">{s.year}</span>
                      <span className="text-[9px] text-zinc-500 mt-0.5 truncate">{s.title}</span>
                    </div>
                    <span className="text-xs bg-zinc-950 p-1.5 rounded-lg border border-zinc-850 group-hover/item:text-indigo-400 transition shrink-0">
                      📥
                    </span>
                  </a>
                ))}
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* PYQ Modal */}
      {showPyqModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-scale-up">
            <div className="p-5 border-b border-zinc-850 flex justify-between items-center bg-zinc-950/40">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📝</span>
                <div>
                  <h3 className="text-base font-extrabold text-zinc-150 uppercase tracking-wide">Previous Year Questions</h3>
                  <p className="text-xs text-zinc-500">Core Subject exam papers (Dr. A.P.J. Abdul Kalam Technical University)</p>
                </div>
              </div>
              <button
                onClick={() => setShowPyqModal(false)}
                className="p-2 text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-xl transition cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 flex flex-col gap-4">
              <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                Study from compiled, unit-wise previous year examinations papers to boost your semester preparations.
              </p>
              
              <div className="flex flex-col gap-3">
                <a
                  href="https://aktu.ac.in/pdf/syllabus/syllabus2122/KCS-301.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl border border-zinc-800 hover:bg-zinc-800/50 flex justify-between items-center text-xs text-zinc-300 hover:text-white transition"
                >
                  <span className="font-bold">Data Structures (KCS-301) PYQs</span>
                  <span className="bg-zinc-900 px-2.5 py-1 rounded text-[10px] text-zinc-500 font-bold border border-zinc-800">PDF File</span>
                </a>
                <a
                  href="https://aktu.ac.in/pdf/syllabus/syllabus2122/KCS-303.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl border border-zinc-800 hover:bg-zinc-800/50 flex justify-between items-center text-xs text-zinc-300 hover:text-white transition"
                >
                  <span className="font-bold">Computer Organization & Architecture (KCS-303) PYQs</span>
                  <span className="bg-zinc-900 px-2.5 py-1 rounded text-[10px] text-zinc-500 font-bold border border-zinc-800">PDF File</span>
                </a>
                <a
                  href="https://aktu.ac.in/pdf/syllabus/syllabus2122/KCS-304.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl border border-zinc-800 hover:bg-zinc-800/50 flex justify-between items-center text-xs text-zinc-300 hover:text-white transition"
                >
                  <span className="font-bold">Object Oriented Programming (KCS-304) PYQs</span>
                  <span className="bg-zinc-900 px-2.5 py-1 rounded text-[10px] text-zinc-500 font-bold border border-zinc-800">PDF File</span>
                </a>
              </div>
            </div>

            <div className="p-4 border-t border-zinc-850 bg-zinc-950/40 flex justify-end">
              <button
                onClick={() => setShowPyqModal(false)}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}