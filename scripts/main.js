console.log("Started ToDo app.");           //W4D4 created
main();

function main() {                           //W4D4 (1:15:)
    const app = {
        lastId : 0,
        mybtn : document.querySelector("#btn1"),
        todoCont : document.querySelector("#todos-cont")
    } 

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
    const newTodo = document.createElement("div");//W4D4 (1:13:)         
    newTodo.innerHTML = `                      
        <input type="checkbox" name="" id="j-chk-1">
        <span class="job-desc" id="j-desc-1">Buy Milk</span>
        <button class="del-btn" id="j-del-1">DELETE</button>
        `;
    parent.appendChild(newTodo);
}

