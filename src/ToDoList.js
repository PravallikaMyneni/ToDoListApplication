import './App.css';
import uuid from 'node-uuid';
import checkboxSelected from './images/checkbox-selected.png';
import checkboxUnselected from './images/checkbox-unselected.png';
import remove from './images/remove.png';

function ToDoList(props) {
    var toDoItems = props.itemsList;
    if (toDoItems) {
        var filterList = fetchFilteredList(props.filterParams, toDoItems);
        var groupByDateJson = filterList.reduce(function (groupList, currVal) {
            (groupList[currVal.todoDate] = groupList[currVal.todoDate] || []).push(currVal);
            return groupList;
        }, {});
        
        var toDoList = groupToDoItems(props, groupByDateJson);
    }

    return (
        <div>
            <h3 className="list-heading">TASKS LIST</h3>
            {toDoList}
        </div>

    );
};

//filter the list with search/filter param entered
const fetchFilteredList = (filterObj, listArr) => {
    var filteredList = [], searchFilter = [];
    var statusMap = {
      "Progress": "false",
      "Completed": "true",
      "All": "true false"
    };
    if (filterObj.search !== "") {
      for (var i = 0; i < listArr.length; i++) {
        if (listArr[i].todoText.indexOf(filterObj.search) >= 0) {
          searchFilter.push(listArr[i]);
        }
      }
    } else {
      searchFilter = listArr;
    }
    if (filterObj.filter === "All") {
      filteredList = searchFilter;
    } else {
      filteredList = searchFilter.filter(function (rec) {
        var statusVal = JSON.stringify(rec.todoStatus);
        if (statusVal.indexOf(statusMap[filterObj.filter]) >= 0)
          return rec;
      });
    }

    return filteredList;
  };

//mapping for grouped row based on date
function groupToDoItems(props, groupedJson) {
    var groupedDates = Object.keys(groupedJson);
    //sort based on dates
    groupedDates.sort((a,b)=>new Date(a)-new Date(b));
    if (groupedDates.length > 0) {
        var groupContainer = groupedDates.map(function (key) {
            var rows = groupedJson[key];
            var keyId = uuid.v1();
            var rowList = getToDoItems(props, rows);
            return (
                <div key={keyId} >
                    <h3 className="todo-date">{key}</h3>
                    {rowList}
                </div>
            );
        });
        return groupContainer;
    } else {
        return (
            <div className= "no-tasks-cont">
                <p>No tasks available. Please add new tasks.</p> 
            </div>
        );
    }
}

//mapping for single row item
function getToDoItems(props, rowsList) {
    var mappedList = rowsList.map((rec) => {
        var taskStatusImg = (rec.todoStatus === true) ? checkboxSelected : checkboxUnselected;
        var changeOpacity = (rec.todoStatus === true) ? { "opacity": "50%" } : { "opacity": "100%" };
        return (
            <div key={rec.todoId} className="todo-row" style={changeOpacity}>
                <img src={taskStatusImg}
                    onClick={!rec.todoStatus ? props.updateToDoStatus.bind(this, rec.todoId) : undefined} />
                <label>{rec.todoText}</label>
                <div className="row-right-items">
                    <img src={remove}
                        onClick={props.removeToDoItem.bind(this, rec.todoId)} />
                </div>
            </div>
        );
    });
    return mappedList;
}

export default ToDoList;