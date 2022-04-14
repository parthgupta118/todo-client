import React, { Fragment, useEffect, useState } from "react";

// Imported Font Awesome v6.0 icons
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";

import CreateToDo from "../components/CreateToDo/CreateToDo";
import ToDoItem from "../components/ToDoItem/ToDoItem";

// Imported Redux Thunk Actions from slices
import { authActions } from "../slices/authSlice";
import { toDoActions } from "../slices/toDoSlice";
import { toast } from "react-toastify";

function Dashboard() {
  // Auto-Subscribing to the redux-toolkit slices
  const toDos = useSelector((state) => state.toDo.todos);
  const filterToDos = useSelector((state) => state.toDo.filtertodos);
  const users = useSelector((state) => state.auth.users);
  const user = useSelector((state) => state.auth.user);

  const [selectedFilter, setSelectedFilter] = useState();

  const dispatch = useDispatch();

  /**
   * Brief description of the function here.
   * @summary It will filter all the todos by the selected option.
   * @param {e} Event - selected value of Filter option
   */

  const selectFilterOption = (e) => {
    setSelectedFilter(e.target.value);

    if (e.target.value === "completed") {
      dispatch(toDoActions.filterCompleted());
    }

    if (e.target.value === "active") {
      dispatch(toDoActions.filterActive());
    }

    if (e.target.value === "all") {
      dispatch(toDoActions.filterAll());
    }
  };

  /**
   * Brief description of the function here.
   * @summary It will sort all the todos based on the selected option.
   * @param {e} Event - selected value of Sort option
   */

  const selectSortOption = (e) => {
    if (selectedFilter === "added-date-asc") {
      dispatch(toDoActions.sortByAdded());
    }

    if (e.target.value === "due-date-desc") {
      dispatch(toDoActions.sortByDue()); // dispatching the sortByDue action
    }
  };

  /**
   * It will logout the user and save all the to do list state.
   * @summary Will store the user's data with to do lists in local storage.
   */
  const handleLogout = () => {
    const usersData = users.map((e) => {
      if (user.username === e.username && user.password === e.password) {
        return { ...e, toDos };
      }
    });

    localStorage.setItem("all_users", JSON.stringify(usersData));

    dispatch(authActions.logout());
    toast.success("Logged Out Successfully");
  };

  /**
   * @summary It will sort whenever the to do list state changes.
   */
  useEffect(() => {
    if (selectedFilter === "completed") {
      dispatch(toDoActions.filterCompleted());
    }

    if (selectedFilter === "active") {
      dispatch(toDoActions.filterActive());
    }

    if (selectedFilter === "all") {
      dispatch(toDoActions.filterAll());
    }
  }, [filterToDos]);

  return (
    <Fragment>
      <div className="container p-2 w-75 rounded mx-auto bg-light shadow">
        {/* <!-- App title section --> */}
        <div className="row m-1 p-4 px-5">
          <div className="row w-100 display-flex align-items-center justify-content-between">
            <div className="p-1 h2 text-primary mx-auto">
              <span className="bg-primary text-white rounded px-3 py-2 mr-2">
                <FontAwesomeIcon icon={faClipboardList} />
              </span>
              <u>My Todo-s</u>
            </div>

            <div className="col-auto px-0 mx-0 mr-2">
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-danger"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="row w-100 display-flex align-items-center justify-content-start">
          <div className="p-1 h4 mx-auto">
            <u>Welcome {user?.username}</u>
          </div>
        </div>

        {/* <!-- Create todo section --> */}
        <CreateToDo />

        <div className="p-2 mx-4 border-black-25 text-danger">
          Note: Please click on logout after adding todos to save all todo list
          in localStorage otherwise all data will be lost.
        </div>

        {/* Bottom Border */}
        <div className="p-2 mx-4 border-black-25 border-bottom"></div>

        {/* <!-- View filter and sort options section --> */}
        <div className="row m-1 p-3 px-5 justify-content-end">
          <div className="col-auto d-flex align-items-center">
            <label className="text-secondary my-2 pr-2 view-opt-label">
              Filter
            </label>
            <select
              defaultValue={"all"}
              onChange={selectFilterOption}
              className="custom-select custom-select-sm btn my-2"
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="active">Active</option>
            </select>
          </div>
          <div className="col-auto d-flex align-items-center px-1 pr-3">
            <label className="text-secondary my-2 pr-2 view-opt-label">
              Sort
            </label>
            <select
              defaultValue={"added-date-asc"}
              onChange={selectSortOption}
              className="custom-select custom-select-sm btn my-2"
            >
              <option value="added-date-asc">Added date</option>
              <option value="due-date-desc">Due date</option>
            </select>
            <i
              className="fa fa fa-sort-amount-asc text-info btn mx-0 px-0 pl-1"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Ascending"
            ></i>
            <i
              className="fa fa fa-sort-amount-desc text-info btn mx-0 px-0 pl-1 d-none"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Descending"
            ></i>
          </div>
        </div>

        {/* <!-- Todo list section --> */}
        <div className="row mx-1 px-5 pb-3 w-80">
          <table className="col mx-auto">
            <thead className="row px-3 align-items-center justify-content-space-evenly todo-item rounded">
              {/* <!-- Todo list Heading Section --> */}
              <tr>
                <th
                  scope="col"
                  className="col-auto m-1 p-0 h4 d-flex align-items-center"
                >
                  ToDos
                </th>
              </tr>
            </thead>

            {/* <!-- Todo Items --> */}
            <tbody>
              {filterToDos?.length > 0 ? (
                filterToDos.map((todo) => <ToDoItem todo={todo} />)
              ) : (
                <tr>
                  <td className="col-auto justify-content-center m-1 p-0 d-flex align-items-center">
                    No Todos Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
}

export default Dashboard;
