import React from "react";
import { useState, useContext } from "react";
import { WeatherContext } from "./WeatherContext";


const Context = () => {
  const [weather, setWeather] = useState("🌞");

  const changeWeather = () => setWeather((prev) => (prev === "🌞" ? "🌧️" : "🌞"));

  return (
    <WeatherContext.Provider value={{ weather, changeWeather }}>
      <Europe />
    </WeatherContext.Provider>
  );
};

const Europe = () => {
  return <Estonia />;
};

const Estonia = () => {
  return <Tallinn />;
};

const Tallinn = () => {
  const { weather, changeWeather } = useContext(WeatherContext);

  return <div onClick={changeWeather}>{weather}</div>;
};

export default Context;