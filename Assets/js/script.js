let currentPage = 1;
let display = 3;

const paginationNumbers = document.getElementById("pagination-numbers");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");

readEmployee();

async function readEmployee() {
  try {
    const response = await fetch(
      `http://localhost:3000/api/Employees?page=${currentPage}&limit=${display}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    displayEmployees(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function displayEmployees(datas) {
  const data = datas.data;
  const page = currentPage;
  const startIndex = (page - 1) * display;

  const pageCount = Math.ceil(datas.length / display); 
  pagination(pageCount);

  const employeeTableBody = document.getElementById("employeetablebody");
  let temp = "";

  for (let i = 0; i < data.length; i++) {
    const employee = data[i];

    temp += `<tr class="zero">
        <td>${startIndex + i + 1}</td>
        <td>
          <div class="imageCont">
            ${
              employee.avatar
                ? `<img class="profile-img" src="${employee.avatar}">`
                : `<div class="dummyImg">
                    <h2>${employee.first_name.slice(0, 1).toUpperCase()}${employee.last_name
                      .slice(0, 1)
                      .toUpperCase()}</h2>
                  </div>`
            }
            ${employee.salutation + " " + employee.first_name + " " + employee.last_name}
          </div>
        </td>
        <td>${employee.email}</td>
        <td>${employee.phone}</td>
        <td>${employee.gender}</td>
        <td>${employee.dob}</td>
        <td>${employee.country}</td>
        <td class="morebutton">
          <button class="more_button">
            <i class="fa-solid fa-ellipsis"></i>
          </button>
          <div class="dropdown-menu">
            <div class="dropdown-item">
              <button class="action" onclick="viewEmployee('${employee._id}')">
                <span><i class="fa-regular fa-eye"></i></span> View Details
              </button>
              <button class="action" onclick="editEmployeeDetails('${employee._id}')" data-bs-toggle="modal" data-bs-target="#edit_page">
                <span><i class="fa-solid fa-pen"></i></span> Edit
              </button>
              <button class="action" onclick="deleteEmployee('${employee._id}')" data-bs-toggle="modal" data-bs-target="#delete_employee">
                <i class="fa fa-sharp fa-light fa-trash" id="buttonDropdown_action"></i>Delete
              </button>
            </div>
          </div>
        </td>
      </tr>`;
  }

  employeeTableBody.innerHTML = temp;
}


// pagination

function pagenumbervisibletotalPages(pageCount) {
  let paginationblock = document.querySelector(".pagenumber");
  if (pageCount <= 1) {
    paginationblock.style.display = "none";
  } else {
    paginationblock.style.display = "flex";
  }
}

var totalPages;

function pagination(pageCount) {
  totalPages = pageCount;
  document.getElementById("numOfPages").innerText = `${pageCount}`;

  // div element where the pagination buttons are displayed
  let pgnum = document.getElementById("pagination-numbers");
  let listnum = document.getElementById("page_no");

  let temp = "";
  let list = "";
  for (let i = 1; i <= pageCount; i++) {
    temp += `<button class="page-item" id="page${i}">${i}</button>`;

    let isSelected = i === currentPage;

    list += `<option id="listNum${i}" value="${i}" ${
      isSelected ? "selected" : ""
    }>${i}</option>`;
  }

  pgnum.innerHTML = temp;
  listnum.innerHTML = list;
  listnum.value = currentPage;

  for (let i = 1; i <= pageCount; i++) {
    (function (pageNumber) {
      const pageCounter = document.getElementById(`page${pageNumber}`);
      pageCounter.addEventListener("click", function (e) {
        e.preventDefault();
        currentPage = pageNumber;
        readEmployee();
      });
    })(i);
  }

  if (currentPage == 1) {
    prevButton.disabled = true;
  } else {
    prevButton.disabled = false;
  }
  if (currentPage == pageCount) {
    nextButton.disabled = true;
  } else {
    nextButton.disabled = false;
  }
}

prevButton.addEventListener("click", function (e) {
  e.preventDefault();
  if (currentPage > 1) {
    currentPage -= 1;
    readEmployee();
  }
});

nextButton.addEventListener("click", function (e) {
  e.preventDefault();
  if (currentPage < totalPages) {
    currentPage += 1;
    readEmployee();
  }
});

// select list to paginate
function listPaginate(value) {
  currentPage = value;
  readEmployee();
}
//end of pagination

// view employee

function viewEmployee(employeeId) {
  const viewUrl = `/view/?id=${employeeId}`;
  window.location.href = viewUrl;
}

// search

async function searchBar() {
  const searchField = document.getElementById("search").value;
  if (searchField === "" || searchField === undefined || searchField === null) {
    readEmployee();
  } else {
    await fetch(`http://localhost:3000/api/employees/search?q=${searchField}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const employeeData = data;
        currentPage = 1;
        displayEmployees(employeeData);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

// form validation
function FormValidation() {
  const firstName = document.getElementById("first_name").value;
  const lastName = document.getElementById("last_name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("mob_num").value;
  const dob = document.getElementById("dob").value;
  const address = document.getElementById("address").value;
  const country = document.getElementById("country").value;
  const state = document.getElementById("state").value;
  const city = document.getElementById("city").value;
  const pincode = document.getElementById("zip_pin").value;
  const qualifications = document.getElementById("qualification").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const salutation = document.getElementById("salutation").value;

  var errorMessageSalutation = document.getElementById(
    "errormessageSalutation"
  );
  var errorMessageFirstName = document.getElementById("errormessageFirstname");
  var errorMessageLastName = document.getElementById("errormessageLastname");
  var errorMessageEmail = document.getElementById("errormessageEmail");
  var errorMessagePhone = document.getElementById("errormessagePhone");
  var errorMessageDob = document.getElementById("errormessageDob");
  var errorMessageAddress = document.getElementById("errormessageAddress");
  var errorMessageQualification = document.getElementById(
    "errormessageQualifications"
  );
  var errorMessageCountry = document.getElementById("errormessageCountry");
  var errorMessageState = document.getElementById("errormessageState");
  var errorMessageCity = document.getElementById("errormessageCity");
  var errorMessagePin = document.getElementById("errormessagePin");
  var errorMessageUsrName = document.getElementById("errormessageUsrname");
  var errorMessagePass = document.getElementById("errormessagePass");

  let hasError = false;
  const validNamePattern = /^[A-Za-z]+$/; // for name validation

  // salutation
  if (salutation === "") {
    errorMessageSalutation.style.display = "flex";
    hasError = true;
  } else {
    errorMessageSalutation.style.display = "none";
  }

  // first name
  if (firstName === "") {
    errorMessageFirstName.style.display = "flex";
    hasError = true;
  } else if (!validNamePattern.test(firstName)) {
    errorMessageFirstName.style.display = "flex";
    errorMessageFirstName.textContent = "Invalid characters in first name";
    hasError = true;
  } else {
    errorMessageFirstName.style.display = "none";
  }

  // last name
  if (lastName === "") {
    errorMessageLastName.style.display = "flex";
    hasError = true;
  } else if (!validNamePattern.test(lastName)) {
    errorMessageLastName.style.display = "flex";
    errorMessageLastName.textContent = "Invalid characters in last name";
    hasError = true;
  } else {
    errorMessageLastName.style.display = "none";
  }

  // email

  const validEmailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (email === "") {
    errorMessageEmail.style.display = "flex";
    hasError = true;
  } else if (!validEmailPattern.test(email)) {
    errorMessageEmail.style.display = "flex";
    errorMessageEmail.textContent = "Invalid email format";
    hasError = true;
  } else {
    errorMessageEmail.style.display = "none";
  }

  // phone number
  const validPhonePattern = /^\d{10}$/;

  if (phone === "") {
    errorMessagePhone.style.display = "flex";
    hasError = true;
  } else if (!validPhonePattern.test(phone)) {
    errorMessagePhone.style.display = "flex";
    errorMessagePhone.textContent = "Invalid phone number";
    hasError = true;
  } else {
    errorMessagePhone.style.display = "none";
  }

  // dob

  if (dob === "") {
    errorMessageDob.style.display = "flex";
    hasError = true;
  } else {
    errorMessageDob.style.display = "none";
  }

  // address

  if (address === "") {
    errorMessageAddress.style.display = "flex";
    hasError = true;
  } else {
    errorMessageAddress.style.display = "none";
  }

  // qualification

  if (qualifications === "") {
    errorMessageQualification.style.display = "flex";
    hasError = true;
  } else {
    errorMessageQualification.style.display = "none";
  }

  // country

  if (country === "" || country == "Select a country") {
    errorMessageCountry.style.display = "flex";
    hasError = true;
  } else {
    errorMessageCountry.style.display = "none";
  }

  // state

  if (state === "" || state == "Select a state") {
    errorMessageState.style.display = "flex";
    hasError = true;
  } else {
    errorMessageState.style.display = "none";
  }

  // city

  if (city === "" || city == "Select a city") {
    errorMessageCity.style.display = "flex";
    hasError = true;
  } else {
    errorMessageCity.style.display = "none";
  }

  // pincode
  if (pincode === "") {
    errorMessagePin.style.display = "flex";
    hasError = true;
  } else {
    errorMessagePin.style.display = "none";
  }

  // usr name

  if (username === "") {
    errorMessageUsrName.style.display = "flex";
    hasError = true;
  } else {
    errorMessageUsrName.style.display = "none";
  }

  // password

  if (password === "") {
    errorMessagePass.style.display = "flex";
    hasError = true;
  } else {
    errorMessagePass.style.display = "none";
  }

  return !hasError;
}
//umsaved changes alert
// window.addEventListener("beforeunload", (event) => {
//   event.preventDefault();
//   event.returnValue = "";
// });
