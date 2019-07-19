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

const gallery = document.querySelector('.gallery');
const body = document.querySelector('body');
const card = document.querySelectorAll('.card');
let employees;

// Fetch the data from the URL parameter
fetch('https://randomuser.me/api/?results=12&nat=us')
    .then(checkStatus)
    .then(res => res.json())
    .then(data => employees = data.results)
    .then(employees => {
        displayEmployees(employees);
        displayModal(employees);
    })
    .catch(error => console.log('Looks like there was a problem', error))

// Check the status of the returned promise.
function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

// Creates the employee cards and adds them to the page
function displayEmployees(person) {
    const card = person.map(employee => `
  <div class="card">
    <div class="card-img-container">
      <img class="card-img" src="${employee.picture.large}" alt="profile picture">
    </div>
    <div class="card-info-container">
      <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
      <p class="card-text">${employee.email}</p>
      <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
    </div>
  </div>
  `).join('');
    gallery.innerHTML = card;
}

// Create the container divs for the modals
function createModalContainer() {
    return modalContainer = `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
            </div>
        </div>
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>`;
}

// Creates all the inside information for the modals
function createModal(data, index) {
    const employee = data[index];
    const modalInfo = document.querySelector('.modal-info-container');

    const modalHTML = `
  <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
  <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
  <p class="modal-text">${employee.email}</p>
  <p class="modal-text cap">${employee.location.city.charAt(0).toUpperCase()}${employee.location.city.substring(1)}</p>
  <hr>
  <p class="modal-text">${employee.phone}</p>
  <p class="modal-text">${capitalizeFirstLetter(employee.location.street)}, ${employee.location.city.charAt(0).toUpperCase()}${employee.location.city.substring(1)}, ${getStateTwoDigitCode(employee.location.state)} ${employee.location.postcode}</p>
  <p class="modal-text">Birthday: ${employee.dob.date.substring(5, 7)}/${employee.dob.date.substring(8, 10)}/${employee.dob.date.substring(2, 4)}</p>
  `;

    modalInfo.innerHTML = modalHTML;
}

// Index of the active employee modal
let number = 0;

// Display the modal when the card is clicked for the specific employee
function displayModal(data) {
    for (let i = 0; i < gallery.children.length; i++) {
        gallery.children[i].addEventListener('click', () => {
            gallery.insertAdjacentHTML('afterend', createModalContainer());
            createModal(data, i);
            number = i;

            handleModal(data);
        });
    }
}

// Function that handles all the functionality of the open modal windows
function handleModal(data) {
    const modal = document.querySelector('.modal-container');
    const removeBtn = document.querySelector('.modal-close-btn');
    const nextBtn = document.querySelector('.modal-next');
    const prevBtn = document.querySelector('.modal-prev');


    // Close modal on click of the close button
    removeBtn.addEventListener('click', () => {
        modal.style.display = 'none';

    });

    // Close modal upon hitting the escape key
    document.addEventListener('keydown', (e) => {
        if (e.keyCode === 27) {
            modal.style.display = 'none';
        }
    });

    // close modal when you click on the modal container/outside of the modal info and contents
    modal.addEventListener('click', (e) => {
        if (e.target.className === 'modal-container') {
            modal.style.display = 'none';
        }

        // Change to the next employee modal on the page when you click the next button
        if (e.target.textContent === 'Next') {
            if (number < (data.length - 1) && number >= 0) {
                number++;
                createModal(data, number);
            }
            // Change to the previous employee modal on the page when you click the previous button
        } else if (e.target.textContent === 'Prev') {
            if (number <= (data.length - 1) && number > 0) {
                number--;
                createModal(data, number);
            }
        }
        // Hides the next button if the last modal is currently shown, and shows the button otherwise
        if (number === data.length - 1) {
            nextBtn.style.display = 'none';
        } else {
            nextBtn.style.display = 'inline-block';
        }

        // Hides the previous button if the first modal is currently shown, and shows the button otherwise
        if (number === 0) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'inline-block';
        }
    });

}


// Change the name of the states to their abbreviated state codes. Called in the creation of the modal window.
function getStateTwoDigitCode(stateFullName) {
    return this.stateList[stateFullName];
}
stateList = {
    'arizona': 'AZ',
    'alabama': 'AL',
    'alaska': 'AK',
    'arkansas': 'AR',
    'california': 'CA',
    'colorado': 'CO',
    'connecticut': 'CT',
    'delaware': 'DE',
    'florida': 'FL',
    'georgia': 'GA',
    'hawaii': 'HI',
    'idaho': 'ID',
    'illinois': 'IL',
    'indiana': 'IN',
    'iowa': 'IA',
    'kansas': 'KS',
    'kentucky': 'KY',
    'louisiana': 'LA',
    'maine': 'ME',
    'maryland': 'MD',
    'massachusetts': 'MA',
    'michigan': 'MI',
    'minnesota': 'MN',
    'mississippi': 'MS',
    'missouri': 'MO',
    'montana': 'MT',
    'nebraska': 'NE',
    'nevada': 'NV',
    'new hampshire': 'NH',
    'new jersey': 'NJ',
    'new mexico': 'NM',
    'new york': 'NY',
    'north carolina': 'NC',
    'north dakota': 'ND',
    'ohio': 'OH',
    'oklahoma': 'OK',
    'oregon': 'OR',
    'pennsylvania': 'PA',
    'rhode island': 'RI',
    'south carolina': 'SC',
    'south dakota': 'SD',
    'tennessee': 'TN',
    'texas': 'TX',
    'utah': 'UT',
    'vermont': 'VT',
    'virginia': 'VA',
    'washington': 'WA',
    'west virginia': 'WV',
    'wisconsin': 'WI',
    'wyoming': 'WY'
}

// Capitalizes the first letter of every word in a string. Used to make the employees street address in the modal look proper.
function capitalizeFirstLetter(word) {
    return word.split(' ').map(w => w.substring(0, 1).toUpperCase() + w.substring(1)).join(' ')
}


// Create the search bar and search button form
const searchContainer = document.querySelector('.search-container');
searchHTML = `
  <form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
  </form>
`;
searchContainer.innerHTML = searchHTML;


// Create an empty results array
let results = [];


// The search function. Input and employee parameters.
function search(input, emp) {
    results = emp.filter(employee => employee.name.first.includes(input) || employee.name.last.includes(input));

    // If the input is empty, the search resets back to showing all employees
    if (input === '') {
        displayModal(employees);
        displayEmployees(employees);
    } else {
        displayEmployees(results);
        displayModal(results);
    }
}


// Search event listeners. Search bar functions on click of the search button, or just while typing.
const searchBtn = document.querySelector('.search-submit');
const searchInput = document.querySelector('.search-input');

searchBtn.addEventListener('click', () => {
    search(searchInput.value.toLowerCase(), employees);
});

searchInput.addEventListener('keyup', () => {
    search(searchInput.value.toLowerCase(), employees)
});