import React from "react";
import SearchBar from "./components/SearchBar";
import TemperatureToggle from "./components/TemperatureToggle";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import { WeatherCard } from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import useWeather from "./hooks/useWeather";

const App = () => {
  const {
    currentWeather,
    foreCast,
    loading,
    error,
    units,
    toggleUnit,
    fetchweatherByCity,
    fetchWeatherByLocation,
  } = useWeather();

  const handleRetry = () => {
    if (currentWeather) {
      fetchWeatherByCity(currentWeather.name);
    } else {
      fetchweatherByCity("Lahore");
    }
  };
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/*Background Image with Overlay*/}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(https://i.pinimg.com/1200x/96/72/03/9672036198a7ef5c027573d823296095.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-linear-to-br from-blue-900/40 via-purple-900/30 to-indigo-900/40"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/*Header section*/}
          <div className="text-center mb-12">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl tracking-tight">
                Weather
                <span className="bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Pro
                </span>
              </h1>
              <p className="text-white/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                Experience weather like never before with real-time data,
                beautifull visuals, and precise forecasts for any location
                worldwide
              </p>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-8 lg:space-x-6 mb-12">
              <SearchBar
                onSearch={fetchweatherByCity}
                onLocation={fetchWeatherByLocation}
                loading={loading}
              />
              <TemperatureToggle unit={units} onToggle={toggleUnit} />
            </div>
          </div>

          {/*Main Content*/}
          <div className="space-y-8">
            {/*conditional Rendering*/}
            {loading && (
              <div className="flex justiify-center">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                  <LoadingSpinner />
                  <p className="text-white/80 text-center mt-4 font-medium">
                    Fetching latest weather data...
                  </p>
                </div>
              </div>
            )}
            {/* conditional Rendering */}
            {error && !loading && (
              <div className="max-w-2xl mx-auto">
                <ErrorMessage message={error} onRetry={handleRetry} />
              </div>
            )}
            {/* conditional Rendering */}
            {currentWeather && !loading && (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2">
                  <WeatherCard weather={currentWeather} unit={units} />
                </div>
                <div className="xl:col-span-1">
                  {foreCast && <Forecast forecast={foreCast} unit={units} />}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
