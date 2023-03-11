import React,{useState,useEffect} from 'react';

const Todo=(props)=>{
    const [todo,setTodo] = useState(props.todo);
    const todoList = props.todoList;


    useEffect(() => {
        console.log("newlist>>>>>>: ",todoList)
    },[todo.done])

    function handleCheck(){
        setTodo({
            ...todo,
            done: !todo.done
        })
        todoList.map((td)=>
            td.id === todo.id ? td.done= !todo.done : td
        )

        props.setTodoList(todoList)
    }




    return(
        <>
            <input type="checkbox" checked={todo.done} onChange={handleCheck}/>
            {todo.done?
                <span style={{textDecoration:"line-through", fontFamily: "Rajdhani", margin:"0px 30px 0px 10px"}}key={todo.id}>{todo.name}</span>
                :
                <span style={{fontFamily: "Rajdhani", margin:"0px 30px 0px 10px"}}key={todo.id}>{todo.name}</span>
                
            }
        </>
    )

}

export default Todo;