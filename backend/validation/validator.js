const { check, validationResult } = require("express-validator");
const passwordStrength = require("check-password-strength");

exports.validateRegister = [
  check("first_name").exists().isString(),
  check("last_name").exists().isString(),
  check("email")
    .exists()
    .withMessage("Can not set empty")
    .isEmail()
    .withMessage("Enter the correct email address"),
  check("password")
    .exists()
    .custom((value) => {
      let strength = passwordStrength(value).value;
      return new Promise((resolve, reject) => {
        if (strength == "Strong" || strength == "Medium") {
          return resolve();
        } else {
          return reject();
        }
      });
    })
    .withMessage(
      "Password must contain lowercase, uppercase, symbol and/or number"
    ),
  check("acc_type").exists().isNumeric(),
];

exports.validateLogin = [
  check("email")
    .exists()
    .withMessage("Can not set empty")
    .isEmail()
    .withMessage("Enter the correct email address"),
  check("password").exists(),
  check("acc_type").exists().isNumeric(),
  check("fcm_token").optional({ checkFalsy: true }),
  check("device_type").exists(),
];

exports.validateLogout = [check("device_type").exists()];

exports.validateForgotPass = [
  check("email")
    .exists()
    .withMessage("Can not set empty")
    .isEmail()
    .withMessage("Enter the correct email address"),
];

exports.validateChangePassword = [
  check("old_password").exists().isString(),
  check("new_password")
    .exists()
    .custom((value) => {
      let strength = passwordStrength(value).value;
      return new Promise((resolve, reject) => {
        if (strength == "Strong" || strength == "Medium") {
          return resolve();
        } else {
          return reject();
        }
      });
    })
    .withMessage(
      "Your new password must contain lowercase, uppercase, symbol and/or number"
    ),
];

exports.validateVerifyPass = [
  check("token").exists().isString(),
  check("password")
    .exists()
    .custom((value) => {
      let strength = passwordStrength(value).value;
      return new Promise((resolve, reject) => {
        if (strength == "Strong" || strength == "Medium") {
          return resolve();
        } else {
          return reject();
        }
      });
    })
    .withMessage(
      "Password must contain lowercase, uppercase, symbol and/or number"
    ),
];

exports.validateMailOtp = [check("token").exists().isString()];

exports.validateAddUser = [
  check("first_name").exists().isString(),
  check("last_name").exists().isString(),
  check("branch_access").exists().isString(),
  check("email").exists().isEmail(),
  check("mobile_no").exists().isNumeric(),
  check("acc_type").exists().isString(),
];

exports.validateEditProfile = [
  check("first_name").optional({ checkFalsy: true }).isString(),
  check("last_name").optional({ checkFalsy: true }).isString(),
  check("mobile_no").optional({ checkFalsy: true }).isNumeric(),
  check("email").optional({ checkFalsy: true }).isEmail(),
  check("company_email").optional({ checkFalsy: true }).isEmail(),
];

exports.validateEditUser = [
  check("first_name").optional({ checkFalsy: true }).isString(),
  check("last_name").optional({ checkFalsy: true }).isString(),
  check("branch_access").optional({ checkFalsy: true }).isString(),
  check("email").optional({ checkFalsy: true }).isEmail(),
  check("mobile_no").optional({ checkFalsy: true }).isNumeric(),
  check("user_type").optional({ checkFalsy: true }).isString(),
];

exports.validateAddBranch = [
  check("name").exists().isString(),
  check("location").exists().isString(),
  check("countryCode").exists().isString(),
];

exports.validateUpdateBranch = [
  check("name").optional({ checkFalsy: true }).isString(),
  check("location").optional({ checkFalsy: true }).isString(),
];

exports.validateAccessBranch = [check("branch_access").exists().isString()];

exports.validateAddItem = [
  check("order_from").exists().isString(),
  check("order_to").exists().isString(),
  check("order_type").exists().isString(),
  check("stock").exists().isNumeric(),
  check("currency").exists().isString(),
  check("price").exists().isNumeric(),
  check("packet_number").optional({ checkFalsy: true }).isString(),
];

exports.validateUpdateItem = [
  check("order_from").optional({ checkFalsy: true }).isString(),
  check("order_to").optional({ checkFalsy: true }).isString(),
  check("description").optional({ checkFalsy: true }).isString(),
  check("order_type").optional({ checkFalsy: true }).isString(),
  check("stock").optional({ checkFalsy: true }).isString(),
  check("currency").optional({ checkFalsy: true }).isString(),
  check("price").optional({ checkFalsy: true }).isNumeric(),
  check("packet_number").optional({ checkFalsy: true }).isNumeric(),
];

exports.validateCompanyBank = [
  check("company_data").exists(),
  check("company_data.name").exists().isString(),
  check("company_data.email").exists().isEmail(),
  check("company_data.phone_no").exists().isNumeric(),
  check("company_data.website")
    .optional({ checkFalsy: true })
    .matches(
      /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi
    )
    .withMessage("Url is not valid"),
  check("company_data.attn_to").exists().isString(),
  check("company_data.mobile_no").optional({ checkFalsy: true }).isNumeric(),
  check("company_data.address").exists().isString(),
  check("company_data.tin_no").optional({ checkFalsy: true }).isString(),
  check("company_data.branch_name").exists().isString(),
  check("company_data.ein_no")
    .optional({ checkFalsy: true })
    .isString()
    .matches(/^\\d{2}-?\\d{7}$/)
    .withMessage("Please enter valid EIN number"),
  check("company_data.pancard_no")
    .optional({ checkFalsy: true })
    .isString()
    .matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/)
    .withMessage("Please enter valid pancard number"),
  check("company_data.city").optional({ checkFalsy: true }),
  check("company_data.state").optional({ checkFalsy: true }),
  check("company_data.country").exists(),
  check("company_data.gst_no")
    .optional({ checkFalsy: true })
    .isString()
    .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)
    .withMessage("Please enter valid GST no"),
  check("bank_data").exists(),
  check("bank_data.bank_name").exists().isString(),
  check("bank_data.account_name").exists().isString(),
  check("bank_data.dealer_code").exists().isString(),
  check("bank_data.account_no")
    .exists()
    .isString()
    .matches(/^[0-9]{2}(?:[0-9]{9}|-[0-9]{3}-[0-9]{6})$/)
    .withMessage("Please enter valid account number"),
  check("bank_data.ifsc_code")
    .exists()
    .isString()
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/)
    .withMessage("Please enter valid IFSC no"),
  check("bank_data.swift_code")
    .exists()
    .isString()
    .matches(/^[a-zA-Z]{4}[a-zA-Z]{2}[a-zA-Z0-9]{2}[XXX0-9]{0,3}/)
    .withMessage("Please enter valid Swift no"),
  check("bank_data.aba_routing_no").optional({ checkFalsy: true }).isString(),
];

exports.validateCompany = [
  check("name").exists().isString(),
  check("email").exists().isEmail(),
  check("phone_no").exists().isNumeric(),
  check("website")
    .optional({ checkFalsy: true })
    .matches(
      /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi
    )
    .withMessage("Url is not valid"),
  check("attn_to").exists().isString(),
  check("mobile_no").optional({ checkFalsy: true }).isNumeric(),
  check("address").exists().isString(),
  check("tin_no").optional({ checkFalsy: true }).isString(),
  check("branch_name").exists().isString(),
  check("ein_no")
    .optional({ checkFalsy: true })
    .isString()
    .matches(/^\\d{2}-?\\d{7}$/)
    .withMessage("Please enter valid EIN number"),
  check("pancard_no")
    .optional({ checkFalsy: true })
    .isString()
    .matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/)
    .withMessage("Please enter valid pancard number"),
  check("city").optional({ checkFalsy: true }),
  check("state").optional({ checkFalsy: true }),
  check("country").exists(),
  check("gst_no")
    .optional({ checkFalsy: true })
    .isString()
    .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)
    .withMessage("Please enter valid GST no"),
];

exports.validateBank = [
  check("bank_name").exists().isString(),
  check("account_name").exists().isString(),
  check("dealer_code").exists().isString(),
  check("account_no")
    .exists()
    .isString()
    .matches(/^[0-9]{2}(?:[0-9]{9}|-[0-9]{3}-[0-9]{6})$/)
    .withMessage("Please enter valid account number"),
  check("ifsc_code")
    .exists()
    .isString()
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/)
    .withMessage("Please enter valid IFSC no"),
  check("swift_code")
    .exists()
    .isString()
    .matches(/^[a-zA-Z]{4}[a-zA-Z]{2}[a-zA-Z0-9]{2}[XXX0-9]{0,3}/)
    .withMessage("Please enter valid Swift no"),
  check("aba_routing_no").optional({ checkFalsy: true }).isString(),
];

exports.validateInventory = [
  check("name").exists().isString(),
  check("sub_name").optional({ checkFalsy: true }).isString(),
  check("description").exists().isString(),
  check("type").exists().isString(),
  check("account").exists().isString(),
  check("on_hand").exists().isDecimal(),
  check("avg_price").exists().isDecimal(),
];

exports.validateChartOfAccount = [
  check("name").exists().isString(),
  check("sub_name").optional({ checkFalsy: true }).isString(),
  check("type").exists().isString(),
  check("balance").exists().isDecimal(),
];

exports.validateTransaction = [
  check("payee").exists().isString(),
  check("account").exists().isString(),
  check("memo").exists().isString(),
  check("deposite").exists().isDecimal(),
  check("payment").exists().isDecimal(),
  check("balance").exists().isDecimal(),
];

exports.validateMakeCSV = [
  check("data").exists().withMessage("Must have valid json array"),
];

exports.validateInvoice = [
  check("date").exists().isDate(),
  check("invoice_id").exists().isNumeric(),
  check("branch_id").exists().isNumeric(),
  check("customer_id").exists().isNumeric(),
  check("p_o_number").optional({ checkFalsy: true }).isNumeric(),
  check("terms").optional({ checkFalsy: true }).isNumeric(),
  check("ship").optional({ checkFalsy: true }).isDate(),
  check("bill_to").optional({ checkFalsy: true }).isString(),
  check("ship_to").optional({ checkFalsy: true }).isString(),
  check("via").optional({ checkFalsy: true }).isString(),
  check("f_o_b").optional({ checkFalsy: true }).isString(),
  check("rap").optional({ checkFalsy: true }).isNumeric(),
  check("broker").optional({ checkFalsy: true }).isString(),
  check("brokerage").optional({ checkFalsy: true }).isNumeric(),
  check("pre_carriage_by").optional({ checkFalsy: true }).isString(),
  check("flight_no").optional({ checkFalsy: true }).isString(),
  check("final_dest").optional({ checkFalsy: true }).isString(),
  check("port_of_loading").optional({ checkFalsy: true }).isString(),
  check("country_of_goods").optional({ checkFalsy: true }).isString(),
];

exports.validateInvoiceProduct = [
  check("date").exists().isDate(),
  check("invoice_id").exists().isNumeric(),
  check("description").exists().isString(),
  check("qty").exists().isNumeric(),
  check("rate").exists().isNumeric(),
  check("currency").exists().isString(),
  check("amount").exists().isNumeric(),
  check("tax").optional({ checkFalsy: true }).isNumeric(),
];

exports.validateLocalBill = [
  check("vendor_name").exists().isString(),
  check("date").exists().isDate(),
  check("invoice_id").exists().isString(),
  check("p_o_number").exists().isNumeric(),
  check("terms").exists().isNumeric(),
  check("ship").exists().isDate(),
  check("bill_to").exists().isString(),
  check("ship_to").exists().isString(),
  check("via").exists().isString(),
  check("f_o_b").exists().isString(),
  check("rep").exists().isNumeric(),
  check("broker").exists().isString(),
  check("brokerage").exists().isNumeric(),
];

exports.validateInstraStateBill = [
  check("vendor_name").exists().isString(),
  check("date").exists().isDate(),
  check("invoice_id").exists().isString(),
  check("p_o_number").exists().isNumeric(),
  check("terms").exists().isNumeric(),
  check("ship").exists().isDate(),
  check("bill_to").exists().isString(),
  check("ship_to").exists().isString(),
  check("via").exists().isString(),
  check("f_o_b").exists().isString(),
  check("rep").exists().isNumeric(),
  check("broker").exists().isString(),
  check("brokerage").exists().isNumeric(),
];

exports.validateExportBill = [
  check("vendor_name").exists().isString(),
  check("date").exists().isDate(),
  check("invoice_id").exists().isString(),
  check("p_o_number").exists().isNumeric(),
  check("terms").exists().isNumeric(),
  check("ship").exists().isDate(),
  check("bill_to").exists().isString(),
  check("ship_to").exists().isString(),
  check("via").exists().isString(),
  check("f_o_b").exists().isString(),
  check("rep").exists().isNumeric(),
  check("broker").exists().isString(),
  check("brokerage").exists().isNumeric(),
  check("pre_carriage_by").exists().isString(),
  check("flight_no").exists().isString(),
  check("final_dest").exists().isString(),
  check("port_of_loading").exists().isString(),
  check("country_of_goods").exists().isString(),
];

exports.validateFundTransfer = [
  check("class").exists().isString(),
  check("t_f_from").exists().isString(),
  check("t_f_to").exists().isString(),
  check("date").exists().isDate(),
  check("t_currency").exists().isDecimal(),
  check("t_amount").exists().isDecimal(),
];

exports.validateCustomer = [
  check("name").exists().isString(),
  check("email").exists().isEmail().withMessage("Must be an valid email"),
  check("phone_no").exists().isNumeric(),
  check("billing_address").exists().isString(),
  check("shipping_address").exists().isString(),
  check("website").optional({ checkFalsy: true }).isString(),
  check("company_name").optional({ checkFalsy: true }).isString(),
  check("notes").optional({ checkFalsy: true }).isString(),
];

exports.validateVendor = [
  check("type").exists().isString(),
  check("number").exists().isString(),
  check("date").exists().isDate(),
  check("account").exists().isString(),
  check("account_no").exists().isString(),
  check("amount").exists().isDecimal(),
];

exports.validateOrder = [
  check("amount").exists().isNumeric().withMessage("Must be valid Number"),
  check("currency").exists().isCurrency().withMessage("Must be valid currency"),
  check("receipt").exists().isString().withMessage("Receipt is require"),
];

exports.validateCapturePayment = [
  check("amount").exists().isNumeric().withMessage("Must be valid Number"),
  check("currency").exists().isCurrency().withMessage("Must be valid currency"),
];

exports.validatePurchaseOrder = [
  check("vendor_name").exists().isString(),
  check("date").exists().isDate(),
  check("vendor").exists().isString(),
  check("p_o_number").exists().isString(),
  check("ship_to").exists().isString(),
];

exports.validateSalesOrder = [
  check("customer_name").exists().isString(),
  check("date").exists().isDate(),
  check("address").exists().isString(),
  check("s_o_number").exists().isString(),
  check("rap").exists().isString(),
  check("ship_to").exists().isString(),
];

exports.validateInvoiceProductIn = [
  check("invoice_id").exists().isNumeric(),
  check("product_id").exists().isString(),
];

exports.validateTerms = [check("terms").exists().isString()];

exports.validateShip = [
  check("invoice_id").exists().isNumeric(),
  check("shipping_detail").exists().isString(),
  check("customer_id").exists().isNumeric(),
  check("item_id").exists().isNumeric(),
  check("currency").exists().isString(),
  check("total").exists().isDecimal(),
  check("invoice_type").exists().isString(),
  check("sub_total").exists().isDecimal(),
  check("tax_rate").exists().isDecimal(),
  check("shipping_partner").exists().isString(),
  check("shipping_address").exists().isString(),
  check("date").exists().isDate(),
  check("tracking_number").exists().isNumeric(),
  check("approx_delivery_date").exists().isDate(),
  check("status").optional({ checkFalsy: true }).isString(),
];

exports.validateTrack = [
  check("shipment_date").exists().isDate(),
  check("customer_id").exists().isNumeric(),
  check("ship_id").exists().isNumeric(),
  check("currency").exists().isString(),
  check("total_carats").exists().isDecimal(),
  check("total_value").exists().isDecimal(),
  check("total").exists().isDecimal(),
  check("status").optional({ checkFalsy: true }).isString(),
];

exports.validateLoanAccount = [
  check("emi_amount").exists().isDecimal(),
  check("start_balance").exists().isDecimal(),
  check("end_balance").exists().isDecimal(),
  check("payment_amount").exists().isDecimal(),
  check("principal").exists().isDecimal(),
  check("interest").exists().isDecimal(),
  check("loan_code").exists().isString(),
  check("bank").exists().isString(),
  check("borrowers").exists().isArray(),
  check("gaurenters").exists().isArray(),
  check("property_detail").exists().isArray(),
  check("tenure").exists().isNumeric(),
  check("processing_changes").exists().isString(),
];

exports.validateFilesForChat = [
  check("from_id").exists().isNumeric().withMessage("Must be a numeric value"),
  check("to_id").exists().isNumeric().withMessage("Must be a numeric value"),
  check("msg").optional().isString().withMessage("Must be an valaid string"),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.array().length > 0) {
    console.error(errors.errors);
    res.json({
      success: false,
      errors: errors.errors,
      field_msg: errors.errors[0].msg,
      message: "Invalid body or header parameters",
    });
  } else {
    next();
  }
};
