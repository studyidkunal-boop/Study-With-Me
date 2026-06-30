"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { semesterSubjects } from "@/data/semesterData";
import { aktuSyllabus } from "@/data/aktuSyllabus";

export default function StudyMaterialPage() {
  const [mounted, setMounted] = useState(false);
  const [activeSemester, setActiveSemester] = useState<3 | 4>(3);
  const [completedSem, setCompletedSem] = useState<string[]>([]);
  const [isSyllabusModalOpen, setIsSyllabusModalOpen] = useState(false);

  // Load completed lectures from localStorage to calculate subject-wise progress
  useEffect(() => {
    setMounted(true);
    const savedSemComp = localStorage.getItem("sem_completed");
    if (savedSemComp) setCompletedSem(JSON.parse(savedSemComp));
  }, []);

  // Filter subjects based on current semester tab
  const filteredSubjects = useMemo(() => {
    // Technical Communication (tc) is present in both semesters
    return semesterSubjects.filter((sub) => {
      if (sub.id === "tc") return true; // Show in both 3rd and 4th
      return sub.semester === activeSemester;
    });
  }, [activeSemester]);

  // Compute progress for each subject
  const subjectProgress = useMemo(() => {
    const progressMap: Record<string, { percent: number; completedCount: number; totalCount: number }> = {};
    
    semesterSubjects.forEach((sub) => {
      let totalCount = 0;
      let completedCount = 0;
      
      sub.units.forEach((unit) => {
        unit.lectures.forEach((lec) => {
          totalCount++;
          if (completedSem.includes(lec.id)) {
            completedCount++;
          }
        });
      });
      
      const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
      progressMap[sub.id] = { percent, completedCount, totalCount };
    });
    
    return progressMap;
  }, [completedSem]);

  if (!mounted) {
    return (
      <div className="flex-1 flex flex-col min-h-screen bg-zinc-950">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full border-t-2 border-indigo-500 border-r-2 animate-spin" />
            <span className="text-sm font-semibold text-zinc-500 tracking-wide">Loading Academic Hub...</span>
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
        
        {/* Header Section */}
        <section className="border-b border-zinc-900 pb-8 flex flex-col gap-2">
          <span className="text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-sm self-start">
            📚 Academic Syllabus Hub
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-100 mt-2 font-sans">
            Semester Study Material
          </h1>
          <p className="text-sm text-zinc-400 max-w-2xl font-normal leading-relaxed">
            Access organized, unit-wise video lessons, take inline study notes, and track your syllabus completion progress across engineering branches.
          </p>
        </section>

        {/* Tab Selection */}
        <div className="flex border-b border-zinc-900 gap-6 text-sm font-bold">
          <button
            onClick={() => setActiveSemester(3)}
            className={`pb-3 capitalize transition-all relative cursor-pointer ${
              activeSemester === 3
                ? "text-indigo-400 border-b-2 border-indigo-500"
                : "text-zinc-500 hover:text-zinc-350"
            }`}
          >
            3rd Semester Subjects
          </button>
          <button
            onClick={() => setActiveSemester(4)}
            className={`pb-3 capitalize transition-all relative cursor-pointer ${
              activeSemester === 4
                ? "text-indigo-400 border-b-2 border-indigo-500"
                : "text-zinc-500 hover:text-zinc-350"
            }`}
          >
            4th Semester Subjects
          </button>
        </div>

        {/* Catalog and Resources Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Subjects Box (Span 8) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/20 shadow-lg flex flex-col gap-6">
              
              <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                    <span className="text-indigo-500">🎓</span>
                    AKTU {activeSemester}rd Semester
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Core subjects mapped to the latest Dr. A.P.J. Abdul Kalam Technical University curriculum.
                  </p>
                </div>
                <span className="text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-full bg-indigo-950/40 text-indigo-400 border border-indigo-500/20 shadow-sm">
                  CSE Branch
                </span>
              </div>

              {/* Subject Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredSubjects.map((sub) => {
                  const progress = subjectProgress[sub.id] || { percent: 0, completedCount: 0, totalCount: 0 };
                  const isLocked = sub.units.length === 0;

                  return (
                    <Link
                      key={sub.id}
                      href={`/study-material/${sub.id}`}
                      className="block p-5 rounded-2xl border border-zinc-850/80 bg-zinc-900/10 hover:bg-zinc-900/30 hover:border-zinc-700/60 transition-all duration-200 group relative overflow-hidden"
                    >
                      {/* Glow Overlay */}
                      <div className={`absolute -right-12 -top-12 w-28 h-28 rounded-full bg-gradient-to-br ${sub.gradient} opacity-[0.03] group-hover:opacity-[0.08] blur-xl transition-all duration-300`} />

                      {/* Header Row */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl bg-zinc-950 border border-zinc-850 shadow-md group-hover:scale-105 transition-all">
                          {sub.icon}
                        </div>
                        <span className="text-[10px] font-extrabold text-zinc-500 tracking-wider font-mono">
                          {sub.code}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-base font-bold text-zinc-200 group-hover:text-zinc-100 transition-colors">
                        {sub.title}
                      </h3>
                      <p className="text-xs text-zinc-400 font-normal leading-relaxed mt-2 line-clamp-2">
                        {sub.description}
                      </p>

                      {/* Divider */}
                      <div className="border-t border-zinc-900/60 my-4" />

                      {/* Progress Bar & Counter */}
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                          <span>Progress: {progress.percent}%</span>
                          <span className="font-mono">{progress.completedCount}/{progress.totalCount} Lectures</span>
                        </div>
                        <div className="w-full bg-zinc-950 rounded-full h-1.5 overflow-hidden border border-zinc-900">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${sub.gradient} transition-all duration-300`}
                            style={{ width: `${progress.percent}%` }}
                          />
                        </div>
                      </div>

                      {/* Link hint */}
                      <div className="mt-4 pt-1.5 flex items-center gap-1.5 text-xs font-bold text-indigo-400 group-hover:text-indigo-300 transition-colors">
                        <span>Open Subject Player</span>
                        <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                    </Link>
                  );
                })}
              </div>

            </div>
          </div>

          {/* RIGHT: Syllabus Box (Span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Syllabus card */}
            <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/20 shadow-lg flex flex-col gap-5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-red-500/5 blur-xl group-hover:bg-red-500/10 transition-all duration-300" />
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-950/20 border border-red-500/20 flex items-center justify-center text-xl shadow">
                  📄
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-200">Syllabus Box</h3>
                  <span className="text-[10px] font-extrabold text-red-400 tracking-widest uppercase">AKTU Syllabus PDFs</span>
                </div>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                Dr. A.P.J. Abdul Kalam Technical University (AKTU) official Computer Science B.Tech curriculum. Click below to view the syllabus summaries.
              </p>

              <div className="flex flex-col gap-2 mt-2">
                {aktuSyllabus.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl border border-zinc-800 bg-zinc-950/60 hover:bg-zinc-850 flex justify-between items-center text-xs text-zinc-350 hover:text-white transition"
                  >
                    <span className="font-bold">{s.year} Syllabus</span>
                    <span className="text-[9px] bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded text-zinc-550 font-bold">PDF</span>
                  </a>
                ))}
              </div>

              <button
                onClick={() => setIsSyllabusModalOpen(true)}
                className="w-full py-2.5 mt-2 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900 hover:bg-zinc-850 text-zinc-300 font-bold text-xs tracking-wide shadow-sm hover:scale-[1.01] transition-all cursor-pointer"
              >
                👁️ View Syllabus Summaries Online
              </button>
            </div>
            
            <div className="p-6 rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/10 text-center flex flex-col items-center justify-center gap-2">
              <span className="text-2xl">📝</span>
              <h4 className="text-xs font-extrabold text-zinc-450 uppercase tracking-widest">Contribute Material</h4>
              <p className="text-xs text-zinc-500 max-w-xs leading-relaxed mt-1">
                Have verified notes or solved papers? Send a pull request to add it to our study directories.
              </p>
            </div>

          </div>

        </div>

      </main>

      {/* SYLLABUS MODAL */}
      {isSyllabusModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-4xl max-h-[85vh] bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-zinc-850 flex justify-between items-center bg-zinc-950/40">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📄</span>
                <div>
                  <h3 className="text-lg font-bold text-zinc-100">AKTU CSE Course Syllabus</h3>
                  <p className="text-xs text-zinc-500">Official Curriculum Overview - Dr. A.P.J. Abdul Kalam Technical University</p>
                </div>
              </div>
              <button
                onClick={() => setIsSyllabusModalOpen(false)}
                className="p-2 text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-xl transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto flex-grow flex flex-col gap-6 text-zinc-300 text-sm leading-relaxed">
              
              <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs">
                <strong>Course Notice:</strong> Below is a summary of B.Tech Computer Science core subjects. You can access full download links from the syllabus card.
              </div>

              {/* Subject 1 */}
              <div>
                <h4 className="font-extrabold text-zinc-100 border-b border-zinc-800 pb-1 mb-2 text-base">KCS-301: Data Structures & Algorithms</h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-zinc-400 pl-2">
                  <li><strong>Unit 1:</strong> Introduction to data structures, algebraic notation, Arrays memory mapping, Sparse matrices.</li>
                  <li><strong>Unit 2:</strong> Stacks operations & recursion, linear queues, circular queues, deques, priority queues.</li>
                  <li><strong>Unit 3:</strong> Singly linked list, Doubly linked list, circular list, header lists, polynomial representation.</li>
                  <li><strong>Unit 4:</strong> Binary Trees, traversals, Binary Search Tree (BST), AVL Trees, balancing rotations.</li>
                  <li><strong>Unit 5:</strong> Directed/Undirected Graphs, BFS, DFS, Dijkstra shortest paths, Sorting (Insertion, Selection, Merge, Quick).</li>
                </ul>
              </div>

              {/* Subject 2 */}
              <div>
                <h4 className="font-extrabold text-zinc-100 border-b border-zinc-800 pb-1 mb-2 text-base">KCS-303: Computer Organization & Architecture</h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-zinc-400 pl-2">
                  <li><strong>Unit 1:</strong> Von Neumann architecture, functional units, bus transfer, register transfer language.</li>
                  <li><strong>Unit 2:</strong> Adders, Booth multiplication algorithm, Restoring/Non-Restoring division, floating point arithmetic (IEEE-754).</li>
                  <li><strong>Unit 3:</strong> Hardwired control unit design, microinstruction format, pipelining stages, data hazards.</li>
                  <li><strong>Unit 4:</strong> Memory hierarchies, cache mappings (Direct, Associative, Set-Associative), virtual memory translation.</li>
                  <li><strong>Unit 5:</strong> Interrupt priority grids, programmed I/O, Interrupt-driven transfer, Direct Memory Access (DMA).</li>
                </ul>
              </div>

              {/* Subject 3 */}
              <div>
                <h4 className="font-extrabold text-zinc-100 border-b border-zinc-800 pb-1 mb-2 text-base">KCS-304: Object Oriented Programming</h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-zinc-400 pl-2">
                  <li><strong>Unit 1:</strong> OOP paradigms, JVM bytecodes, class instantiations, primitive variables.</li>
                  <li><strong>Unit 2:</strong> Inheritance principles, super/this bindings, method overloading and overriding polymorphism.</li>
                  <li><strong>Unit 3:</strong> Exception handling frameworks (Try, Catch, Finally blocks), interface schemas.</li>
                  <li><strong>Unit 4:</strong> Java multi-threading lifecycle, thread synchronizations, Collections structures (List, Set, Map).</li>
                  <li><strong>Unit 5:</strong> FileReader/FileWriter streams, basic Swing/AWT components.</li>
                </ul>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-zinc-850 bg-zinc-950/40 flex justify-end">
              <button
                onClick={() => setIsSyllabusModalOpen(false)}
                className="px-4 py-2 border border-zinc-800 bg-zinc-900 hover:bg-zinc-850 text-zinc-450 hover:text-white text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Close View
              </button>
            </div>

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
