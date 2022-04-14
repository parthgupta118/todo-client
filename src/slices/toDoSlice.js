import { createSlice } from "@reduxjs/toolkit";

// Configured Initial ToDo State
const initialToDoState = {
  todo: null,
  todos: [],
  filtertodos: [],
  loading: true,
  edit: false,
};

// Created Initial ToDo slice from Initial ToDo state
const toDoSlice = createSlice({
  name: "toDo",
  initialState: initialToDoState,
  reducers: {
    /**
     * It will get the current logged in user data stored in localStorage and load to do list form it.
     * @param {payload} payload - It will contain the to do list data data
     */
    loadToDos(state, { payload }) {
      console.log(payload, "payload")
      state.todos = payload.toDos;
      state.filtertodos = payload.toDos;
    },

    /**
     * It will add todo to the todos in todo state.
     * @param {payload} payload - It will contain the to do list data
     */
    addToDo(state, { payload }) {
      state.todo = payload;
      state.todos = [...state.todos, payload];
      state.filtertodos = [...state.filtertodos, payload];
    },

    /**
     * It will edit todo to the todos in todo state.
     * @param {payload} payload - It will contain the to do list data
     */
    editToDo(state, { payload }) {
      state.todo = payload;
      state.todos = [
        ...state.todos.filter((todo) => todo.id !== payload.id),
        payload,
      ];
      state.filtertodos = [
        ...state.filtertodos.map((todo) => {
          if (todo.id !== payload.id) {
            return todo;
          }
          return payload;
        }),
      ];
    },

    /**
     * It will delete todo to the todos in todo state.
     * @param {payload} payload - It will contain the to do list data
     */
    deleteToDo(state, { payload }) {
      state.todos = state.todos.filter((todo) => todo.id !== payload.id);
      state.filtertodos = state.filtertodos.filter(
        (todo) => todo.id !== payload.id
      );
    },

    /**
     * It will check the status to done in todo state.
     * @param {payload} payload - It will contain the to do list data
     */
    checkToDo(state, { payload }) {
      state.todos = [
        ...state.todos.filter((todo) => todo.id !== payload.id),
        payload,
      ];
      state.filtertodos = [
        ...state.filtertodos.map((todo) => {
          if (todo.id !== payload.id) {
            return todo;
          }
          return payload;
        }),
      ];
    },

    // Filter actions
    filterAll(state) {
      state.filtertodos = state.todos;
    },
    filterCompleted(state) {
      state.filtertodos = state.todos.filter((todo) => todo.status === "Done");
    },
    filterActive(state) {
      state.filtertodos = state.todos.filter(
        (todo) => todo.status === "In Progress"
      );
    },

    // Sort Actions
    sortByAdded(state) {
      state.filtertodos = state.todos.sort(
        (a, b) =>
          new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
      );
    },
    sortByDue(state) {
      state.filtertodos = state.todos.sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );
    },
  },
});

export default toDoSlice;
export const toDoActions = toDoSlice.actions;
