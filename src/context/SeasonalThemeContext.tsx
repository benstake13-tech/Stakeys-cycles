import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export const SEASONAL_THEMES = [
  { id: 'christmas', label: 'Christmas', character: 'Santa & elf', icon: '🎄', description: 'Santa and a cheeky workshop elf' },
  { id: 'halloween', label: 'Halloween', character: 'Goblin', icon: '🎃', description: 'A friendly little goblin' },
  { id: 'st-patricks', label: "St Patrick's Day", character: 'Leprechaun', icon: '☘️', description: 'A lucky leprechaun' },
  { id: 'valentines', label: "Valentine's Day", character: 'Cupid', icon: '💘', description: 'A playful little Cupid' },
  { id: 'easter', label: 'Easter', character: 'Easter bunny', icon: '🐣', description: 'A springtime bunny' },
] as const;

export type SeasonalThemeId = (typeof SEASONAL_THEMES)[number]['id'];
type SeasonalThemeContextValue = {
  theme: SeasonalThemeId;
  setTheme: (theme: SeasonalThemeId) => void;
};

const SeasonalThemeContext = createContext<SeasonalThemeContextValue | null>(null);
const STORAGE_KEY = 'stakeys-seasonal-theme';

function themeForDate(date = new Date()): SeasonalThemeId {
  const month = date.getMonth();
  if (month === 11) return 'christmas';
  if (month === 9) return 'halloween';
  if (month === 2) return 'st-patricks';
  if (month === 1) return 'valentines';
  if (month === 3) return 'easter';
  return 'christmas';
}

export function SeasonalThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<SeasonalThemeId>(() => {
    if (typeof window === 'undefined') return themeForDate();
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return SEASONAL_THEMES.some((item) => item.id === saved) ? (saved as SeasonalThemeId) : themeForDate();
  });

  const setTheme = (nextTheme: SeasonalThemeId) => setThemeState(nextTheme);

  useEffect(() => {
    document.documentElement.dataset.season = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return <SeasonalThemeContext.Provider value={value}>{children}</SeasonalThemeContext.Provider>;
}

export function useSeasonalTheme() {
  const context = useContext(SeasonalThemeContext);
  if (!context) throw new Error('useSeasonalTheme must be used inside SeasonalThemeProvider');
  return context;
}
