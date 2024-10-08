import React, { useState } from "react";
import styled from "styled-components";
import Googlemaps from "./Googlemaps";

interface SelectSectionProps {
  onSelectData: (data: { height: string; weight: string; size: string; fit: string; gender: string }) => void;
  onLocationChange: (locationData: { lat: number; lng: number; weather: WeatherData }) => void;
}

interface WeatherData {
  desc: string;
  temp: number;
  icon: string;
}

const SelectSection: React.FC<SelectSectionProps> = ({ onSelectData, onLocationChange }) => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [size, setSize] = useState("");
  const [fit, setFit] = useState("");
  const [gender, setGender] = useState("");
  const sizeList = ["S", "M", "L", "XL", "2XL"];
  const fitList = ["스키니", "정핏", "오버핏", "맥시"];
  const genderList = ["남성", "여성"];

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(e.target.value);
    onSelectData({ height: e.target.value, weight, size, fit, gender });
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
    onSelectData({ height, weight: e.target.value, size, fit, gender });
  };

  const handleSizeClick = (s: string) => {
    setSize(s);
    onSelectData({ height, weight, size: s, fit, gender });
  };

  const handleFitClick = (f: string) => {
    setFit(f);
    onSelectData({ height, weight, size, fit: f, gender });
  };

  const handleGenderClick = (g: string) => {
    setGender(g);
    onSelectData({ height, weight, size, fit, gender: g });
  };

  return (
    <SelectSectionWrapper>
      <LeftSection>
        <TitleLeft>위치선택</TitleLeft>
        <MapContainer>
          <Googlemaps onLocationChange={onLocationChange} />
        </MapContainer>
      </LeftSection>
      <RightSection>
        <TitleRight>사용자 정보입력</TitleRight>
        <Wrap>
          <InputWrapper>
            <div>키</div>
            <span>
              <input
                value={height}
                onChange={handleHeightChange}
              />
              cm
            </span>
          </InputWrapper>
          <InputWrapper>
            <div>몸무게</div>
            <span>
              <input
                value={weight}
                onChange={handleWeightChange}
              />
              kg
            </span>
          </InputWrapper>
        </Wrap>
        <Wrap>
          <InputWrapper>
            <div>평소 사이즈</div>
            <ListWrap>
              {sizeList.map((s) => (
                <div
                  key={s}
                  onClick={() => handleSizeClick(s)}
                  style={{ backgroundColor: size === s ? "skyblue" : "gray" }}
                >
                  {s}
                </div>
              ))}
            </ListWrap>
          </InputWrapper>
          <InputWrapper>
            <div>원하는 핏</div>
            <ListWrap>
              {fitList.map((f) => (
                <div
                  key={f}
                  onClick={() => handleFitClick(f)}
                  style={{ backgroundColor: fit === f ? "skyblue" : "gray" }}
                >
                  {f}
                </div>
              ))}
            </ListWrap>
          </InputWrapper>
          <InputWrapper>
            <div>성별</div>
            <ListWrap>
              {genderList.map((g) => (
                <div
                  key={g}
                  onClick={() => handleGenderClick(g)}
                  style={{ backgroundColor: gender === g ? "skyblue" : "gray" }}
                >
                  {g}
                </div>
              ))}
            </ListWrap>
          </InputWrapper>
        </Wrap>
      </RightSection>
    </SelectSectionWrapper>
  );
};

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  position: relative;
  margin-top: -100px;
`;

const ListWrap = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 0;

  & div {
    background-color: #cccccc;
    font-weight: bold;
    border-radius: 5px;
    padding: 8px 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    white-space: nowrap;
    min-width: 70px;

    &:hover {
      background-color: #a0a0a0;
    }

    &.active {
      background-color: #0077ff;
      color: #ffffff;
    }
  }
`;

const Wrap = styled.div`
  display: flex;
  justify-content: space-evenly; /* Adjust this to manage space distribution */
  flex-wrap: wrap;
  gap: 20px;
  width: 100%; /* Ensure full width */
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);

  & > div {
    margin-bottom: 5px;
  }

  & input {
    padding: 8px;
    width: calc(100% - 16px);
    border: 1px solid #cccccc;
    border-radius: 5px;
    font-size: 16px;
  }
`;

const TitleRight = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #333333;
  background-color: #ffffff;
  padding: 10px 20px;
  margin-bottom: 20px;
  border-radius: 5px;
`;

const TitleLeft = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #333333;
  background-color: #ffffff;
  padding: 10px 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  z-index: 1;
`;

const RightSection = styled.div`
  flex: 1;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

const LeftSection = styled.div`
  flex: 1;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

const SelectSectionWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin: 20px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
`;

export default SelectSection;
