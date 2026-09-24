'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Check, Clock3, Flame, Star, X, ArrowRight } from 'lucide-react';

import { Workout } from '@/types/workout';
import { useFitLog } from '@/context/FitLogContext';
import { toast } from 'react-toastify';

export default function PlanPage({ workouts }: { workouts: Workout[] }) {
  const { plan, saved, done, removeFromPlan, removeSaved, markDone } =
    useFitLog();
  const [tab, setTab] = useState<'plan' | 'saved'>('plan');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(t);
  }, []);
  const ids = tab === 'plan' ? plan : saved;
  const items = useMemo(
    () =>
      ids
        .map(id => workouts.find(w => w.id === id))
        .filter(Boolean) as Workout[],
    [ids, workouts],
  );
  const metrics = useMemo(
    () =>
      plan
        .map(id => workouts.find(w => w.id === id))
        .filter(Boolean)
        .reduce(
          (a, w) => ({
            minutes: a.minutes + w!.duration,
            calories: a.calories + w!.caloriesBurned,
          }),
          { minutes: 0, calories: 0 },
        ),
    [plan, workouts],
  );
  return (
    <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black tracking-[.3em] text-[#ccff00]">
            YOUR LOG
          </p>
          <h1 className="mt-2 text-5xl font-black uppercase">My Plan</h1>
          <p className="mt-2 text-white/50">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-3 gap-3">
        <Metric title="Exercises" value={plan.length} />
        <Metric title="Minutes" value={metrics.minutes} />
        <Metric title="Calories" value={metrics.calories} />
      </div>
      <div className="mt-8 flex gap-2 border-b border-white/10">
        <button
          onClick={() => setTab('plan')}
          className={`px-5 py-3 text-xs font-black uppercase ${tab === 'plan' ? 'border-b-2 border-[#ccff00] text-[#ccff00]' : 'text-white/45'}`}
        >
          Today&apos;s Plan ({plan.length})
        </button>
        <button
          onClick={() => setTab('saved')}
          className={`px-5 py-3 text-xs font-black uppercase ${tab === 'saved' ? 'border-b-2 border-[#ccff00] text-[#ccff00]' : 'text-white/45'}`}
        >
          Saved ({saved.length})
        </button>
      </div>
      {loading ? (
        <div className="py-20 text-center text-white/50">Loading workouts…</div>
      ) : items.length === 0 ? (
        <div className="py-20 text-center">
          <h2 className="text-2xl font-black uppercase">Nothing here yet</h2>
          <p className="mt-2 text-white/45">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-5 py-3 text-sm font-black uppercase text-black"
          >
            Go to workouts <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {items.map(w => (
            <article
              key={w.id}
              className={`flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#121511] p-4 sm:flex-row sm:items-center ${done.includes(w.id) ? 'opacity-60' : ''}`}
            >
              <div className="relative h-24 w-full overflow-hidden rounded-xl sm:w-32">
                <Image
                  src={w.image}
                  alt={w.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap gap-2">
                  {w.muscleGroups.map(t => (
                    <span
                      key={t}
                      className="text-[9px] font-black uppercase text-[#ccff00]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="mt-1 truncate text-lg font-black uppercase">
                  {w.name}
                </h3>
                <p className="text-sm text-white/45">{w.equipment}</p>
                <div className="mt-2 flex gap-4 text-xs text-white/50">
                  <span>
                    <Clock3 size={13} className="mr-1 inline" /> {w.duration}{' '}
                    min
                  </span>
                  <span>
                    <Flame size={13} className="mr-1 inline" />{' '}
                    {w.caloriesBurned} kcal
                  </span>
                  <span>
                    <Star size={13} className="mr-1 inline" /> {w.rating}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/workout/${w.id}`}
                  className="rounded-full border border-white/15 px-4 py-2 text-xs font-black uppercase"
                >
                  View Details
                </Link>
                {tab === 'plan' && (
                  <>
                    <button
                      disabled={done.includes(w.id)}
                      onClick={() => {
                        markDone(w.id);
                        toast.success('Workout marked as done');
                      }}
                      className="flex items-center gap-1 rounded-full bg-[#ccff00] px-4 py-2 text-xs font-black uppercase text-black disabled:opacity-40"
                    >
                      <Check size={14} />{' '}
                      {done.includes(w.id) ? 'Done' : 'Mark as Done'}
                    </button>
                    <button
                      onClick={() => {
                        removeFromPlan(w.id);
                        toast.error("Removed from today's plan");
                      }}
                      className="rounded-full border border-red-400/30 p-2 text-red-300"
                      aria-label="Remove"
                    >
                      <X size={16} />
                    </button>
                  </>
                )}
                {tab === 'saved' && (
                  <button
                    onClick={() => {
                      removeSaved(w.id);
                      toast.success('Removed from saved');
                    }}
                    className="rounded-full border border-red-400/30 p-2 text-red-300"
                    aria-label="Remove"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
function Metric({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#121511] p-4">
      <p className="text-[10px] font-black uppercase tracking-wider text-white/40">
        {title}
      </p>
      <p className="mt-1 text-2xl font-black text-[#ccff00]">{value}</p>
    </div>
  );
}
