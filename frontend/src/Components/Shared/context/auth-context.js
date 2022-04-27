import { createContext } from "react";

export const AuthenticationContext = createContext({
    isLoggedIn:false,
    userId:"",
    userEmail:"",
    userFullName:"",
    userContactNumber:"",
    userSignature:"",
    userType:"",
    login: ()=>{},
    logout: ()=>{}
});