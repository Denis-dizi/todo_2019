console.log("Started ToDo app.");           //W4D4 created

const mybtn = document.querySelector("#btn1");

//we create an event handler for add button
mybtn.onclick = (event) => {               //W4D4 (:34:)
    console.log("You pressed ADD btn");
    const inputField = document.querySelector("#myinput");
    console.log("Input value is: " + inputField.value);


}