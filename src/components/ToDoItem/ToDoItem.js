import React, { Fragment, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHourglass,
  faPencil,
  faSquareCheck,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { useDispatch } from "react-redux";

import { toDoActions } from "../../slices/toDoSlice";
import EditToDoModal from "../EditToDo/EditToDoModal";

import "./ToDoItem.css";

function ToDoItem({ todo, selectedFilter }) {
  const dispatch = useDispatch();

  // Will strikethrough/check the toDo to "Done"
  const checkToDo = () => {
    const status = todo.status === "In Progress" ? "Done" : "In Progress";
    const toDoData = { ...todo, status };
    dispatch(toDoActions.checkToDo(toDoData));
  };

  // Every time the todo status state changes, it will sort or filter accordingly.
  useEffect(() => {
    if (selectedFilter === "completed") {
      dispatch(toDoActions.filterCompleted());
    }

    if (selectedFilter === "active") {
      dispatch(toDoActions.filterActive());
    }
  }, [todo.status]);

  return (
    <Fragment>
      {/* TO DO Item Row */}
      <tr className="row px-3 align-items-center todo-item rounded">
        <td className="col-auto m-1 p-0 d-flex align-items-center">
          <h2 className="m-0 p-0">
            <FontAwesomeIcon
              className="text-primary"
              style={{ cursor: "pointer" }}
              icon={todo.status === "Done" ? faSquareCheck : faSquare}
              onClick={checkToDo}
            />
            <i
              className="text-primary btn m-0 p-0 d-none"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Mark as complete"
            ></i>
            <i
              className="fa fa-check-square-o text-primary btn m-0 p-0"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Mark as todo"
            ></i>
          </h2>
        </td>
        <td className="col px-1 m-1 d-flex align-items-center">
          <div
            style={{
              textDecoration: todo.status === "Done" ? "line-through" : "none",
            }}
            className="form-control form-control-lg border-0 bg-transparent rounded px-3"
            title={todo.text}
          >
            {todo.text}
          </div>
        </td>

        <td className="col px-1 m-2 d-flex align-items-end">
          {todo.dueDate ? (
            <div className="col-auto d-flex align-items-center rounded bg-white border border-warning">
              <i
                className="my-1 px-2 text-warning btn"
                data-toggle="tooltip"
                data-placement="bottom"
                title=""
                data-original-title="Due on date"
              >
                <FontAwesomeIcon icon={faHourglass} />
              </i>
              <h6 className="text my-2 pr-2">{todo.dueDate}</h6>
            </div>
          ) : (
            <div>Due Date not set</div>
          )}
        </td>

        <td className="col-auto m-1 p-0 px-3">
          <span class="badge bg-danger text-white">
            {new Date(todo.dueDate).getTime() - new Date().getTime() < 0
              ? "Overdue"
              : ""}
          </span>
        </td>
        <td className="col-auto m-1 p-0 px-3 ">
          <label className="date-label my-2 text-black-50">
            {todo.dateAdded}
          </label>
        </td>
        <td className="col-auto m-1 p-0 todo-actions">
          <div className="row d-flex align-items-center justify-content-end">
            <h5 className="m-0 p-0 px-2">
              <i
                data-target="#exampleModal"
                data-toggle="modal"
                className="text-info btn m-0 p-0"
                data-placement="bottom"
                title="Edit todo"
              >
                <FontAwesomeIcon icon={faPencil} />
              </i>
            </h5>
            <h5 className="m-0 p-0 px-2">
              <i
                className="fa fa-trash-o text-danger btn m-0 p-0"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Delete todo"
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => dispatch(toDoActions.deleteToDo(todo))}
                />
              </i>
            </h5>
          </div>
        </td>
      </tr>

      {/* Edit To Do Modal
          Opens after clicking on edit icon
      */}
      <EditToDoModal todo={todo} />
    </Fragment>
  );
}

export default ToDoItem;
