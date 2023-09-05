import React, { useEffect } from "react";
import { Button, Card, Col, Form, Input, message, Row, Spin } from "antd";
import { useAuthContext } from "../../context/AuthContext";
import { API } from "../../constant";
import { useState } from "react";
import { getToken } from "../../helpers";
import TodoItem from "../../components/ToDoItem/TodoItem";


const TodoPage = () => {
   const { user, isLoading, setUser } = useAuthContext();
   const [todos, setTodos] = useState([]);
   const [newTodo, setNewTodo] = useState("");

   useEffect(() => {
      update();
   }, []);

   function update() {
      fetch(`http://localhost:1337/api/todos`)
         .then((res) => res.json())
         .then((todo) => {
            setTodos(todo.data);
         })

   }

   function addTodo(e) {
      e.preventDefault();
      let item = newTodo;
      let body = {
         data: {
            item,
         },
      };

      fetch(`http://localhost:1337/api/todos`, {
         method: "POST",
         headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${getToken()}`,
         },
         body: JSON.stringify(body),
      }).then(() => {
         setNewTodo("");
         update();
      });
   }

   const [loading, setLoading] = useState(false);

   if (isLoading) {
      return <Spin size="large" className="spinner"/>;
   }

   return (
      <div className="mainDiv">
         {/* <button className="logout" onClick={logout}>
            Logout
         </button> */}
         <form className="form" onSubmit={addTodo}>
            <input
               type="text"
               className="todo_input"
               placeholder="Enter new todo"
               value={newTodo}
               onChange={(e) => setNewTodo(e.currentTarget.value)}
            />
            <button type="submit" className="todo_button">
               Add todo
            </button>
         </form>

         <div>
            {todos.map((todo, i) => {
               if (!todo.attributes.done) {
                  return <TodoItem todo={todo} key={i} update={update} />;
               }
            })}
         </div>
         <div className="todoDoneDiv">
            <div className="doneTitle">DONE</div>
            {todos.map((todo, i) => {
               if (todo.attributes.done) {
                  return <TodoItem todo={todo} key={i} update={update} />;
               }
            })}
         </div>
      </div>
   );
};

export default TodoPage;
