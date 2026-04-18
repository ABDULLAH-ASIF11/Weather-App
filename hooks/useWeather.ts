"use client";

/**
 * useWeather.ts - Custom Hook
 * 
 * LAB REQUIREMENT - Part E: Custom Hook
 * Extracts all the fetching logic, state variables (weatherData, loading, error),
 * and the fetch function into a custom hook named useWeather.
 * 
 * LAB REQUIREMENT - Part A: State Management (useState)
 * Manages weatherData object, loading boolean, and error string states.
 * 
 * LAB REQUIREMENT - Part B: API Integration (useEffect)
 * Fetches real-time data from weatherapi.com and handles loading/error states.
 */

import { useState, useCallback } from "react";

// Weather data interface matching the API response structure
export interface WeatherData {
  city: string;
  country: string;
  temperature: number; // Always stored in Celsius
  feelsLike: number; // Always stored in Celsius
  humidity: number;
  condition: string;
  conditionCode: number;
}

// Return type of the useWeather hook
interface UseWeatherReturn {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
  searchedCity: string | null;
  fetchWeather: (city: string) => Promise<void>;
  clearWeather: () => void;
}

/**
 * useWeather Custom Hook
 * Handles all weather data fetching logic and state management
 */
export function useWeather(): UseWeatherReturn {
  // LAB REQUIREMENT - Part A: State Management
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchedCity, setSearchedCity] = useState<string | null>(null);

  /**
   * fetchWeather Function
   * LAB REQUIREMENT - Part B: API Integration
   * Fetches weather data from weatherapi.com
   */
  const fetchWeather = useCallback(async (city: string) => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    // Set loading state and clear previous errors
    setLoading(true);
    setError(null);
    setSearchedCity(city.trim().toUpperCase());

    try {
      // Using weatherapi.com free tier API
      const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || "demo";
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(
          city
        )}&aqi=no`
      );

      // Handle 404 or other error responses
      if (!response.ok) {
        if (response.status === 400 || response.status === 404) {
          throw new Error(`City "${city.toUpperCase()}" not found`);
        }
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();

      // LAB REQUIREMENT - Part B: Extract and store required data
      const extractedData: WeatherData = {
        city: data.location.name.toUpperCase(),
        country: data.location.country.toUpperCase(),
        temperature: data.current.temp_c,
        feelsLike: data.current.feelslike_c,
        humidity: data.current.humidity,
        condition: data.current.condition.text.toUpperCase(),
        conditionCode: data.current.condition.code,
      };

      setWeatherData(extractedData);
      setError(null);
    } catch (err) {
      // LAB REQUIREMENT - Part B: Handle errors gracefully
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * clearWeather Function
   * Resets all state to initial values
   * Used by the CLEAR button functionality
   */
  const clearWeather = useCallback(() => {
    setWeatherData(null);
    setLoading(false);
    setError(null);
    setSearchedCity(null);
  }, []);

  return {
    weatherData,
    loading,
    error,
    searchedCity,
    fetchWeather,
    clearWeather,
  };
}
