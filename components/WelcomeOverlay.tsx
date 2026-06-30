"use client";

import { useState, useEffect } from "react";

export default function WelcomeOverlay() {
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedName = localStorage.getItem("student_name");
    if (!storedName) {
      setShow(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    localStorage.setItem("student_name", name.trim());
    
    // Set default theme to auto if not present
    if (!localStorage.getItem("student_theme")) {
      localStorage.setItem("student_theme", "auto");
    }
    
    setShow(false);
    // Reload page to propagate the username across navbar and panels
    window.location.reload();
  };

  if (!mounted || !show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-950/80 backdrop-blur-xl animate-fade-in">
      <div className="w-full max-w-md mx-4 p-8 rounded-2xl glass-panel border border-indigo-500/20 shadow-2xl flex flex-col gap-6 text-center animate-slide-up">
        <div className="flex flex-col items-center gap-2">
          <span className="text-4xl">👋</span>
          <h1 className="text-2xl font-extrabold text-zinc-100 mt-2 font-sans tracking-wide">
            Welcome to Student Workspace
          </h1>
          <p className="text-sm text-zinc-400 max-w-xs mt-1">
            Please enter your name to continue and unlock your learning dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name (e.g. Kunal)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 bg-zinc-900/60 border border-zinc-800 focus:border-indigo-500/80 rounded-xl text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 text-center transition"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm tracking-wide shadow-md shadow-indigo-600/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
          >
            Get Started 🚀
          </button>
        </form>
      </div>
    </div>
  );
}
