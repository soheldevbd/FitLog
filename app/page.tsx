import { getWorkouts } from '@/lib/api';
import HomeClient from '@/components/home/HomeClient';

export default async function Home() {
  const workouts = await getWorkouts();
  return <HomeClient workouts={workouts} />;
}
