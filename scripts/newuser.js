"use strict";

window.onload = function(){
    //get add user button and call checkPage onclick
    const addUserBtn = document.getElementById("addUserBtn");
    addUserBtn.onclick = checkPage;
}

//created async fuction to await a promise
async function checkPage(){
    //get user name from window
    const userName = document.getElementById("userName");
    //check if username is available to use
    const json = await getUser(userName.value);
    const availabilityDiv = document.getElementById("availabilityDiv");
    const passwordmatchDiv = document.getElementById("passwordmatchDiv");
    if (json.available){
        //confirmation message
        availabilityDiv.innerHTML = "User Name Available";
        //check if passwords matches
        let passwordMatch = doesPasswordsMatch();
        console.log(passwordMatch);
        if (passwordMatch){
            passwordmatchDiv.innerHTML = " ";
            //call add user function if user name is available and passwords matches
            addUser();
        }
        else{
            //confirmation message for password mismatch
            passwordmatchDiv.innerHTML = "Password and Confirm Password does not match";
        }
    }
    else{
        //confirmation message for username unavailable
        availabilityDiv.innerHTML = "User Name already in use, please use a different one";
    }
}

//function to return username avaiability
async function getUser(userId){
    return fetch("http://localhost:8083/api/username_available/"+userId)
        .then((response)=>response.json())
        .then((responseJson)=>{return responseJson});
}

//fucntion to check if password matches
function doesPasswordsMatch(){
    //get password and confirm password values
    const passwordF = document.getElementById("password");
    const confirmPasswordF = document.getElementById("confirmPassword");
    let password = passwordF.value;
    let confirmPassword = confirmPasswordF.value;
    //check if passwords matches and return boolean
    if (password == confirmPassword){
        return true;
    }
    else{
        return false;
    }
}

//function add user
function addUser(){
    //construct body
    let userBody = {
        id : "",
        name : document.getElementById("name").value,
        username : document.getElementById("userName").value,
        password : document.getElementById("password").value
    }
    //create a post request
    fetch("http://localhost:8083/api/users", {
        method : "POST",
        body : JSON.stringify(userBody),
        headers: {"Content-type": 
              "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(data => {
        //redirect to user-todos page
        location.replace("user-todos.html");
    });
}