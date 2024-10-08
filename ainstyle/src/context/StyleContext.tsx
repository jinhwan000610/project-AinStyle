// src/context/StyleContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface StyleContextType {
  styleType: string;
  gender: string;
  setStyleType: (styleType: string) => void;
  setGender: (gender: string) => void;
}

const StyleContext = createContext<StyleContextType | undefined>(undefined);

export const useStyleContext = () => {
  const context = useContext(StyleContext);
  if (!context) {
    throw new Error('useStyleContext must be used within a StyleProvider');
  }
  return context;
};

export const StyleProvider = ({ children }: { children: ReactNode }) => {
  const [styleType, setStyleType] = useState<string>('casual');
  const [gender, setGender] = useState<string>('남자');

  return (
    <StyleContext.Provider value={{ styleType, gender, setStyleType, setGender }}>
      {children}
    </StyleContext.Provider>
  );
};
export {};