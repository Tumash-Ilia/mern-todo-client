import React, {useState, useContext, useCallback, useEffect} from "react"
import axios from 'axios'
import "./MainPage.scss"
import {AuthContext} from "../../context/AuthContext";


const MainPage = (url, config) => {
  const [text, setText] = useState('')
  const {userId} = useContext(AuthContext)
  const [todos, setTodos] = useState([])

    const getTodo = useCallback(async () => {
        try {
            await axios.get('https://todo-tumash.herokuapp.com/api/todo/', {
                headers: { 'Content-Type': 'application/json'},
                params: {userId}
            })
                .then(response => setTodos(response.data))
        } catch (e) {
            console.log(e)
        }
    }, [userId])

  const createTodo = useCallback(async () => {
      if(!text) return  alert("Titile can`t be empty")
      try {
          await axios.post('https://todo-tumash.herokuapp.com/api/todo/add', {text, userId,
          headers:{ 'Content-Type': 'application/json'}
          })
              .then((response) => {
                  setTodos([...todos], response.data)
                  setText('')
                  getTodo()
              })
      }catch (e) {
          console.log(e)
      }
  }, [text, userId,todos,getTodo])


    const updateTodo = useCallback(async (id) => {
            try {
                if (!text) return alert("Enter new titile in Task field")
                await axios.put(`https://todo-tumash.herokuapp.com/api/todo/update/${id}`, {text}, {
                    headers: {'Content-Type': 'application/json'}
                })
                    .then((response) => {
                        setTodos([...todos], response.data)
                        setText('')
                        getTodo()

                    })

            } catch (e) {
                console.log(e)
            }
    }, [text,todos,getTodo])
    
    const removeTodos = useCallback(async (id) => {
      try {
          await axios.delete(`https://todo-tumash.herokuapp.com/api/todo/delete/${id}`, {id}, {
              headers: {'Content-Type': 'application/json'}
          })
              .then(() => getTodo())

      }catch (e){
          console.log(e)
      }
    },[getTodo])

    const completeTodo = useCallback(async (id) => {
        try{
            await axios.put(`https://todo-tumash.herokuapp.com/api/todo/complete/${id}`, {id}, {
                headers: {'Content-Type': 'application/json'}
            })
                .then(response => {
                    setTodos([...todos], response.data)
                    getTodo()
                })
        }catch (e) {
            console.log(e)
        }
    },[getTodo, todos])

    const importantTodo = useCallback(async (id) => {
        try{
            await axios.put(`https://todo-tumash.herokuapp.com/api/todo/important/${id}`, {id}, {
                headers: {'Content-Type': 'application/json'}
            })
                .then(response => {
                    setTodos([...todos], response.data)
                    getTodo()
                })
        }catch (e) {
            console.log(e)
        }
    },[getTodo, todos])

    const getCompleted = useCallback(async () => {
        try {
            await axios.get('https://todo-tumash.herokuapp.com/api/todo/completed', {
                headers: { 'Content-Type': 'application/json'},
                params: {userId}
            })
                .then(response => setTodos(response.data))
        } catch (e) {
            console.log(e)
        }
    }, [userId])

    const getUncompleted = useCallback(async () => {
        try {
            await axios.get('https://todo-tumash.herokuapp.com/api/todo/uncompleted', {
                headers: { 'Content-Type': 'application/json'},
                params: {userId}
            })
                .then(response => setTodos(response.data))
        } catch (e) {
            console.log(e)
        }
    }, [userId])

    function openTab() {
      try {
        var json = [...todos]
        var myjson = JSON.stringify(json, null, 2);
        var x = window.open();
        x.alert = null
        x.document.open();
        x.document.write('<html><body><pre>' + myjson + '</pre></body></html>');
        x.document.close();
      }catch (e) {
          console.log(e)
      }
    }

    useEffect(() => {
        getTodo()
    }, [getTodo])




  return (
      <div>
        <div className="main-page">
            <h4>Add task:</h4>
            <form className="form form-login" onSubmit={event => event.preventDefault()}>
                <div className="row">
                    <div className="input-field col s12">
                        <input
                            type="text"
                            id="text"
                            name="input"
                            className="validate"
                            value={text}
                            onChange={e=> setText(e.target.value)}
                        />
                        <label htmlFor="input">Task</label>
                    </div>
                </div>
                <div className="row">
                    <button
                    className="waves-effect waves-light btn blue"
                    onClick={createTodo}
                    >Add task
                    </button>
                    <button
                        className="waves-effect waves-light btn blue"
                        onClick={openTab}
                    >JSON format
                    </button>
                </div>
            </form>
            <h3>ToDo Tasks</h3>
            <div className="todos">
                <div className="row">
                    <button
                        className="waves-effect waves-light btn blue"
                        onClick={getTodo}
                    >All tasks
                    </button>
                    <button
                        className="waves-effect waves-light btn blue"
                        onClick={getCompleted}
                    >Сompleted
                    </button>
                    <button
                        className="waves-effect waves-light btn blue"
                        onClick={getUncompleted}
                    >Outstanding
                    </button>
                </div>
                {
                    todos.map((todo, index) =>{
                     let cls = ['row flex todos-item']
                     if(todo.completed){
                         cls.push('completed')
                     }
                    if(todo.important){
                        cls.push('important')
                    }

                     return(
                         <div className={cls.join(' ')} key={index}>
                             <div className="col todos-num">{index + 1}</div>
                             <div className="col todos-text">{todo.text}</div>
                             <div className="col todos-buttons">
                                 <i className="material-icons blue-text" onClick={() => updateTodo(todo._id)}>border_color</i>
                                 <i className="material-icons blue-text" onClick={() => completeTodo(todo._id)}>check</i>
                                 <i className="material-icons orange-text" onClick={() => importantTodo(todo._id)}>warning</i>
                                 <i className="material-icons red-text" onClick={() => removeTodos(todo._id)}>delete</i>
                             </div>
                         </div>
                     )
                    })
                }
            </div>
        </div>
      </div>
  )
}

export default MainPage