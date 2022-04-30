import { createContext } from "react";

export const RequestContent = createContext({
    request_SubjectCode:'',
    request_SubjectDescription:'',
    request_YearIncomplete:'',
    request_SemesterIncomplete:'',
    request_Reason:'',
    request_Grade:'',
    request_Status:'',

    request_StudentId:'',
    request_StudentFullName:'',
    request_StudentNumber:'',
    request_StudentCourseYearAndSetion:'',

    request_InstructorId:'',
    request_InstructorName:'',

    request_StudentSignature:'',
    request_InstructorSignature:'',
    request_OfficeSignature:'',

    request_DateRequested:'',
    request_DateApprovedOrDenied:'',
    request_DateSubmitted:'',
    request_DateProcessed:'',
});