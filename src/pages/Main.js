import React, { useState, useRef,useEffect } from   'react';
import { ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Todo from "../components/Todo";

import "../css/Main.css";


const Main = () => {
    const navigate = useNavigate();
    const nextId = useRef(1);

    const [todoList, setTodoList] = useState([]);
    const [input, setInput] = useState("");
    const[checkedArr, setCheckedArr] = useState([]);

    useEffect(() => {
        console.log("todoList....... ", todoList)
    },[todoList])



    const handleOnInput = (e)=>{
        e.preventDefault();
        setInput(e.target.value);
    }

    function addTodo(e){
        e.preventDefault();

        const todo={
            id: nextId.current,
            name: input,
            done: false
        }

        setTodoList(todoList.concat(todo));
        setInput("");
        nextId.current+=1;
    }

    function handleOnKeyPress(e){
        if(e.key === "Enter"){
            addTodo();
        }
        setInput("");
    }

    function handleCheck(checked, id){
        if(checked){
            setCheckedArr([...checkedArr, id]);
        }else{
            setCheckedArr(checkedArr.filter((nr)=> nr !== id))
        }
    }

    function clean(){
        setTodoList(todoList.filter(todo => !checkedArr.includes(todo.id)));

    };
    console.log("checkedArr: " + checkedArr);
    function toSetting(){
        navigate("/setting");
    }

    
    return (
        <>
        
            <div className="main_top">
                <div className="main_top_todo">
                    Miracle Morning
                </div>
                <div className="main_top_day">
                   D-37
                </div>
            </div>
            <div className="main_content">
                <div  className="main_content_level">
                    1 Level
                </div>

                <div className="expBar">
                    <ProgressBar style={{width: "800px", height:"30px", backgroundColor:"white"}} animated={true} now={60} variant="barColor"/>
                </div>

                <div className="main_content_input">
                    <div className="main_content_input_title">Todo</div>
                    <form  className="main_content_input_box">
                        <input type="text" value={input} placeholder="Write here essential milestones for your goal"  onChange={handleOnInput} onKeyPress={handleOnKeyPress}/>
                        <button onClick={addTodo}>add</button>
                    </form>
                </div>  
                <div className="main_content_toDoBox">
                    {todoList.map((todo)=>(
                        <>
                        {/* // <Todo key={i} index ={i} todo={todo} todoList={todoList} setTodoList={setTodoList}/> */}
                            <input type="checkbox" checked={checkedArr.includes(todo.id)? true: false} onChange={(e)=>handleCheck(e.currentTarget.checked, todo.id)}/>
                            {checkedArr.includes(todo.id)?
                                <span style={{textDecoration:"line-through", fontFamily: "Rajdhani", margin:"0px 30px 0px 10px"}}key={todo.id}>{todo.name}</span>
                                :
                                <span style={{fontFamily: "Rajdhani", margin:"0px 30px 0px 10px"}}key={todo.id}>{todo.name}</span>
                                
                            }
                        </>
                    ))}
                    <div>
                        <button onClick={clean}>clean</button>
                    </div>
                </div>
                <div className="main_btn" onClick={toSetting} >
                    SATISFIED?
                </div>
            </div>
        </>

    )
}

export default Main;