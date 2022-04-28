import { useContext } from "react";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { AuthenticationContext } from "./context/auth-context";

const TokenCheck = () => {
    const auth = useContext(AuthenticationContext);
    const token = localStorage.getItem('token');

    if (token) {
        const tokenContent = jwtDecode(token);
        auth.isLoggedIn = true;
        auth.userId = tokenContent.user.id;
        auth.userEmail = tokenContent.user.email;
        auth.userFullName = tokenContent.user.fullName;
        auth.userContactNumber = tokenContent.user.contactNumber;
        auth.userSignature = tokenContent.user.image;
        auth.userType = tokenContent.user.userType;
        if (auth.userType === "Student") {
            auth.userStudentNumber = tokenContent.user.studentNumber;
            auth.userCourseYearAndSection = tokenContent.user.yearAndSection;
        }
    } else {
        return <Navigate to='/' />;
    }
}
export default TokenCheck;