import React, { useState } from "react";
import TagSection from "./TagSection";
import Header from "./Header";
import ItemSection from "./ItemSection";
import Functionbtn from "./Functionbtn";
import SelectSection from "./SelectSection";

interface UserData {
  height: string;
  weight: string;
  size: string;
  fit: string;
  tpo: string[];
  mood: string[];
  gender: string;
}

interface WeatherData {
  desc: string;
  temp: number;
  icon: string;
}

const FunctionPage = () => {
  const [userData, setUserData] = useState<UserData>({
    height: "",
    weight: "",
    size: "",
    fit: "",
    tpo: [],
    mood: [],
    gender: ""
  });

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const handleSelectData = (data: {
    height: string;
    weight: string;
    size: string;
    fit: string;
    gender: string;
  }) => {
    setUserData((prevData) => ({ ...prevData, ...data }));
  };

  const handleTagData = (tagData: {
    tpo: string[];
    mood: string[];
  }) => {
    setUserData((prevData) => ({ ...prevData, ...tagData }));
  };

  const handleLocationChange = (locationData: {
    lat: number;
    lng: number;
    weather: WeatherData;
  }) => {
    setWeatherData(locationData.weather);
  };

  return (
    <>
      <Header />
      <SelectSection onSelectData={handleSelectData} onLocationChange={handleLocationChange} />
      <TagSection onSelectTagData={handleTagData} />
      <ItemSection />
      <Functionbtn userData={userData} weatherData={weatherData} />
    </>
  );
}

export default FunctionPage;
