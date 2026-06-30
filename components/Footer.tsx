export default function Footer() {
  return (
    <footer className="w-full glass-panel border-t border-zinc-800/60 bg-zinc-950/20 py-8 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎓</span>
            <p className="text-xs text-zinc-500 font-semibold tracking-wider uppercase">
              StudyWithMe © {new Date().getFullYear()} — Built for Engineers
            </p>
          </div>
          
          <div className="flex gap-6 text-xs text-zinc-400 font-medium">
            <a href="#" className="hover:text-indigo-400 transition">Resources</a>
            <a href="#" className="hover:text-indigo-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-400 transition">Terms of Service</a>
            <a href="#" className="hover:text-indigo-400 transition">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
