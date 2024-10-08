import React, { useState } from 'react';
import axios from 'axios';
import './RegisterPage.css';
import Terms from '../assets/text/terms';
import Header from './Header';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phoneNumber1: '',
    phoneNumber2: '',
    phoneNumber3: '',
    email: ''
  });

  const [allAgreeChecked, setAllAgreeChecked] = useState(false);
  const [termsAgreeChecked, setTermsAgreeChecked] = useState(false);
  const [personalAgreeChecked, setPersonalAgreeChecked] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState<string | null>(null);

  const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleAllAgreeChange = () => {
    const newValue = !allAgreeChecked;
    setAllAgreeChecked(newValue);
    setTermsAgreeChecked(newValue);
    setPersonalAgreeChecked(newValue);
  };

  const handleTermsAgreeChange = () => {
    setTermsAgreeChecked(!termsAgreeChecked);
  };

  const handlePersonalAgreeChange = () => {
    setPersonalAgreeChecked(!personalAgreeChecked);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'password' || name === 'confirmPassword') {
      if (name === 'confirmPassword' && value !== formData.password) {
        setPasswordMatch('비밀번호가 일치하지 않습니다');
      } else if (name === 'confirmPassword' && value === formData.password) {
        setPasswordMatch('비밀번호가 일치합니다');
      } else if (name === 'password' && value === formData.confirmPassword) {
        setPasswordMatch('비밀번호가 일치합니다');
      } else {
        setPasswordMatch(null);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  };

  const handleSubmit = () => {
    if (termsAgreeChecked && personalAgreeChecked) {
      const completeFormData = {
        user_name: formData.fullName,
        username: formData.username,
        password: formData.password,
        email: formData.email,
        phone_number: `${formData.phoneNumber1}-${formData.phoneNumber2}-${formData.phoneNumber3}`
      };

      console.log('Submitting form data:', completeFormData);

      axios.post('http://localhost:8080/api/register', completeFormData)
        .then(response => {
          console.log('Registration successful:', response.data);
          alert("회원가입이 성공적으로 완료되었습니다!");
        })
        .catch(error => {
          console.error('Registration failed:', error);
          alert("회원가입에 실패했습니다. 다시 시도해주세요.");
        });
    } else {
      alert("등록하려면 모든 약관에 동의해야 합니다.");
    }
  };

  return (
    <div className="RegisterPage">
      <Header />
      <form className="RegisterForm" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <table className="FormTable">
          <tbody>
            <tr>
              <th>아이디<span>*</span></th>
              <td>
                <input type="username" name="username" value={formData.username} onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <th>비밀번호<span>*</span></th>
              <td>
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <th>비밀번호 확인<span>*</span></th>
              <td>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                {passwordMatch && <span style={{ marginLeft: '10px', color: passwordMatch === '비밀번호가 일치하지 않습니다' ? 'red' : 'green' }}>{passwordMatch}</span>}
              </td>
            </tr>
            <tr>
              <th>이름<span>*</span></th>
              <td>
                <input type="name" name="fullName" value={formData.fullName} onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <th>휴대전화<span>*</span></th>
              <td>
                <input type="tel" name="phoneNumber1" value={formData.phoneNumber1} onChange={handleChange} maxLength={3} pattern="[0-9]*" onKeyPress={handleKeyPress} /> -
                <input type="tel" name="phoneNumber2" value={formData.phoneNumber2} onChange={handleChange} maxLength={4} pattern="[0-9]*" onKeyPress={handleKeyPress} /> -
                <input type="tel" name="phoneNumber3" value={formData.phoneNumber3} onChange={handleChange} maxLength={4} pattern="[0-9]*" onKeyPress={handleKeyPress} />
              </td>
            </tr>
            <tr>
              <th>이메일<span>*</span></th>
              <td>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="All">전체 동의</div>
        <div className="AllAgree">
          <div className="CheckboxContainer">
            <input type="checkbox" checked={allAgreeChecked} onChange={handleAllAgreeChange} />
            <span>모든 약관을 확인하고 전체 동의합니다.</span>
          </div>
        </div>
        <div className="TermsUse">[필수] 이용약관 동의</div>
        <div className="TermUse"><Terms /></div>
        <div className="TermsAgree">
          <div className="CheckboxContainer">
            <span>이용약관의 동의하십니까?</span>
            <input type="checkbox" checked={termsAgreeChecked} onChange={handleTermsAgreeChange} />
            <span>동의함</span>
          </div>
        </div>
        <div className="PerUse">[필수] 개인정보 수집 및 동의</div>
        <div className="PersonalUse"><Terms /></div>
        <div className="PersonalAgree">
          <div className="CheckboxContainer">
            <span>개인정보 수집 및 이용에 동의하십니까?</span>
            <input type="checkbox" checked={personalAgreeChecked} onChange={handlePersonalAgreeChange} />
            <span>동의함</span>
          </div>
        </div>
        <div className="Button">
          <button className="ContinueButton" onClick={handleSubmit} type="button">계속하기</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
