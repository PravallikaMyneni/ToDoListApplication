import './App.css';
import uuid from 'node-uuid';
import checkboxSelected from './images/checkbox-selected.png';
import checkboxUnselected from './images/checkbox-unselected.png';
import remove from './images/remove.png';

function ToDoList(props) {
    var toDoItems = props.itemsList;
    if (toDoItems) {
        var groupByDateJson = toDoItems.reduce(function (groupList, currVal) {
            (groupList[currVal.todoDate] = groupList[currVal.todoDate] || []).push(currVal);
            return groupList;
        }, {});
        var toDoList = groupToDoItems(props, groupByDateJson);
    }

    return (
        <div>
            <h3 class="list-heading">TASKS LIST</h3>
            {toDoList}
        </div>

    );
};
//grouped row based on date
function groupToDoItems(props, groupedJson) {
    var groupedDates = Object.keys(groupedJson);
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
//row item
function getToDoItems(props, rowsList) {
    var mappedList = rowsList.map((rec) => {
        var taskStatusImg = (rec.toDoStatus === true) ? checkboxSelected : checkboxUnselected;
        var bgColor = (rec.toDoStatus === true) ? { "backgroundColor": "#BAB2B5" } : { "backgroundColor": "#EDC7B7" };
        return (
            <div key={rec.toDoId} className="todo-row" style={bgColor}>
                <img src={taskStatusImg}
                    onClick={!rec.toDoStatus ? props.updateToDoStatus.bind(this, rec.toDoId) : undefined} />
                <label>{rec.todoText}</label>
                <div className="row-right-items">
                    <img src={remove}
                        onClick={props.removeToDoItem.bind(this, rec.toDoId)} />
                </div>
            </div>
        );
    });
    return mappedList;
}

export default ToDoList;