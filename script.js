// // $.ajax({
// //     url: 'https://randomuser.me/api/',
// //     dataType: 'json',
// //     success: function (data) {
// //         console.log(data);
// //     }
// // });
// function modalWindow(x) {
//     const image = jsonData[x].picture.large;
//     const firstName = jsonData[x].name.first;
//     const lasName = jsonData[x].name.last;
//     const email = jsonData[x].email;
//     const city = jsonData[x].location.city.toUpperCase;
//     const phone = jsonData[x].phone;
//     const street = jsonData[x].location.street.toUpperCase;
//     const state = jsonData[x].location.state.toUpperCase;
//     const postCode = jsonData[x].location.postcode;
//     const dob = jsonData[x].dob.date.slice(0, 10);
// }

// const modalContainer = 


// $.ajax({
//     url: 'https://randomuser.me/api/',
//     dataType: 'json',
//     success: function (data) {
//         console.log(data);
//     }
// });

// ------------------------------------------
//  VARIABLES & SELECTORS
// ------------------------------------------
const randomUsers = "https://randomuser.me/api/?results=12&nat=us,dk,fr,gb";
const gallery = document.querySelector("#gallery");
const modals = document.getElementsByClassName("modal-container");
const searchContainer = document.querySelector('.search-container');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

function fetchAPI(url) {
    return fetch(url)
        .then(response => response.json())
        .catch(error => console.log(error));
}

Promise.all([fetchAPI(randomUsers)])
    .then(data => data[0].results)
    .then(persons =>
        persons.map(person => {
            generateProfiles(person);
        })
    );

// ------------------------------------------
//  HELPER FUNCTIONS & CALLBACKS
// ------------------------------------------
function generateHTML(elementType) {
    return document.createElement(`${elementType}`);
}

function generateProfiles(data) {
    const card = generateHTML("div");
    card.className = "card";



    const imageDiv = generateHTML("div");
    imageDiv.className = "card-img-container";

    const image = generateHTML("img");
    image.className = "card-img";
    image.src = `${data.picture.large}`;
    image.alt = `${data.name.first}, ${data.name.last}'s picture`;

    const cardInfo = generateHTML("div");
    cardInfo.className = "card-info-container";

    const header3 = generateHTML("h3");
    header3.id = "name";
    header3.className = "card-name";
    header3.classList += " cap";
    header3.textContent = `${data.name.first}, ${data.name.last}`;

    const email = generateHTML("p");
    email.className = "card-text";
    email.textContent = `${data.email}`;

    const cityState = generateHTML("p");
    cityState.className = "card-text";
    cityState.classList += " cap";
    cityState.textContent = `${data.location["city"]}, ${data.location["state"]}`;

    card.appendChild(imageDiv);
    imageDiv.appendChild(img);
    card.appendChild(cardInfo);
    cardInfo.appendChild(header3);
    cardInfo.appendChild(email);
    cardInfo.appendChild(cityState);
    gallery.appendChild(card);

    // MODALS
    function generateModal(data) {
        const modalContainer = generateHTML("div");
        modalContainer.className = "modal-container";
        modalContainer.style.display = "none";

        const modal = generateHTML("div");
        modal.className = "modal";

        const modalButton = generateHTML("button");
        modalButton.nodeType = "button";
        modalButton.id = "modal-close-btn";
        modalButton.className = "modal-close-btn";
        modalButton.innerHTML = "<strong>X</strong";

        const modalInfo = generateHTML("div");
        modalInfo.className = "modal-info-container";

        const ImgModal = generateHTML("img");
        ImgModal.className = "modal-img";
        ImgModal.src = `${data.picture.large}`;
        ImgModal.alt = `${data.name.first}, ${data.name.last}'s picture`;

        const h3 = generateHTML("h3");
        h3.id = "name";
        h3.className = "modal-name";
        h3.classList += " cap";
        h3.textContent = `${data.name.first}, ${data.name.last}`;

        const email = generateHTML("p");
        email.className = "modal-text";
        email.textContent = `${data.email}`;

        const cityState = generateHTML("p");
        cityState.className = "modal-text";
        cityState.classList += " cap";
        cityState.textContent = `${data.location["city"]}, ${
            data.location["state"]
            }`;

        const HumanResources = generateHTML("hr");

        const cell = generateHTML("p");
        cell.className = "modal-text";
        cell.textContent = `${data.cell}`;

        const address = generateHTML("p");
        address.className = "modal-text";
        address.classList += " cap";
        address.textContent = `${data.location.street}, ${data.location.state}, ${
            data.location.postcode
            }`;

        const DateOfBirth = generateHTML("p");
        DateOfBirth.className = "modal-text";
        DateOfBirth.textContent = `Birthday: ${data.dob.date.slice(0, 10)}`;

        const modalBtnContainer = generateHTML("div");
        modalBtnContainer.className = "modal-btn-container";

        const prevButton = generateHTML("button");
        prevButton.className = "modal-prev";
        prevButton.classList += " btn";
        prevButton.id = "modal-prev";
        prevButton.type = "button";
        prevButton.textContent = "Prev";
        prevButton.onclick = showPrev;

        const nextButton = generateHTML("button");
        nextButton.className = "modal-next";
        nextButton.classList += " btn";
        nextButton.id = "modal-next";
        nextButton.type = "button";
        nextButton.textContent = "Next";
        nextButton.onclick = showNext;

        gallery.appendChild(modalContainer);
        modalContainer.appendChild(modal);
        modal.appendChild(button);
        modal.appendChild(modalInfo);
        modal.appendChild(modalBtnContainer);
        modalInfo.appendChild(modalImg);
        modalInfo.appendChild(h3);
        modalInfo.appendChild(email);
        modalInfo.appendChild(cityState);
        modalInfo.appendChild(hr);
        modalInfo.appendChild(cell);
        modalInfo.appendChild(address);
        modalInfo.appendChild(birthday);
        modalBtnContainer.appendChild(prevButton);
        modalBtnContainer.appendChild(nextButton);
    }
    generateModal(data);
}

function showNext() {


    const current = document.querySelector('[style="display: block;"]');

    let allModals = [].slice.call(modals);
    let currentIndex = allModals.indexOf(current);

    if (currentIndex < allModals.length - 1) {

        allModals[currentIndex].style.display = 'none';
        allModals[currentIndex + 1].style.display = 'block';


    } else {

        allModals[currentIndex].style.display = 'none';
        allModals[currentIndex - (allModals.length - 1)].style.display = 'block';


    }

}

function showPrev() {


    const current = document.querySelector('[style="display: block;"]');
    let allModals = [].slice.call(modals);
    let currentIndex = allModals.indexOf(current);

    if (currentIndex === 0) {

        allModals[currentIndex].style.display = 'none';
        allModals[currentIndex + (allModals.length - 1)].style.display = 'block';


    } else {

        allModals[currentIndex].style.display = 'none';
        allModals[currentIndex - 1].style.display = 'block';


    }

}

function ProfileSearch() {

    const input = document.getElementById('search-input');
    const cards = document.getElementsByClassName('card');
    let StaffProfiles = [].slice.call(cards);

    StaffProfiles.map(profile => {
        if (StaffProfiles.children[1].children[0].textContent.toLowerCase().search(input.value.toLowerCase()) !== -1) {
            StaffProfiles.style.display = 'flex';
            StaffProfiles.nextSibling.classList.add('modal-container');
        } else {
            StaffProfiles.style.display = 'none';
            StaffProfiles.nextSibling.classList.remove('modal-container');
        }
    })
}

// ------------------------------------------
//  FROM BODY
// ------------------------------------------
const form = generateHTML('form');
form.action = '#';
form.method = 'get';

const SearchInput = generateHTML('input');
SearchInput.type = 'search';
SearchInput.id = 'search-input';
SearchInput.className = 'search-input';
SearchInput.placeholder = 'Search...';
SearchInput.onkeyup = searchProfile;

searchContainer.appendChild(form);
form.appendChild(SearchInput);


// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
gallery.addEventListener("click", event => {
    if (
        event.target.parentNode.parentNode.className === "card" &&
        event.target.parentNode.className !== "gallery"
    ) {
        event.target.parentNode.parentNode.nextSibling.style.display = "block";
    }

    if (
        event.target.parentNode.parentNode.className === "modal" &&
        event.target.textContent === "X"
    ) {
        event.target.parentNode.parentNode.parentNode.style.display = "none";
    }

});
