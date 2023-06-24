import * as socketIO from "socket.io";
const socket = socketIO.connect();

const { check, validationResult } = require("express-validator");

// todo: add validation for creating rate

exports.validate_apply_offer = [
  check("price").notEmpty().withMessage("price is required").trim(),
  check("message").optional().trim(),
];

exports.offer_validation = (req, res, next) => {
  const result = validationResult(req).array();
  console.log(result);
  if (!result.length) {
    const message = "Someone has applied to your job";
    // Emit the notification event to the user
    io.to(req.user._id).emit("notification", { message });
    return next();
  }
  const error = result[0].msg;
  return res.status(401).json({ message: error });
};
