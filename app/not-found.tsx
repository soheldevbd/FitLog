import Link from 'next/link';
export default function NotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center px-5 text-center">
      <div>
        <p className="text-7xl font-black text-[#ccff00]">404</p>
        <h1 className="mt-3 text-3xl font-black uppercase">Route not found</h1>
        <p className="mt-2 text-white/45">
          The workout or page you requested does not exist.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-[#ccff00] px-6 py-3 text-sm font-black uppercase text-black"
        >
          Back to FitLog
        </Link>
      </div>
    </main>
  );
}
