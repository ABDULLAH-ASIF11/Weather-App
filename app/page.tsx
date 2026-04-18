/**
 * Weather Dashboard Page
 * 
 * Main entry point for the Live Weather Dashboard application.
 * Wraps the WeatherDashboard component with the TemperatureProvider
 * for Context API functionality.
 */

import { TemperatureProvider } from "@/context/TemperatureContext";
import WeatherDashboard from "@/components/WeatherDashboard";

export default function Home() {
  return (
    <TemperatureProvider>
      <WeatherDashboard />
    </TemperatureProvider>
  );
}
