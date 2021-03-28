function SearchFilterTodo() {
    return (
        <div className ="search-cont display-horizontal ">
            <div className ="search-child">
                <input type="text" placeholder="Search" />
            </div>

            <div className ="search-child">
                <label>Filter By:</label>
                <select id="statusFilter">
                    <option>All</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                </select>
            </div>
            <div className ="search-child">
                <button>Remove Completed Tasks</button>
            </div>
        </div>
    );
}

export default SearchFilterTodo;