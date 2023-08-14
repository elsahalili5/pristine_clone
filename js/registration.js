const valid_reg_ex = /^[A-Za-z]+$/;
const email_regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function registerUser() {
  var email = document.getElementById("email").value;

  var pass = document.getElementById("pwd").value;
  var userName = document.getElementById("username").value;
  var lastName = document.getElementById("lName").value;
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.find((user) => user.email === email)) {
    document.getElementById("result-p").innerHTML = "Email is already in use.";
    document.getElementById("result").style.visibility = "visible";
    return false;
  }

  users.push({
    username: userName,
    lastname: lastName,
    email: email,
    password: pass,
  });
}

function submitRegisterForm() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  var email = document.getElementById("email").value;

  if (document.Formfill.FirstName.value === "") {
    document.getElementById("result-p").innerHTML = "Enter First Name*";
    document.getElementById("result").style.visibility = "visible";

    return false;
  } else if (!document.Formfill.Email.value.match(email_regex)) {
    document.getElementById("result-p").innerHTML = "Enter a valid email*";
    document.getElementById("result").style.visibility = "visible";

    return false;
  } else if (users.find((user) => user.email == email)) {
    document.getElementById("result-p").innerHTML = "Email is already in use.";
    document.getElementById("result").style.visibility = "visible";

    return false;
  } else if (document.Formfill.Password.value === "") {
    document.getElementById("result-p").innerHTML = "Enter your Password*";
    document.getElementById("result").style.visibility = "visible";

    return false;
  } else if (document.Formfill.Password.value.length < 6) {
    document.getElementById("result-p").innerHTML = " Password must be at least 6-digits*";
    document.getElementById("result").style.visibility = "visible";

    return false;
  } else {
    document.getElementById("result-p").innerHTML = "";
    document.getElementById("result").style.visibility = "hidden";
    registerUser();

    return true;
  }
}
