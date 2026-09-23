'use client';
import { ArrowDown, ArrowRight } from 'lucide-react';
import WorkoutLibrary from './WorkoutLibrary';
import { Workout } from '@/types/workout';
import Image from 'next/image';

export default function HomeClient({ workouts }: { workouts: Workout[] }) {
  return (
    <>
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-24">
        <div>
          <p className="mb-5 text-xs font-black tracking-[.35em] text-[#ccff00]">
            WORKOUT LIBRARY
          </p>
          <h1 className="max-w-4xl text-5xl font-black uppercase leading-[.92] tracking-tight sm:text-6xl lg:text-7xl">
            Train with intent. Log every set.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/55">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-6 py-3 text-sm font-black uppercase text-black transition hover:scale-105"
          >
            Browse workouts <ArrowRight size={17} />
          </a>
        </div>
        <div className="relative aspect-4/3 overflow-hidden rounded-4xl border border-white/10 bg-[#151914]">
          <Image
            src={workouts[0]?.image || ''}
            alt="FitLog workout"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-tr from-black/60 via-transparent to-[#ccff00]/10" />
          <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-xs font-bold backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-[#ccff00]" /> TRAIN / LOG /
            REPEAT
          </div>
        </div>
      </section>
      <WorkoutLibrary workouts={workouts} />
    </>
  );
}
