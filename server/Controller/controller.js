var Employeesdb = require("../Model/model");
const path = require("path");
const multer = require("multer");
// multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "avatars");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Multer upload configuration
const upload = multer({ storage: storage }).single("avatar");

// create and save new employee
exports.create = (req, res) => {
  console.log("init file", req.files);
  upload(req, res, async (error) => {
    if (error instanceof multer.MulterError) {
      console.log("init avatar", req.body.avatar);
      return res.status(400).json({ error: "image error" + error });
    } else if (error) {
      return res.status(500).json({ error: "server error " + error });
    } else {
      console.log("val");
      // Validate required fields
      const requiredFields = [
        "salutation",
        "first_name",
        "last_name",
        "gender",
        "dob",
        "email",
        "phone",
        "username",
        "password",
        "qualification",
        "address",
        "country",
        "state",
        "city",
        "zip_pin",
      ];
      for (const field of requiredFields) {
        if (!req.body[field]) {
          console.log(req.body);
          return res
            .status(400)
            .send({ message: `Error: Missing ${field} field` });
        }
      }

      console.log("Received Data:", req.body);
      console.log("Received File:", req.file);

      const avatarPath = req.file ? req.file.path : null;
      console.log(avatarPath);
      //new employee
      const employees = new Employeesdb({
        salutation: req.body.salutation,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        dob: req.body.dob,
        gender: req.body.gender,
        address: req.body.address,
        qualification: req.body.qualification,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        zip_pin: req.body.zip_pin,
        username: req.body.username,
        password: req.body.password,
        avatar: avatarPath,
      });

      //save to database
      employees
        .save(employees)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "some eroor while creating a create operation",
          });
        });
    }
  });
};

exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    Employeesdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "user not found with this id" + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "error retrieving user with id" + id });
      });
  } else {
    Employeesdb.find()
      .then((employees) => {
        res.send(employees);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "error occured",
        });
      });
  }
};

exports.update = (req, res) => {
  upload(req, res, async (error) => {
    if (error instanceof multer.MulterError) {
      res.status(400).json({ err: "image upload erroe" });
    } else if (error) {
      res.status(500).json({ error: "server error" });
    }

    let avatarPath;
    if (req.file) {
      avatarPath = path.join("avatars", req.file.filename);
    } else {
      // If no new file is uploaded, keep the existing avatar path
      const emp = await Employeesdb.findById(req.params.id);
      if (!emp) {
        res.status(404).json({ error: "employee not found" });
        return;
      }
      avatarPath = emp.avatar; // Use the existing avatar path
    }

    const emp = await Employeesdb.findById(req.params.id);
    if (!emp) {
      res.status(404);
      throw new Error("employee not found");
    }

    // Update avatar only if a new file was uploaded
    const updateData = {
      ...req.body,
      ...(avatarPath ? { avatar: avatarPath } : {}), // Conditionally include avatar field
    };

    console.log(avatarPath);
    const upd = await Employeesdb.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    console.log(upd);
    res.status(200).json(upd);
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Employeesdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `cannot delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({
          message: "user deleted successfully",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: " could not delete user with id" + id,
      });
    });
};

// search
exports.search = (req, res) => {
  const query = req.query.q.toString();
  console.log(query);
  Employeesdb.find({
    $or: [
      { first_name: { $regex: new RegExp(query, "i") } },
      { last_name: { $regex: new RegExp(query, "i") } },
      { email: { $regex: new RegExp(query, "i") } },
    ],
  })
    .exec()
    .then((items) => {
      res.json({
        data: items.reverse(),
        length: items.length,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
};

// pagination
