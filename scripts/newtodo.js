"use strict";

window.onload = function(){
    //get userList
    const userList = document.getElementById("userList");
    //add select user option
    let selectUser = new Option("Select User","Selectuser");
    userList.appendChild(selectUser);
    //fetch user from api and add to options
    fetch("http://localhost:8083/api/users")
    .then(response => response.json())
    .then(data => {
        for (let i=0; i<data.length; i++){
            let userOption = new Option(data[i].name,data[i].id);
            userList.appendChild(userOption);
        }
    });

    //fetch catefory from api and add to options
    const categoryList = document.getElementById("categoryList");
    //add select Category option
    let selectCategory = new Option("Select Categoty","Selectcat");
    categoryList.appendChild(selectCategory);

    fetch("http://localhost:8083/api/categories")
    .then(response => response.json())
    .then(category => {
        for (let i=0; i<category.length; i++){
            let categoryOption = new Option(category[i].name,category[i].name);
            categoryList.appendChild(categoryOption);
        }
    });

    const addTodoBtn = document.getElementById("addTodoBtn");
    addTodoBtn.onclick = addNewTodo;
}

function addNewTodo(){
     
    let todoData = {
        id : "",
        userid : document.getElementById("userList").value,
        category: document.getElementById("categoryList").value,
        description: document.getElementById("description").value,
        deadline: document.getElementById("deadline").value,
        priority: document.getElementById("priority").value,
        completed: ""
    }
    console.log(todoData);
    fetch("http://localhost:8083/api/todos", {
        method: "POST",
        body: JSON.stringify(todoData),
        headers: {"Content-type": 
              "application/json; charset=UTF-8"}
    })
        .then(response => response.json())
        .then(json => {
            let message = "Todo ID " +json.id+ " with  " +todoData.category+" added successfully!";
            let confirmation = document.getElementById("addedConfirmation");
            confirmation.innerHTML = message;
        });

    
}