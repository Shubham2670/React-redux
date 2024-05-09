import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from 'react-bootstrap/Spinner';
import {
  editTodo,
  removeTodo,
  Completetodo,fetchTodo,
  DeleteTodosAsync
} from "../ReduxFeature.js/TodoSliceApi"


const Todos = () => {
  const todos = useSelector(state => state.todos);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  const dispatch = useDispatch();

  const handleEdit = (index) => {
   
    dispatch(editTodo({ index }));
  };
  const handleComplete = (id) => {
    dispatch(Completetodo(id));
  };

  useEffect(() => {
    const delayTime= setTimeout(()=>{

      dispatch(fetchTodo());
    }, 3000)
  //  return ()=> clearTimeout(delayTime) 
  }, [dispatch]);

  
if (!loading && todos.length ===0) return <div>  <Spinner style={{marginLeft: 730 , marginTop:200 }}  animation="border" role="status">
<span className="visually-hidden "></span>
</Spinner></div>
if (error) return <div>Error:{error}</div>

  return (
    <div className="Show">
    <div>

    </div>
      <table style={{ marginLeft: "9rem", width: "80%" }}>
        <thead style={{ backgroundColor: "skyblue" }}>
          <tr  className="border-b-2 border-gray-300 px-4 py-2">
            <th className="border-b-2 border-gray-300 px-4 py-2">Sr.no</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Title</th>
            <th className="border-b-2 border-gray-300 px-52 py-2">
              Description
            </th>
            <th className="border-b-2 border-gray-300 px-52 py-2 ">Actions</th>
          </tr>
        </thead>
        {!todos ||todos.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan="4" className="text-center font-bold text-3xl py-16 ">
                
                No Todo Found
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {todos.map((todo, index) => {
              return (
                <tr
                  key={todo.id}
                  className={todo.Completed ? "line-through" : ""}
                >
                  <td className="border-b-2 border-gray-300 px-4 py-2 bg-slate-100">
                    {index + 1}
                  </td>
                  <td className="border-b-2 border-gray-300 px-4 py-2  bg-slate-100">
                    {todo.title}
                  </td>
                  <td className="border-b-2 border-gray-300 px-4 py-2  bg-slate-100 text-center break-all">
                    {todo.description}
                  </td>
                  <td className="border-b-2  border-gray-300 px-2 py-2   bg-slate-100">
                  {!todo.Completed && (
                  <>
                  <button
                  className="text-white bg-green-500 border-b-2 py-2 px-5 focus:outline-none hover:bg-green-600 rounded text-md mr-5 mt-2"
                  onClick={() => handleEdit(index)}
                  >
                  Edit
                  </button>
                  <button
                  className="text-white bg-red-500 border-0 py-2 px-5 focus:outline-none hover:bg-red-600 rounded text-md mr-5"
                  onClick={() => dispatch(DeleteTodosAsync(todo.id))}
                  >
                  Delete
                  </button>
                  </>
                    )}
                      <button
                      className={
                          todo.Completed
                          ? "text-white bg-green-500 border-0 py-2 rounded px-4 focus:outline-none "
                          : "text-white bg-yellow-500 border-0 py-2 rounded px-4  focus:outline-none "
                      }
                      onClick={() => handleComplete(todo.id)}
                    >
                      {todo.Completed ? "UnComplete" : "Complete"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Todos;
