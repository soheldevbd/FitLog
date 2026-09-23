import { getWorkouts } from '@/lib/api';
import PlanPage from '@/components/plan/PlanPage';
export default async function MyPlan() {
  const workouts = await getWorkouts();
  return <PlanPage workouts={workouts} />;
}
