// Fonction pour calculer Pâques pour une année donnée (algorithme de Meeus/Jones/Butcher)
const calculateEaster = (year: number): Date => {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
};

// Fonction pour ajouter des jours à une date
const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Fonction pour obtenir tous les jours fériés d'une année
export const getFrenchHolidays = (year: number): Date[] => {
  const holidays: Date[] = [];

  // Jours fériés fixes
  holidays.push(new Date(year, 0, 1));   // Jour de l'an
  holidays.push(new Date(year, 4, 1));   // Fête du travail
  holidays.push(new Date(year, 4, 8));   // Victoire 1945
  holidays.push(new Date(year, 6, 14));  // Fête nationale
  holidays.push(new Date(year, 7, 15));  // Assomption
  holidays.push(new Date(year, 10, 1));  // Toussaint
  holidays.push(new Date(year, 10, 11)); // Armistice
  holidays.push(new Date(year, 11, 25)); // Noël

  // Jours fériés basés sur Pâques
  const easter = calculateEaster(year);
  holidays.push(easter); // Pâques
  holidays.push(addDays(easter, 1)); // Lundi de Pâques
  holidays.push(addDays(easter, 39)); // Ascension
  holidays.push(addDays(easter, 50)); // Pentecôte

  return holidays;
};

// Fonction pour vérifier si une date est un jour férié
export const isHoliday = (date: Date): boolean => {
  const holidays = getFrenchHolidays(date.getFullYear());
  return holidays.some(holiday => 
    holiday.getDate() === date.getDate() &&
    holiday.getMonth() === date.getMonth() &&
    holiday.getFullYear() === date.getFullYear()
  );
};

// Fonction pour vérifier si une date est la veille d'un jour férié
export const isHolidayEve = (date: Date): boolean => {
  const nextDay = addDays(date, 1);
  return isHoliday(nextDay);
}; 