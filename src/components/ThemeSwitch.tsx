import themeMoon from '../images/icon-moon.svg'
import themeSun from '../images/icon-sun.svg'
import Image from "next/image";
import {useContext} from "react";
import {themeContext} from "@/context/ThemeProvider";
import classes from "@/sass/pages/todo_page.module.scss";

const ThemeSwitch = () => {
    const {isDarkTheme, changeTheme} = useContext(themeContext);
  return(
      <button className={classes.header__head__switch}>
          <Image src={isDarkTheme ? themeSun : themeMoon} alt={'theme switcher button icon'} onClick={changeTheme}/>
      </button>
  )
}
export default ThemeSwitch;