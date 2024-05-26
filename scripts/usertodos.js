"use strict";
localStorage.setItem("deletedTask", "");
//Fetch users from /api/users and display it in select options
window.onload = function () {
    //get userList
    const userList = document.getElementById("userList");
    //add select user option
    let selectOption = new Option("Select User", "Select");
    userList.appendChild(selectOption);
    //fetch user from api and add to options
    fetch("http://localhost:8083/api/users")
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                let userOption = new Option(data[i].name, data[i].id);
                userList.appendChild(userOption);
            }
        });
    //call show todo function when user name is changed
    userList.onchange = showUserTodos;
}

//Fetch user todos from /api/todos and display user todos in table format
function showUserTodos() {
    //get userid
    const userList = document.getElementById("userList");
    let userId = userList.value;
    //select.options[select.selectedIndex].text
    let userName = userList.options[userList.selectedIndex].text
    console.log(userName)
    //get todo table
    const todoTable = document.getElementById("todoTable");


    let todoUser = document.getElementById("todoUser");
    todoUser.innerHTML = "Task List for: " + userName;
    let thead = todoTable.insertRow(-1);
    let cell1 = thead.insertCell(0);
    let cell2 = thead.insertCell(1);
    let cell3 = thead.insertCell(2);
    let cell4 = thead.insertCell(3);

    cell1.innerHTML = "DESCRIPTION";
    cell1.style = "font-weight:bold";
    cell2.innerHTML = "DEADLINE";
    cell2.style = "font-weight:bold";
    cell3.innerHTML = "DETAILS";
    cell3.style = "font-weight:bold";
    cell4.innerHTML = "DELETE";
    cell4.style = "font-weight:bold";
    //Clear table
    clearTable();

    //fetch data from todo api

    fetch("http://localhost:8083/api/todos")
        .then(response => response.json())
        .then(data => {
            let skip = false;
            let localValue = localStorage.getItem("deletedTask");
            console.log(localValue);
            let localArray = localValue.split(",");
            console.log(localArray)
            for (let i = 0; i < data.length; i++) {
                skip = false;
                console.log("length" + localArray.length)
                //if(skip){continue;}
                if (data[i].userid == userId) {
                    if (localArray.length >= 1) {
                        for (let al = 0; al < localArray.length; al++) {
                            if (parseInt(data[i].id) == parseInt(localArray[al])) {
                                console.log(data[i].id, localArray[al]);
                                //console.log("I am inside")
                                skip = true;
                            }
                        }
                    }
                    if(skip){continue;}
                    console.log(data[i].id)
                    let row = todoTable.insertRow(-1);
                    let cell1 = row.insertCell(0);
                    let cell2 = row.insertCell(1);

                    cell1.innerHTML = data[i].description;
                    cell2.innerHTML = data[i].deadline;

                    const detailsCell = row.insertCell();
                    let detailBtn = document.createElement("input");
                    detailBtn.type = "button";
                    detailBtn.value = "Show Detail";
                    detailBtn.name = "showDetails";
                    detailBtn.id = "btn" + data[i].id;
                    detailBtn.className = "btn btn-primary"
                    detailBtn.setAttribute("onclick", "showDetail(" + data[i].id + ")");
                    detailBtn.setAttribute("popovertarget", "popovercontent")
                    detailBtn.setAttribute("data-bs-toggle", "popover");
                    //detailBtn.setAttribute("data-bs-placement","top");

                    detailBtn.title = "Task Details";
                    detailsCell.appendChild(detailBtn);

                    const deleteCell = row.insertCell();
                    let deleteBtn = document.createElement("img");
                    //deleteBtn.type = "button";
                    deleteBtn.id = "del" + data[i].id;
                    deleteBtn.setAttribute("height", "20px");
                    deleteBtn.setAttribute("align", "center")
                    deleteBtn.src = "images/trash3-fill.svg"
                    deleteBtn.setAttribute("onclick", "deleteTask(" + data[i].id + ")");
                    deleteCell.appendChild(deleteBtn);

                }
            }
        });
}

function showDetail(cid) {
    const container = document.getElementById("popovercontent");
    container.innerHTML = " ";
    fetch("http://localhost:8083/api/todos/" + cid)
        .then(response => response.json())
        .then(todo => {
            //get div and add elements to <p> tag
            /*const idP = document.createElement('p');
            idP.textContent = `TaskID: ${cid}`;
            console.log(idP);
            container.appendChild(idP);*/

            const headerP = document.createElement('p');
            headerP.textContent = "Task Details";
            headerP.setAttribute("style","font-weight:bold");
            container.appendChild(headerP);

            const categoryP = document.createElement('p');
            categoryP.textContent = `Category: ${todo.category}`;
            console.log(categoryP);
            container.appendChild(categoryP);

            const desriptionP = document.createElement('p');
            desriptionP.textContent = `Description: ${todo.description}`;
            container.appendChild(desriptionP);


            const deadlineP = document.createElement('p');
            deadlineP.textContent = `Deadline: ${todo.deadline}`;
            container.appendChild(deadlineP);

            const priorityP = document.createElement('p');
            priorityP.textContent = `Priority: ${todo.priority}`;
            container.appendChild(priorityP);

            const completedP = document.createElement('p');
            const img = document.createElement('img');
            //add image instead of true or false
            if (todo.completed) {
                img.setAttribute("src", "images/greentick-new.png")
            }
            else {
                img.setAttribute("src", "images/redx.png")
            }
            img.setAttribute("height", "20px")
            completedP.textContent = `Completed:`;
            completedP.appendChild(img);
            container.appendChild(completedP);
            container.className = "p-4 text-secondary border-secondary border-2";
            container.style = "border-radius: 50px 20px";
        });
}

//function
//clear table function
function clearTable() {
    const todoTable = document.getElementById("todoTable");
    let tableLength = todoTable.rows.length;
    while (tableLength > 1) {
        todoTable.deleteRow(1);
        tableLength = todoTable.rows.length;
    }
    let todoUser = document.getElementById("todoUser");
    todoUser.innerHTML = " ";
}

function deleteTask(cid) {
    if (window.confirm("Do you want to delete this task?")) {
        let localValue = localStorage.getItem("deletedTask");
        if (localValue == "") {
            localValue = cid;
        } else {
            localValue = localValue + "," + cid;
        }
        console.log(localValue);
        localStorage.setItem("deletedTask", localValue)
        window.alert("Task Deleted");
        console.log(localStorage);
        const userList = document.getElementById("userList");
        userList.value = "Select"
        clearTable()
    }
}