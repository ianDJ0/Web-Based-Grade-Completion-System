import React,{useContext} from "react";
import { RequestContent } from "../../Shared/context/request-context";
import axios from "axios";

const FindInstructor = (props) => {
    const requestContent = useContext(RequestContent);
    let getData= Array.from(props.searchFac);
    let visible;
    if(getData.length ===0){
        visible = "none";
    }else{
        visible = "block";
    }
        
    return (
        <ul className="find-instructor" style={{ display: visible }}>
            {getData.map(person =>{
                return <li key={person._id} onClick={()=>{
                    requestContent.request_InstructorId = person._id;
                    requestContent.request_InstructorName = person.fullName;
                }}>{person.fullName}</li>
            })
            }
        </ul>
    )
}

export default FindInstructor;