import Link from "next/link";

interface SubjectCardProps {
  title: string;
  code: string;
  description: string;
  status: "active" | "locked";
  icon: string;
  href?: string;
  gradient: string;
}

export default function SubjectCard({
  title,
  code,
  description,
  status,
  icon,
  href = "#",
  gradient
}: SubjectCardProps) {
  const isActive = status === "active";

  const CardContent = (
    <div className={`h-full p-6 flex flex-col relative rounded-2xl overflow-hidden glass-panel-interactive border border-zinc-800/80 group ${
      !isActive ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
    }`}>
      {/* Accent Gradient Blur Effect on hover */}
      <div className={`absolute -right-16 -top-16 w-36 h-36 rounded-full bg-gradient-to-br ${gradient} opacity-10 group-hover:opacity-30 blur-2xl transition-all duration-300`} />

      {/* Top row: Icon & Status */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-zinc-900 border border-zinc-800/50 group-hover:scale-110 group-hover:border-indigo-500/20 transition-all duration-300 shadow`}>
          {icon}
        </div>
        <span className={`text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-full border ${
          isActive
            ? "bg-indigo-950/40 text-indigo-400 border-indigo-500/20 shadow-sm shadow-indigo-600/10"
            : "bg-zinc-950/40 text-zinc-500 border-zinc-800"
        }`}>
          {isActive ? "Active" : "Coming Soon"}
        </span>
      </div>

      {/* Title & Code */}
      <div className="mb-2">
        <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">{code}</span>
        <h3 className="text-lg font-bold text-zinc-100 mt-0.5 group-hover:text-white transition-colors">
          {title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-xs text-zinc-400 font-normal leading-relaxed mb-6 flex-1">
        {description}
      </p>

      {/* Bottom CTA */}
      <div className="mt-auto pt-2 flex items-center gap-2 text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors">
        {isActive ? (
          <>
            <span>Explore Syllabus & Lectures</span>
            <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </>
        ) : (
          <span className="text-zinc-500">Subject Locked</span>
        )}
      </div>
    </div>
  );

  if (isActive) {
    return (
      <Link href={href} className="block h-full">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}
