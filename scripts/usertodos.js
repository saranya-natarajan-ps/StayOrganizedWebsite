"use strict";

//Fetch users from /api/users and display it in select options
window.onload = function() {
    const userList = document.getElementById("userList");
    let selectOption = new Option("Select User","Select");
    userList.appendChild(selectOption);
    fetch("http://localhost:8083/api/users")
    .then(response => response.json())
    .then(data => {
        for (let i=0; i<data.length; i++){
            let userOption = new Option(data[i].name,data[i].id);
            userList.appendChild(userOption);
        }
    });
    userList.onchange = showUserTodos;
}

//Fetch user todos from /api/todos and display user todos in table format
function showUserTodos(){
    const userList = document.getElementById("userList");
    let userId = userList.value;
    //window.alert(userId);
}