import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import FindId from "./FindId";
import "./FindIdPage.css";

const FindIdPage = () => {
    return (
        <div className="FindIdPage">
            <Header />
            <FindId />
            <Footer />
        </div>
    );
};

export default FindIdPage;
