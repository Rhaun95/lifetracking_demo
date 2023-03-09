import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";

const Home = () =>{
    const navigate= useNavigate();


    function toSetting(){
        navigate("/setting");
    }

    return(
        <>
            <div className="home_container">
                <div className="home_title">
                    <div>Reach Goal</div>
                    <div>increase the level of own life</div>
                </div>

                <div className="home_btn" onClick={toSetting}>
                    Goal Setting
                </div>
            </div>
            
        </>
    );
};

export default Home;