'use client';
import { useMemo, useState } from 'react';
import { ArrowDownUp } from 'lucide-react';
import { Workout } from '@/types/workout';
import WorkoutCard from './WorkoutCard';

export default function WorkoutLibrary({ workouts }: { workouts: Workout[] }) {
  const [sort, setSort] = useState('duration');
  const sorted = useMemo(
    () =>
      [...workouts].sort((a, b) =>
        sort === 'calories'
          ? b.caloriesBurned - a.caloriesBurned
          : sort === 'rating'
            ? b.rating - a.rating
            : a.duration - b.duration,
      ),
    [workouts, sort],
  );

  return (
    <section id="library" className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-black tracking-[.3em] text-[#ccff00]">
            12 MOVEMENTS
          </p>
          <h2 className="text-4xl font-black uppercase sm:text-5xl">
            The Library
          </h2>
          <p className="mt-2 text-white/50">
            Twelve lifts covering every major muscle group.
          </p>
        </div>
        <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#121511] px-4 py-3 text-sm">
          <ArrowDownUp size={16} className="text-[#ccff00]" />
          <span className="text-white/50">Sort By</span>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="bg-transparent font-bold outline-none"
          >
            <option value="duration" className="bg-[#121511]">
              Duration
            </option>
            <option value="calories" className="bg-[#121511]">
              Calories
            </option>
            <option value="rating" className="bg-[#121511]">
              Rating
            </option>
          </select>
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map(w => (
          <WorkoutCard key={w.id} workout={w} />
        ))}
      </div>
    </section>
  );
}
