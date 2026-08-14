import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { ReactNode } from "react";

type Theme = "dark" | "light";


interface ThemeContextType {

  theme: Theme;

  toggleTheme: () => void;

  setTheme: (theme: Theme) => void;

}


const ThemeContext = createContext<
ThemeContextType | undefined
>(undefined);


interface ThemeProviderProps {

  children: ReactNode;

}

export function ThemeProvider({
  children
}:ThemeProviderProps){



const [theme,setTheme]
=
useState<Theme>(

(localStorage.getItem("theme") as Theme)
||
"dark"

);


useEffect(()=>{


document.documentElement.classList.remove(
"dark",
"light"
);



document.documentElement.classList.add(
theme
);



localStorage.setItem(
"theme",
theme
);



},[theme]);


function toggleTheme(){


setTheme(
prev =>
prev==="dark"
?
"light"
:
"dark"
);


}


return (

<ThemeContext.Provider

value={{

theme,

toggleTheme,

setTheme

}}

>


{children}


</ThemeContext.Provider>


);


}


export function useTheme(){


const context = useContext(
ThemeContext
);


if(!context){

throw new Error(
"useTheme must be used inside ThemeProvider"
);

}


return context;


}