import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

document.getElementById('SignUpForm').addEventListener('submit',(event)=>{signup(event);});
document.getElementById('closeBtn').addEventListener('click',()=>{CloseWarning();});

function signup(event)
{
    event.preventDefault();
    const emailTxt = document.getElementById("emailInput").value;
    const passwordTxt = document.getElementById("passwordInput").value;
    if(ValidatePassword(passwordTxt))
    {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, emailTxt, passwordTxt)
        .then((userCredential) => 
        {
            WarnUser("Account created successfully, please sign in now.");
        })
        .catch((error) => 
        {
          if(error.code === 'auth/email-already-in-use')
          {
            WarnUser("E-mail Already In Use, Try Signing In Instead");
          }
          else if(error.code === 'auth/too-many-requests')
          {
            WarnUser("We are experiencing high traffic now. Please try later");
          }
          else
          {
            console.log(error.code);
          }
        });
    }
    else
    {
      WarnUser();
    }
}
function ValidatePassword(password)
{
  if(password.length > 6) 
  {
      return true;
  } 
  else 
  {
      return false;
  }
}
function WarnUser(warning = "Password length must be more than 6 letters")
{
  
  const warningDialog = document.getElementById("warning");
  document.getElementById("warningTxt").innerHTML = warning;
  warningDialog.style.width = "50vw";
  warningDialog.style.padding = "5px 5px";
  warningDialog.style.top = "10px";
}
function CloseWarning()
{
  const warningDialog = document.getElementById("warning");
  warningDialog.style.width = "0px";
  warningDialog.style.padding = "0px";
  warningDialog.style.top = "-50px";
}