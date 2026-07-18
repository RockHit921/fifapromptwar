import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilityContextType {
  highContrast: boolean;
  toggleHighContrast: () => void;
  dyslexiaFont: boolean;
  toggleDyslexiaFont: () => void;
  fontSize: 'normal' | 'large' | 'xlarge';
  setFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  screenReaderAnnouncement: string;
  announceForScreenReader: (message: string) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [highContrast, setHighContrast] = useState<boolean>(() => {
    return localStorage.getItem('apex_high_contrast') === 'true';
  });

  const [dyslexiaFont, setDyslexiaFont] = useState<boolean>(() => {
    return localStorage.getItem('apex_dyslexia_font') === 'true';
  });

  const [fontSize, setFontSizeState] = useState<'normal' | 'large' | 'xlarge'>(() => {
    const saved = localStorage.getItem('apex_font_size');
    return (saved as 'normal' | 'large' | 'xlarge') || 'normal';
  });

  const [screenReaderAnnouncement, setScreenReaderAnnouncement] = useState<string>('');

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    localStorage.setItem('apex_high_contrast', String(highContrast));
  }, [highContrast]);

  useEffect(() => {
    if (dyslexiaFont) {
      document.documentElement.classList.add('dyslexia-font');
    } else {
      document.documentElement.classList.remove('dyslexia-font');
    }
    localStorage.setItem('apex_dyslexia_font', String(dyslexiaFont));
  }, [dyslexiaFont]);

  useEffect(() => {
    document.documentElement.classList.remove('text-size-normal', 'text-size-large', 'text-size-xlarge');
    if (fontSize === 'large') {
      document.documentElement.style.fontSize = '18px';
    } else if (fontSize === 'xlarge') {
      document.documentElement.style.fontSize = '20px';
    } else {
      document.documentElement.style.fontSize = '16px';
    }
    localStorage.setItem('apex_font_size', fontSize);
  }, [fontSize]);

  const toggleHighContrast = () => setHighContrast((prev) => !prev);
  const toggleDyslexiaFont = () => setDyslexiaFont((prev) => !prev);
  const setFontSize = (size: 'normal' | 'large' | 'xlarge') => setFontSizeState(size);

  const announceForScreenReader = (message: string) => {
    setScreenReaderAnnouncement(message);
    // Auto clear after 4s
    setTimeout(() => setScreenReaderAnnouncement(''), 4000);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        toggleHighContrast,
        dyslexiaFont,
        toggleDyslexiaFont,
        fontSize,
        setFontSize,
        screenReaderAnnouncement,
        announceForScreenReader,
      }}
    >
      {children}
      {/* Live Region for Screen Readers (ARIA) */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only fixed top-0 left-0 w-1 h-1 overflow-hidden"
      >
        {screenReaderAnnouncement}
      </div>
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
