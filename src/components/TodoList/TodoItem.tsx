import classes from "@/sass/components/todo_list.module.scss"
import crossImg from '@/images/icon-cross.svg'
import Image from "next/image";
import {useContext} from "react";
import {themeContext} from "@/context/ThemeProvider";
import {Todo} from "@/types/types";
import {Draggable} from "react-beautiful-dnd";

interface TodoItemProps{
    id: string,
    todoName: string | undefined,
    status: "active" | "completed" | "all",
    deleteTodoFn: (id: string) => void,
    changeStatusFn: (todoData:Todo) => void,
    index:number,
}
const TodoItem = ({id, todoName, status, deleteTodoFn,changeStatusFn, index}:TodoItemProps) => {
    const {isDarkTheme} = useContext(themeContext);
    const liClass = isDarkTheme ? `${classes.todolist__list__item} ${classes['todolist__list__item--dark']}`: classes.todolist__list__item;
    const textClass = isDarkTheme ? `${classes.box__text} ${classes['box__text--dark']}` : classes.box__text;
    const checkboxClass = isDarkTheme ? `${classes.box__checkbox} ${classes['box__checkbox--dark']}`: classes.box__checkbox;
    const deleteTodoHandler = () => {
      deleteTodoFn(id);
    }
    const changeStatus = () =>{
        const todoData = {
            id,
            name: todoName,
            status: status
        }
        changeStatusFn(todoData);
    }

    return (
        <Draggable draggableId={`${id}`} index={index}>
            {(provided, snapshot) => {
                if(snapshot.isDragging){
                    //@ts-ignore
                    provided.draggableProps.style.left = provided.draggableProps.style.offsetLeft;
                    //@ts-ignore
                    provided.draggableProps.style.top = provided.draggableProps.style.offsetTop;
                }
                return (
                    <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <div className={liClass}>
                            <div className={classes.box}>
                                <input type='checkbox' onChange={changeStatus} defaultChecked={status === "completed"}  className={checkboxClass}/>
                                <p className={textClass}>{todoName}</p>
                            </div>
                            <button onClick={deleteTodoHandler}><Image src={crossImg} alt={"close button icon"}/></button>
                        </div>
                    </li>
                )
            }}
        </Draggable>
  )
}
export default TodoItem;