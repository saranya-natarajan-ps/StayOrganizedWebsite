"use strict";

//Fetch users from /api/users and display it in select options
window.onload = function() {
    //get userList
    const userList = document.getElementById("userList");
    //add select user option
    let selectOption = new Option("Select User","Select");
    userList.appendChild(selectOption);
    //fetch user from api and add to options
    fetch("http://localhost:8083/api/users")
    .then(response => response.json())
    .then(data => {
        for (let i=0; i<data.length; i++){
            let userOption = new Option(data[i].name,data[i].id);
            userList.appendChild(userOption);
        }
    });
    //call show todo function when user name is changed
    userList.onchange = showUserTodos;
}

//Fetch user todos from /api/todos and display user todos in table format
function showUserTodos(){
    //get userid
    const userList = document.getElementById("userList");
    let userId = userList.value;
    //get todo table
    const todoTable = document.getElementById("todoTable");
    //const todoBody = todoTable.;

    //Clear table
    clearTable();
    
    //fetch data from todo api
    fetch("http://localhost:8083/api/todos")
    .then(response => response.json())
    .then(data => {
        for (let i=0; i<data.length; i++){
            //window.alert(userId+" "+data[i].userid)
            if (data[i].userid == userId) {
                let row = todoTable.insertRow(-1);
                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);
                let cell3 = row.insertCell(2);
                let cell4 = row.insertCell(3);
                let cell5 = row.insertCell(4);

                cell1.innerHTML = data[i].category;
                cell2.innerHTML = data[i].description;
                cell3.innerHTML = data[i].deadline;
                cell4.innerHTML = data[i].priority;

                let completeImg = document.createElement("img");
                completeImg.style.height ="20px";
                if (data[i].completed){
                    completeImg.src = "images/greentick-new.png";
                }
                else{
                    completeImg.src = "images/redx.png";
                }
                cell5.appendChild(completeImg);
            }
        }
    });
}

function clearTable(){
    const todoTable = document.getElementById("todoTable");
    let tableLength = todoTable.rows.length;
    while (tableLength>1){
        todoTable.deleteRow(1);
        tableLength = todoTable.rows.length;
    }
}