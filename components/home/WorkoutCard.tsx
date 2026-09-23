import Image from 'next/image';
import Link from 'next/link';
import { Clock3, Flame, Star } from 'lucide-react';
import { Workout } from '@/types/workout';

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-[#121511] transition hover:-translate-y-1 hover:border-[#ccff00]/50"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-[#20241d]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {workout.muscleGroups.map(tag => (
            <span
              key={tag}
              className="rounded-full border border-white/15 px-2.5 py-1 text-[10px] font-black uppercase text-[#ccff00]"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-lg font-black uppercase">{workout.name}</h3>
        <p className="mt-2 text-sm text-white/50">{workout.equipment}</p>
        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-white/60">
          <span className="flex items-center gap-1">
            <Clock3 size={14} /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame size={14} /> {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star size={14} className="fill-[#ccff00] text-[#ccff00]" />{' '}
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
