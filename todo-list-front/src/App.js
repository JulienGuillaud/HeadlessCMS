import { useState, useEffect } from 'react';
import TodoItem from './components/TodoItem';
import Cookies from 'universal-cookie';
import './App.css';

function App() {
  const cookies = new Cookies();


  const [showFormBG, setShowFormBG] = useState(!cookies.get('connected'))
  const [showSignUp, setShowSignUp] = useState(false)
  const [showSignIn, setShowSignIn] = useState(!cookies.get('connected'))
  const [connected, setConnected] = useState(cookies.get('connected'))
  const [error, setError] = useState("");


  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  function logout() {
    cookies.set('connected', 'false', { path: '/' });// Pacman
    setConnected(false);
    update();
    showLoginPopup(true);
  }

  function signup(){
    setShowSignUp(true);
    setShowSignIn(false);
  }

  function showLoginPopup(show){
    setShowSignIn(show);
    setShowFormBG(show);
  }

  function connect() {
    let login = document.querySelector('.login').value;
    let password = document.querySelector('.password').value;
    if (login === 'admin' && password === 'admin') {
      setConnected(true);
      showLoginPopup();
      cookies.set('connected', 'true', { path: '/' });// Pacman
      update();
    } else {
      cookies.set('connected', 'false', { path: '/' });// Pacman
      setError('Login or password is incorrect');
    }
  }


  useEffect(() => {
    if (connected) {
      update();
    }
  }, []);

  function update() {
    if (cookies.get('connected')) {
      fetch(`http://localhost:1337/api/todos`)
        .then(res => res.json())
        .then(todo => {
          setTodos(todo.data);
        })
    }else{
      setTodos([]);
    }
  }

  function addTodo(e) {
    e.preventDefault();
    let item = newTodo;
    let body = {
      data: {
        item
      }
    };

    fetch(`http://localhost:1337/api/todos`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(() => {
        setNewTodo("");
        update();
      })
  }

  return (
    <div className="app">
      <main>
        <button className="logout" onClick={logout}>Logout</button>
        <form className="form" onSubmit={addTodo}>
          <input type="text" className="todo_input" placeholder="Enter new todo" value={newTodo} onChange={e => setNewTodo(e.currentTarget.value)} />
          <button type="submit" className="todo_button">Add todo</button>
        </form>

        <div>
          {
            todos.map((todo, i) => {
              if(!todo.attributes.done){
                return <TodoItem todo={todo} key={i} update={update} />
              }
            })
          }
        </div>
        <div className='todoDoneDiv'>
          <div className='doneTitle'>DONE</div>
          {
            todos.map((todo, i) => {
              if(todo.attributes.done){
                return <TodoItem todo={todo} key={i} update={update} />
              }
            })
          }
        </div>
{showFormBG ? <div className='connectFormBG'></div> : null}
        {showSignIn ? <div className='connectFormWrapper'><form className="form">
          {/* ICON LOGIN */}
          <div className='loginInput'>
            <img src="https://img.icons8.com/?size=512&id=34105&format=png" alt="login" />
            <input type="text" className="login" placeholder="Login" />
          </div>
          <div className='loginPassword'>
            <img src="https://img.icons8.com/?size=512&id=84905&format=png" alt="login" />
            <input type="password" className="password" placeholder="Password" />
          </div>
          <div>{error}</div>
          <button type="button" className="connect" onClick={connect}>Connect</button>
          <button type="button" className="signup" onClick={signup}>sign-up</button>
        </form></div>: null}

      </main>
    </div>
  )
}
export default App;