import React, { createContext, useContext, useState, useEffect } from "react";

const STORAGE_KEY = "app-settings";
const DEFAULT_SETTINGS = { theme: "light", language: "en" };

const SettingsContext = createContext(null);

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw);
    return {
      theme: parsed.theme === "dark" ? "dark" : "light",
      language: parsed.language === "th" ? "th" : "en",
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function SettingsProvider({ children }) {
  const [theme, setThemeState] = useState(() => loadSettings().theme);
  const [language, setLanguageState] = useState(() => loadSettings().language);

  // 3. Save to localStorage whenever theme or language changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ theme, language }));
  }, [theme, language]);

  const setTheme = (value) => setThemeState(value === "dark" ? "dark" : "light");
  const setLanguage = (value) => setLanguageState(value === "th" ? "th" : "en");
  const resetSettings = () => {
    setThemeState(DEFAULT_SETTINGS.theme);
    setLanguageState(DEFAULT_SETTINGS.language);
  };

  const value = { theme, language, setTheme, setLanguage, resetSettings };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return ctx;
}

const TEXT = {
  en: {
    title: "Welcome",
    previewHeading: "Settings preview",
    currentTheme: "Current theme",
    currentLanguage: "Current language",
    sampleMessage: "This is your preference preview.",
    settingsHeading: "Settings",
    themeLabel: "Theme",
    languageLabel: "Language",
    light: "Light",
    dark: "Dark",
    english: "English",
    thai: "Thai",
    reset: "Reset to defaults",
  },
  th: {
    title: "ยินดีต้อนรับ",
    previewHeading: "ตัวอย่างการตั้งค่า",
    currentTheme: "ธีมปัจจุบัน",
    currentLanguage: "ภาษาปัจจุบัน",
    sampleMessage: "นี่คือหน้าตัวอย่างการตั้งค่า",
    settingsHeading: "ตั้งค่า",
    themeLabel: "ธีม",
    languageLabel: "ภาษา",
    light: "สว่าง",
    dark: "มืด",
    english: "อังกฤษ",
    thai: "ไทย",
    reset: "รีเซ็ตเป็นค่าเริ่มต้น",
  },
};

/* ------------------------------------------------------------------ */
/* 2. Header                                                            */
/* ------------------------------------------------------------------ */

function Header() {
  const { language, theme } = useSettings();
  const t = TEXT[language];

  return (
    <header
      className={`px-5 py-6 border-b ${
        theme === "dark" ? "border-neutral-700" : "border-neutral-200"
      }`}
    >
      <h1 className="m-0 text-2xl font-semibold">{t.title}</h1>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* 3. SettingsPanel                                                     */
/* ------------------------------------------------------------------ */

function ToggleButton({ active, onClick, children, theme }) {
  const base = "px-4 py-2 mr-2 rounded-md border text-sm cursor-pointer transition-colors";
  const activeClasses = "bg-blue-500 border-blue-500 text-white";
  const inactiveClasses =
    theme === "dark"
      ? "bg-transparent border-neutral-600 text-neutral-100 hover:bg-neutral-800"
      : "bg-transparent border-neutral-300 text-neutral-900 hover:bg-neutral-100";

  return (
    <button
      onClick={onClick}
      className={`${base} ${active ? activeClasses : inactiveClasses}`}
    >
      {children}
    </button>
  );
}

function SettingsPanel() {
  const { theme, language, setTheme, setLanguage, resetSettings } = useSettings();
  const t = TEXT[language];

  return (
    <section
      className={`m-5 p-5 rounded-lg border ${
        theme === "dark" ? "border-neutral-700" : "border-neutral-200"
      }`}
    >
      <h2 className="mt-0 mb-4 text-lg font-semibold">{t.settingsHeading}</h2>

      <div className="mb-4">
        <div className="mb-1.5 text-xs opacity-70">{t.themeLabel}</div>
        <ToggleButton active={theme === "light"} onClick={() => setTheme("light")} theme={theme}>
          {t.light}
        </ToggleButton>
        <ToggleButton active={theme === "dark"} onClick={() => setTheme("dark")} theme={theme}>
          {t.dark}
        </ToggleButton>
      </div>

      <div className="mb-4">
        <div className="mb-1.5 text-xs opacity-70">{t.languageLabel}</div>
        <ToggleButton active={language === "en"} onClick={() => setLanguage("en")} theme={theme}>
          {t.english}
        </ToggleButton>
        <ToggleButton active={language === "th"} onClick={() => setLanguage("th")} theme={theme}>
          {t.thai}
        </ToggleButton>
      </div>

      <button
        onClick={resetSettings}
        className={`px-4 py-2 rounded-md border text-sm cursor-pointer transition-colors ${
          theme === "dark"
            ? "border-neutral-500 text-neutral-100 hover:bg-neutral-800"
            : "border-neutral-400 text-neutral-900 hover:bg-neutral-100"
        }`}
      >
        {t.reset}
      </button>
    </section>
  );
}

function PreviewCard() {
  const { theme, language } = useSettings();
  const t = TEXT[language];

  return (
    <section
      className={`m-5 p-5 rounded-lg border ${
        theme === "dark"
          ? "bg-neutral-900 border-neutral-700"
          : "bg-neutral-50 border-neutral-200"
      }`}
    >
      <h2 className="mt-0 mb-3 text-lg font-semibold">{t.previewHeading}</h2>
      <p className="my-1">
        <span className="font-semibold">{t.currentTheme}:</span> {theme}
      </p>
      <p className="my-1">
        <span className="font-semibold">{t.currentLanguage}:</span> {language}
      </p>
      <p className="mt-3 italic">{t.sampleMessage}</p>
    </section>
  );
}

function AppShell() {
  const { theme } = useSettings();

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-150 ${
        theme === "dark" ? "bg-neutral-950 text-neutral-100" : "bg-white text-neutral-900"
      }`}
    >
      <Header />
      <SettingsPanel />
      <PreviewCard />
    </div>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <AppShell />
    </SettingsProvider>
  );
}