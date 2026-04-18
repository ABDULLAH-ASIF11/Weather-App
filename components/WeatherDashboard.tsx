"use client";

/**
 * WeatherDashboard.tsx - Main Component
 * 
 * LAB REQUIREMENT - Part A: State Management (useState)
 * LAB REQUIREMENT - Part C: DOM Manipulation (useRef)
 * LAB REQUIREMENT - Part D: Conditional Rendering
 * LAB REQUIREMENT - Part F: UI Enhancements
 * 
 * Neo-brutalist weather dashboard with dynamic backgrounds,
 * bold typography, and thick black design elements.
 */

import { useState, useRef, useEffect } from "react";
import { useWeather, type WeatherData } from "@/hooks/useWeather";
import { useTemperature } from "@/context/TemperatureContext";
import { Cloud, Sun, CloudRain, Droplets, Thermometer, Search } from "lucide-react";

/**
 * Get background color class based on weather condition
 * LAB REQUIREMENT - Part F: Dynamic background color mapping
 */
function getBackgroundColor(condition: string | null, isError: boolean): string {
  if (isError) return "bg-[#FF3333]"; // Error State: Bright Vibrant Red
  if (!condition) return "bg-[#EAEAEA]"; // Default/No data: Light Gray

  const conditionLower = condition.toLowerCase();

  // Sunny/Clear: Bright Vibrant Yellow
  if (
    conditionLower.includes("sunny") ||
    conditionLower.includes("clear")
  ) {
    return "bg-[#FFD700]";
  }

  // Rainy/Wet: Bright Blue
  if (
    conditionLower.includes("rain") ||
    conditionLower.includes("drizzle") ||
    conditionLower.includes("shower") ||
    conditionLower.includes("storm") ||
    conditionLower.includes("thunder")
  ) {
    return "bg-[#4A90D9]";
  }

  // Default/Cloudy: Light Gray
  return "bg-[#EAEAEA]";
}

/**
 * Weather Icon Component
 * LAB REQUIREMENT - Part F: Solid black weather icons
 */
function WeatherIcon({ condition }: { condition: string }) {
  const conditionLower = condition.toLowerCase();
  const iconProps = { 
    className: "w-32 h-32 md:w-48 md:h-48 stroke-[2.5]", 
    fill: "black",
    color: "black"
  };

  if (conditionLower.includes("sunny") || conditionLower.includes("clear")) {
    return <Sun {...iconProps} />;
  }
  if (
    conditionLower.includes("rain") ||
    conditionLower.includes("drizzle") ||
    conditionLower.includes("shower")
  ) {
    return <CloudRain {...iconProps} />;
  }
  return <Cloud {...iconProps} />;
}

/**
 * Loading View Component
 * Full-screen loading state with pulsing animation
 */
function LoadingView() {
  return (
    <div className="min-h-screen bg-[#EAEAEA] weather-pattern flex items-center justify-center">
      <div className="text-center">
        <div className="animate-pulse">
          <Cloud className="w-32 h-32 mx-auto mb-8 stroke-[3]" fill="black" color="black" />
        </div>
        <p className="font-black text-4xl md:text-6xl uppercase tracking-tight">
          LOADING...
        </p>
      </div>
    </div>
  );
}

/**
 * Error View Component
 * LAB REQUIREMENT - Part D: Conditional Rendering
 * Full-screen error state with red background
 */
function ErrorView({ 
  city, 
  errorMessage,
  onRetry 
}: { 
  city: string | null; 
  errorMessage: string;
  onRetry: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#FF3333] weather-pattern flex items-center justify-center p-8">
      <div className="text-center max-w-4xl">
        <h1 className="font-black text-[8rem] md:text-[12rem] leading-none tracking-tighter uppercase">
          ERROR
        </h1>
        <p className="font-mono text-xl md:text-2xl mt-8 uppercase tracking-wide">
          {city 
            ? `CITY "${city}" NOT FOUND. PLEASE TRY AGAIN.`
            : errorMessage.toUpperCase()
          }
        </p>
        <button
          onClick={onRetry}
          className="mt-12 px-8 py-4 bg-black text-white font-black text-xl uppercase tracking-wide hover:bg-gray-900 transition-colors"
        >
          TRY AGAIN
        </button>
      </div>
    </div>
  );
}

/**
 * Default View Component
 * Initial state before any search
 */
function DefaultView() {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center">
        <Cloud className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-8 stroke-[3]" fill="black" color="black" />
        <h2 className="font-black text-4xl md:text-6xl uppercase tracking-tight mb-4">
          WEATHER DASHBOARD
        </h2>
        <p className="font-mono text-lg md:text-xl uppercase tracking-wide">
          ENTER A CITY NAME TO GET STARTED
        </p>
      </div>
    </div>
  );
}

/**
 * Weather Data View Component
 * LAB REQUIREMENT - Part D: Conditional Rendering
 * Main weather display with left content and right side panel
 */
function WeatherDataView({ weatherData }: { weatherData: WeatherData }) {
  const { convertTemperature, getUnitSymbol } = useTemperature();

  return (
    <div className="flex-1 flex flex-col lg:flex-row">
      {/* Main Content (Left side) */}
      <div className="flex-1 flex flex-col justify-center p-8 lg:p-16">
        {/* Massive City Name */}
        <h1 className="font-black text-[4rem] md:text-[6rem] lg:text-[8rem] leading-none tracking-tighter uppercase">
          {weatherData.city}
        </h1>
        
        {/* City Details */}
        <p className="font-mono text-lg md:text-xl mt-2 uppercase tracking-wide">
          CITY OF {weatherData.city}, {weatherData.country}
        </p>

        {/* Weather Icon */}
        <div className="my-8 lg:my-12">
          <WeatherIcon condition={weatherData.condition} />
        </div>

        {/* Condition Text */}
        <p className="font-mono text-xl md:text-2xl uppercase tracking-wide mb-4">
          {weatherData.condition}
        </p>

        {/* Massive Temperature */}
        <p className="font-black text-[6rem] md:text-[8rem] lg:text-[10rem] leading-none tracking-tighter">
          {convertTemperature(weatherData.temperature)}{getUnitSymbol()}
        </p>
      </div>

      {/* Side Panel (Right side) - Separated by thick black vertical line */}
      <div className="lg:border-l-[6px] border-t-[6px] lg:border-t-0 border-black lg:w-80 p-8 flex flex-col gap-6">
        {/* Feels Like Card */}
        <div className="border-[4px] border-black p-6 bg-transparent">
          <div className="flex items-center gap-3 mb-4">
            <Thermometer className="w-8 h-8 stroke-[2.5]" />
            <span className="font-mono text-sm uppercase tracking-wide">FEELS LIKE</span>
          </div>
          <p className="font-black text-5xl md:text-6xl tracking-tight">
            {convertTemperature(weatherData.feelsLike)}{getUnitSymbol()}
          </p>
        </div>

        {/* Humidity Card */}
        <div className="border-[4px] border-black p-6 bg-transparent">
          <div className="flex items-center gap-3 mb-4">
            <Droplets className="w-8 h-8 stroke-[2.5]" />
            <span className="font-mono text-sm uppercase tracking-wide">HUMIDITY</span>
          </div>
          <p className="font-black text-5xl md:text-6xl tracking-tight">
            {weatherData.humidity}%
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Main WeatherDashboard Component
 * Integrates all sub-components and handles the main application logic
 */
export default function WeatherDashboard() {
  // LAB REQUIREMENT - Part A: State Management (useState)
  const [city, setCity] = useState<string>("");

  // LAB REQUIREMENT - Part E: Custom Hook
  const { weatherData, loading, error, searchedCity, fetchWeather, clearWeather } = useWeather();

  // LAB REQUIREMENT - Part E: Context API
  const { unit, toggleUnit } = useTemperature();

  // LAB REQUIREMENT - Part C: DOM Manipulation (useRef)
  const inputRef = useRef<HTMLInputElement>(null);

  // LAB REQUIREMENT - Part C: Auto-focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  /**
   * Handle search submission
   */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  /**
   * Handle clear functionality
   * LAB REQUIREMENT - Part C: CLEAR button functionality
   * Wipes input, clears weather data/errors, and refocuses input
   */
  const handleClear = () => {
    setCity("");
    clearWeather();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  /**
   * Handle retry from error view
   */
  const handleRetry = () => {
    clearWeather();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // LAB REQUIREMENT - Part D: Conditional Rendering
  // Render loading state
  if (loading) {
    return <LoadingView />;
  }

  // Render error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <ErrorView 
          city={searchedCity} 
          errorMessage={error} 
          onRetry={handleRetry}
        />
      </div>
    );
  }

  // Determine background color based on weather condition
  const bgColor = getBackgroundColor(weatherData?.condition || null, false);

  return (
    <div className={`min-h-screen flex flex-col ${bgColor} weather-pattern transition-colors duration-500`}>
      {/* Header/Search Bar */}
      <header className="p-6 md:p-8 border-b-[6px] border-black">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          {/* Input Field - Transparent with thick black bottom border (underline style) */}
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="ENTER CITY NAME..."
              className="w-full bg-transparent border-0 border-b-[4px] border-black 
                         font-black text-2xl md:text-3xl uppercase tracking-tight
                         placeholder:text-black/40 focus:outline-none focus:border-black
                         py-3 pr-4"
              aria-label="City name input"
            />
          </div>

          {/* Button Group */}
          <div className="flex gap-3">
            {/* Search Button - Solid white box */}
            <button
              type="submit"
              className="bg-white border-[4px] border-black px-6 py-3 
                         font-black text-lg uppercase tracking-wide
                         hover:bg-black hover:text-white transition-colors
                         flex items-center gap-2"
              aria-label="Search"
            >
              <Search className="w-5 h-5 stroke-[3]" />
              <span className="hidden sm:inline">SEARCH</span>
            </button>

            {/* Clear Button - Transparent with thick black outline */}
            <button
              type="button"
              onClick={handleClear}
              className="bg-transparent border-[4px] border-black px-6 py-3 
                         font-black text-lg uppercase tracking-wide
                         hover:bg-black hover:text-white transition-colors"
              aria-label="Clear"
            >
              CLEAR
            </button>
          </div>
        </form>
      </header>

      {/* Main Content Area - LAB REQUIREMENT Part D: Conditional Rendering */}
      {weatherData ? <WeatherDataView weatherData={weatherData} /> : <DefaultView />}

      {/* Temperature Unit Toggle - Styled within brutalist theme */}
      <footer className="p-6 md:p-8 border-t-[6px] border-black">
        <div className="flex items-center justify-between">
          <p className="font-mono text-sm uppercase tracking-wide">
            TEMPERATURE UNIT
          </p>
          <button
            onClick={toggleUnit}
            className="bg-black text-white px-6 py-3 
                       font-black text-lg uppercase tracking-wide
                       hover:bg-gray-900 transition-colors
                       flex items-center gap-3"
            aria-label={`Switch to ${unit === 'celsius' ? 'Fahrenheit' : 'Celsius'}`}
          >
            <span className={unit === 'celsius' ? 'opacity-100' : 'opacity-50'}>°C</span>
            <span className="text-white/50">/</span>
            <span className={unit === 'fahrenheit' ? 'opacity-100' : 'opacity-50'}>°F</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
