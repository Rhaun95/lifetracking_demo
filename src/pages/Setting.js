import React, { useState } from "react";
import "../css/Setting.css";

import { ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import moment from "moment";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';






const Setting = () =>{
    const navigate = useNavigate();
    const [goal, setGoal] = useState("");

    const today = new Date();
    const time = {
        year: today.getFullYear(),  //현재 년도
        month: today.getMonth() + 1, // 현재 월
        date: today.getDate(), // 현제 날짜
        hours: today.getHours(), //현재 시간
        minutes: today.getMinutes(), //현재 분
      };

      
    const timestring = `${time.year}-${time.month}-${time.date}`;
    
    const [todaytime, setTodaytime] = useState(timestring);

    function toMain(){
        navigate("/main");
    }

    function ChangeValue(e){
        setGoal(e.target.value);
    }

        console.log("todaytime: ", todaytime)

    return(
        <>
     
            <div className="setting_Top">
                <div className="setting_top_bar">
                    <ProgressBar style={{height:"30px", backgroundColor:"white"}} animated={true} now={60} variant="barColor"/>
                </div>
                <div className="setting_top_text">
                    <div>Reach Goal</div>
                    <div>increase the level of own life</div>
                </div>
            </div>

            <div className="setting_container">

                <div className="setting_content_1">
                    <input type={"text"} onChange={ChangeValue} value={goal} placeholder="your goal"/>
                </div>


                <div className="setting_content_2">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker 
                              label={'Deadline'}
                              views={['year', 'month', 'day']}
                              onChange={(newDate) => {console.log(newDate); setTodaytime(moment(newDate).format("DD-MM-YYYY"))}}
                              dateFormat="dd/MM/YYYY" 

                        />
                    </LocalizationProvider>
                </div>

                <div className="home_btn" onClick={toMain}>
                    START
                </div>
            </div>
        </>
    );
};

export default Setting;