import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubjectCard from "@/components/SubjectCard";
import Link from "next/link";

export default function Home() {
  const sem3Subjects = [
    {
      title: "Data Structures & Algorithms",
      code: "KCS-301",
      description: "Learn fundamental linear and non-linear data structures including Arrays, Linked Lists, Trees, Graphs, Sorting, Searching, and Dynamic Programming.",
      status: "active" as const,
      icon: "⚡",
      href: "/dsa",
      gradient: "from-indigo-500 to-purple-600"
    },
    {
      title: "Computer Organization & Architecture",
      code: "KCS-302",
      description: "Study memory hierarchy, instruction pipelining, input-output organization, register transfer language, and CPU internal structure.",
      status: "locked" as const,
      icon: "💻",
      gradient: "from-blue-500 to-teal-600"
    },
    {
      title: "Discrete Structures & Theory of Logic",
      code: "KCS-303",
      description: "Explore sets, relations, functions, algebraic structures, propositional logic, lattices, boolean algebra, and graph theory concepts.",
      status: "locked" as const,
      icon: "📐",
      gradient: "from-pink-500 to-rose-600"
    },
    {
      title: "Object Oriented Programming",
      code: "KCS-304",
      description: "Master OOP principles (Abstraction, Encapsulation, Inheritance, Polymorphism) using Java/C++ with standard library interfaces.",
      status: "locked" as const,
      icon: "☕",
      gradient: "from-amber-500 to-orange-600"
    },
    {
      title: "Technical Communication",
      code: "KAS-301",
      description: "Enhance professional speaking, technical report writing, active presentation skills, and communication dynamics in organizations.",
      status: "locked" as const,
      icon: "🗣️",
      gradient: "from-violet-500 to-indigo-600"
    }
  ];

  return (
    <div className="flex-1 flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 md:py-16 flex flex-col gap-12 md:gap-16">
        
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center max-w-4xl mx-auto gap-5">
          <span className="text-xs uppercase font-extrabold tracking-widest px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-sm shadow-indigo-600/5">
            🚀 All-in-One Semester Companion
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Elevate Your Study Sessions with{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-indigo-200 to-purple-400 bg-clip-text text-transparent glow-text-indigo">
              StudyWithMe
            </span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 font-normal leading-relaxed max-w-2xl">
            A premium engineering learning hub featuring detailed syllabus modules, curated lecture playlists, auto-saved notes, and progress trackers built for AKTU computer science students.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <Link
              href="#aktu-section"
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/20 transition-all duration-200"
            >
              Explore 3rd Sem Subjects
            </Link>
            <Link
              href="/dsa/player"
              className="px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-zinc-100 font-semibold text-sm transition-all duration-200"
            >
              Love Babbar DSA Tracker
            </Link>
          </div>
        </section>

        {/* Feature Highlights Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl glass-panel border border-zinc-800/60 bg-zinc-950/20 flex gap-4">
            <div className="text-3xl shrink-0">📈</div>
            <div>
              <h3 className="font-bold text-zinc-200 text-sm mb-1">Progress Tracking</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Check off lectures as you complete them. Your course progression is stored locally so you can resume exactly where you left off.
              </p>
            </div>
          </div>
          
          <div className="p-6 rounded-2xl glass-panel border border-zinc-800/60 bg-zinc-950/20 flex gap-4">
            <div className="text-3xl shrink-0">📝</div>
            <div>
              <h3 className="font-bold text-zinc-200 text-sm mb-1">Auto-Saved Notes</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Write comprehensive code notes directly inline while watching. Notes auto-save in real-time, and you can export all of them with one click.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-zinc-800/60 bg-zinc-950/20 flex gap-4">
            <div className="text-3xl shrink-0">🎓</div>
            <div>
              <h3 className="font-bold text-zinc-200 text-sm mb-1">Syllabus Aligned</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Tailored explicitly to standard AKTU syllabus configurations. Get reference study material and practice sets categorized by modules.
              </p>
            </div>
          </div>
        </section>

        {/* AKTU 3rd Semester Section */}
        <section id="aktu-section" className="flex flex-col gap-6 md:gap-8 scroll-mt-24">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-100 flex items-center gap-3">
              <span className="text-indigo-500">■</span> AKTU 3rd Semester
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl font-normal leading-relaxed">
              Access curriculum modules, lectures, handwritten notes, and solved questions for third semester Computer Science courses.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sem3Subjects.map((sub) => (
              <SubjectCard
                key={sub.code}
                title={sub.title}
                code={sub.code}
                description={sub.description}
                status={sub.status}
                icon={sub.icon}
                href={sub.href}
                gradient={sub.gradient}
              />
            ))}
          </div>
        </section>

        {/* Quick Shortcut Banner to Course Player */}
        <section className="rounded-2xl overflow-hidden relative border border-indigo-500/20 bg-indigo-950/10 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 pointer-events-none" />
          <div className="flex flex-col gap-2 relative z-10">
            <h3 className="text-lg md:text-xl font-extrabold text-indigo-300">
              Interactive Love Babbar DSA Course Player
            </h3>
            <p className="text-xs md:text-sm text-zinc-400 max-w-2xl">
              Track progress, make detailed lecture-wise annotations, and master Java DSA step-by-step through a feature-rich, high-performance video player containing all 150 Lectures.
            </p>
          </div>
          <Link
            href="/dsa/player"
            className="shrink-0 relative z-10 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold text-xs md:text-sm tracking-wide shadow-md shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            Launch Player 🚀
          </Link>
        </section>

      </main>

      <Footer />
    </div>
  );
}