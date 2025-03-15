const form = document.querySelector("form");
const formContainer = document.querySelector(".form-container");
const cardContainer = document.querySelector(".card-container");
const inputs = document.getElementsByTagName("input");

/*
Basic :
 form ke submit hone pe ek event chalega
        event form ka data local storage pe save karega
        aur data se ek card banake show karega,
        form ka display 'close' class lagake none kar dega.

window pe event lagake jab bhi page refresh hoga to local storage me check karenge,
agar waha pe data hua to usi se card banake dispplay kar denge

Note: form ka display none card ke display function me dala hua hai
    
*/

//! window refresh hone pe ye sab hoga
window.addEventListener("load", (e) => {
  if (localStorage.getItem("data")) {
    displayCard(JSON.parse(localStorage.getItem("data")));
  }
});

//! form submit hone pe ye sab hoga
form.addEventListener("submit", (e) => {
  //   e.preventDefault();
  let data = {
    "First Name : ": inputs[0].value,
    "Last Name : ": inputs[1].value,
    "Coutry : ": inputs[2].value,
    "Phone no. : ": inputs[3].value,
    "State : ": inputs[4].value,
    "City : ": inputs[5].value,
    "Village : ": inputs[6].value,
    "PIN CODE : " : inputs[7].value,
  };

  localStorage.setItem("data", JSON.stringify(data));
  displayCard(data);
});

//! display card ye sab karega
function displayCard(obj) {
    // form ka display none kia
  formContainer.classList.add("close");

  // create a card div
  const card = document.createElement("div");
  card.classList.add("card");

  const fragment = document.createDocumentFragment();
//   loop lagake card ka data fill kia
  for (let key in obj) {
    const detail = document.createElement("p");
    detail.innerText = key + obj[key];
    fragment.append(detail);
  }

  // edit button
  const editButton = document.createElement("button");
  editButton.innerText = "New Card";
  editButton.setAttribute("id", "edit");
  editButton.addEventListener("click", (e) => {
    formContainer.classList.remove("close");
    card.classList.add("close");
  });

  // delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete Card";
  deleteButton.setAttribute("id", "delete");
  deleteButton.addEventListener("click", (e) => {
    formContainer.classList.remove("close");
    localStorage.removeItem("data");
    card.classList.add("close");
  });
// button div me dono button ko dal dia style karne ke liye
  const buttonDiv = document.createElement("div");
  buttonDiv.append(editButton, deleteButton);
  buttonDiv.classList.add("button-div");

//   card me sabko append kia > container me dal dia
  card.append(fragment, buttonDiv);
  cardContainer.append(card);
}