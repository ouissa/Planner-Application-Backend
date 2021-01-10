const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../model/User");
const auth = require("../middleware/auth");

// this function takes the user information from the body of the request
// It constructs a new  User object for the corresponding student if the information provided is valid
// It addes the new User to Users collection
// It returns an error message in the case of a failure in any of the previous steps
async function addStudent(req, res) {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        //fix this to be good with the new fields in the form
        const {
            fname,
            lname,
            stuId,
            phoneNum,
            cinNum,
            email,
            password,
        } = req.body;
        try {
            let user = await User.findOne({
                email
            });
            if (user) {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
            }

            user = new User({
              fname,
              lname,
              stuId,
              phoneNum,
              cinNum,
              email,
              password
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                "randomString", {
                    expiresIn: 10000
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
 }

// this function takes the user email and password from the body of the request
// It searches in the Users Collection for the corresponding student if the information provided is valid
// It returns a success message in the case of a successful login
// It returns an error message in the case of a failure in any of the previous steps
async function loginStudent(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email
      });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist"
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !"
        });

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        "secret",
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          console.log("loged in");
          res.status(200).json({
            
            token
          });
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
}

// this function returns the User object of the logged in user
// It returns an error message in the case of a failure in any of the previous steps
async function getStudent(req, res) {
    try {
        // request.user is getting fetched from Middleware after token authentication
        const user = await User.findById(req.user.id);
        res.json(user);
      } catch (e) {
        res.send({ message: "Error in Fetching user" });
    }
}

// POST request handling for creating a new User
router.post(
    "/signup",
    [
        check("fname", "Please Enter a Valid Username")
        .not()
        .isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        await addStudent(req, res);
    }
);

// POST request handling for logging in
router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    await loginStudent(req, res);
  }
);


// GET request handling for getting the logged in user
router.get("/me", auth, async (req, res) => {
    await getStudent(req, res);
});

// GET request handling for logging out from the currently logged in user
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


module.exports = router;