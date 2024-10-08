import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import BoardBody from "./BoardBody";
import "./BoardPage.css";

const BoardPage = () => {
    return (
        <div className="BoardPage">
            <Header />
            <BoardBody />
            <Footer />
        </div>
    );
};

export default BoardPage;
