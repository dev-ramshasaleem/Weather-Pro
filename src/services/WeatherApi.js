const API_KEY = "bbe99c395256d71ee09092d608b056e9";
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const GEO_URL = "https://api.openweathermap.org/geo/1.0";

export const fetchCurrentWeather = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`,
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(
          `city ${city} not found, pleasecheck the spellinga and try again`,
        );
      } else if (response.status === 401) {
        throw new Error(
          "Invalid API key, please check your OpenweatherMap Api configuration",
        );
      } else {
        throw new Error(
          "Weather service is temporarily unavailable. Please try again later.",
        );
      }
    }
    const data = await response.json();

    if (!data.dt) {
      data.dt = Math.floor(Date.now() / 1000);
    }
    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        "Network Error, please check your internet connectionand try again.",
      );
    }
    throw error;
  }
};

export const fetchCurrentWeatherByCoords = async (lat, lon) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          "Invalid API key, please check your OpenweatherMap Api configuration",
        );
      } else {
        throw new Error(
          "Weather service is temporarily unavailable. Please try again later.",
        );
      }
    }
    const data = await response.json();

    if (!data.dt) {
      data.dt = Math.floor(Date.now() / 1000);
    }
    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        "Network Error, please check your internet connectionand try again.",
      );
    }
    throw error;
  }
};

export const fetchWeatherForecast = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`,
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(
          `city ${city} not found, pleasecheck the spellinga and try again`,
        );
      } else if (response.status === 401) {
        throw new Error(
          "Invalid API key, please check your OpenweatherMap Api configuration",
        );
      } else {
        throw new Error(
          "Weather service is temporarily unavailable. Please try again later.",
        );
      }
    }
    return await response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        "Network Error, please check your internet connectionand try again.",
      );
    }
    throw error;
  }
};

export const searchCities = async (query) => {
  try {
    const response = await fetch(
      `${GEO_URL}/direct?q=${query}&limit=5&appid=${API_KEY}`,
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          "Invalid API key, please check your OpenweatherMap Api configuration",
        );
      } else {
        throw new Error(
          "Weather service is temporarily unavailable. Please try again later.",
        );
      }
    }
    const data = await response.json();
    return data.map((city) => ({
      name: city.name,
      lat: city.lat,
      lon: city.lon,
      country: city.country,
      state: city.state || "",
    }));
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        "Network Error, please check your internet connectionand try again.",
      );
    }
    throw error;
  }
};
