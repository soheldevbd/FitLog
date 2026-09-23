import { Workout } from '@/types/workout';

export const API_URL = 'https://api.abcz.workers.dev/api/fitlog';

export async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch(API_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch workouts');
  return res.json();
}

export async function getWorkout(id: string): Promise<Workout | null> {
  const res = await fetch(`${API_URL}/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}
