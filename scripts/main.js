console.log("Started ToDo app.");           //W4D4 created

const mybtn = document.querySelector("#btn1");

//we create an event handler for add button
mybtn.onclick = (event) => {               //W4D4 (:34:)
    console.log("You pressed ADD btn");
    const inputField = document.querySelector("#myinput");
    console.log("Input value is: " + inputField.value);

    //Add new ToDo: Create NewEl-->DabutSaturs->PieliktBernu
    const newTodo = document.createElement("div");           //W4D4 (:40:)
    newTodo.innerText = inputField.value;
    const todoCont = document.querySelector("#todos-cont");
    todoCont.appendChild(newTodo);
}