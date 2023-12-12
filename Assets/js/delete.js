function deleteEmployee(employeeId) {
  delEmpPopOn();
  const dlt = document.getElementById("delete_btn");
  dlt.addEventListener("click", function () {
    fetch(`http://localhost:3000/api/employees/${employeeId}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        // FormValidationSuccessPopup();
        console.log(response);
        delConfOn();
        readEmployee();
      }
    });
  });
}
function delEmpPopOn() {
  const delemppop = document.getElementById("delete_employee");
  delemppop.style.display = "block";
  overlayOn();
}
function delEmpPopOff() {
  const delemppop = document.getElementById("delete_employee");
  delemppop.style.display = "none";
  overlayOff();
}
function delConfOn() {
  const ConfirmationPopup = document.getElementById("delconfirmationpopup");
  const employeeForm = document.getElementById("delete_employee");

  ConfirmationPopup.style.display = "block";
  employeeForm.style.display = "none";
}

function delConfOff() {
  const confirmationpopup = document.getElementById("delconfirmationpopup");
  confirmationpopup.style.display = "none";
  overlayOff();
}

function overlayOn() {
  const over_lay = document.getElementById("over_lay");
  over_lay.style.display = "block";
}
function overlayOff() {
  const over_lay = document.getElementById("over_lay");
  over_lay.style.display = "none";
}
