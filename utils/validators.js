const { body } = require("express-validator");
const User = require("../models/user");

exports.registerValidators = [
  body("email", "Please enter correct email")
    .isEmail()
    .custom(async (value, { req }) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          return Promise.reject("This email already registered");
        }
      } catch (error) {
        console.log(error);
      }
    })
    .normalizeEmail(),
  body("password", "Password must be 6 - 56 characters")
    .isLength({ min: 6, max: 56 })
    .isAlphanumeric()
    .trim(),
  body("confirm")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords must match");
      }
      return true;
    })
    .trim(),
  body("name", "Name must be min 3 characters").isLength({ min: 3 }).trim(),
];

exports.loginValidators = [
  body("email", "Please enter correct email")
    .isEmail()
    .custom(async (value, { req }) => {
      try {
        const user = await User.findOne({ email: value });
        if (!user) {
          return Promise.reject("Email is Invalid");
        }
      } catch (error) {
        console.log(error);
      }
    })
    .normalizeEmail(),
  body("password", "Password must be 6 - 56 characters")
    .isLength({ min: 6, max: 56 })
    .isAlphanumeric()
    .trim()
];

exports.courseValidators = [
    body('title', 'Name must be minimum 3 characers').isLength({min: 3}).trim(),
    body('price', "Enter correct price").isNumeric(),
    body('img', "Enter correct Image URL").isURL()
]