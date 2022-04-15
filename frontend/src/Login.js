import react from 'react'
import { useNavigate } from 'react-router-dom';

function Login(){
    const navigate = useNavigate();

    function signup(){

        navigate("/accountdetails")
      }
    var logbtn = document.getElementById("log-btn");
        var regbtn = document.getElementById("reg-btn");
        var x = document.getElementById("login-form");
        var y = document.getElementById("register-form");
        var z = document.getElementById("btn");

        function logingin(){
            x.style.display = "block";
            y.style.diplay = "none";
            z.style.left = "0"
            logbtn.style.color = "white";
            regbtn.style.color = "black";
            var displaySetting = y.style.display;
            if (displaySetting == 'block'){
                y.style.display = "none";
            } 
        }
        function register(){
            y.style.display = "block";
            x.style.display = "none";
            z.style.left = "50%"
            logbtn.style.color = "black";
            regbtn.style.color = "white";
        }

  return(
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
            <div className="btn-box">
                <div id="btn"></div>
                <button type="button" className="toggle-btn" id="log-btn" onClick={logingin}>LOGIN</button>
                <button type="button" className="toggle-btn" id="reg-btn" onClick={register}>REGISTER</button>
            </div>
            <div className="logreg-form">
                <form id="login-form" className="input-group">
                    <h3 id="logreg-label">Log In</h3>
                    <label>Email</label>
                    <input type="text" placeholder="Email" className="input-field" required/>
                    <label>Password</label>
                    <input type="Password"id="pass-input" placeholder="Password" className="input-field" required/>
                    <a href="#" id="forgot-pass">Forgot Password?</a>
                    <button type="submit" id="btn-submit">SIGN IN</button>
                    <div className="separator-logreg">OR LOGIN USING</div>
                    <div className="social-logreg">
                        <img src="https://bit.ly/3rn9ed6" id="google-account"/>
                        <img src="https://bit.ly/3vfdU61" id="ms-account"/>
                    </div>
                </form>
                <form id="register-form" className="input-group">
                    <h3 id="logreg-label">Create An Account</h3>
                    <label>Email</label>
                    <input type="text" placeholder="Email" className="input-field" required/>
                    <label>Password</label>
                    <input type="Password" placeholder="Password" className="input-field" required/>
                    <input type="Checkbox" class="check-box"/><span> I have read the terms and conditions.</span>
                    <button onClick ={signup} type="submit" id="btn-submit">SIGN UP</button>
                    <div class="separator-logreg">OR SIGN uUP USING</div>
                    <div class="social-logreg">
                        <img src="https://bit.ly/3rn9ed6" id="google-account"/>
                        <img src="https://bit.ly/3vfdU61" id="ms-account"/>
                    </div>
                </form>
        
         </div>
       </div>
    </div>
    </body>
</div>
  
  )
  }
  export default Login