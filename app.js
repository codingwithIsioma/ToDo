// select elements 
const form = document.querySelector(".todo-form")
const todo = document.getElementById("todo")
const addBtn = document.querySelector(".add-btn")
const container = document.querySelector(".todo-container")
const list = document.querySelector(".todo-list")
const alert = document.querySelector(".alert")

//******* EVENT LISTENERS *******
// submit form
form.addEventListener("submit", addItem)
// load items
window.addEventListener("DOMContentLoaded", setupItems)

// ****** FUNCTIONS *********
function addItem(e){
    e.preventDefault()

    const value = todo.value

    const id = new Date().getTime().toString()
    if(value !== ""){
        createListItem(id,value)
        // display alert
        displayAlert("Task added!", "success")
        // show container
        container.classList.add("show-container")
        // add to local storage
        addToLocalStorage(id,value)
        // set back to default
        setBackToDefault()
    }
    else{
        displayAlert("Task list is empty", "danger")
    }
}

// display alert 
function displayAlert(text,action){
    alert.textContent = `${text}`
    alert.classList.add(`alert-${action}`)

    // remove alert
    setTimeout(function (){
        alert.textContent = ""
        alert.classList.remove(`alert-${action}`)
    }, 2000)
}

//set back to default
function setBackToDefault(){
    todo.value = ""
}

// ************* LOCAL STORAGE *********
function addToLocalStorage(id, value){
    const todo = {id: id, value: value}
    let items = getLocalStorage()

    items.push(todo)
    localStorage.setItem("todolist", JSON.stringify(items))
}

function getLocalStorage(){
    return localStorage.getItem("todolist") ? JSON.parse(localStorage.getItem("todolist")) : [];
}

// *************** SETUP ITEMS **********
function setupItems() {
    let items = getLocalStorage()
    if(items.length > 0){
        items.forEach(function(item){
            createListItem(item.id, item.value)
        })
        container.classList.add("show-container")
    }
}

function createListItem(id, value){
    const element = document.createElement("article")
        //add class
        element.classList.add("todo-item")
        // add id
        const attr = document.createAttribute("data-id")
        attr.value = id;
        element.setAttributeNode(attr)
        element.innerHTML = `<p class="title">${value}</p>
                                <div class="btn-container">
                                    <button type="button" class="check-btn" job="complete"><i class="fa fa-circle-thin"></i>
                                    </button>
                                </div>`
        
        const check = element.querySelector(".fa")
        
        // append child
        list.appendChild(element)

        element.addEventListener("click", ()=>{
            const lineThrough = element.classList.toggle("todo-checked")
            check.classList.toggle("fa-circle-thin")
            const checked = check.classList.toggle("fa-check-circle")
            if(checked && lineThrough){
                displayAlert("Task Completed!", "success")
            } else{
                displayAlert("Task Unchecked!", "danger")
            }
            
        })
}