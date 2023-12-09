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
