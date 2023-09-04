import { useState } from "react";
import "../App.css";
import Cookies from 'universal-cookie';

function TodoItem({ todo, update }) {
   const cookies = new Cookies();

   const [edit, setEdit] = useState(false);
   const [newTodo, setNewTodo] = useState("");

   function changeTodo(e) {
      console.log("changeTodo")
      console.log(cookies.get("connected"))
      if (cookies.get("connected")) {
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
            },
            body: JSON.stringify(body),
         }).then(() => {
            setEdit(false);
            update();
         });
      }
   }

   function deleteTodo(e) {
      if (cookies.get('connected')){
         e.preventDefault();
         let pos = todo.id;

         fetch(`http://localhost:1337/api/todos/${pos}`, {
            method: "DELETE",
         }).then(() => {
            update();
         });
      }
   }

   return (
      <div className="todo">
         {/*
      The below toggles between two components
      depending on the current value of the "edit"
      state variable
    */}
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
                  // this button toggles the "edit" state variable
                  setEdit(!edit);

                  // we add this snippet below to make sure that our "input"
                  // for editing is the same as the one for the component when
                  // it is toggled. This allows anyone using it to see the current
                  // value in the element, so they don't have to write it again
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
