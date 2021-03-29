import { useState, useEffect } from 'react';
import AddToDo from './AddToDo.js';
import ToDoList from './ToDoList.js';
import SearchFilterToDo from './SearchFilterTodo';
import './App.css';


const App = () => {
  const [toDoList, updateToDoList] = useState([]);
  const [filterObj, updateFilterParam] = useState({
    search: "",
    filter: "All"
  });
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
  //add new todo task into list
  const addNewToDo = (todoItem) => {
    updateToDoList([...toDoList, todoItem]);
  };
  //update the status of task
  const updateToDoStatus = (todoId) => {
    updateToDoList((prevState) => {
      var arrList = [];
      var toDoList = prevState;
      for (var i = 0; i < toDoList.length; i++) {
        if (toDoList[i].todoId === todoId) {
          toDoList[i].todoStatus = true;
        }
        arrList.push(toDoList[i]);
      }
      return arrList;
    });
  };
  //remove a task from list
  const removeToDoItem = (id) => {
    updateToDoList((prevState) => {
      var toDoList = prevState.filter(function (rec) {
        if (rec.todoId !== id)
          return rec;
      });
      return toDoList;
    });
  };
  //delete all completed tasks
  const removeCompletedTask = ()=>{
    var allTask = [...toDoList];
    for(var i=0; i< allTask.length; i++){
      if (allTask[i].todoStatus === true)
        removeToDoItem(allTask[i].todoId);
    }
  };
 //update search/filter param entered
  const getFilterParam = (searchText, selectedFilter) => {
    updateFilterParam({
      search: searchText,
      filter: selectedFilter
    });
  };


  return (
    <div >
      <h2 className="app-heading">TODO APPLICATION</h2>
      <div className="app display-horizontal">
        <AddToDo addNewToDo={addNewToDo} />
        <div className="app-child-right">
          <SearchFilterToDo getFilterParam={getFilterParam} removeCompletedTask = {removeCompletedTask}/>
          <ToDoList itemsList={toDoList}
            updateToDoStatus={updateToDoStatus}
            removeToDoItem={removeToDoItem}
            filterParams = {filterObj} />
        </div>
      </div>
    </div>
  );
}

export default App;
