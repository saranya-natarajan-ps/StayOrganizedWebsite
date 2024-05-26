"use strict";
let userstate = false;
let passwordstate = false;

window.onload = function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
    const addUserBtn = document.getElementById("addUserBtn");
    addUserBtn.onclick = addUser;
    //return false;
}

/*function validateName(){
    const uname = document.getElementById("name");
    const isValidName = document.getElementById("isValidName");

    if (uname.value != ""){
        isValidName.innerHTML = "Valid Name";
    }else{
        isValidName.innerHTML = "Please fill name";
    }
}*/

//created async fuction to await a promise
async function usernameValidation() {
    const availabilityDiv = document.getElementById("availabilityDiv");
    console.log("validating username");
    const userName = document.getElementById("userName");
    console.log(userName.value);
    const json = await getUser(userName.value);
    console.log(json);

    if (json.available) {
        //confirmation message
        availabilityDiv.innerHTML = "User name available";
        console.log("available");
        userstate = true;
        return true;
    } else {
        //confirmation message for password mismatch
        availabilityDiv.innerHTML = "User Name already in use, please use a different one";
        console.log("unavailable");
        userstate = false;
        //window.alert();
        return false;
    }
}

//function to return username avaiability
async function getUser(userId) {
    return fetch("http://localhost:8083/api/username_available/" + userId)
        .then((response) => response.json())
        .then((responseJson) => { return responseJson });
}

function passwordValidation() {
    console.log("validating password")
    const passwordF = document.getElementById("password");
    const confirmPasswordF = document.getElementById("confirmPassword");
    const passwordmatchDiv = document.getElementById("passwordmatchDiv");
    if (passwordF.value == "" || confirmPasswordF == ""){
        passwordmatchDiv.innerHTML = " ";
        passwordstate = false;
        return false;
    }
    if (passwordF.value == confirmPasswordF.value) {
        passwordmatchDiv.innerHTML = "Password Matches";
        passwordstate = true;
        return true;
    } else {
        console.log("I am in pwd false")
        passwordmatchDiv.innerHTML = "Password and Confirm Password does not match";
        passwordstate = false;
        return false;
    }
}

//function add user
function addUser() {
    console.log(userstate, passwordstate)
    let finalstate = false;
    if (userstate && passwordstate) {
        finalstate = true;
    }
    //construct body
    if (finalstate) {
        let userBody = {
            id: "",
            name: document.getElementById("name").value,
            username: document.getElementById("userName").value,
            password: document.getElementById("password").value
        }
        //create a post request
        fetch("http://localhost:8083/api/users", {
            method: "POST",
            body: JSON.stringify(userBody),
            headers: {
                "Content-type":
                    "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(data => {
            });
            window.alert("User added successfully");
    } else {
        window.alert("Issue in either username or password");
    }
}