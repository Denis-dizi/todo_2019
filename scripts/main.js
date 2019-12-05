console.log("Started ToDo app.");           //W4D4 created, W4D5
//app holds our global state
const app = {
    jobId : 0,
    mybtn : document.querySelector("#btn1"),
    todoCont : document.querySelector("#todos-cont"),
    getBtn : document.querySelector("#btn0"),    //W4D4 (2:27:)
    jobsUrl : "https://jsonplaceholder.typicode.com/todos",
    inputField : document.querySelector("#myinput")    //W4D5 (:28:)
};
main();

function main() {                           //W4D4 (1:15:)
    //we create an event handler for add button
    app.mybtn.onclick = (event) => {               //W4D4 (:34:)
        console.log("You pressed ADD btn");
        console.log("Input value is: " + app.inputField.value);

        //Add new ToDo: Create NewEl-->DabutSaturs->PieliktBernu  //W4D4 (:40:)
        addTodo(app.todoCont, app.inputField.value);
    }

    //app.inputField.onchange this will fire on any commitment
    //meaning click outside, enter key, click on button outside etc
    //so we will use specific keyboard event

    app.inputField.onkeydown = function(event) {         //W4D5 (:45:)
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
          // Cancel the default action, if needed
          console.log("You pressed Enter");
          event.preventDefault();
          // Trigger the button element with a click
          app.mybtn.click();
        }
      }; 

    app.getBtn.onclick = () => {                //W4D4 (2:27:)
        console.log("You pressed get Jobs btn");
        fetch(app.jobsUrl)
            .then(response => response.json())
            .then(json => addJobs(json))
    }


}

function addJobs(json) {                        //W4D4 (2:34:)
    console.log("Ready to add " + json.length + " jobs");

    console.log("Adding",json[0]);


    //create a loop to add first 20 jobs, can remove && i < 20 when done testing
    for (let i=0; i < json.length && i<20; i++) {                  //W4D4 (2:46:)
        addTodo(app.todoCont, json[i].title);
    }

}


 function addTodo(parent, value) {             //W4D4 (:53:)
    //Create New Todo
    const newTodo = document.createElement("div");//W4D4 (1:13:);updated:(1:23:);
    newTodo.classList.add("job-cont-"+app.jobId);
    //using backticks for some string interpolation
    newTodo.innerHTML = `                      
        <input type="checkbox" name="" id="j-chk-${app.jobId}">
        <label class="job-desc" id="j-desc-${app.jobId}"></label>
        <button class="del-btn" id="j-del-${app.jobId}">DELETE</button>
        `;
    //newTodo only has one label

    //value could be malicious so we only use innerText not innerHTML!!!
    const jdesc = newTodo.querySelector("label");
    jdesc.innerText = value;

    parent.appendChild(newTodo);

    const delBtn = newTodo.querySelector(".del-btn");//W4D4 (1:37:)
    
    delBtn.onclick = function(event) {
        console.log("removing parent of element with id "+this.id);
        
        //if we use arrow func. this won't be available for button  //1.v. W4D4 (1:37:)
        //this.parentElement.remove();

        //careful with event if possible bubbling   //2.v. W4D4 (1:45:)
        event.target.parentElement.remove();

        //third way would be get id of the element  //3.v. W4D4 (1:46:)
        //parse that id and use that id to get needed element
        //such as .job-cont-myid
    }

    const chkBox = newTodo.querySelector('[type="checkbox"]');  //W4D4 (1:58:)

    chkBox.onclick = function(event) {                //W4D4 (1:58:)
        
        //const jDesc = event.target.nextElementSibling;//W4D4 (2:15:)
        
        //tricker alternative using id and spliting our id
        const id = event.target.id.split("-")[2];   //W4D4 (2:16:)
        const descId = "#j-desc-"+id;
        const jDesc = document.querySelector(descId);
        
        if (event.target.checked) {
             //console.log("nextSibling "+event.target.nextSibling.id);
             jDesc.style.textDecoration = "line-through";
         }else{
             jDesc.style.textDecoration = "none";
         }

    }

    //TODO move updating to separate function
    app.jobId++;

    //add Handlers
    //ToDo
}




/* rezerve: delete 1.variants.
const delBtn = newTodo.querySelector(".del-btn");//W4D4 (1:37:)
    delBtn.onclick = function() {
        console.log("removing parent of element with id "+this.id);
        this.parentElement.remove();
    
    
    
app.inputField.onchange = () => {
    console.log("New input is:  " + app.inputField.value);
}
    
    
    
    
    
    }*/