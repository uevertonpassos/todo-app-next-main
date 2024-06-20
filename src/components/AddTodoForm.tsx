import inputClasses from "@/sass/components/todo_input.module.scss"
import formClasses from "@/sass/pages/todo_page.module.scss"
import {useContext, useRef} from "react";
import {themeContext} from "@/context/ThemeProvider";
import {TodoPostData} from "@/types/types";
import toast from "react-hot-toast";

interface TodoFormProps {
    addTodoHandler: (todoData:TodoPostData) => void
}
const AddTodoForm = ({addTodoHandler}:TodoFormProps) => {
    const {isDarkTheme} = useContext(themeContext);
    const formBoxClass = isDarkTheme ? `${formClasses['header__form__input-box']} ${formClasses['header__form__input-box--dark']}` : formClasses['header__form__input-box'];
    const inputClass = isDarkTheme ? `${inputClasses['todo-input']} ${inputClasses['todo-input--dark']}` : inputClasses['todo-input'];
    const inputRef = useRef<HTMLInputElement | null>(null);
    const sendTodoData = (e: any) => {
      e.preventDefault();
      if(inputRef.current?.value === ''){
          toast.error("No Todo name provided");
          return;
      }
      const dataObj:TodoPostData = {
          name: inputRef.current?.value,
          status: "active"
      }
      inputRef.current!.value = '';
      addTodoHandler(dataObj);
    }
    return(
      <form onSubmit={sendTodoData} className={formClasses.header__form}>
          <div className={formBoxClass}>
              <input type='text' ref={inputRef} placeholder='Create a new todo..' className={inputClass}/>
          </div>

      </form>
  )
}
export default AddTodoForm;