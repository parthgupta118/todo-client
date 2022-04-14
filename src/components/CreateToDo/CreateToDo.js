import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toDoActions } from "../../slices/toDoSlice";

export default function CreateToDo() {
  const [toDo, setToDo] = useState({ text: "", dueDate: "" });
  const dispatch = useDispatch();

  const handleTextChange = (e) => {
    e.preventDefault();
    setToDo({ ...toDo, text: e.target.value });
  };

  const handleDateChange = (e) => {
    e.preventDefault();
    setToDo({
      ...toDo,
      dueDate: new Date(e.target.value).toUTCString().slice(5, 16),
    });
  };

  const addToDo = () => {
    const toDoData = {
      ...toDo,
      dateAdded: new Date(Date.now()).toUTCString().slice(5, 16),
      id: Math.random() * 100000,
      status: "In Progress",
    };

    dispatch(toDoActions.addToDo(toDoData));
  };

  return (
    <Fragment>
      <div className="row m-1 p-3">
        <div
          className="col col-11 rounded mx-auto"
          style={{
            background: "linear-gradient(to right, #dfd6fa55, #dfd6fa55)",
          }}
        >
          {/* Text Area for input To Do */}
          <div className="col rounded shadow-sm p-4 align-items-center justify-content-center">
            <div className="col bg-white p-0 mb-3">
              <textarea
                rows="4"
                onChange={handleTextChange}
                className="form-control form-control-lg rounded border-1 add-todo-input bg-transparent rounded"
                type="text"
                placeholder="Add new .."
              />
            </div>

          {/* Date Field to set due date for input To Do */}
            <div className="col-auto m-0 p-0 w-100 d-flex align-items-center justify-content-between">
              <div>
                <label className="text-secondary my-2 p-0 px-1 view-opt-label due-date-label">
                  Set Due Date:
                </label>

                <input type="date" onChange={handleDateChange} />
              </div>
              <div>
                <button
                  type="button"
                  onClick={addToDo}
                  className="btn btn-primary"
                >
                  Add ToDo
                </button>
              </div>
            </div>
            <div className="col-auto px-0 mx-0 mr-2"></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
