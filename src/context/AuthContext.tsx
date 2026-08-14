// Ye tumhare Nexus AI frontend ka authentication state manager hoga.

// Abhi hum isko backend-independent rakhenge, taaki future me:

// JWT Auth
// Google Login
// Supabase/Firebase
// Custom FastAPI Auth

// easily connect ho sake.

// Isme handle hoga:

// Current user
// Login
// Logout
// Signup placeholder
// Authentication state
// LocalStorage persistence


import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { ReactNode } from "react";

interface User {
    id:string;
    name:string;
    email:string;
    avatar?:string;

}

interface AuthContextType {
user:User | null;
isAuthenticated:boolean;
login:(user:User)=>void;
logout:()=>void;

}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {


children:ReactNode;


}

export function AuthProvider({

children

}:AuthProviderProps){

const [user,setUser] = useState<User | null>(null);

// Load user from storage

useEffect(()=>{

const savedUser = localStorage.getItem("nexus_user");

if(savedUser){


setUser(
JSON.parse(savedUser)
);


}

},[]);


// Login


function login(userData:User){


setUser(userData);

localStorage.setItem(

"nexus_user",

JSON.stringify(userData)

);


}


// Logout


function logout(){


setUser(null);


localStorage.removeItem(
"nexus_user"
);


}


return (

<AuthContext.Provider

value={{

user,

isAuthenticated:!!user,

login,

logout

}}

>


{children}


</AuthContext.Provider>


);

}



export function useAuth(){



const context =
useContext(AuthContext);



if(!context){


throw new Error(

"useAuth must be used inside AuthProvider"

);


}

return context;


}