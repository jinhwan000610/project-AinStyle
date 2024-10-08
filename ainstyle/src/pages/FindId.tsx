import React, { useState } from 'react';
import './FindId.css';

const FindId: React.FC = () => {
  const [name, setName] = useState('');
  const [searchType, setSearchType] = useState('email');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [result, setResult] = useState('');

  const handleSearch = () => {
    // 임시 검색 결과 처리 (백엔드 연결 시 실제 검색 로직 추가 필요)
    const dummyId = 'exampleID****';
    setResult(`Your ID is: ${dummyId}`);
  };

  return (
    <div className="FindIdContainer">
      <div className="FindIdTitle">아이디 찾기</div>
      <p className="description">
        이메일 또는 휴대전화번호로 아이디 찾기가 가능합니다.<br />
        찾기가 어려우시면, 고객센터로 문의주세요.
      </p>
      <div className="searchTypeContainer">
        <label>
          <input
            type="radio"
            value="email"
            checked={searchType === 'email'}
            onChange={(e) => setSearchType(e.target.value)}
          />
          이메일
        </label>
        <label>
          <input
            type="radio"
            value="phone"
            checked={searchType === 'phone'}
            onChange={(e) => setSearchType(e.target.value)}
          />
          휴대전화번호
        </label>
      </div>
      <div className="FindIdForm">
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="inputField nameInput"
        />
        {searchType === 'email' ? (
          <input
            type="email"
            placeholder="이메일"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            className="inputField emailInput"
          />
        ) : (
          <input
            type="tel"
            placeholder="휴대전화번호"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            className="inputField phoneInput"
          />
        )}
        <button onClick={handleSearch} className="searchButton">Find</button>
      </div>
      {result && <div className="FindIdResult">{result}</div>}
    </div>
  );
}

export default FindId;