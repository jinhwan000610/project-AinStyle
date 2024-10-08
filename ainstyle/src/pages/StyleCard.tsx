import React from "react";
import "./StyleCard.css";
import exampleImg4 from "../assets/img/4.png";
import exampleImg5 from "../assets/img/5.png";
import exampleImg6 from "../assets/img/6.png";
import exampleImg7 from "../assets/img/7.png";
import exampleImg8 from "../assets/img/8.png";
import exampleImg9 from "../assets/img/9.png";
import exampleImg10 from "../assets/img/10.png";
import exampleImg11 from "../assets/img/11.png";
import exampleImg12 from "../assets/img/12.png";
import exampleImg13 from "../assets/img/13.png";
import exampleImg14 from "../assets/img/14.png";
import exampleImg15 from "../assets/img/15.png";

const StyleCard = () => {
    return (
        <div className="StyleCard">
            {/* 전체 스타일카드 div */}
            <div className="style-card-row-container">
                {/* 각 줄마다 4개의 카드를 가지고있어야 한다 */}
                {/* 첫번째 줄 */}
                <div className="style-card-row">
                    <div className="style-card">
                        <img src={exampleImg4} alt="" />
                    </div>
                    <div className="style-card">
                        <img src={exampleImg5} alt="" />
                    </div>
                    <div className="style-card">
                        <img src={exampleImg6} alt="" />
                    </div>
                    <div className="style-card">
                        <img src={exampleImg7} alt="" />
                    </div>
                </div>
                {/* 두번째 줄 */}
                <div className="style-card-row">
                    <div className="style-card">
                        <img src={exampleImg8} alt="" />
                    </div>
                    <div className="style-card">
                        <img src={exampleImg9} alt="" />
                    </div>
                    <div className="style-card">
                        <img src={exampleImg10} alt="" />
                    </div>
                    <div className="style-card">
                        <img src={exampleImg11} alt="" />
                    </div>
                </div>
                {/* 세번째 줄 */}
                <div className="style-card-row">
                    <div className="style-card">
                        <img src={exampleImg12} alt="" />
                    </div>
                    <div className="style-card">
                        <img src={exampleImg13} alt="" />
                    </div>
                    <div className="style-card">
                        <img src={exampleImg14} alt="" />
                    </div>
                    <div className="style-card">
                        <img src={exampleImg15} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StyleCard;
