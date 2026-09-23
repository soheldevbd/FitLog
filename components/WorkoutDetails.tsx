'use client';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Bookmark,
  Check,
  Clock3,
  Flame,
  ListChecks,
  Plus,
  Star,
} from 'lucide-react';
import { toast } from 'sonner';
import { Workout } from '@/types/workout';
import { useFitLog } from '@/context/FitLogContext';

export default function WorkoutDetails({ workout }: { workout: Workout }) {
  const { addToPlan, saveForLater, isInPlan, isSaved } = useFitLog();
  const add = () =>
    toast(
      addToPlan(workout.id)
        ? "Added to today's plan"
        : workout.id && isInPlan(workout.id)
          ? "Already in today's plan"
          : "Today's plan is full (5 lifts max)",
    );
  const save = () =>
    toast(saveForLater(workout.id) ? 'Saved for later' : 'Already saved');
  return (
    <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-white/50 hover:text-[#ccff00]"
      >
        <ArrowLeft size={16} /> Back to library
      </Link>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="relative min-h-105 overflow-hidden rounded-3xl border border-white/10 bg-[#121511] lg:min-h-170">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="py-2 lg:py-8">
          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups.map(t => (
              <span
                key={t}
                className="rounded-full bg-[#ccff00] px-3 py-1 text-[10px] font-black uppercase text-black"
              >
                {t}
              </span>
            ))}
          </div>
          <h1 className="mt-5 text-4xl font-black uppercase leading-none sm:text-6xl">
            {workout.name}
          </h1>
          <p className="mt-5 leading-7 text-white/55">{workout.description}</p>
          <div className="mt-8 grid grid-cols-2 overflow-hidden rounded-2xl border border-white/10 sm:grid-cols-3">
            {[
              ['Equipment', workout.equipment],
              ['Difficulty', workout.difficulty],
              ['Sets', String(workout.sets)],
              ['Reps', workout.reps],
              ['Duration', `${workout.duration} min`],
              ['Calories', `${workout.caloriesBurned} kcal`],
              ['Rating', String(workout.rating)],
            ].map(([a, b]) => (
              <div key={a} className="border-b border-r border-white/10 p-4">
                <p className="text-[10px] font-black uppercase tracking-wider text-white/40">
                  {a}
                </p>
                <p className="mt-1 text-sm font-bold">{b}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <h2 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest">
              <ListChecks size={17} className="text-[#ccff00]" /> Instructions
            </h2>
            <ol className="mt-4 space-y-3">
              {workout.instructions.map((s, i) => (
                <li
                  key={s}
                  className="flex gap-4 rounded-xl border border-white/10 p-4 text-sm text-white/65"
                >
                  <span className="font-black text-[#ccff00]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={add}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#ccff00] px-5 py-3 text-sm font-black uppercase text-black disabled:opacity-50"
            >
              <Plus size={17} />
              {isInPlan(workout.id) ? "In today's plan" : "Add to today's plan"}
            </button>
            <button
              onClick={save}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-black uppercase"
            >
              <Bookmark size={17} />
              {isSaved(workout.id) ? 'Saved' : 'Save for later'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
