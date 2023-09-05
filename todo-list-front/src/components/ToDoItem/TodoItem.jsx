import { useState } from "react";
import "../../App.css";
import { useAuthContext } from "../../context/AuthContext";
import { getToken } from "../../helpers";

function TodoItem({ todo, update }) {
   const { user } = useAuthContext();

   const [edit, setEdit] = useState(false);
   const [newTodo, setNewTodo] = useState("");

   function changeTodo(e) {
      console.log("changeTodo");
      if (user) {
         e.preventDefault();
         let item = newTodo;
         let pos = todo.id;
         let body = {
            data: {
               item,
            },
         };
         fetch(`http://localhost:1337/api/todos/${pos}`, {
            method: "PUT",
            headers: {
               "Content-type": "application/json",
               "Authorization": "Bearer " + getToken(),
            },
            body: JSON.stringify(body),
         }).then(() => {
            setEdit(false);
            update();
         });
      }
   }

   function deleteTodo(e) {
      if (user) {
         e.preventDefault();
         let pos = todo.id;

         fetch(`http://localhost:1337/api/todos/${pos}`, {
            method: "DELETE",
            headers:{
               "Authorization": "Bearer " + getToken(),
            }
         }).then(() => {
            update();
         });
      }
   }

   function setChecked() {
      if (user) {
         let pos = todo.id;
         let item = todo.attributes.item;
         let value = !todo.attributes.done;
         let body = {
            data: {
               item,
               done: value,
            },
         };

         fetch(`http://localhost:1337/api/todos/${pos}`, {
            method: "PUT",
            headers: {
               "Content-type": "application/json",
               "Authorization": "Bearer " + getToken(),
            },
            body: JSON.stringify(body),
         }).then(() => {
            update();
         });
      }
   }

   console.log("todo " + todo.id + " done : " + todo.attributes.done);
   return (
      <div className="todo">
         <div>
            <input
               type="checkbox"
               className="checkInput"
               onChange={(e) => {
                  setChecked();
               }}
               defaultChecked={todo.attributes.done}
            ></input>
         </div>
         {!edit ? (
            <div className="name">{todo.attributes.item}</div>
         ) : (
            <form onSubmit={changeTodo}>
               <input
                  className="todo_input"
                  type="text"
                  placeholder="Enter new todo"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.currentTarget.value)}
               />
               <button className="todo_button" type="submit">
                  Change todo
               </button>
            </form>
         )}
         <div>
            <button className="delete" onClick={deleteTodo}>
               delete
            </button>
            <button
               className="edit"
               onClick={() => {
                  setEdit(!edit);
                  setNewTodo(todo.attributes.item);
               }}
            >
               edit
            </button>
         </div>
      </div>
   );
}

export default TodoItem;
