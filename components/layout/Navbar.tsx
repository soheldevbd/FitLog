'use client';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useFitLog } from '@/context/FitLogContext';
import Logo from '@/public/logo.png';
import Image from 'next/image';
export default function Navbar() {
  const { plan, saved } = useFitLog();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0d0a]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-black tracking-tight"
        >
          <span className="grid h-9 w-9 place-items-center  text-black">
            <Image src={Logo} alt="logo" width={30} height={30}></Image>
          </span>
          <span>
            FIT<span className="text-[#ccff00]">LOG</span>
          </span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-bold uppercase tracking-wider hover:text-[#ccff00]"
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            className="text-sm font-bold uppercase tracking-wider hover:text-[#ccff00]"
          >
            My Plan
          </Link>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <Link
            href="/my-plan"
            className="rounded-full bg-[#ccff00] px-4 py-2 text-xs font-black uppercase text-black"
          >
            Plan <b>{plan.length}</b>
          </Link>
          <Link
            href="/my-plan"
            className="rounded-full border border-white/30 px-4 py-2 text-xs font-black uppercase"
          >
            Saved <b>{saved.length}</b>
          </Link>
        </div>
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-white/10 px-5 pb-5 md:hidden">
          <div className="flex flex-col gap-4 pt-4">
            <Link href="/" onClick={() => setOpen(false)}>
              Workout
            </Link>
            <Link href="/my-plan" onClick={() => setOpen(false)}>
              My Plan
            </Link>
            <div className="flex gap-2">
              <Link
                href="/my-plan"
                className="rounded-full bg-[#ccff00] px-4 py-2 text-xs font-black text-black"
              >
                Plan {plan.length}
              </Link>
              <Link
                href="/my-plan"
                className="rounded-full border border-white/30 px-4 py-2 text-xs font-black"
              >
                Saved {saved.length}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
