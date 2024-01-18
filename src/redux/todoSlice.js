// todoSlice.js
import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    editTodo: (state, action) => {
      console.log(action.payload);
      const { index, text } = action.payload;
      state[index].text = text;
    },
    deleteTodo: (state, action) => {
      state.splice(action.payload, 1);
    },
    toggleComplete: (state, action) => {
      state[action.payload].completed = !state[action.payload].completed;
    },
  },
});

export const { addTodo, editTodo, deleteTodo, toggleComplete } =
  todoSlice.actions;
export default todoSlice.reducer;
