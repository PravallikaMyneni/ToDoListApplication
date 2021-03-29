function SearchFilterTodo(props) {
    var sampleObj = {
        search: "",
        filter: "All"
    };
    const searchFilterHandler = (event) => {
        if (event.target.id === "statusFilter") {
            sampleObj.filter = event.target.value;
        } else if (event.target.id === "searchBox") {
            sampleObj.search = event.target.value;
        }
        props.getFilterParam(sampleObj.search, sampleObj.filter);
    };
    return (
        <div className="search-cont display-horizontal ">
            <div className="search-child">
                <input id="searchBox" type="text" placeholder="Search" onChange={searchFilterHandler} />
            </div>

            <div className="search-child">
                <label>Filter By:</label>
                <select id="statusFilter" onChange={searchFilterHandler}>
                    <option value="All">All</option>
                    <option value="Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            <div className="search-child">
                <button id ="removeTask" onClick = {props.removeCompletedTask}>Remove Completed Tasks</button>
            </div>
        </div>
    );
}

export default SearchFilterTodo;