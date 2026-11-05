"use client";

import React, { createContext, useContext, useState } from "react";

export type CursorVariant = "default" | "project" | "interactive" | "3d";

interface CursorContextValue {
  variant: CursorVariant;
  label: string;
  setCursor: (variant: CursorVariant, label?: string) => void;
  resetCursor: () => void;
}

const CursorContext = createContext<CursorContextValue>({
  variant: "default",
  label: "",
  setCursor: () => {},
  resetCursor: () => {},
});

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [label, setLabel] = useState<string>("");

  const setCursor = (nextVariant: CursorVariant, nextLabel = "") => {
    setVariant(nextVariant);
    setLabel(nextLabel);
  };

  const resetCursor = () => {
    setVariant("default");
    setLabel("");
  };

  return (
    <CursorContext.Provider value={{ variant, label, setCursor, resetCursor }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  return useContext(CursorContext);
}
