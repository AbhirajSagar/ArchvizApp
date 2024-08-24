import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

document.getElementById('SignUpForm').addEventListener('submit',(event)=>{signin(event);});
document.getElementById('closeBtn').addEventListener('click',()=>{CloseWarning();});

function signin(event)
{
    event.preventDefault();
    const emailTxt = document.getElementById("emailInput").value;
    const passwordTxt = document.getElementById("passwordInput").value;
    if(ValidatePassword(passwordTxt))
    {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, emailTxt, passwordTxt)
        .then((userCredential) => 
        {
            window.location.href = "./Editor.html";
        })
        .catch((error) => 
        {
          if(error.code === 'auth/invalid-credential')
          {
             WarnUser("Invalid Credentials");
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
      WarnUser("Invalid Credentials");
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