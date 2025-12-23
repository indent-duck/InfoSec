import { useState } from 'react';
import Sublist from "./AllSubmitList";

const Submit = () => {
    const [Submit, setSubmit] = useState([
        { Id: '1', EnMess: '555tuna', Date: '2025-12-2025', Action: 'View' },
        { Id: '2', EnMess: '666tuna', Date: '2025-12-2025', Action: 'View' },
        { Id: '3', EnMess: '777tuna', Date: '2025-12-2025', Action: 'View' },
        { Id: '4', EnMess: '888tuna', Date: '2025-12-2025', Action: 'View' },
        { Id: '5', EnMess: '999tuna', Date: '2025-12-2025', Action: 'View' },
    ]);


    return (
        <div>
            <Sublist Sublist={Submit}/>
        </div>
    );
}   

export default Submit;