import { useState, useCallback } from 'react';
import { allQuestions, riasecProfiles, type Question, type RiasecType, type RiasecProfile } from '@/data/quizQuestions';
import { careerDetails, subtypeTypeMap, type CareerDetail } from '@/data/careerDetails';

const KEYS = {
  questions: 'trampos_admin_questions',
  careers: 'trampos_admin_careers',
  profiles: 'trampos_admin_profiles',
} as const;

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T;
  } catch { /* ignore */ }
  return fallback;
}

function save<T>(key: string, data: T) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch { /* ignore */ }
}

// All 60 official subtypes
export const ALL_SUBTYPES = Object.keys(subtypeTypeMap);

export function getTypeForSubtype(sub: string): RiasecType | undefined {
  return subtypeTypeMap[sub];
}

export function useAdminData() {
  const [questions, setQuestions] = useState<Question[]>(() => load(KEYS.questions, allQuestions));
  const [careers, setCareers] = useState<CareerDetail[]>(() => load(KEYS.careers, careerDetails));
  const [profiles, setProfiles] = useState<Record<RiasecType, RiasecProfile>>(() => load(KEYS.profiles, riasecProfiles));

  const updateQuestion = useCallback((index: number, updated: Question) => {
    setQuestions(prev => {
      const next = [...prev];
      next[index] = updated;
      save(KEYS.questions, next);
      return next;
    });
  }, []);

  const updateCareer = useCallback((index: number, updated: CareerDetail) => {
    setCareers(prev => {
      const next = [...prev];
      next[index] = updated;
      save(KEYS.careers, next);
      return next;
    });
  }, []);

  const updateProfile = useCallback((type: RiasecType, updated: RiasecProfile) => {
    setProfiles(prev => {
      const next = { ...prev, [type]: updated };
      save(KEYS.profiles, next);
      return next;
    });
  }, []);

  const resetQuestions = useCallback(() => {
    localStorage.removeItem(KEYS.questions);
    setQuestions(allQuestions);
  }, []);

  const resetCareers = useCallback(() => {
    localStorage.removeItem(KEYS.careers);
    setCareers(careerDetails);
  }, []);

  const resetProfiles = useCallback(() => {
    localStorage.removeItem(KEYS.profiles);
    setProfiles(riasecProfiles);
  }, []);

  return {
    questions, careers, profiles,
    updateQuestion, updateCareer, updateProfile,
    resetQuestions, resetCareers, resetProfiles,
  };
}
