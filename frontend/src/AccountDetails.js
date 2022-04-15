import react from 'react'
import { useNavigate } from 'react-router-dom';

function AccountDetails(){
    const navigate = useNavigate();

    return (
        <div>
          <head>
          <title>BULACAN STATE UNIVERSITY | LOGIN</title>
          <link rel="icon" href="https://bit.ly/3rmsS90"/>
          <link rel="stylesheet" href="style.css"/>
          </head>

    <body>
          <img src="https://bit.ly/3EgPvkD" id="logreg-design"/>
    <div className="logreg-index">
        <div className="logo-name-icon">
            <img src="https://bit.ly/3rmsS90" id="bulsu-logo"/>
            <h3 id="site-name">BULACAN STATE UNIVERSITY</h3>
        </div>
        <div className="logreg-body">
            <div className="logreg-form">
                <form id="login-form" className="input-group">
                <h3 id="logreg-label">Create An Account</h3>
                    <label>Account Type</label>
                    <input type="text" placeholder="Account Type" className="reg-input-field" required/>
                    
                    <table>
                        <tr>
                            <th>Last Name</th>
                            <th>First Name</th>
                            <th> M.I </th>
                        </tr>
                        <td><input type="text" placeholder="Last Name" className="name-input-field" required/></td>
                        <td><input type="text" placeholder="First Name" className="name-input-field" required/></td>
                        <td><input type="text" placeholder="M. I " className="name-input-field" required/></td>

                    </table>
                    <label>Contact Number</label>
                    <input type="text" placeholder="Contact Number" className="reg-input-field" required/>
                    <label>Birthdate</label>
                    <input type="text" placeholder="Birthdate" className="reg-input-field" required/>
                    <input type="Checkbox" className="check-box"/><span> I have read the terms and conditions.</span>
                    <button type="submit" id="btn-submit">PROCEED</button>
                </form>
                <form id="register-form" className="input-group">
                    <h3 id="logreg-label">Create An Account</h3>
                    <label>Account Type</label>
                    <input type="text" placeholder="Account Type" className="reg-input-field" required/>

                </form>
        
         </div>
       </div>
    </div>
    </body>
</div>
  


    )
}
export default AccountDetails