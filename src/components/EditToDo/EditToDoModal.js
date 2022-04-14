
import React, { Fragment, useState } from "react";
import { useDispatch} from "react-redux";
import { toast } from "react-toastify";


import { toDoActions } from "../../slices/toDoSlice";

export default function EditToDoModal({ todo }) {
    const [toDo, setToDo] = useState(todo);
    const dispatch = useDispatch();

    const handleTextChange = (e) => {
        e.preventDefault();
        setToDo({ ...toDo, text: e.target.value })
    }

    const handleDateChange = (e) => {
        e.preventDefault();
        setToDo({ ...toDo, dueDate: new Date(e.target.value).toUTCString().slice(5, 16) })
    }

    const updateToDo = () => {
        dispatch(toDoActions.editToDo(toDo));
        toast.success("Updated ToDo Successfully")
    }

    return (

        <Fragment>
            {/* Edit Modal for todo */}
            <div class="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit ToDo</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div className="col col-12 rounded mx-auto">
                                <div className="col w-100 bg-white p-0 mb-3">
                                    <textarea rows="4" onChange={handleTextChange} value={toDo.text} className="form-control form-control-lg rounded border-1 add-todo-input bg-transparent rounded" type="text" placeholder="Add new .." />
                                </div>
                                <div className="col-auto m-0 p-0 w-100 d-flex align-items-center justify-content-between">
                                    <div>
                                        <label className="text-secondary my-2 p-0 px-1 view-opt-label due-date-label">Set Due Date:</label>

                                        <input type="date" onChange={handleDateChange} value={new Date(toDo.dueDate).toLocaleDateString('en-CA')} />
                                    </div>
                                    <div>
                                        <button type="button" onClick={updateToDo} className="btn btn-primary"  data-dismiss="modal">Update ToDo</button>

                                    </div>
                                </div>
                                <div className="col-auto px-0 mx-0 mr-2">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
