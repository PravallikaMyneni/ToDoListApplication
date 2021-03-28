import { useState, useEffect } from 'react';
import AddToDo from './AddToDo.js';
import ToDoList from './ToDoList.js';
import SearchFilterToDo from './SearchFilterTodo';
import './App.css';


const App = () => {
  const [toDoList, updateToDoList] = useState([]);

  /* useEffect(() => {
     // storing todos items
     const temp = JSON.stringify(toDoList);
     localStorage.setItem("todos", temp)
   }, [toDoList]);
 */


  function getInitialTodos() {
    // getting stored items
    const temp = localStorage.getItem("toDoItems");
    const savedTodos = JSON.parse(temp);
    return savedTodos || []
  }

  const addNewToDo = (todoItem) => {
    updateToDoList([...toDoList, todoItem]);
  };
  const updateToDoStatus = (todoId) => {
    updateToDoList((prevState) => {
      var arrList = [];
      var toDoList = prevState;
      for (var i = 0; i < toDoList.length; i++) {
        if (toDoList[i].toDoId === todoId) {
          toDoList[i].toDoStatus = true;
        }
        arrList.push(toDoList[i]);
      }
      return arrList;
    });
  };
  const removeToDoItem = (id) => {
    updateToDoList((prevState) => {
      var toDoList = prevState.filter(function (rec) {
        if (rec.toDoId !== id)
          return rec;
      });
      return toDoList;
    });
  };

  return (
    <div >
      <h2 className ="app-heading">TODO APPLICATION</h2>
      <div className="app display-horizontal">
        <AddToDo addNewToDo={addNewToDo} />
        <div className="app-child-right">
          <ToDoList itemsList={toDoList}
            updateToDoStatus={updateToDoStatus}
            removeToDoItem={removeToDoItem} />
        </div>


      </div>
    </div>
  );
}

export default App;
