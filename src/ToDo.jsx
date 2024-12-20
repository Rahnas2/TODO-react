import { useState } from "react"

function ToDo() {

    const [newTask, setNewTask] = useState()   //handling input data 

    const [task, addTask] = useState([])      //for adding tasks to the list

    const [editTask, setEditTask] = useState(false)     //for performing edit 

    const [editTaskIndex, setEditTaskIndex] = useState(null)

    const [completedTask, setCompletedTask] = useState([])

    const [isComplete, setIsComplete] = useState(false)


    //handle the input change
    const handleNewTask = (e) => {
        setNewTask(e.target.value)
    }

    //adding new task
    const handleTask = () => {
        if (!newTask.trim()) return
        if (task.includes(newTask.toLowerCase())) return alert('alrealy exist in your list')
        addTask([...task, newTask.toLowerCase()])
        setNewTask('')
        setIsComplete(false)
    }

    //delete task
    const handleDelete = (i) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this task?')
        if(!confirmDelete) return
        let afterRemovel = task.filter((_, index) => index !== i)
        addTask(afterRemovel)
    }


    //edit a task
    const handleEdit = (i) => {
        setEditTask(true)
        setNewTask(task[i])
        setEditTaskIndex(i)
    }

    //updadte the task
    const handleUpdate = () => {
        if (!newTask.trim()) return
        if (task.includes(newTask.toLowerCase())) return alert('alrealy exist in your list')

        let updatedTask = [...task]

        // if(updatedTask[editTaskIndex] !== newTask)  {
        //     updatedTask[editTaskIndex] = newTask
        //     addTask(updatedTask)
        // }  

        updatedTask[editTaskIndex] = newTask.toLowerCase()
        addTask(updatedTask)

        setEditTask(false)
        setNewTask('')
        setEditTaskIndex(null)
    }

    //reverse the order 
    const handleSort = () => {
        task.reverse()
        addTask([...task])
    }

    //handle completed task
    const handleCompletedTask = (i) =>{
        let currentTask = task[i]

        if(completedTask.includes(currentTask)){
            setCompletedTask(completedTask.filter(existedTask => existedTask !== currentTask))
        }else{
            setCompletedTask([...completedTask,task[i]])
        }

    }

    return (
        <div className="todo-container">
            <div>
                <h3 className="todo-tittle">STAY ON TRACK</h3>
                <div className="input-container">
                    <input onChange={handleNewTask} value={newTask} type="text" placeholder="enter your task" />
                    {editTask ? <button onClick={handleUpdate} className="add-btn">Update</button> :
                        <button onClick={handleTask} className="add-btn">Add</button>
                    }
                    <span onClick={handleSort} className="sort-list"><i class="fa-solid fa-sort"></i></span>
                </div>


                {isComplete ?
                    <ul className="todo-list">
                        {completedTask.map((t, i) => (
                            <li key={i} className="list-items">
                                {t}
                            </li>
                        ))}
                        <button className="back-view-btn" onClick={() => setIsComplete(false)}>BACK</button>
                    </ul> :
                    <ul className="todo-list">
                        {task.map((t, i) => (
                            <li key={i} className="list-items">
                                <input type="checkbox" 
                                checked={completedTask.includes(t)}
                                onClick={() => handleCompletedTask(i)}/>
                                {t}
                                <button onClick={() => handleEdit(i)}>
                                    <i class="fas fa-edit"></i></button>
                                <button onClick={() => handleDelete(i)}>
                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                </button>
                            </li>
                        ))}
                        {completedTask.length > 0 ? <button onClick={() => setIsComplete(true)} className="back-view-btn">VIEW COMPLETED TASK</button>: ''}
                    </ul>      
                } 
                
            </div>
        </div>
    )
}

export default ToDo