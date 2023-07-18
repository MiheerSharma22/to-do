import React from "react";
import { useEffect, useState } from "react";
import Todo from "./Todo";
import Spinner from "./Spinner";
import fetchTodo from "../service-calls/fetchTodo";
import { displayModal } from "../redux/slices/ShowModal";
import { useDispatch } from "react-redux";

const TodoListContainer = ({ allTodos, setAllTodos }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const email = "miheer.sharma1@gmail.com";

  async function init() {
    // setting loading to true
    setLoading(true);

    // fetching all the todos from the Db, if there are any
    const response = await fetchTodo(email);

    // if we get something in response (that is if any todos are available)
    if (response.status === 200) {
      const data = await response.json();
      setAllTodos(data.data);
    }

    // setting loading to false
    setLoading(false);
  }

  useEffect(() => {
    init();
  }, []);

  function handleShowModal() {
    dispatch(displayModal());
  }

  const deleteTodo = (todoId) => {
    const newList = allTodos.filter((todo) => todo._id !== todoId);
    setAllTodos(newList);
  };

  return (
    <div className="py-[3rem] flex items-center justify-center text-white min-w-screen min-h-screen  relative overflow-x-hidden">
      <div className="w-[60%] min-h-[80vh] rounded-[2rem] bg-[#ffffff40] border border-[#ffffff59] p-[2rem] flex flex-col relative">
        <p className="heading text-center text-[2rem] mb-[0.75rem] text-[#FF5733]">
          TO-DO List !
        </p>

        {/* show loading spinner */}
        {/* load each todo fetched from the Db onto UI */}
        {loading ? (
          <Spinner />
        ) : allTodos.length > 0 ? (
          allTodos.map((todo, index) => (
            <Todo
              key={todo._id}
              id={todo._id}
              title={todo.title}
              handleDeleteTodo={deleteTodo}
              checked={todo.checked}
            />
          ))
        ) : (
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] text-[2rem]">
            List Is Empty!
          </div>
        )}

        <button
          className="addItems py-[0.7rem] px-[2rem] bg-gradient-to-r from-[#bd2525] to-[#d22727] text-white text-xl hover:text-[#bd2525] hover:outline-1 hover:outline hover:outline-offset-2 hover:outline-[#bd2525] hover:bg-gradient-to-r hover:from-transparent fixed top-[85%] right-[4%] transition-all duration-200"
          onClick={handleShowModal}
        >
          Add Items
        </button>
      </div>
    </div>
  );
};

export default TodoListContainer;
