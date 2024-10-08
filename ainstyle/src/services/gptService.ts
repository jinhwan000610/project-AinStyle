import axios from 'axios';

interface GPTRequestData {
  height: string;
  weight: string;
  size: string;
  fit: string;
  tpo: string[];
  mood: string[];
  weather: {
    desc: string;
    temp: number;
  };
  gender: string; // 성별 추가
}

const styleMapping: { [key: string]: string } = {
  아메카지: "americancasual",
  캐주얼: "casual",
  시크: "chic",
  댄디: "dandy",
  비즈니스캐주얼: "formal",
  걸리시: "girlish",
  골프: "golf",
  레트로: "retro",
  로맨틱: "romantic",
  스포티: "sports",
  스트릿: "street",
  고프코어: "gorpcore"
};

const fetchGPTRecommendations = async (data: GPTRequestData): Promise<{formattedResponse: string, styleType: string}> => {
  try {
    console.log("API Key used:", process.env.REACT_APP_OPENAI_API_KEY);

    // 사용자 성별에 따라 로맨틱 스타일 포함 여부 결정
    const styles = data.gender === '남자'
      ? "아메카지, 캐주얼, 시크, 댄디, 비즈니스캐주얼, 걸리시, 골프, 레트로, 스포티, 스트릿, 고프코어"
      : "아메카지, 캐주얼, 시크, 댄디, 비즈니스캐주얼, 걸리시, 골프, 레트로, 로맨틱, 스포티, 스트릿, 고프코어";

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `사용자의 정보를 바탕으로 하나의 패션 스타일을 추천해 주세요: ${styles}`
          },
          {
            role: 'user',
            content: `키: ${data.height}cm, 몸무게: ${data.weight}kg, 사이즈: ${data.size}, 핏: ${data.fit}, 성별: ${data.gender}, TPO: ${data.tpo.join(', ')}, 무드: ${data.mood.join(', ')}, 날씨: ${data.weather.desc}, 온도: ${data.weather.temp}도에 어울리는 패션 스타일을 추천해 주세요.`
          },
          {
            role: 'system',
            content: '결과는 다음과 같이 나타내어 주세요: "Ai n Style"의 생각: ??, 추천 스타일: ??'
          },
          {
            role: 'system',
            content: `응답이 항상 상세하고 성의 있게 작성되도록 해주세요. 추천 이유와 함께 구체적인 스타일링 팁을 포함시켜 주세요.`
          },
        ],
        max_tokens: 1000, // gpt 최대 응답 길이 조절
        temperature: 0.7, // 창의적 응답을 위해 약간 높은 값 설정
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response.data);

    const rawResponse = response.data.choices[0].message.content.trim();
    const formattedResponse = formatResponse(rawResponse);
    const styleTypeKorean = extractStyleType(formattedResponse);
    const styleType = styleMapping[styleTypeKorean] || "casual"; // 매핑이 없는 경우 기본값으로 "casual" 사용

    return { formattedResponse, styleType }; // 스타일 타입과 포맷된 응답을 반환
  } catch (error) {
    console.error('Error fetching GPT recommendations:', error);
    throw error;
  }
};

const extractStyleType = (response: string): string => {
  const match = response.match(/추천 스타일:\s*(\S+)/);
  return match ? match[1] : "아메카지"; // 매칭되지 않을 경우 기본값 "캐주얼"
};

const formatResponse = (response: string): string => {
  // 여기서 응답을 포맷팅하는 로직을 추가합니다.
  return response.split('\n').map(line => `<p>${line}</p>`).join('');
};

export default fetchGPTRecommendations;
