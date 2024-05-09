// import { createSlice} from "@reduxjs/toolkit";

// const initialState = {
//   todos: [],
//   currenttodo: { id:null , title: "", description: "" , Completed:false },
//   currentindex: null,
//   isModalOpen: false,
// };

// export const todoSlice = createSlice({
//   name: "todo",
//   initialState,
//   reducers: {
//     addtodo: (state, action) => {
//       state.todos.push(action.payload);
//     },
//     removeTodo: (state, action) => {
//       if (window.confirm("Are you sure you want to delete?")) {
//         alert("Deleted");
//         const id = action.payload;
//         state.todos = state.todos.filter((todo) => todo.id !== id);
//       } else {
//         // Do nothing if the user cancels deletion
//       }
//     },
//     editTodo: (state, action) => {
//         state.isModalOpen = true;
//       const {index} = action.payload;
//       console.log(index)
//       state.currentindex= index;
//       state.currenttodo= state.todos[index]
      
//     },
//     handleChange:(state,action)=>{
//          const {name,value} =action.payload;
//          state.currenttodo={...state.currenttodo,[name] : value}
//     },
//     toggleModal: (state, action) => {
//         state.currentindex=null
//         console.log(action.payload)
//         state.isModalOpen = action.payload;

//         state.currenttodo = { title: "", description: "", id: null };
  
//     },
//     updateTodo:(state,action)=>{
//            const {id ,title, description} = action.payload;
//            alert("Updated Sucessfully")
//            state.todos = state.todos.map((todo) =>{
//             if(todo.id === id){
//                 return {...todo , title ,description}
//             }
//             return todo
//            })
//     },
//    Completetodo:(state,action)=>{
//     const id = action.payload;
//     const Completedtodo = state.todos.find((todo) => todo.id === id)
//     if(Completedtodo){
//       Completedtodo.Completed = !Completedtodo.Completed
//     }
           
//    }
//   },
// });
// export const { addtodo, removeTodo, editTodo, toggleModal ,handleChange,updateTodo, Completetodo } = todoSlice.actions;
// export default todoSlice.reducer;


