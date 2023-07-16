import React from "react";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { BsPencilFill } from "react-icons/bs";
import {
  deleteTodo,
  updateTodoTitle,
  updateTodoChecked,
} from "../service-calls/deleteUpdateTodo";

const Todo = (props) => {
  const [todoTitle, setTodoTitle] = useState(props.title);
  const [update, setUpdate] = useState(false);
  const [checked, setChecked] = useState(props.checked);
  // console.log("checked at start: ", checked);

  // update button handler
  function handleUpdate(event) {
    if (event.key === "Enter") {
      // make a backend call to update title in DB
      const updatedTitle = event.target.value;
      const todoId = props.id;
      const updateTodoRequest = JSON.stringify({
        updatedTitle,
        todoId,
      });
      updateTodoTitle(updateTodoRequest);

      // set update to false to display label with updated title on Ui again
      setUpdate(false);
      return;
    } else setTodoTitle(event.target.value);
  }

  // delete button handler
  function handleDelete() {
    const todoId = props.id;
    const deleteTodoRequest = JSON.stringify({ todoId });
    deleteTodo(deleteTodoRequest);

    // remove this item from todo Container
    props.handleDeleteTodo(todoId);
  }

  // checked change handler
  function handleCheckedChange() {
    // console.log("inside checked change handler function");
    setChecked(!checked);
    // console.log("checked :", checked);

    const updateTodoCheckedBody = JSON.stringify({
      checked: checked,
      todoId: props.id,
    });
    console.log(updateTodoCheckedBody);
    updateTodoChecked(updateTodoCheckedBody);
  }

  return (
    <div className="flex py-[1rem] px-[1.5rem] rounded-[10px] items-center justify-between">
      {/* checkbox and todo title container */}
      <div className="flex items-center gap-[1rem] cursor-pointer p-0">
        <input
          type="checkbox"
          id={props.id}
          className=""
          onChange={handleCheckedChange}
          defaultChecked={props?.checked}
        />
        {!update ? (
          <label
            htmlFor={props.id}
            className={`text-[1.2rem] cursor-pointer ${
              checked &&
              "line-through decoration-[#ff5733] decoration-solid text-[#ccc]"
            }`}
          >
            {todoTitle}
          </label>
        ) : (
          <input
            type="text"
            defaultValue={todoTitle}
            onKeyUp={handleUpdate}
            autoFocus={true}
            className="text-[1.2rem] border px-[0.5rem] bg-transparent outline-none"
          />
        )}
      </div>

      {/* delete and update button container */}
      <div className="flex gap-[0.75rem]">
        {/* delete button */}
        <button
          className="bg-red-500 rounded-full p-[0.5rem] group hover:bg-[#f7f6f6] transition-all duration-150"
          onClick={handleDelete}
        >
          <MdDeleteForever className="text-[1.25rem] group-hover:text-red-500 transition-all duration-150 pointer-events-none" />
        </button>

        {/* update button */}
        <button
          className="bg-green-500 rounded-full p-[0.5rem] group hover:bg-[#f7f6f6] transition-all duration-150"
          onClick={() => setUpdate(true)}
        >
          <BsPencilFill className="text-[1.25rem] group-hover:text-green-500 transition-all duration-150 pointer-events-none" />
        </button>
      </div>
    </div>
  );
};

export default Todo;
