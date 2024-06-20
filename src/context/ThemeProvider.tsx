import React, {ReactNode, useEffect, useState} from "react";

type themeCtxType = {
    isDarkTheme: boolean,
    changeTheme: () => void
}
interface ContextProps{
    children: ReactNode
}
export const themeContext = React.createContext<themeCtxType>({
    isDarkTheme: false,
    changeTheme: () => {}
});
const ThemeProvider = ({children}: ContextProps) => {
    const [isDark, setIsDark] = useState<boolean>(false);

    useEffect(() => {
        const mq = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDark(mq);
    }, [])
    const changeTheme = () =>{
        setIsDark(prevState => !prevState);
    }
    const finalValue: themeCtxType = {
        isDarkTheme: isDark,
        changeTheme
    }
  return (
      <themeContext.Provider value={finalValue}>{children}</themeContext.Provider>
  )
}
export default ThemeProvider;