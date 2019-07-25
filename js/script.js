/*global variables*/
let staff = [];
let filteredStaff = [];

/*set global variables after api fetch*/
const setGlobalVariables = (users) => {
  staff = users;
  filteredStaff = users;
  return Promise.resolve(users)
}

/*update modal data when prev next and buttons are clicked*/
const ModalChange = (direction) => {
  let RecentIndex = 0
  const RecentName = document.querySelector('.modal-name').textContent;
  filteredStaff.forEach((user, index) => {
    if ((`${user.name.first} ${user.name.last}`) === RecentName) {
      RecentIndex = index
    }
  })

  let newStaffIndex = RecentIndex + direction
  if (newStaffIndex < 0) {
    newStaffIndex = 0
  }
  if (newStaffIndex >= filteredStaff.length) {
    newStaffIndex = filteredStaff.length - 1
  }

  const NewStaff = filteredStaff[newStaffIndex]
  document.querySelectorAll('.modal-img')[0].src = NewStaff.picture.large
  document.querySelectorAll('.modal-name')[0].textContent = `${NewStaff.name.first} ${NewStaff.name.last}`
  document.querySelectorAll('.modal-text')[0].textContent = NewStaff.email
  document.querySelectorAll('.modal-text')[1].textContent = NewStaff.location.city
  document.querySelectorAll('.modal-text')[2].textContent = NewStaff.cell
  document.querySelectorAll('.modal-text')[3].textContent = `${NewStaff.location.street}, ${NewStaff.location.state} ${NewStaff.location.postcode}`
  document.querySelectorAll('.modal-text')[4].textContent = `Birthday: ${StaffBirthday(NewStaff.dob.date)}`
}

/*format birthday according  to the mockup*/
const StaffBirthday = date => {
  let BirthdayInfo = date.slice(0, 10).split("-");
  return `${BirthdayInfo[1]}/${BirthdayInfo[2]}/${BirthdayInfo[0].slice(2, 4)}`;
};

/*remove al modal elements when the modal exit*/
const ModalExit = () => {
  document.querySelector(".modal-container").remove();
};

/*open the modal and load all the data according de user uuid*/
const openModal = uuid => {
  const StaffData = staff.filter(user => user.login.uuid === uuid)[0];
  const Divmodal = document.createElement("div");
  Divmodal.className = "modal-container";
  Divmodal.innerHTML = `
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src=${StaffData.picture.large} alt="profile picture">
                    <h3 id="name" class="modal-name cap">${StaffData.name.first} ${StaffData.name.last}</h3>
                    <p class="modal-text">${StaffData.email}</p>
                    <p class="modal-text cap">${StaffData.location.city}</p>
                    <hr>
                    <p class="modal-text">${StaffData.cell}</p>
                    <p class="modal-text">${StaffData.location.street}, ${StaffData.location.state} ${StaffData.location.postcode}</p>
                    <p class="modal-text">Birthday: ${StaffBirthday(StaffData.dob.date)}</p>
                </div>
            </div>
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>`;
  document.body.appendChild(Divmodal);
  document.getElementById("modal-close-btn").addEventListener("click", () => ModalExit());
  document.getElementById("modal-prev").addEventListener('click', () => ModalChange(-1));
  document.getElementById("modal-next").addEventListener('click', () => ModalChange(+1));
};

/*render the user cards and load its data*/
const DuplicateCards = users => {
  let html = users.map(
    user =>
    `<div class="card" id=${user.login.uuid}>
            <div class="card-img-container">
                <img class="card-img" src="${user.picture.medium}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="card-text">${user.email}</p>
                <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
            </div>
        </div>`
  );
  document.getElementById("gallery").innerHTML = html.join("");
  return Promise.resolve("All cards added");
};

/*add event listener to each card*/
const produceCardEvents = () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => card.addEventListener("click", () => openModal(card.id)));
  return Promise.resolve("All events added");
};

/*filter cards according the search input*/
const search = name => {
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => card.remove());
  filteredStaff = staff.filter(user =>
    user.name.first.toLowerCase().includes(name.toLowerCase()) ||
    user.name.last.toLowerCase().includes(name.toLowerCase())
  );
  DuplicateCards(filteredStaff);
  produceCardEvents();
};


/*Add search bar and search events when the page is loaded*/
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".search-container").innerHTML = `
          <form action="#" method="get">
              <input type="search" id="search-input" class="search-input" placeholder="Search...">
              <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
          </form>
          `;

  document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();
    search(document.querySelector(".search-input").value);
  });
});

/*API Fetch*/
fetch("https://randomuser.me/api/?results=12&nat=us,au,ca,gb")
  .then(res => res.json()) // responds with JSON data
  .then(data => data.results)
  .then(setGlobalVariables)
  .then(DuplicateCards)
  .then(produceCardEvents)
  .catch(err => console.log(err));