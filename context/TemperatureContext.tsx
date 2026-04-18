"use client";

/**
 * TemperatureContext.tsx
 * 
 * LAB REQUIREMENT - Part E: Context API
 * Creates a TemperatureContext that wraps the application to toggle between
 * Celsius and Fahrenheit. Provides the unit state and toggle function to all
 * child components.
 */

import { createContext, useContext, useState, ReactNode } from "react";

type TemperatureUnit = "celsius" | "fahrenheit";

interface TemperatureContextType {
  unit: TemperatureUnit;
  toggleUnit: () => void;
  convertTemperature: (tempCelsius: number) => number;
  getUnitSymbol: () => string;
}

const TemperatureContext = createContext<TemperatureContextType | undefined>(
  undefined
);

/**
 * TemperatureProvider Component
 * Wraps the application and provides temperature unit context
 */
export function TemperatureProvider({ children }: { children: ReactNode }) {
  // State to track current temperature unit
  const [unit, setUnit] = useState<TemperatureUnit>("celsius");

  // Toggle function to switch between Celsius and Fahrenheit
  const toggleUnit = () => {
    setUnit((prev) => (prev === "celsius" ? "fahrenheit" : "celsius"));
  };

  // Convert temperature from Celsius to the current unit
  const convertTemperature = (tempCelsius: number): number => {
    if (unit === "fahrenheit") {
      // Celsius to Fahrenheit: (C × 9/5) + 32
      return Math.round((tempCelsius * 9) / 5 + 32);
    }
    return Math.round(tempCelsius);
  };

  // Get the appropriate unit symbol
  const getUnitSymbol = (): string => {
    return unit === "celsius" ? "°C" : "°F";
  };

  return (
    <TemperatureContext.Provider
      value={{ unit, toggleUnit, convertTemperature, getUnitSymbol }}
    >
      {children}
    </TemperatureContext.Provider>
  );
}

/**
 * Custom hook to use the TemperatureContext
 * Throws an error if used outside of TemperatureProvider
 */
export function useTemperature() {
  const context = useContext(TemperatureContext);
  if (context === undefined) {
    throw new Error("useTemperature must be used within a TemperatureProvider");
  }
  return context;
}
