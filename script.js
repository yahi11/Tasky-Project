const taskContainer = document.querySelector(".task_container");
let globalStore = []; //array of objects
console.log(taskContainer);

const generateNewCard = (taskData) => ` 
    <div  class="col-md-6 col-lg-4">
                <div class="card">
                    <div class="card-header d-flex justify-content-end gap-2">
                        <button type="button" class="btn btn-outline-success"><i class="fa-sharp fa-solid fa-pencil"></i></button>
                        <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"><i class="fas fa-trash-alt" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"></i></button>  
                    </div> 
                    <div class="card-body">
                      <img src=${taskData.imageUrl} class="card-img-top" alt="...">
                      <h5 class="card-title fw-bold text-primary">${taskData.taskTitle}</h5>
                      <p class="card-text">${taskData.taskDescription}</p>
                      <a href="#" class="btn btn-primary">${taskData.taskType}</a>
                    </div>
                  </div>
            </div>
    `;


const loadInitialCardData = () => {
    //LocalStorage to get tasky card data
    const getCardData = localStorage.getItem("tasky");


    //convert the string to a normal object
    const {cards} = JSON.parse(getCardData);


    //loop over the array of task object to create HTML cards, inject it to our dom
    cards.map((cardObject) => {
        taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));

        //update our global store
        globalStore.push(cardObject);
    }

    )
    
};

    //Delete function

const deleteCard = (event) => {
  event = window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName;

  globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);
  localStorage.setItem("tasky",JSON.stringify({cards: globalStore}));

  if(tagname === "BUTTON") {
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  } else {
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }
};


//Edit function

// $(function () {
//   $('input').prop('disabled', true);
//   $('.fa-sharp fa-solid fa-pencil').click(function () {
//     $('html').addClass('active');
//     $('input').prop('disabled', false);
//   });
//   $('.fa-solid fa-check').click(function () {
//     $('html').removeClass('active');
//     $('input').prop('disabled', true);
//   });
// function resizeInput() {
//   $(this).attr('size', $(this).val().length + 2);
// }

// $('input')
//   .keyup(resizeInput)
//   .each(resizeInput);
// });



const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`,
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value
    };
    // const newCard = `
    // <div id=${taskData.id}  class="col-md-6 col-lg-4">
    //             <div class="card">
    //                 <div class="card-header d-flex justify-content-end gap-2">
    //                     <button type="button" class="btn btn-outline-success"><i class="fa-sharp fa-solid fa-pencil"></i></button>
    //                     <button type="button" class="btn btn-outline-danger"><i class="fa-solid fa-trash"></i></button>
    //                 </div>
    //                 <div class="m-3">
    //                   <img src=${taskData.imageurl} class="card-img-top" alt="...">
    //                 </div>
                    
    //                 <div class="card-body">
    //                   <h5 class="card-title fw-bold text-primary">${taskData.tasktitle}</h5>
    //                   <p class="card-text">${taskData.taskdescription}</p>
    //                   <a href="#" class="btn btn-primary">Go somewhere</a>
    //                 </div>
    //               </div>

    //         </div>
    // `;
    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));

    globalStore.push(taskData);
    localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));
};