import { nanoid } from "@reduxjs/toolkit";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  addtodo,
  toggleModal,
  handleChange,
  updateTodo,
  PostTodosAsync,
  fetchTodo,
  PutTodosAsync,
} from "../ReduxFeature.js/TodoSliceApi";
import { useEffect } from "react";

const Addtodo = () => {
  const show = useSelector((state) => state.isModalOpen);
  const currentindex = useSelector((state) => state.currentindex);
  const currenttodo = useSelector((state) => state.currenttodo);

  const dispatch = useDispatch();

  const handleClose = () => dispatch(toggleModal(false));
  const handleShow = () => dispatch(toggleModal(true));


  

  const addTodohandler = async(e) => {
    e.preventDefault();
    const { title, description } = currenttodo; 
    if (currentindex !== null) {
      dispatch(PutTodosAsync(currenttodo));
    } else {
      if (title === " " || description === "") {
        alert("all fields are required");
      } else {
        const newTodo = {
          id: nanoid(),
          title,
          description,
        };
       dispatch(PostTodosAsync(newTodo))
      }
    }
    handleClose();
  };

  return (
    <div>
    <div className="Main">
    <h1>Todos</h1>
    <div className="Main-1">
          <Button variant="primary" onClick={handleShow}>
            Create New Todo
          </Button>
        </div>

        <Modal show={show} onHide={handleClose} animation={false} >
          <Modal.Header closeButton>
            <Modal.Title>Todo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label style={{fontFamily:"sans-serif"}}>Title : </label>
            <input
              className="rounded border  focus:border-black-500
          focus:ring-2 focus:ring-black-500 text-base outline-none text-black-100 py-1 px-3 leading-8 
          transition-color duration-200 ease-in-out w-72 ml-20 "
              type="text"
              placeholder="Enter Title Here"
              name="title"
              value={currenttodo ? currenttodo.title : ""}
              onChange={(e) =>
                dispatch(handleChange({ name: "title", value: e.target.value }))
              }
              
            />
            <br/>

            <label>Description :</label>
            <textarea
              className=" rounded border border-gray-700 focus:border-indigo-500
            focus:ring-2 focus:ring-black-900 text-base outline-none text-black-100 py-1 px-3 leading-8 
            transition-color duration-200 ease-in-out max-w-72 h-10 mt-11 ml-9 w-72"
              placeholder="Enter Text Description ..."
              name="description"
              value={currenttodo ? currenttodo.description : ""}
              onChange={(e) =>
                dispatch(
                  handleChange({ name: "description", value: e.target.value })
                )
              }
            
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="button" onClick={addTodohandler}>
              Create
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Addtodo;
