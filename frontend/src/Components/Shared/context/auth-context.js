import { createContext } from "react";

export const AuthenticationContext = createContext({
    isLoggedIn:false,
    userProfilePic:"",
    userId:"",
    userEmail:"",
    userFullName:"",
    userContactNumber:"",
    userSignature:"",
    userStudentNumber:"",
    userBirthday:"",
    userCourseYearAndSection:"",
    userType:"",
    login: ()=>{},
    logout: ()=>{}
});