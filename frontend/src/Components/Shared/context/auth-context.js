import { createContext } from "react";

export const AuthenticationContext = createContext({
    isLoggedIn:false,
    userId:"",
    userEmail:"",
    userFullName:"",
    userContactNumber:"",
    userSignature:"",
    userStudentNumber:"",
    userCourseYearAndSection:"",
    userType:"",
    login: ()=>{},
    logout: ()=>{}
});