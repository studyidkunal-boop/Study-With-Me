"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { semesterSubjects, SemesterLecture } from "@/data/semesterData";

interface Bookmark {
  id: string;
  type: "lecture" | "note" | "pdf" | "video";
  title: string;
  subtitle: string;
  url: string;
}

function SubjectDashboardContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const subjectId = params?.subject as string;
  
  // Find subject details
  const subject = useMemo(() => {
    return semesterSubjects.find((s) => s.id === subjectId);
  }, [subjectId]);

  const [mounted, setMounted] = useState(false);
  const [expandedUnits, setExpandedUnits] = useState<Record<number, boolean>>({
    1: true // default expand Unit 1
  });
  
  // Local storage state
  const [completedLectures, setCompletedLectures] = useState<string[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [currentNote, setCurrentNote] = useState("");
  const [isSavedIndicator, setIsSavedIndicator] = useState(false);

  // Flattened lecture list for easy next/prev navigation
  const allLectures = useMemo(() => {
    if (!subject) return [];
    const list: { lecture: SemesterLecture; unitNumber: number }[] = [];
    subject.units.forEach((unit) => {
      unit.lectures.forEach((lec) => {
        list.push({ lecture: lec, unitNumber: unit.unitNumber });
      });
    });
    return list;
  }, [subject]);

  // Determine selected lecture
  const activeLectureData = useMemo(() => {
    if (allLectures.length === 0) return null;
    
    const lectureQueryId = searchParams.get("lecture");
    if (lectureQueryId) {
      const found = allLectures.find((item) => item.lecture.id === lectureQueryId);
      if (found) return found;
    }
    
    // Default to the first lecture of the first unit
    return allLectures[0];
  }, [allLectures, searchParams]);

  const currentLecture = activeLectureData?.lecture || null;
  const currentUnitNumber = activeLectureData?.unitNumber || 1;

  // Mount logic
  useEffect(() => {
    setMounted(true);
    
    // Load completion progress
    const savedComp = localStorage.getItem("sem_completed");
    if (savedComp) setCompletedLectures(JSON.parse(savedComp));

    // Load bookmarks
    const savedBookmarks = localStorage.getItem("student_bookmarks");
    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));

    // Load notes
    const savedNotes = localStorage.getItem("sem_notes");
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes);
      setNotes(parsedNotes);
    }
    
    // Set active mode in storage
    localStorage.setItem("student_active_mode", "Semester");
  }, []);

  // Update notes text area when active lecture changes
  useEffect(() => {
    if (currentLecture) {
      setCurrentNote(notes[currentLecture.id] || "");
    }
  }, [currentLecture, notes]);

  // Save currently watching lecture on load & on change
  useEffect(() => {
    if (currentLecture && subject && mounted) {
      const lastOpened = {
        title: currentLecture.title,
        subtitle: `${subject.title} - Unit ${currentUnitNumber}`,
        url: `/study-material/${subject.id}?unit=${currentUnitNumber}&lecture=${currentLecture.id}`,
        activeMode: "Semester"
      };
      localStorage.setItem("last_opened_lecture", JSON.stringify(lastOpened));
    }
  }, [currentLecture, subject, currentUnitNumber, mounted]);

  // If subject does not exist, return subject not found
  if (mounted && !subject) {
    return (
      <main className="flex-grow flex flex-col items-center justify-center gap-4 text-center p-6 bg-zinc-950">
        <span className="text-4xl">🎓</span>
        <h2 className="text-xl font-bold text-zinc-200">Subject Course Not Found</h2>
        <p className="text-sm text-zinc-500 max-w-sm">The academic subject code you are looking for does not exist in our curriculum index.</p>
        <Link href="/study-material" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition">
          Back to Study Materials
        </Link>
      </main>
    );
  }

  // Handle note editing
  const handleNoteChange = (val: string) => {
    if (!currentLecture) return;
    setCurrentNote(val);
    
    const updatedNotes = { ...notes, [currentLecture.id]: val };
    setNotes(updatedNotes);
    localStorage.setItem("sem_notes", JSON.stringify(updatedNotes));

    // Visual saved badge
    setIsSavedIndicator(true);
    const timer = setTimeout(() => setIsSavedIndicator(false), 800);
    return () => clearTimeout(timer);
  };

  // Toggle lecture completion
  const handleToggleComplete = (lectureId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = completedLectures.includes(lectureId)
      ? completedLectures.filter((id) => id !== lectureId)
      : [...completedLectures, lectureId];
    setCompletedLectures(updated);
    localStorage.setItem("sem_completed", JSON.stringify(updated));
  };

  // Check if current lecture is bookmarked
  const isBookmarked = bookmarks.some((b) => b.id === `sem-${currentLecture?.id}`);

  // Toggle bookmarking the lecture
  const handleToggleBookmark = () => {
    if (!currentLecture || !subject) return;
    
    const bookmarkId = `sem-${currentLecture.id}`;
    let updated: Bookmark[] = [];
    
    if (isBookmarked) {
      updated = bookmarks.filter((b) => b.id !== bookmarkId);
    } else {
      updated = [
        ...bookmarks,
        {
          id: bookmarkId,
          type: "lecture",
          title: currentLecture.title,
          subtitle: `${subject.title} - Unit ${currentUnitNumber}`,
          url: `/study-material/${subject.id}?unit=${currentUnitNumber}&lecture=${currentLecture.id}`
        }
      ];
    }
    
    setBookmarks(updated);
    localStorage.setItem("student_bookmarks", JSON.stringify(updated));
  };

  // Toggle Accordion expand/collapse
  const toggleUnitExpand = (unitNum: number) => {
    setExpandedUnits((prev) => ({
      ...prev,
      [unitNum]: !prev[unitNum]
    }));
  };

  // Navigation handlers
  const handleNextLecture = () => {
    if (allLectures.length === 0 || !currentLecture) return;
    const currentIndex = allLectures.findIndex((item) => item.lecture.id === currentLecture.id);
    if (currentIndex < allLectures.length - 1) {
      const nextItem = allLectures[currentIndex + 1];
      // Expand target unit
      setExpandedUnits((prev) => ({ ...prev, [nextItem.unitNumber]: true }));
      router.push(`/study-material/${subjectId}?unit=${nextItem.unitNumber}&lecture=${nextItem.lecture.id}`);
    }
  };

  const handlePrevLecture = () => {
    if (allLectures.length === 0 || !currentLecture) return;
    const currentIndex = allLectures.findIndex((item) => item.lecture.id === currentLecture.id);
    if (currentIndex > 0) {
      const prevItem = allLectures[currentIndex - 1];
      // Expand target unit
      setExpandedUnits((prev) => ({ ...prev, [prevItem.unitNumber]: true }));
      router.push(`/study-material/${subjectId}?unit=${prevItem.unitNumber}&lecture=${prevItem.lecture.id}`);
    }
  };

  const isFirstLecture = allLectures.findIndex((item) => item.lecture.id === currentLecture?.id) === 0;
  const isLastLecture = allLectures.findIndex((item) => item.lecture.id === currentLecture?.id) === allLectures.length - 1;

  if (!mounted || !currentLecture || !subject) {
    return (
      <div className="flex-grow flex items-center justify-center bg-zinc-950">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-t-2 border-indigo-500 border-r-2 animate-spin" />
          <span className="text-sm font-semibold text-zinc-500">Launching Lecture Player...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
      
      {/* Navigation Breadcrumbs */}
      <section className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-wider border-b border-zinc-900 pb-4">
        <Link href="/study-material" className="hover:text-zinc-350 transition">
          Study Material
        </Link>
        <span>/</span>
        <span className="text-indigo-400">{subject.title}</span>
      </section>

      {/* Dynamic Split Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: Accordion Units & Lectures (Span 4) */}
        <aside className="lg:col-span-4 flex flex-col gap-4 order-2 lg:order-1">
          <div className="p-4 rounded-2xl border border-zinc-800 bg-zinc-950/20 shadow-lg flex flex-col gap-4">
            <div className="flex justify-between items-center px-1">
              <span className="text-xs font-extrabold tracking-widest text-zinc-500 uppercase">
                Course Lectures Index
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                {allLectures.length} Lectures
              </span>
            </div>

            {/* Units Accordion */}
            <div className="flex flex-col gap-3">
              {subject.units.map((unit) => {
                const isExpanded = expandedUnits[unit.unitNumber];
                return (
                  <div
                    key={unit.unitNumber}
                    className="rounded-xl border border-zinc-850/80 bg-zinc-950/50 overflow-hidden"
                  >
                    {/* Accordion Trigger */}
                    <button
                      onClick={() => toggleUnitExpand(unit.unitNumber)}
                      className="w-full p-4 flex justify-between items-center hover:bg-zinc-900/30 text-left transition cursor-pointer"
                    >
                      <span className="text-xs font-bold text-zinc-200 truncate pr-4">
                        {unit.title}
                      </span>
                      <span className="text-[11px] text-zinc-500 transition-transform duration-200">
                        {isExpanded ? "▲" : "▼"}
                      </span>
                    </button>

                    {/* Accordion Content */}
                    {isExpanded && (
                      <div className="border-t border-zinc-900 bg-zinc-950/20 flex flex-col">
                        {unit.lectures.map((lec) => {
                          const isLecActive = currentLecture.id === lec.id;
                          const isLecDone = completedLectures.includes(lec.id);
                          return (
                            <button
                              key={lec.id}
                              onClick={() => {
                                router.push(`/study-material/${subjectId}?unit=${unit.unitNumber}&lecture=${lec.id}`);
                              }}
                              className={`w-full text-left p-3.5 pl-6 border-b last:border-0 border-zinc-900 flex items-start gap-3 transition-all cursor-pointer
                                ${isLecActive 
                                  ? "bg-indigo-950/15 text-indigo-300" 
                                  : "hover:bg-zinc-900/30 text-zinc-400 hover:text-zinc-250"}`}
                            >
                              {/* Checkbox completion toggle */}
                              <button
                                  onClick={(e) => handleToggleComplete(lec.id, e)}
                                  className={`w-4 h-4 rounded mt-0.5 border flex items-center justify-center transition shrink-0 cursor-pointer
                                    ${isLecDone
                                      ? "bg-emerald-600 border-emerald-500 text-white"
                                      : "border-zinc-800 bg-zinc-900 hover:border-zinc-750"}`}
                                >
                                  {isLecDone && (
                                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                  )}
                                </button>

                              <div className="flex-grow min-w-0 flex flex-col gap-0.5">
                                <span className={`text-[11px] font-bold truncate leading-snug ${isLecActive ? "text-indigo-200" : "text-zinc-350"}`}>
                                  {lec.title}
                                </span>
                                <span className="text-[9px] text-zinc-550 font-semibold uppercase leading-none">
                                  ⏱️ {lec.duration}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </aside>

        {/* RIGHT: Video Player, Metadata, Notes (Span 8) */}
        <section className="lg:col-span-8 flex flex-col gap-6 order-1 lg:order-2">
          
          {/* Embedded Player */}
          <div className="glass-panel border border-zinc-800 shadow-2xl rounded-2xl overflow-hidden flex flex-col bg-zinc-950">
            
            <div className="aspect-video w-full relative">
              <iframe
                className="w-full h-full relative z-10"
                src={`https://www.youtube.com/embed/${currentLecture.youtubeId}?autoplay=0&rel=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Navigation & Action Bar */}
            <div className="px-5 py-4 border-t border-zinc-900 bg-zinc-950/60 flex items-center justify-between gap-4">
              
              {/* Prev / Next controls */}
              <div className="flex gap-2">
                <button
                  onClick={handlePrevLecture}
                  disabled={isFirstLecture}
                  className={`px-4 py-2 border rounded-xl font-bold text-xs tracking-wide transition-all select-none
                    ${isFirstLecture 
                      ? "border-zinc-850 bg-zinc-950/20 text-zinc-600 cursor-not-allowed" 
                      : "border-zinc-800 hover:border-zinc-700 bg-zinc-900 hover:bg-zinc-850 text-zinc-300 cursor-pointer"}`}
                >
                  ◀ Prev Lecture
                </button>
                <button
                  onClick={handleNextLecture}
                  disabled={isLastLecture}
                  className={`px-4 py-2 border rounded-xl font-bold text-xs tracking-wide transition-all select-none
                    ${isLastLecture 
                      ? "border-zinc-850 bg-zinc-950/20 text-zinc-600 cursor-not-allowed" 
                      : "border-zinc-800 hover:border-zinc-750 bg-zinc-900 hover:bg-zinc-850 text-zinc-300 cursor-pointer"}`}
                >
                  Next Lecture ▶
                </button>
              </div>

              {/* Bookmark Toggle */}
              <button
                onClick={handleToggleBookmark}
                className={`px-4 py-2 border rounded-xl font-bold text-xs tracking-wide transition-all flex items-center gap-1.5 cursor-pointer
                  ${isBookmarked
                    ? "bg-amber-600/10 border-amber-500/40 text-amber-300 hover:bg-amber-600/20"
                    : "border-zinc-800 hover:border-zinc-700 bg-zinc-900 hover:bg-zinc-850 text-zinc-400 hover:text-zinc-250"}`}
              >
                <span>{isBookmarked ? "★ Bookmarked" : "☆ Save Bookmark"}</span>
              </button>
            </div>

            {/* Title & Description details */}
            <div className="p-6 border-t border-zinc-900 flex flex-col gap-2">
              <span className="text-[10px] font-extrabold tracking-widest text-indigo-400 uppercase">
                Unit {currentUnitNumber} • Lecture Metadata
              </span>
              <h2 className="text-xl font-extrabold text-zinc-100">
                {currentLecture.title}
              </h2>
              <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed font-normal">
                {currentLecture.description}
              </p>
            </div>

          </div>

          {/* Note taking workspace */}
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/25 flex flex-col gap-4 shadow-lg">
            <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">📝</span>
                <div>
                  <h3 className="text-sm font-extrabold text-zinc-200 uppercase tracking-wide">Lecture Study Notes</h3>
                  <p className="text-[10px] text-zinc-550 mt-0.5">Notes autosave dynamically inside your local session</p>
                </div>
              </div>

              {/* Saved Badge */}
              {isSavedIndicator && (
                <span className="text-[9px] font-extrabold uppercase px-2 py-1 rounded bg-emerald-950/30 border border-emerald-500/20 text-emerald-400 tracking-wider animate-pulse">
                  ✓ Saved!
                </span>
              )}
            </div>

            {/* Notes Input Area */}
            <textarea
              value={currentNote}
              onChange={(e) => handleNoteChange(e.target.value)}
              placeholder="Write summary notes, insert pseudo codes, or write key takeaways for this lecture..."
              className="w-full min-h-[160px] p-4 bg-zinc-950/80 border border-zinc-850 rounded-xl text-zinc-350 text-xs placeholder-zinc-650 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 leading-relaxed font-mono"
            />

            <div className="flex justify-between items-center text-[10px] text-zinc-550 font-bold uppercase tracking-wider">
              <span>{currentNote.length} characters written</span>
              <span>Press key to save</span>
            </div>
          </div>

        </section>

      </div>

    </div>
  );
}

export default function SubjectDashboardPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Navbar />
      <Suspense fallback={
        <div className="flex-grow flex items-center justify-center bg-zinc-950">
          <div className="animate-pulse flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full border-t-2 border-indigo-500 border-r-2 animate-spin" />
            <span className="text-sm font-semibold text-zinc-500">Launching subject stream...</span>
          </div>
        </div>
      }>
        <SubjectDashboardContent />
      </Suspense>
      <Footer />
    </div>
  );
}
