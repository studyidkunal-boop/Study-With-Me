"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("student_theme") || "auto";
    let activeTheme: "dark" | "light" = "dark";
    if (savedTheme === "auto") {
      activeTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } else {
      activeTheme = savedTheme as "dark" | "light";
    }
    setTheme(activeTheme);
    document.documentElement.setAttribute("data-theme", activeTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("student_theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Study Material", href: "/study-material" },
    { label: "DSA Dashboard", href: "/dsa" }
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 w-full glass-panel border-b border-zinc-800/60 bg-zinc-950/60 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Branding */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl transition-transform group-hover:rotate-12 duration-300">🎓</span>
              <span className="font-sans font-extrabold text-lg tracking-wider bg-gradient-to-r from-indigo-400 via-indigo-200 to-purple-400 bg-clip-text text-transparent glow-text-indigo">
                StudyWithMe
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-semibold tracking-wide transition-all duration-200 rounded-lg px-3 py-2 ${
                      active
                        ? "bg-indigo-600/15 border border-indigo-500/35 text-indigo-200 shadow shadow-indigo-600/10"
                        : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 border border-transparent"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="text-xs font-extrabold px-3 py-2 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-950/40 text-zinc-350 hover:text-zinc-200 transition flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                {theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
              </button>
            </div>
          </div>

          {/* Mobile hamburger menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2.5 text-zinc-400 hover:bg-zinc-900 hover:text-white border border-zinc-800 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-zinc-800/40 bg-zinc-950/90 backdrop-blur-lg animate-fade-in" id="mobile-menu">
          <div className="space-y-2 px-4 py-3 flex flex-col">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block rounded-xl px-4 py-2.5 text-base font-semibold transition-all ${
                    active
                      ? "bg-indigo-900/40 border-l-4 border-indigo-500 text-indigo-200"
                      : "text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            
            {/* Mobile Theme Toggle Button */}
            <button
              onClick={() => {
                toggleTheme();
                setIsOpen(false);
              }}
              className="text-left font-semibold text-base rounded-xl px-4 py-2.5 text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-105 transition flex items-center gap-2 cursor-pointer"
            >
              {theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
