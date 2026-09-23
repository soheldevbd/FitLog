import { Dumbbell } from 'lucide-react';
export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080908]">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div className="flex items-center gap-2 font-black">
          <Dumbbell size={18} className="text-[#ccff00]" /> FITLOG
        </div>
        <p className="text-xs text-white/50">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
