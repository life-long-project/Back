const { check, validationResult } = require("express-validator");
const User = require("../../models/user");

/*
fields required:

    f_name (string, required),
    l_name (string, required),
    email (string[correct email], required),
    password (string, required),
    confirm_password (string, required),

    phone (string, optional),
    gender (string, optional),
    age (number, optional),
    city (string, optional),
    country (string, optional),
    past_experience (string, optional)
    skills (array, optional),

 */

// todo: add validation for update user

exports.validate_user_signup = [
  check("f_name")
    .notEmpty()
    .withMessage("first name required!")
    .isString()
    .withMessage("Invalid first name, must be string")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("First name must be between 3 and 20 characters!"),
  check("l_name")
    .notEmpty()
    .withMessage("Last name required!")
    .isString()
    .withMessage("Invalid last name, must be string")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Job name must be between 3 and 20 characters"),
  check("email")
    .notEmpty()
    .withMessage("Email required!")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email")
    .custom(async (value) => {
      await User.findOne({ email: value }).then((user) => {
        if (user) {
          throw new Error("Email already exists");
        }
        return true;
      });
    }),
  check("password")
    .notEmpty()
    .withMessage("Password required!")
    .isString()
    .withMessage("Invalid Password, must be string")
    .trim()
    .isLength({ min: 8, max: 30 })
    .withMessage("Password must be between 8 and 30 characters"),
  check("confirm_password")
    .notEmpty()
    .withMessage("Confirmation password required!")
    .isString()
    .withMessage("Invalid confirmation password, must be string")
    .trim()
    .isLength({ min: 8, max: 30 })
    .withMessage("Confirmation password must be between 8 and 30 characters")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords must match");
      }
      return true;
    }),

  check("phone")
    .optional()
    .isString()
    .withMessage("Invalid phone number, must be string")
    .trim()
    .isLength({ min: 11, max: 13 })
    .withMessage("Phone number must be 11 or 13 numbers"),

  check("gender")
    .optional({ nullable: true })
    .trim()
    .isString()
    .withMessage("Invalid gender, must be string")
    .isIn(["male", "female"])
    .withMessage("gender must be male or female"),

  check("age")
    .optional({ nullable: true })
    .notEmpty()
    .isString()
    .withMessage("Invalid age, must be string")
    .isLength({ min: 1, max: 3 })
    .withMessage("Age must be a valid number"),

  check("city")
    .optional({ nullable: true })
    .notEmpty()
    .isString()
    .withMessage("Invalid city, must be string")
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("city must be between 3 and 20 characters"),
  check("country")
    .optional({ nullable: true })
    .notEmpty()
    .isString()
    .withMessage("Invalid country, must be string")
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("country must be between 3 and 20 characters"),

  check("past_experience")
    .optional({ nullable: true })
    .isString().withMessage("Invalid experience, must be string")
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage("past experience must be within 3 and 200 characters"),

  check("feed_back")
    .optional({ nullable: true })
    .isArray()
    .trim()
    .isLength({ min: 3, max: 500 })
    .withMessage("feed back must be within 3 and 500 characters")
    .withMessage(
      "Invalid feed back, must be array of string [ feed back1 , feed back2] "
    ),

  check("skills")
    .optional({ nullable: true })
    .isArray()
    .withMessage('Skills must be an array of string ["skill 1","skill 2"]'),
];

exports.validate_user_login = [
  check("email")
    .notEmpty()
    .withMessage("Email required!")
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email")
    .custom(async (value) => {
      await User.findOne({ email: value }).then((user) => {
        if (!user) {
          throw new Error("Not Found this account");
        }
        return true;
      });
    }),
  check("password")
    .notEmpty()
    .withMessage("Password required!")
    .isString()
    .withMessage("Invalid Password")
    .trim()
    .isLength({ min: 8, max: 30 })
    .withMessage("Password must be between 8 and 30 characters"),
];

exports.user_validation = (req, res, next) => {
  const result = validationResult(req).array();
  console.log(result);
  if (!result.length) return next();
  const error = result[0].msg;
  return res.status(401).json({ message: error });
};
