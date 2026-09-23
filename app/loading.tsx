export default function Loading() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-5">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-[#ccff00]" />
        <p className="mt-5 text-xs font-black uppercase tracking-[.3em] text-white/50">
          Loading workouts…
        </p>
      </div>
    </main>
  );
}
