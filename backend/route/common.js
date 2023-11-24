const express = require("express");
const { checkDuplicateUser } = require("../controllers/authControl/user");
const {
  Country,
  State,
  City,
  defaultCSC,
} = require("../controllers/commonControl/csc");
const {
  forgotPassword,
  verifyPassword,
  sendMailOtp,
} = require("../controllers/commonControl/forgot_pass");
const { login } = require("../controllers/commonControl/login");
const {
  register,
  deleteRegisteredUser,
} = require("../controllers/commonControl/register");
const { makeCSV, makePdf } = require("../controllers/commonControl/export");
const {
  validateRegister,
  validateLogin,
  isRequestValidated,
  validateForgotPass,
  validateVerifyPass,
  validateMailOtp,
  validateMakeCSV,
} = require("../validation/validator");

const router = express.Router();

router.post("/register", validateRegister, isRequestValidated, register);
router.delete("/register/:id", deleteRegisteredUser);
router.post("/login", validateLogin, isRequestValidated, login);
router.post(
  "/forgot-pass",
  validateForgotPass,
  isRequestValidated,
  forgotPassword
);
router.post(
  "/reset-password",
  validateVerifyPass,
  isRequestValidated,
  verifyPassword
);
router.post("/send-mail-otp", validateMailOtp, isRequestValidated, sendMailOtp);
router.post("/check-email", checkDuplicateUser);

//NOTE: All route for pdf
router.post("/make-pdf/:table", makePdf);
router.post("/make-csv", validateMakeCSV, isRequestValidated, makeCSV);

//NOTE: All CSC API
router.get("/defCSC", defaultCSC);
router.get("/country", Country);
router.get("/state/:countryCode", State);
router.get("/city/:countryCode/:stateCode", City);

module.exports = router;
