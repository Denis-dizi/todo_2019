console.log("Started ToDo app.");           //W4D4 created
//app holds our global state
const app = {
    jobId : 0,
    mybtn : document.querySelector("#btn1"),
    todoCont : document.querySelector("#todos-cont")
} 
main();


function main() {                           //W4D4 (1:15:)


    //we create an event handler for add button
    app.mybtn.onclick = (event) => {               //W4D4 (:34:)
        console.log("You pressed ADD btn");
        const inputField = document.querySelector("#myinput");
        console.log("Input value is: " + inputField.value);

        //Add new ToDo: Create NewEl-->DabutSaturs->PieliktBernu  //W4D4 (:40:)
       
        
        addTodo(app.todoCont, inputField.value);
    }
}

 function addTodo(parent, value) {           //W4D4 (:53:)
    //Create New Todo
    const newTodo = document.createElement("div");//W4D4 (1:13:);updated:(1:23:);
    newTodo.classList.add("job-cont-"+app.jobId);
    newTodo.innerHTML = `                      
        <input type="checkbox" name="" id="j-chk-${app.jobId}">
        <span class="job-desc" id="j-desc-${app.jobId}"></span>
        <button class="del-btn" id="j-del-${app.jobId}">DELETE</button>
        `;
    //newTodo only has one span
    const jdesc = newTodo.querySelector("span");
    jdesc.innerText = value;

    parent.appendChild(newTodo);

    


    //TODO move updating to separate function
    app.jobId++;
    //add Handlers
    //ToDo
}

