// src/lib/dictionary.ts
import 'server-only';

// Ovo definira koje sve jezike imamo na raspolaganju
const dictionaries = {
  hr: () => import('../../dictionaries/hr.json').then((module) => module.default),
  en: () => import('../../dictionaries/en.json').then((module) => module.default),
  de: () => import('../../dictionaries/de.json').then((module) => module.default),
  hu: () => import('../../dictionaries/hu.json').then((module) => module.default),
  cs: () => import('../../dictionaries/cs.json').then((module) => module.default),
};

// Funkcija koja vuče pravi JSON na temelju proslijeđenog jezika
export const getDictionary = async (locale: 'hr' | 'en' | 'de' | 'hu' | 'cs') => {
  return dictionaries[locale]?.() ?? dictionaries.hr();
};