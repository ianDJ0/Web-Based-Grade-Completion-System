import React, { useContext } from "react";
import { RequestContent } from "../../Shared/context/request-context";
import axios from "axios";

const FindInstructor = (props) => {
    const requestContent = useContext(RequestContent);
    let getData = Array.from(props.searchFac);
    if (props.autoSearch&& props.autoSearch!=='a') {
        requestContent.request_InstructorId = props.autoSearch._id;
        requestContent.request_InstructorName = props.autoSearch.fullName;
        props.insertInstructor(props.autoSearch.fullName);
    }
    let visible;
    if (getData.length === 0) {
        visible = "none";
    } else {
        visible = "block";
    }
    return (
        <ul className="find-instructor" style={{ display: visible }}>
            {getData.length > 0 &&
                getData.map(person => {
                    return <li key={person._id} onClick={() => {
                        requestContent.request_InstructorId = person._id;
                        requestContent.request_InstructorName = person.fullName;
                        props.insertInstructor(requestContent.request_InstructorName);
                    }}>{person.fullName}</li>
                })
            }
        </ul>
    )
}

export default FindInstructor;