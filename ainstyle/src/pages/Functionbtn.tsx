import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import fetchGPTRecommendations from "../services/gptService";
import { useStyleContext } from "../context/StyleContext";

interface FunctionbtnProps {
  userData: {
    height: string;
    weight: string;
    size: string;
    fit: string;
    tpo: string[];
    mood: string[];
    gender: string;
  };
  weatherData: {
    desc: string;
    temp: number;
  } | null;
}

const Functionbtn: React.FC<FunctionbtnProps> = ({ userData, weatherData }) => {
  const { setStyleType } = useStyleContext();
  const navigate = useNavigate();

  const handleButtonClick = async () => {
    if (userData && weatherData) {
      console.log("User Data:", userData);
      console.log("Weather Data:", weatherData);

      const isDataComplete = Object.values(userData).every((value) => {
        if (Array.isArray(value)) {
          return value.length > 0;
        }
        return value !== "";
      });

      if (isDataComplete) {
        try {
          // Combine user data and weather data
          const combinedData = { ...userData, weather: weatherData };
          const { formattedResponse, styleType } = await fetchGPTRecommendations(combinedData);

          console.log("GPT Result (Style Type):", styleType); // GPT 응답 확인
          console.log("Formatted GPT Response:", formattedResponse); // 포맷된 GPT 응답 확인

          // 스타일 타입 설정
          setStyleType(styleType);

          // 크롤링 요청
          const response = await axios.post('http://localhost:8080/api/crawl/images', { styleType, gender: userData.gender });
          const images = response.data;
          console.log("Crawling Response:", images); // 크롤링 응답 확인

          // 페이지 이동 및 상태 전달
          navigate('/stylecrawlerpage', { state: { images, formattedResponse, gender: userData.gender, styleType } });
        } catch (error) {
          console.error("Failed to fetch recommendation:", error);
        }
      } else {
        alert("Please fill all the required data.");
      }
    } else {
      alert("Please fill all the required data.");
    }
  };

  return <StyledButton onClick={handleButtonClick}>Get Recommendation</StyledButton>;
};

const StyledButton = styled.button`
  position: fixed;
  top: 100px;
  right: 30px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  background-color: #0077ff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #005bb5;
  }
`;

export default Functionbtn;
