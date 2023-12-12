function editEmployeeDetails(employeeId) {
  fetch(`http://localhost:3000/api/employees/?id=${employeeId}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((employees) => {
      console.log(employees);
      openEditEmployee();
      document.getElementById("editsalutation").value = employees.salutation;
      document.getElementById("editfirstname").value = employees.first_name;
      document.getElementById("editlastname").value = employees.last_name;
      document.getElementById("editemail").value = employees.email;
      document.getElementById("editmobile").value = employees.phone;
      document.getElementById("editdatepicker").value = formatDate(
        employees.dob
      );
      document.querySelector(
        `input[name="editgender"][value="${employees.gender}"]`
      ).checked = true;
      document.getElementById("editaddress").value = employees.address;
      document.getElementById("editqualification").value =
        employees.qualification;
      document.getElementById("editcountry").value = employees.country;
      document.getElementById("editstate").value = employees.state;
      document.getElementById("editcity").value = employees.city;
      document.getElementById("editzip_pin").value = employees.zip_pin;
      document.getElementById("editUserName").value = employees.username;
      document.getElementById("editpassword").value = employees.password;
      document.getElementById("editImgPreview").src = `/${employees.avatar}`;
    });
  document
    .getElementById("saveChanges")
    .addEventListener("click", function (event) {
      event.preventDefault();
      // console.log("edited");
      saveEditedEmployee(employeeId);
    });
}
function formatDate(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
}
// Save changes event
async function saveEditedEmployee(employeeId) {
  // console.log(employeeId, "success");
  try {
    
     
    
    const salutation = document.getElementById("editsalutation").value;
    const first_name = document.getElementById("editfirstname").value;
    const last_name = document.getElementById("editlastname").value;
    const email = document.getElementById("editemail").value;
    const phone = document.getElementById("editmobile").value;
    const dob = formatDate(document.getElementById("editdatepicker").value);
    const gender = document.querySelector(
      'input[name="editgender"]:checked'
    ).value;
    const address = document.getElementById("editaddress").value;
    const qualification = document.getElementById("editqualification").value;
    const country = document.getElementById("editcountry").value;
    const state = document.getElementById("editstate").value;
    const city = document.getElementById("editcity").value;
    const zip_pin = document.getElementById("editzip_pin").value;
    const username = document.getElementById("editUserName").value;
    const password = document.getElementById("editpassword").value;
    const file = document.getElementById("edit_input").files[0];

    const editEmpData = new FormData();
    if (file) {
      editEmpData.append("avatar", file);
    }

    editEmpData.append("salutation", salutation);
    editEmpData.append("first_name", first_name);
    editEmpData.append("last_name", last_name);
    editEmpData.append("email", email);
    editEmpData.append("phone", phone);
    editEmpData.append("dob", dob);
    editEmpData.append("gender", gender);
    editEmpData.append("address", address);
    editEmpData.append("country", country);
    editEmpData.append("state", state);
    editEmpData.append("city", city);
    editEmpData.append("zip_pin", zip_pin);
    editEmpData.append("qualification", qualification);
    editEmpData.append("username", username);
    editEmpData.append("password", password);
    if (editFormValidation()){
      console.log("val eroor");
    const response = await fetch(
      `http://localhost:3000/api/employees/${employeeId}`,
      {
        method: "PUT",
        body: editEmpData,
      }
    );
    
    if (!response.ok) {
      console.log("Network response not ok");
    }
    const data = await response.json();
    console.log("Employee edited succesfully:", data);
    editConfOn();
  }
    // readEmployee();
  } catch (error) {
    console.error("Error editing employee:", error);
  }
}

// IMAGE
function updateImage() {
  const updateUserImage = document.getElementById("edit_input");
  console.log("hi");
  updateUserImage.addEventListener("change", function (event) {
    const selectedImage = updateUserImage.files[0];

    const reader = new FileReader();

    reader.onload = function (event) {
      const imageUrl = event.target.result;

      const newEmpImage = document.getElementById("editImgPreview");

      newEmpImage.src = imageUrl;
    };
    reader.readAsDataURL(selectedImage);
  });
}

// Function to show a confirmation message after editing
function editConfOn() {
  const confirmationPopup = document.getElementById("editconfirmationpopup");
  confirmationPopup.style.display = "block";
  overlayOn();
}

function openEditEmployee() {
  const openEditEmployee = document.getElementById("edit_page");
  openEditEmployee.style.display = "block";
  overlayOn();
}
function closeEditEmployee() {
  const edit_page = document.getElementById("edit_page");
  edit_page.style.display = "none";
  overlayOff();
}
// upload prview
const chooseEditFile = document.getElementById("edit_input");
const editImgPreview = document.getElementById("editImgPreview");

chooseEditFile.addEventListener("change", function () {
  getEditImgData();
});

function getEditImgData() {
  const updateUserImage = document.getElementById("edit_input");
  console.log("hi");
  // updateUserImage.click();

  updateUserImage.addEventListener("change", function (event) {
    const selectedImage = updateUserImage.files[0];

    const reader = new FileReader();

    reader.onload = function (event) {
      const imageUrl = event.target.result;

      const newEmpImage = document.getElementById("editImgPreview");

      newEmpImage.src = imageUrl;
    };
    reader.readAsDataURL(selectedImage);
  });
}

function editConfOn() {
  const ConfirmationPopup = document.getElementById("editconfirmationpopup");
  const edit_page = document.getElementById("edit_page");

  ConfirmationPopup.style.display = "block";
  edit_page.style.display = "none";
}

function editConfOff() {
  const confirmationpopup = document.getElementById("editconfirmationpopup");
  confirmationpopup.style.display = "none";
  overlayOff();
  window.location.reload();
}
function refresh(){
  window.location.reload();
}



function editFormValidation() {
  const firstName = document.getElementById("editfirstname").value;
  const lastName = document.getElementById("editlastname").value;
  const email = document.getElementById("editemail").value;
  const phone = document.getElementById("editmobile").value;
  const dob = document.getElementById("editdatepicker").value;
  const address = document.getElementById("editaddress").value;
  const country = document.getElementById("editcountry").value;
  const state = document.getElementById("editstate").value;
  const city = document.getElementById("editcity").value;
  const pincode = document.getElementById("editzip_pin").value;
  const qualifications = document.getElementById("editqualification").value;
  const username = document.getElementById("editUserName").value;
  const password = document.getElementById("editpassword").value;
  const salutation = document.getElementById("editsalutation").value;

  var errorMessageSalutation = document.getElementById(
    "errormessageSalutation"
  );
  var errorMessageFirstName = document.getElementById("edit_errormessageFirstname");
  var errorMessageLastName = document.getElementById("edit_errormessageLastname");
  var errorMessageEmail = document.getElementById("edit_errormessageEmail");
  var errorMessagePhone = document.getElementById("edit_errormessagePhone");
  var errorMessageDob = document.getElementById("edit_errormessageDob");
  var errorMessageAddress = document.getElementById("edit_errormessageAddress");
  var errorMessageQualification = document.getElementById(
    "edit_errormessageQualifications"
  );
  var errorMessageCountry = document.getElementById("edit_errormessageCountry");
  var errorMessageState = document.getElementById("edit_errormessageState");
  var errorMessageCity = document.getElementById("edit_errormessageCity");
  var errorMessagePin = document.getElementById("edit_errormessagePin");
  var errorMessageUsrName = document.getElementById("edit_errormessageUsrname");
  var errorMessagePass = document.getElementById("edit_errormessagePass");

  let hasError = false;
  let valSum=0
  const validNamePattern = /^[A-Za-z]+$/; // for name validation

  // salutation
  if (salutation === "") {
    errorMessageSalutation.style.display = "flex";
    hasError = true;
    valSum=valSum+1
  } else {
    errorMessageSalutation.style.display = "none";
  }

  // first name
  if (firstName === "") {
    errorMessageFirstName.style.display = "flex";
    hasError = true;
    valSum=valSum+1
  } else if (!validNamePattern.test(firstName)) {
    errorMessageFirstName.style.display = "flex";
    errorMessageFirstName.textContent = "Invalid characters in first name";
    hasError = true;
    valSum=valSum+1
  } else {
    errorMessageFirstName.style.display = "none";
  }

  // last name
  if (lastName === "") {
    errorMessageLastName.style.display = "flex";
    hasError = true;
    valSum=valSum+1
  } else if (!validNamePattern.test(lastName)) {
    errorMessageLastName.style.display = "flex";
    errorMessageLastName.textContent = "Invalid characters in last name";
    hasError = true;
    valSum=valSum+1
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
    valSum=valSum+1
  } else {
    errorMessageEmail.style.display = "none";
  }

  // phone number
  const validPhonePattern = /^\d{10}$/;

  if (phone === "") {
    errorMessagePhone.style.display = "flex";
    hasError = true;

  } if (!validPhonePattern.test(phone)) {
    errorMessagePhone.style.display = "flex";
    errorMessagePhone.textContent = "Invalid phone number";
    hasError = true;
    valSum=valSum+1
  } else {
    errorMessagePhone.style.display = "none";
  }

  // dob

  if (dob === "") {
    errorMessageDob.style.display = "flex";
    hasError = true;
    valSum=valSum+1
  } else {
    errorMessageDob.style.display = "none";
  }

  // address

  if (address === "") {
    errorMessageAddress.style.display = "flex";
    hasError = true;
    valSum=valSum+1
  } else {
    errorMessageAddress.style.display = "none";
  }

  // qualification

  if (qualifications === "") {
    errorMessageQualification.style.display = "flex";
    hasError = true;
    valSum=valSum+1
  } else {
    errorMessageQualification.style.display = "none";
  }

  // country

  if (country === "" || country == "Select a country") {
    errorMessageCountry.style.display = "flex";
    hasError = true;
    valSum=valSum+1
  } else {
    errorMessageCountry.style.display = "none";
  }

  // state

  if (state === "" || state == "Select a state") {
    errorMessageState.style.display = "flex";
    hasError = true;
    valSum=valSum+1
  } else {
    errorMessageState.style.display = "none";
  }

  // city

  if (city === "" || city == "Select a city") {
    errorMessageCity.style.display = "flex";
    hasError = true;
    valSum=valSum+1
  } else {
    errorMessageCity.style.display = "none";
  }

  // pincode
  if (pincode === "") {
    errorMessagePin.style.display = "flex";
    hasError = true;
    valSum=valSum+1
  } else {
    errorMessagePin.style.display = "none";
  }

  // usr name

  if (username === "") {
    errorMessageUsrName.style.display = "flex";
    hasError = true;
    valSum=valSum+1
  } else {
    errorMessageUsrName.style.display = "none";
  }

  // password

  if (password === "") {
    errorMessagePass.style.display = "flex";
    hasError = true;
    valSum=valSum+1
  } else {
    errorMessagePass.style.display = "none";
  }
// if (valSum==14){
//   return true;
  
// }
  return !hasError;
}