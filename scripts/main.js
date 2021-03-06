console.log("Started ToDo app.");          //W4D4(:23:) created, W4D5

//=========W4D4(:33:) 1-st step. Started to write JS==================================
// const mybtn = document.querySelector("#btn1")
// //we create an event handler for add button
// mybtn.onclick = (event) => {                                  //W4D4 (:34:)
//     console.log("You pressed ADD btn");
//     const inputField = document.querySelector("#myinput");
//     console.log("Input value is: " + app.inputField.value);

//  //=========W4D4(:38:) 2-nd step. Add child========================================
//     //Add new ToDo: Create NewEl-->DabutSaturs->PieliktBernu  //W4D4 (:40:)
//     const newTodo = document.createElement("div");
//     newTodo.innerText = inputField.value; // pievienot saturs
//     const todoCont = document.querySelector("#todos-cont");
//     todoCont.appendChild(newTodo);
// }
//refactored to "function addTodo()" at W4D4(:50:)
//====================================================================================

//====app holds our global state======================================================
const app = {                                                     //W4D4 (1:29:)
    jobId : 0,                                                    //W4D4 (1:17:)(1:25:)
    mybtn : document.querySelector("#btn1"),                      //W4D4 (:33:)(1:18:)
    todoCont : document.querySelector("#todos-cont"),             //W4D4 (:40:)(1:18:)
    getBtn : document.querySelector("#btn0"),                     //W4D4 (2:27:)
    jobsUrl : "https://jsonplaceholder.typicode.com/todos",       //W4D4 (2:30:)
    inputField : document.querySelector("#myinput"),              //W4D5 (:28:)
    clearCompletedBtn : document.querySelector("#btn-clear-completed"),//W4D5 (1:18:)
    cfg : {                                                       //W4D5 (1:05:)(08)
        maxKeyDown : 5,
        },
        currKeyDown : 0
};
//====================================================================================

main();                                                    //W4D4 (1:21:)

function main() {                                          //W4D4 (1:15:)
    //we create an event handler for add button
    app.mybtn.onclick = (event) => {                       //W4D4 (:34:)
        console.log("You pressed ADD btn");
        console.log("Input value is: " + app.inputField.value);

        //Add new ToDo: Create NewEl-->DabutSaturs->PieliktBernu  //W4D4 (:40:)
        addTodo(app.todoCont, app.inputField.value);
    }
    //====input on Enter===============================================================
    // v1. this will fire on any commitment,
    //meaning click outside, enter key, click on button outside etc  //W4D5(:43:)
    // app.inputField.onchange = (event) => {                        //W4D5(:34:)(:42:)
    //     console.log("You pressed Add");
    //     console.log("Input value is: " + app.inputField.value);
    //     addTodo(app.todoCont, app.inputField.value);
    // }
    
    // v2. so we will use specific keyboard event                   //W4D5(:43:)
    // https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
    //*.onkeyup - in the begin (you can hold btn. No timer need)
    app.inputField.onkeydown = function(event) {                    //W4D5(:45:)(48)
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            //limiting max times that onkeydown Enter will add element - timer(delay) //W4D5 (0:48:)
            // https://stackoverflow.com/questions/17514798/how-to-disable-repetitive-keydown-in-javascript //W4D5 (0:55:)
            if (app.currKeyDown >= app.cfg.maxKeyDown) return;     //W4D5 (1:05:)
            app.currKeyDown++;
            // Cancel the default action, if needSed
          console.log("You pressed Enter");
          event.preventDefault();
          // Trigger the button element with a click
          app.mybtn.click();
        }
    }
    // resets keydown limiter on key up
    app.inputField.onkeyup = (event) => {                //W4D5(:45:)(1:11:)
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            console.log("Reseting keydown count");
            app.currKeyDown = 0;
        }
    }
    //==end===========================================================================


    //====Get Jobs from outsource. Fetch example======================================
    //https://jsonplaceholder.typicode.com/             //W4D4 (2:20:)
    app.getBtn.onclick = () => {                        //W4D4 (2:27:)(2:30:)(2:33:)
        console.log("You pressed get Jobs btn");
        fetch(app.jobsUrl)
            .then(response => response.json())
            .then(json => addJobs(json))
    }
    //==end===========================================================================

    //====clear Compele===============================================================
    app.clearCompletedBtn.onclick = () => {             //W4D5 (1:16:)(20)
        console.log("clicked Complete clear btn");
        //loop through all jobs                         //W4D5 (1:22:)
        //if job is marked as completed then we press delete button
        const completedJobs = [];                       //W4D5 (1:29:)
        //we loop through all children of main jobs container
        //grab all completed jobs.
        //NOTE: we don't want tp modify a live list by removing nodes  //W4D5 (1:36:)
        //instead we save nodes to be deleted later.
        for (let todo of app.todoCont.children) {       //W4D5 (1:30:)
            const chkBox = todo.querySelector('[type="checkbox"]');
            if (chkBox.checked) {
                completedJobs.push(todo);
            }
        }
        //now we can safely delete done jobs
        for (let doneJob of completedJobs) {             //W4D5 (1:33:)
            doneJob.remove();
        }
    }
    //==end===========================================================================
}

//====Add Jobs from Get Jobs =========================================================
function addJobs(json) {                                 //W4D4 (2:34:)
    console.log("Ready to add " + json.length + " jobs");
    console.log("Adding 1-st job:",json[0]);
    //create a loop to add first 20 jobs, can remove && i < 20 when done testing
    for (let i=0; i < json.length && i<20; i++) {        //W4D4 (2:46:)(2:48:)
        addTodo(app.todoCont, json[i].title);
    }
}
//==end===============================================================================


//====Added global state, full new job ================================================
//===(pressing button adds chekbox, div, new btn. See console on W4D4(1:34:))==========

function addTodo(parent, value) {                  //W4D4 (:49:)(:53:)
    //Create New Todo
    const newTodo = document.createElement("div");  //W4D4 (:50:)(1:13:);updated:(1:23:);
    newTodo.classList.add("job-cont-"+app.jobId);   //W4D4 (1:27:)
    //using backticks for some string interpolation
    newTodo.innerHTML = `                           
        <input type="checkbox" name="" id="j-chk-${app.jobId}">
        <label class="job-desc" id="j-desc-${app.jobId}"></label>
        <button class="del-btn" id="j-del-${app.jobId}">DELETE</button>
        `;                        //W4D4(1:13:)(1:36:)copied from html; W4D5(0:24:)
            //newTodo only has one label

    //value could be malicious so we only use innerText not innerHTML!!! //W4D4 (1:50:)
    const jdesc = newTodo.querySelector("label");    //W4D4 (1:32:)
    jdesc.innerText = value;                         //W4D4 (1:33:)
    parent.appendChild(newTodo);                     //W4D4 (:49:)(:53:)
    //==end===========================================================================


    //====DELETE btn handlers=========================================================
    const delBtn = newTodo.querySelector(".del-btn");           //W4D4 (1:37:)
    delBtn.onclick = function(event) {                          //W4D4 (1:37:)
        console.log("removing parent of element with id "+this.id);
        
        //if we use arrow func. this won't be available for button  //1.v. W4D4 (1:37:)(1:48:)
        //this.parentElement.remove();      //onclickfunc without event

        //careful with event if possible bubbling               //2.v. W4D4 (1:45:)
        event.target.parentElement.remove();

        //third way would be get id of the element              //3.v. W4D4 (1:46:)
        //parse that id and use that id to get needed element
        //such as .job-cont-myid
    }
    //==end============================================================================

    //====ChekBox======================================================================
    const chkBox = newTodo.querySelector('[type="checkbox"]');  //W4D4 (1:58:)
    chkBox.onclick = function(event) {                          //W4D4 (1:58:)
        //https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling
        //const jDesc = event.target.nextElementSibling;        //W4D4 (2:15:)
        
        //tricker alternative using id and spliting our id
        const id = event.target.id.split("-")[2];               //W4D4 (2:15:)
        const descId = "#j-desc-"+id;                           //W4D4 (2:18:)
        const jDesc = document.querySelector(descId);           //W4D4 (2:14:)(2:19)
        
        if (event.target.checked) {                            //W4D4 (2:04:)(2:14)
             //console.log("nextSibling "+event.target.nextSibling.id);
             jDesc.style.textDecoration = "line-through";
         }else{
             jDesc.style.textDecoration = "none";
         }
    }
    //==end============================================================================

    //TODO move updating to separate function
    app.jobId++;

    //add Handlers
    //ToDo
}




//rezerve: delete 1.variants.
// const delBtn = newTodo.querySelector(".del-btn");//W4D4 (1:37:)
// delBtn.onclick = function() {
//     console.log("removing parent of element with id "+this.id);
//     this.parentElement.remove();
    
//     app.inputField.onchange = () => {
//         console.log("New input is:  " + app.inputField.value);
//     }
// }