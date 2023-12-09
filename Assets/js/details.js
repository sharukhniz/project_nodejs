let params = new URLSearchParams(document.location.search);
let id = params.get("id");

function detailsEmployee(id) {
  fetch(`http://localhost:3000/api/employees/?id=${id}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((employee) => {
      console.log(employee);
      let dobParts = employee.dob.split("-");
      let day = parseInt(dobParts[0], 10);
      let month = parseInt(dobParts[1], 10) - 1;
      let year = parseInt(dobParts[2], 10);
      let dob = new Date(year, month, day);
      //   const dateOfBirth = employee.dob;
      let currentDate = new Date();

      let age = currentDate.getFullYear() - dob.getFullYear();
      if (
        currentDate.getMonth() < dob.getMonth() ||
        (currentDate.getMonth() === dob.getMonth() &&
          currentDate.getDate() < dob.getDate())
      ) {
        age--;
      }
      //   console.log("Age:", age);/
      const empNameHead = document.getElementById("headerdetails");
      empNameHead.innerHTML = `
<div class="directory">
<p>Dashboard / <a href="/">Employees</a>
/ ${employee.first_name} ${employee.last_name}</p>
<h1>Employees</h1>
</div>
`;
      const employeeDetails = document.getElementById("detailsemp");

      employeeDetails.innerHTML = `
        <div style="position: relative;" class="col head pt-3">
                        <img src="/img/Background_Image.png" alt="">
                    </div>
                    <div style="justify-content: center;" class="col profile_img d-flex">
                    ${employee.avatar ?
                        `<img class="profile-img" src="/${employee.avatar}">` :
                        `<div class="dummyImgView">
                           <h2>${employee.first_name.slice(0, 1).toUpperCase()}${employee.last_name
                               .slice(0, 1)
                               .toUpperCase()}</h2>
                         </div>`}

                    </div>
                    <div style="flex-direction: column;text-align: center;" class="col emp_details d-flex">
                        <h5>${employee.first_name} ${employee.last_name}</h5>
                        <p>${employee.email}</p>
                    </div>
                    <div class="row details mb-4">
                        <div class="col-4">
                            <div class="data">
                                <p>Gender</p>
                                <h6>${employee.gender}</h6>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="data">
                                <p>Age</p>
                                <h6>${age}</h6>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="data">
                                <p>Date of Birth</p>
                                <h6>${employee.dob}</h6>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-4">
                        <div class="col-6">
                            <div class="data">
                                <P>Mobile Number</P>
                                <h6>${employee.phone}</h6>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="data">
                                <p>Qualifications</p>
                                <h6>${employee.qualification}</h6>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-5">
                        <div class="col-6">
                            <div class="data">
                                <P>Address</P>
                                <h6>${employee.address}</h6>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="data pb-5">
                                <p>Username</p>
                                <h6>${employee.username}
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div class="view_button mb-4 pb-5">
                    <button type="button" class="btn btn-primary" onclick="deleteEmployee('${employee._id}')">Delete</button>
                    <button class="btn menu_button"  onclick="editEmployeeDetails('${employee._id}')">Edit Details</button>
                </div>
       `;
    });
}

detailsEmployee(id);

function redirect() {
  location.replace("/");
}


// function printdiv(printable_div_id) {
//   var header_str =
//     "<html><head><title>" + document.title + "</title></head><body>";
//   var footer_str = "</body></html>";
//   var new_str = document.getElementById(printable_div_id).innerHTML;
//   var old_str = document.body.innerHTML;
//   document.body.innerHTML = header_str + new_str + footer_str;
//   window.print();
//   document.body.innerHTML = old_str;
//   false;
// }
