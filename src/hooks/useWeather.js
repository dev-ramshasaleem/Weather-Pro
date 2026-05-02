import { useState, useEffect } from "react";

import {
  fetchCurrentWeather,
  fetchCurrentWeatherByCoords,
  fetchWeatherForecast,
  searchCities,
} from "../services/WeatherApi";

import React from "react";

const useWeather = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [foreCast, setForeCast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [units, setUnits] = useState("C");

  const fetchweatherByCity = async (city) => {
    setLoading(true);
    setError(null);

    try {
      const [weatherData, foreCast] = await Promise.all([
        fetchCurrentWeather(city),
        fetchWeatherForecast(city),
      ]);
      setCurrentWeather(weatherData);
      setForeCast(foreCast);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch weather data",
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByLocation = async () => {
    if (!Navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
    }
    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { lattitude, longitude } = position.coords;
          const weatherData = await fetchWeatherByCoords(lattitude, longitude);
          setCurrentWeather(weatherData);
          //fetch forecast for current location
          const forecastData = await getWeatherForecast(weatherData.name);
          setForeCast(forecastData);
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "Failed to fetch weather data",
          );
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setError("unable to retrieve your location");
        setLoading(false);
      },
    );
  };

  const toggleUnit = () => {
    setUnits(units === "C" ? "F" : "C");
  };

  useEffect(() => {
    fetchweatherByCity("Lahore");
  }, []);

  return {
    currentWeather,
    foreCast,
    loading,
    error,
    units,
    toggleUnit,
    fetchweatherByCity,
    fetchWeatherByLocation,
  };
};

export default useWeather;
