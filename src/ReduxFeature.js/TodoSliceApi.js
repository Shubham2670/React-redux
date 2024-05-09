import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useEffect } from "react";

export const fetchTodo = createAsyncThunk("todo/fetchTodo", async () => {
  try {
    console.log("Fetching todos...");
    const response = await axios.get("http://localhost:4000/posts");
    console.log("Fetched todos:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw Error("Failed to todo");
  }
});

export const PostTodosAsync = createAsyncThunk(
  "todo/postTodo",
  async (newTodo) => {
    try {
      const response = await axios.post("http://localhost:4000/posts", newTodo);
      return response.data;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);

export const PutTodosAsync = createAsyncThunk(
  "todo/putTodo",
  async (currenttodo) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/posts/${currenttodo.id}`,
        currenttodo
      );
      return response.data;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);

export const DeleteTodosAsync = createAsyncThunk(
  "todo/Delete",
  async (id) => {
    try {
      await axios.delete(
        `http://localhost:4000/posts/${id}`
      );
      return id;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);

const initialState = {
  currenttodo: { id: "", title: "", description: "", Completed: false },
  todos: [],
  currentindex: null,
  isModalOpen: false,
  loading: false,
  error: null,
};

export const TodoSliceApi = createSlice({
  name: "todo",
  initialState,
  reducers: {
    //   addtodo: (state, action) => {
    //     state.todos.push(action.payload);
    //   },
    // removeTodo: (state, action) => {
    //   if (window.confirm("Are you sure you want to delete?")) {
    //     alert("Deleted");
    //     const id = action.payload;
    //     state.todos = state.todos.filter((todo) => todo.id !== id);
    //   } else {
    //     // Do nothing if the user cancels deletion
    //   }
    // },
    editTodo: (state, action) => {
      state.isModalOpen = true;
      const { index } = action.payload;
      console.log(index);
      state.currentindex = index;
      state.currenttodo = state.todos[index];
    },
    handleChange: (state, action) => {
      const { name, value } = action.payload;
      state.currenttodo = { ...state.currenttodo, [name]: value };
    },
    toggleModal: (state, action) => {
      state.currentindex = null;
      console.log(action.payload);
      state.isModalOpen = action.payload;

      state.currenttodo = { title: "", description: "", id: null };
    },
    //   updateTodo:(state,action)=>{
    //          const {id ,title, description} = action.payload;
    //          alert("Updated Sucessfully")
    //          state.todos = state.todos.map((todo) =>{
    //           if(todo.id === id){
    //               return {...todo , title ,description}
    //           }
    //           return todo
    //          })
    //   },
    Completetodo: (state, action) => {
      const id = action.payload;
      const Completedtodo = state.todos.find((todo) => todo.id === id);
      if (Completedtodo) {
        Completedtodo.Completed = !Completedtodo.Completed;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(PostTodosAsync.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(PostTodosAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = [...state.todos, action.payload];
      })
      .addCase(PostTodosAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //put case Here .......

      .addCase(PutTodosAsync.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(PutTodosAsync.fulfilled, (state, action) => {
        state.loading = false;
        const { id, title, description } = action.payload;
        alert("Updated Sucessfully");
        state.todos = state.todos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, title, description };
          }
          return todo;
        });
      })

      .addCase(PutTodosAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //delete case here...........

      .addCase(DeleteTodosAsync.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteTodosAsync.fulfilled, (state, action) => {
        state.loading = false;
        if (window.confirm("Are you sure you want to delete?")) {
          alert("Deleted");
          const id = action.payload;
          state.todos = state.todos.filter((todo) => todo.id !== id);
        } else {
          // Do nothing if the user cancels deletion
        }
      })

      .addCase(DeleteTodosAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const {
  addtodo,
  removeTodo,
  editTodo,
  toggleModal,
  handleChange,
  updateTodo,
  Completetodo,
} = TodoSliceApi.actions;
export default TodoSliceApi.reducer;
