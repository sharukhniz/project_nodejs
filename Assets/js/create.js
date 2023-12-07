//creating and submitting new employee
document.addEventListener("DOMContentLoaded", function () {
  const empForm_fetch = document.querySelector("#exampleModal #add_emp_btn");
  empForm_fetch.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("add");
    const salutation = document.getElementById("salutation").value;
    const first_name = document.getElementById("first_name").value;
    const last_name = document.getElementById("last_name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("mob_num").value;
    const DOB = document.getElementById("dob").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    console.log(gender);
    //converting date
    var dateofbirth = changeformat(DOB);
    function changeformat(val) {
      const Array = val.split("-");
      let year = Array[0];
      let month = Array[1];
      let day = Array[2];
      let formatteddate = day + "-" + month + "-" + year;
      return formatteddate;
    }
    const dob=dateofbirth;
    //const gender = document.querySelector('input[name="gender"]:checked').value;
    const address = document.getElementById("address").value;
    const country = document.getElementById("country").value;
    const state = document.getElementById("state").value;
    const city = document.getElementById("city").value;
    const zip_pin = document.getElementById("zip_pin").value;
    const qualification = document.getElementById("qualification").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const file=document.getElementById("imgUpload").files[0];
    // Create a new employee object
    const newEmployee = new FormData();
      newEmployee.append('salutation',salutation);
      newEmployee.append('first_name',first_name);
      newEmployee.append('last_name',last_name);
      newEmployee.append('email',email);
      newEmployee.append('phone',phone);
      newEmployee.append('dob',dob);
      newEmployee.append('gender',gender);
      newEmployee.append('address',address);
      newEmployee.append('country',country);
      newEmployee.append('state',state);
      newEmployee.append('city',city);
      newEmployee.append('zip_pin',zip_pin);
      newEmployee.append('qualification',qualification);
      newEmployee.append('username',username);
      newEmployee.append('password',password);
      newEmployee.append('avatar',file);
      
      if (FormValidation()){
        fetch("http://localhost:3000/api/employees",{
        method:'POST',
        body:newEmployee,
      })
      .then((res) => res.json())
      .then((data) => {
        console.log("Employee added:", data);
        console.log(data.id);
        closeAddEmp();
        FormValidationSuccessPopup();

  readEmployee();

      })
      .catch((error) => {
        console.error("Error adding employee:", error);
      });
    }  
  });
});
// clearForm
function clearForm() {
  document.getElementById("first_name").value = "";
  document.getElementById("last_name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("mob_num").value = "";
  document.getElementById("dob").value = "";
  document.getElementById("address").value = "";
  document.getElementById("country").value = "";
  document.getElementById("state").value = "";
  document.getElementById("city").value = "";
  document.getElementById("zip_pin").value = "";
  document.getElementById("qualification").value = "";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("salutation").value = "";
  document.getElementById("imgUpload").value="";
  // document.getElementById("gender").value="";

}

function FormValidationSuccessPopup() {
  const ConfirmationPopup = document.getElementById("addconfirmationpopup");
  const employeeForm = document.getElementById("exampleModal");

  ConfirmationPopup.style.display = "block";
  employeeForm.style.display = "none";
  overlayOn()
  

}

function closeValPopup() {
  const confirmationpopup = document.getElementById("addconfirmationpopup");
  confirmationpopup.style.display = "none";
  overlayOff();
  // location.reload()
}
function overlayOn() {
  const over_lay = document.getElementById("over_lay");
  over_lay.style.display = "block";
}
function overlayOff() {
  const over_lay = document.getElementById("over_lay");
  over_lay.style.display = "none";
}
function openAddEmp() {
  clearForm();

  const add_em = document.getElementById("exampleModal");
  add_em.style.display = "block";
  overlayOn();
}
function closeAddEmp() {
  const add_em = document.getElementById("exampleModal");
  add_em.style.display = "none";
  overlayOff();
}
// img upload preview
document.addEventListener("DOMContentLoaded", function () {
const chooseFile = document.getElementById("imgUpload");
const imgPreview = document.getElementById("addImgPreview");

chooseFile.addEventListener("change", function () {
  
  getImgData();

});


function getImgData() {
  let chooseFile = document.getElementById("imgUpload");
const imgPreview = document.getElementById("addImgPreview");
  const files = chooseFile.files[0];
  if (files) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files);
    fileReader.addEventListener("load", function () {
      imgPreview.style.display = "block";
      imgPreview.innerHTML = '<img src="' + this.result + '" />';
      console.log("image vanno");
    });
    hideUpload();
  }
}

function hideUpload() {
  const hideUpload = document.getElementById("upl_img");
  hideUpload.style.display = "none";
  const show_upload = document.getElementById("img_box");
  show_upload.style.display = "flex";
}
})
