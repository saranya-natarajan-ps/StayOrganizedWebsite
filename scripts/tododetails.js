"use strict";

window.onload = function(){
    
    const urlParams = new URLSearchParams(location.search);
    let cid = -1;
    if (urlParams.has("cid") === true)
    {
        cid = urlParams.get("cid")
        getTodo(cid);
    }
}

function getTodo(cid){
    fetch("http://localhost:8083/api/todos/" + cid)
        .then(response => response.json())
        .then(todo => {
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