import React, { useEffect } from "react";
import { Button, Card, Col, Form, Input, message, Row, Spin } from "antd";
import { useAuthContext } from "../../context/AuthContext";
import { API } from "../../constant";
import { useState } from "react";
import { getToken } from "../../helpers";
import TodoItem from "../../components/TodoItem";


const TodoPage = () => {
   const { user, isLoading, setUser } = useAuthContext();
   const [todos, setTodos] = useState([]);
   const [newTodo, setNewTodo] = useState("");

   useEffect(() => {
      if (user) {
         update();
      }
   }, []);

   function update() {
      if (user) {
         fetch(`http://localhost:1337/api/todos`)
            .then((res) => res.json())
            .then((todo) => {
               setTodos(todo.data);
            });
      } else {
         setTodos([]);
      }
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
         },
         body: JSON.stringify(body),
      }).then(() => {
         setNewTodo("");
         update();
      });
   }

   const [loading, setLoading] = useState(false);

   const handleProfileUpdate = async (data) => {
      setLoading(true);
      try {
         const response = await fetch(`${API}/users/${user.id}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
               // set the auth token to the user's jwt
               Authorization: `Bearer ${getToken()}`,
            },
            body: JSON.stringify(data),
         });
         const responseData = await response.json();

         setUser(responseData);
         message.success("Data saved successfully!");
      } catch (error) {
         console.error(Error);
         message.error("Error While Updating the Profile!");
      } finally {
         setLoading(false);
      }
   };

   if (isLoading) {
      return <Spin size="large" />;
   }

   return (
      <div>
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
