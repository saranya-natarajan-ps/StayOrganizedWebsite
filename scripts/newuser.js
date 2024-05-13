"use strict";
window.onload = function(){
    const addUserBtn = document.getElementById("addUserBtn");
    addUserBtn.onclick = checkPage;
}

async function checkPage(){
    const userName = document.getElementById("userName");
    const json = await getUser(userName.value);
    const availabilityDiv = document.getElementById("availabilityDiv");
    const passwordmatchDiv = document.getElementById("passwordmatchDiv");
    if (json.available){
        availabilityDiv.innerHTML = "User Name Available";
        let passwordMatch = doesPasswordsMatch();
        console.log(passwordMatch);
        if (passwordMatch){
            passwordmatchDiv.innerHTML = " ";
            addUser();
        }
        else{
            passwordmatchDiv.innerHTML = "Password and Confirm Password does not match";
        }
    }
    else{
        availabilityDiv.innerHTML = "User Name already in use, please use a different one";
    }
}
async function getUser(userId){
    return fetch("http://localhost:8083/api/username_available/"+userId)
        .then((response)=>response.json())
        .then((responseJson)=>{return responseJson});
}

function doesPasswordsMatch(){
    //window.alert("I am in");
    const passwordF = document.getElementById("password");
    const confirmPasswordF = document.getElementById("confirmPassword");
    let password = passwordF.value;
    let confirmPassword = confirmPasswordF.value;
    console.log(password);
    console.log(confirmPassword);
    //const passwordmatchDiv = document.getElementById("passwordmatchDiv");
    if (password == confirmPassword){
        //passwordmatchDiv.innerHTML="";
        return true;
    }
    else{
        //passwordmatchDiv.innerHTML="Password and Confirm Password does not match";
        return false;
    }
}

function addUser(){
    window.alert("I am in");
    let userBody = {
        id : "",
        name : document.getElementById("name").value,
        username : document.getElementById("userName").value,
        password : document.getElementById("password").value
    }
    fetch("http://localhost:8083/api/users", {
        method : "POST",
        body : JSON.stringify(userBody),
        headers: {"Content-type": 
              "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(data => {
        location.replace("user-todos.html");
    });
}