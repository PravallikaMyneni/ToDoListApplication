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
    const [errorObj, updateErrorState] = useState({
        "nameError": false,
        "dateError": false
    });
    //onChange handlers for text,date
    const handleTextChange = (event) => {
        setToDoItem({ ...toDoItem, todoText: event.target.value });
        updateErrorState({...errorObj,nameError:false});
    };
    const handleDateChange = (event) => {
        setToDoItem({ ...toDoItem, todoDate: event.target.value });
        updateErrorState({...errorObj,dateError:false});
    };

    const onClickOfAdd = (event) => {
        var idVal = uuid.v1();
        if (toDoItem.todoText !== "" && toDoItem.todoDate !== "") {
            updateErrorState({
                "nameError": false,
                "dateError": false
            });
            toDoItem.todoId = idVal;
            setToDoItem({ ...toDoItem, todoId: idVal });
            props.addNewToDo(toDoItem);
            setToDoItem((prevState) => {
                return {
                    todoId: "",
                    todoText: "",
                    todoDate: "",
                    todoStatus: false
                }
            });
        } else{
            if(toDoItem.todoText === "")
              updateErrorState({...errorObj,nameError:true});
            if(toDoItem.todoDate === "")
              updateErrorState({...errorObj,dateError:true});
        }
        
    };
 
    
    return (
        <div className="app-child-left">
            <div className="add-detail">
                <h3>ADD TODO TASK</h3>
            </div>
            <div className ="display-vertical add-detail">
                <label>TODO task</label>
                <input type="text" name="toDoText" value ={toDoItem.todoText} onChange={handleTextChange}
                       placeholder ="Todo Task"  />
                {errorObj.nameError === true && <p>Please enter task</p>}
            </div>
            <div className ="display-vertical add-detail">
                <label>Task Date</label>
                <input type="date" id="start" name="toDoDate" value = {toDoItem.todoDate} 
                    min={minDateValue} onChange={handleDateChange}></input>
                {errorObj.dateError === true && <p>Please select date</p>}
            </div>
            <div>
                <button className = "add-todo-btn" onClick={onClickOfAdd}>ADD</button>
            </div>
        </div>
    );
};



export default AddToDo;