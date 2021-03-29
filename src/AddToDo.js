import { useState } from 'react';
import uuid from 'node-uuid';
import './App.css';

const AddToDo = (props) => {
    //get today date value
    var minDateValue = "";
    var today = new Date();
    var yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    minDateValue = yyyy + '-' + mm + '-' + dd;

    const [toDoItem, setToDoItem] = useState({
        todoId:"",
        todoText: "",
        todoDate: "",
        todoStatus: false
    });

    //onChange handlers for text,date
    const handleTextChange = (event) => {
        setToDoItem({ ...toDoItem, todoText: event.target.value });
    };
    const handleDateChange = (event) => {
        setToDoItem({ ...toDoItem, todoDate: event.target.value });
    };

    const onClickOfAdd = (event) => {
        var idVal = uuid.v1();
        toDoItem.todoId = idVal;
        setToDoItem({ ...toDoItem, todoId: idVal });
        props.addNewToDo(toDoItem);
        setToDoItem((prevState)=>{ return{
            todoId:"",
            todoText: "",
            todoDate: "",
            todoStatus: false
        }});

    };
 

    return (
        <div className="app-child-left">
            <div className="add-detail">
                <h3>ADD TODO TASK</h3>
            </div>
            <div className ="display-vertical add-detail">
                <label>TODO task</label>
                <input type="text" name="toDoText" value ={toDoItem.toDoText} onChange={handleTextChange}
                       placeholder ="Todo Task"  />
            </div>
            <div className ="display-vertical add-detail">
                <label>Task Date</label>
                <input type="date" id="start" name="toDoDate" value = {toDoItem.toDoDate} 
                    min={minDateValue} onChange={handleDateChange}></input>
            </div>
            <div>
                <button className = "add-todo-btn" onClick={onClickOfAdd}>ADD</button>
            </div>
        </div>
    );
};



export default AddToDo;