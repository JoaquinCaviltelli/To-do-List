// MY DAY

var domDay = document.getElementById("day")

newDay()

function newDay() {

  var days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]
  var month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

  var newDate = new Date()

  var nowDay = days[newDate.getDay()]
  var nowNumberDay = newDate.getDate()
  var nowMonth = month[newDate.getMonth()]
  var nowHours = newDate.getHours()
  var nowMinutes = newDate.getSeconds()

  date = `${nowDay}, ${nowNumberDay} de ${nowMonth}`
 
  domDay.innerHTML = date
}




// NEW TASK

var inputNewTask = document.getElementById("newTask")
var listContainer = document.querySelector(".listContainer")
var myDayDom = document.querySelector(".myDay")

var load = document.getElementById("load")

var task = []

window.addEventListener("load", function () {

  getLocalStorageTask()

  addListContainer()

  load.style.display= "none"

})

//Scroll Top Container

listContainer.addEventListener("scroll", function(e){
  var scrollTopList = e.path[0].scrollTop

  if(scrollTopList > 100){
    myDayDom.classList.add("myDayTop")
    listContainer.classList.add("listContainerTop")
  }else{
    myDayDom.classList.remove("myDayTop")
    listContainer.classList.remove("listContainerTop")

  }
})




window.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    
    if(inputNewTask.value.slice(-1) == " "){
      inputNewTask.value = inputNewTask.value.slice(0,-1)
      
    }
    if(inputNewTask.value != ""){

      getLocalStorageTask()
  
      addTask(inputNewTask.value, true, date)
  
      addListContainer()
  
      resetInputTask()
    }
  }
})



function addTask(t, b, d) {

  var newTask = [t, b, d]

  task.unshift(newTask)

  localStorageTask(task)
}

function localStorageTask(Stask) {
  localStorage.setItem(`localTask`, JSON.stringify(Stask))
}

function getLocalStorageTask() {
  var storageTask = localStorage.getItem(`localTask`)
  if (storageTask == null) {
    task = []
  } else {
    task = JSON.parse(storageTask)
  }
}

function addListContainer() {

  listContainer.innerHTML = ""

  for (i in task) {
   
    if (task[i][1] === true) {

      listContainer.innerHTML += `
        <div class="task">
        <img class="taskCheked" src="img/icon/circle-regular.svg" alt="">
        <div class="taskText">
            <p>
             ${task[i][0]}
            </p>
            <p class="dateTask">${task[i][2]}</p>
        </div>
        <img class="taskTrash" src="img/icon/trash-solid.svg" alt="">
    </div>
        
        `

    } 
  }


  for (i in task) {
 
    if (task[i][1] === false) {

      listContainer.innerHTML += `
      
      <div class="task">
      <img class="taskCheked" src="img/icon/check-circle-solid.svg" alt="">
      <div class="taskText">
          <del>
           ${task[i][0]}
          </del>
          <p class="dateTask">${task[i][2]}</p>
      </div>
      <img class="taskTrash" src="img/icon/trash-solid.svg" alt="">
  </div>
      
      `

    } 
    }

}

function resetInputTask() {

  inputNewTask.value = ""
  inputNewTask.focus()
}



// DETECTED TASK


listContainer.addEventListener("click", function (e) {

 
  chekedTask(e)
  deleteTask(e) 
})

function chekedTask(e){
  
  var targetCheked = e.target.classList[0]
  
  if (targetCheked === "taskCheked") {
  
    var textNodeTask = e.path[1].childNodes[3].childNodes[1].innerText

    for (i in task) {
   
      if (textNodeTask === task[i][0]) {
              
        task[i][1] = !task[i][1]
        
        localStorageTask(task)
        addListContainer() 
      } 
    }  
  }
}


function deleteTask(e){
  
  var targetTask = e.target.classList[0]
  
  if (targetTask === "taskTrash") {
  
     var textNodeTask = e.path[1].childNodes[3].childNodes[1].innerText
  
    for (i in task) {
    
      if (textNodeTask === task[i][0]) {
  
        task.splice(i,1)
  
        localStorageTask(task)
        addListContainer()  
      }  
    } 
  }
}

//Create by Joaquin Cavitelli