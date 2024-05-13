"use strict";

window.onload = function(){
    //search for cid
    const urlParams = new URLSearchParams(location.search);
    let cid = -1;
    //get cid and call get todo task function
    if (urlParams.has("cid") === true)
    {
        cid = urlParams.get("cid")
        getTodo(cid);
    }
}
//get todo task details
function getTodo(cid){
    //create a get request
    fetch("http://localhost:8083/api/todos/" + cid)
        .then(response => response.json())
        .then(todo => {
            //get div and add elements to <p> tag
            const container = document.getElementById("displayTodoDiv");

            const categoryP = document.createElement('p');
            categoryP.textContent = `Category: ${todo.category}`;
            container.appendChild(categoryP);

            const desriptionP = document.createElement('p');
            desriptionP.textContent = `Course Number: ${todo.description}`;
            container.appendChild(desriptionP);

            const deadlineP = document.createElement('p');
            deadlineP.textContent = `Course Name: ${todo.deadline}`;
            container.appendChild(deadlineP);

            const priorityP = document.createElement('p');
            priorityP.textContent = `Instructor: ${todo.priority}`;
            container.appendChild(priorityP);

            const completedP = document.createElement('p');
            const img = document.createElement('img');
            //add image instead of true or false
            if (todo.completed){
                img.setAttribute("src","images/greentick-new.png")
            }
            else{
                img.setAttribute("src","images/redx.png")
            }
            img.setAttribute("height","20px")
            completedP.textContent = `Completed:`;
            completedP.appendChild(img);
            container.appendChild(completedP);
        })

}