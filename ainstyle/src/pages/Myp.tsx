import React from "react";
import MyHeart from "./MyHeart";
import MyClothe from "./MyClothe";
import SelectButton from './SelectButton';
import Header from './Header';
import Footer from './Footer';
import './Myp.css'


const Myp =() =>{
   return(
      <div className="myPage">
         <Header/>
         <div className="Head">마이 페이지</div>
        <SelectButton/>
        <MyHeart/>
   
        <Footer/>
      </div>
   )
}

export default Myp;