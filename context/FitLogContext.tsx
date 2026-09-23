'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Workout } from '@/types/workout';

type ContextValue = {
  plan: number[];
  saved: number[];
  done: number[];
  addToPlan: (id: number) => boolean;
  saveForLater: (id: number) => boolean;
  removeFromPlan: (id: number) => void;
  removeSaved: (id: number) => void;
  markDone: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
};

const Ctx = createContext<ContextValue | null>(null);

export function FitLogProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<number[]>([]);
  const [saved, setSaved] = useState<number[]>([]);
  const [done, setDone] = useState<number[]>([]);

  useEffect(() => {
    try {
      setPlan(JSON.parse(localStorage.getItem('fitlog-plan') || '[]'));
      setSaved(JSON.parse(localStorage.getItem('fitlog-saved') || '[]'));
      setDone(JSON.parse(localStorage.getItem('fitlog-done') || '[]'));
    } catch {}
  }, []);

  useEffect(
    () => localStorage.setItem('fitlog-plan', JSON.stringify(plan)),
    [plan],
  );
  useEffect(
    () => localStorage.setItem('fitlog-saved', JSON.stringify(saved)),
    [saved],
  );
  useEffect(
    () => localStorage.setItem('fitlog-done', JSON.stringify(done)),
    [done],
  );

  const value = useMemo(
    () => ({
      plan,
      saved,
      done,
      addToPlan: (id: number) => {
        if (plan.includes(id) || plan.length >= 5) return false;
        setPlan(v => [...v, id]);
        return true;
      },
      saveForLater: (id: number) => {
        if (saved.includes(id)) return false;
        setSaved(v => [...v, id]);
        return true;
      },
      removeFromPlan: (id: number) => setPlan(v => v.filter(x => x !== id)),
      removeSaved: (id: number) => setSaved(v => v.filter(x => x !== id)),
      markDone: (id: number) => setDone(v => (v.includes(id) ? v : [...v, id])),
      isInPlan: (id: number) => plan.includes(id),
      isSaved: (id: number) => saved.includes(id),
    }),
    [plan, saved, done],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useFitLog() {
  const value = useContext(Ctx);
  if (!value) throw new Error('useFitLog must be used inside FitLogProvider');
  return value;
}
