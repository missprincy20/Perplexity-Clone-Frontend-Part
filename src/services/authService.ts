const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;


export interface LoginRequest {
email:string;
password:string;

}

export interface SignupRequest {

name:string;
email:string;
password:string;

}

export interface AuthResponse {


user:{
    id:string;
    name:string;
    email:string;

};

token:string;


}

// Signup

export async function signup(

data:SignupRequest

):Promise<AuthResponse | null>{



try{


const response =
await fetch(

`${API_URL}/signup`,

{

method:"POST",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify(data)

}

);

if(!response.ok){

throw new Error(
"Signup failed"
);

}

const result = await response.json();

saveToken(result.token);
return result;

}

catch(error){
console.error(

"Signup Error:",

error

);

return null;


}


}


export async function login(

data:LoginRequest

):Promise<AuthResponse | null>{



try{

const response = await fetch(`${API_URL}/login`,

{

method:"POST",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify(data)

}

);


if(!response.ok){

throw new Error(
"Login failed"
);

}

const result = await response.json();

saveToken(result.token);

return result;

}

catch(error){

console.error(

"Login Error:",

error

);

return null;
}

}


export async function getCurrentUser(){

const token = localStorage.getItem("token");


if(!token){
    return null;

}

try{

const response = await fetch(`${API_URL}/me`,

{

headers:{

Authorization:

`Bearer ${token}`

}

}

);


if(!response.ok){
    return null;
}


return await response.json();

}

catch(error){
console.error(
    "User Fetch Error:",
    error

);

return null;

}

}


export function logout(){

localStorage.removeItem("token");

localStorage.removeItem("nexus_user");


}


function saveToken(

token:string

){

localStorage.setItem(

"token",

token

);


}