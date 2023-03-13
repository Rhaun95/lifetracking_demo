import React, { useState, useEffect, useRef } from "react";
import "../css/Setting.css";

import { ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import moment from "moment";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';






const Setting = () =>{
    const navigate = useNavigate();
    const [goalList, setGoalList]=useState([]);
    const [checkedList, setCheckedList]=useState([]);
    const [input, setInput] = useState("");
    const nextId = useRef(1);

    // const editable = useRef(false);
    const [isEdit, setEdit] = useState(false);

    const today = new Date();
    const time = {
        year: today.getFullYear(),  //현재 년도
        month: today.getMonth() + 1, // 현재 월
        date: today.getDate(), // 현제 날짜
        hours: today.getHours(), //현재 시간
        minutes: today.getMinutes(), //현재 분
      };

      
    const timestring = `${time.year}-${time.month}-${time.date}`;
    const [selectedDay, setSelectedDay] = useState(timestring);
    const [dDay, setDday] = useState(0);


    function setDDay(newDate){
        // D-day in millisecond
        const dis= newDate.getTime() - today.getTime();

        // 1 Min. in milisecond
        const minute = 1000*60
        
        setDday(Math.floor(dis / (minute*60*24)) +1) 
    }

    useEffect(()=>{
        console.log("todaytime: ", timestring)
    },[])

    
    useEffect(()=>{
        console.log("goalList: ", goalList)
        console.log("checkedList: ", checkedList)
    },[goalList, checkedList])

    

    // function toMain(){
    //     navigate("/main/"+ "");
    // }
    function toMain(){
        navigate("/main");
    }
    function toHome(){
        navigate("/");
    }

    const onChangeGoal=(e)=>{
        e.preventDefault();
        
        setInput(e.target.value);
    }

      
    function editMode(){
        console.log("editmode");
        setEdit(!isEdit);

    }
    function handleOnKeyPress(e){
        if(e.key === "Enter"){
            addGoal();
        }

    }

    function addGoal(){
        const newGoal={
            id: nextId.current,
            goal: input,
            done: false,
            dDay : dDay,
            date: selectedDay
        }
        setGoalList(goalList.concat(newGoal));
        setInput("");
        setDday(0);
        setSelectedDay(today)

        nextId.current +=1;
    }
    function handleCheckGoal(checked, id){
        if(checked){
            setCheckedList([...checkedList, id]);
        }else{
            setCheckedList(checkedList.filter((g)=>g !== id));
        }
    }

    function deleteGoals(){
        console.log("delete goals");
        setGoalList(goalList.filter((g)=> !checkedList.includes(g.id) ))
        setCheckedList([])
        setEdit(!isEdit);
    }

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
            <div className="setting_content_container">
                <div className="setting_input">
                    {isEdit?
                    <button className="setting_editmode" onClick={deleteGoals}>delete</button>
                    :
                    <button className="setting_standard" onClick={editMode}>edit</button>
                    }
                   

                    {/* <div className="setting_content_1"> */}
                    <input type= "text" className="setting_content_1" onChange={onChangeGoal}  onKeyPress={handleOnKeyPress} value={input} placeholder="your goal"/>
                    {/* </div> */}


                    <div className="setting_content_2">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker 
                                label={'Deadline(optional)'}
                                views={['year', 'month', 'day']}
                                onChange={(newDate) => {setSelectedDay(moment(newDate).format("DD-MM-YYYY")); setDDay(newDate);}}
                                dateFormat="dd/MM/YYYY" 

                            />
                        </LocalizationProvider>
                    </div>
                </div>
                <div className="setting_goal_container">
                    {goalList.map((goal) =>(
                        <>
                        <div style={{display:"flex", justifyContent:"space-between"}}>
                            {isEdit ?
                                <>  
                                    <div className="setting_editmode_goals">
                                        <input type="checkbox" checked={checkedList.includes(goal.id)?true:false} onChange={(e)=>handleCheckGoal(e.currentTarget.checked, goal.id)}/>
                                        <div> {goal.goal}</div>
                                    </div>
                                </>
                            :
                            
                                <div className="setting_editmode_goals">{goal.goal}</div>
                            }
                            
                            {goal.dDay !==0 && <div>(D-{goal.dDay})</div>}
                        </div>
                        </>
                    ))}
                </div>


            </div>

            <div className="setting_main_btn" onClick={toMain}>
                    MAIN(임시)
            </div>
            
            <div className="setting_home_btn" onClick={toHome}>
                    HOME(임시)
            </div>
        </>
    );
};

export default Setting;