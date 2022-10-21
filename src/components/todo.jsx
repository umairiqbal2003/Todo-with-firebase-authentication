import React, { useEffect } from "react";
import { useState } from "react";
import { AiTwotoneDelete, AiTwotoneEdit } from "react-icons/ai"
import { db } from "../firebase"
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";





function Todo() {

    const [todoItem, setTodoItem] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [indexNumber, setindexNumber] = useState("")
    const [updateInput, setupdateInput] = useState("")
    const [refresh, setRefresh] = useState(false)

    ///create collection ////
     const user = localStorage.getItem("uid")
    const dbCollection = collection(db, "todoCollection");
    const navigate = useNavigate();
    // useEffect(()=>{
    //     if(!user){
    //     navigate("/")
    //     }
    // } , []);

    useEffect(() => {
        async function getData() {
            const querySnapshot = await getDocs(dbCollection);
            const arr = [];
            querySnapshot.forEach((doc) => {
                arr.push({
                    id: doc.id,
                    value: doc.data().todoValue,
                });
                setTodoItem([...arr])

            });
        }
        getData();

    }, [refresh])


    const addTodo = async () => {
        if (inputValue === "") {
            return;
        }
        const obj = {
            todoValue: inputValue
        };
        const addTodo = await addDoc(dbCollection, obj)
        console.log(addTodo);
        setRefresh(!refresh)
        setInputValue("");
    }
    const delTodo = async (index) => {

        const id = todoItem[index].id;
        const dbRef = doc(db, "todoCollection", id)

        await deleteDoc(dbRef);
        todoItem.splice(index, 1);

        setTodoItem([...todoItem]);
    }
    const delAll = () => {
        setTodoItem([])
    }
    const updateTodo = async (index) => {
        if (updateInput === "") {
            return;
        }

        //// update firebase collection ////
        const id = todoItem[index].id;
        const dbRef = doc(db, "todoCollection", id)
        await updateDoc(dbRef, {
            todoValue: updateInput
        })

        todoItem.splice(index, 1, { value: updateInput, id });
        setTodoItem([...todoItem]);
        setindexNumber("");
        setupdateInput("");
    }
    const editTodo = (index) => {
        setupdateInput(todoItem[index].value);
    }
    const logoutHandler = ()=>{
        localStorage.removeItem("uid")
        navigate("/")
    }


    return (
        <div className="background">
            <div className="heading">
            <h1 >Todo App</h1>
            <button onClick={logoutHandler} >LOGOUT</button>

            </div>
            

            <div className="input-todo">
                <label htmlFor="todo">TODO :  </label>
                <input type="text" value={inputValue} placeholder="Enter Your Todo" onChange={(e) => setInputValue(e.target.value)} />
                <button className="add-button" onClick={addTodo} > <i className="fa-solid fa-plus add-todo"></i> </button>

                <button className="delete-button" onClick={delAll} > <i className="fa-solid fa-trash delete-todo"></i></button>
            </div>
            <div className="result">
                {todoItem.map((todo, index) => {
                    return <React.Fragment key={index}>
                        {indexNumber === index ?
                            <div>
                                <input value={updateInput} autoFocus type="text" className="edit-input" onChange={(e) => setupdateInput(e.target.value)} />
                                <button className="update-button" onClick={() => updateTodo(index)} >Update</button>
                            </div>
                            : <div className="result-div" >
                                {todo.value}
                                <div className="icon-size" >

                                    <AiTwotoneDelete color="yellow" className="icon-distance" onClick={() => delTodo(index)} />
                                    <AiTwotoneEdit color="yellow" onClick={() => {
                                        setindexNumber(index);
                                        editTodo(index);
                                    }} />

                                </div>
                            </div>}

                    </React.Fragment>
                })}
            </div>
        </div>


    )
}

export default Todo;