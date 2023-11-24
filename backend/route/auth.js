/**
 * @author [Parthiv Akbari]
 * @email [parthiv@rentechdigital.com]
 * @create date 2021-02-24 16:15:11
 * @modify date 2021-03-02 14:01:22
 * @desc [description]
 */

const express = require("express");
const fileUpload = require("express-fileupload");

const {
  addBranch,
  getBranch,
  updateBranch,
  deleteBranch,
} = require("../controllers/authControl/branch");
const {
  addChartOfAccount,
  getChartOfAccount,
  updateChartOfAccount,
  deleteChartOfAccount,
} = require("../controllers/authControl/chart-of-account");
const {
  addCompany,
  getCompany,
  updateCompany,
  deleteCompany,
  companyLogo,
  onlyLogoUpload,
  addBank,
  getOneCompany,
  updateBank,
  deleteBank,
} = require("../controllers/authControl/company");
const {
  addInventory,
  getInventory,
  updateInventory,
  deleteInventory,
} = require("../controllers/authControl/inventory");
const {
  addItem,
  getItem,
  updateItem,
  deleteItem,
} = require("../controllers/authControl/item");
const {
  addTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/authControl/transaction");
const {
  getNotification,
  getNotificationById,
} = require("../controllers/authControl/notification");
const {
  addUser,
  getUser,
  getCurrentUser,
  editProfile,
  deleteUser,
  editUser,
  editImage,
  changePassword,
} = require("../controllers/authControl/user");
const { logout } = require("../controllers/commonControl/logout");
const {
  checkForPacketNumber,
  checkAdminAndSuper,
} = require("../controllers/middleware/midd_control");
const {
  validateAddUser,
  isRequestValidated,
  validateEditProfile,
  validateEditUser,
  validateAddBranch,
  validateUpdateBranch,
  validateAddItem,
  validateUpdateItem,
  validateLogout,
  validateCompany,
  validateInventory,
  validateChartOfAccount,
  validateTransaction,
  validateChangePassword,
  validateLocalBill,
  validateInstraStateBill,
  validateExportBill,
  validateFundTransfer,
  validateCustomer,
  validateVendor,
  validateOrder,
  validateCapturePayment,
  validatePurchaseOrder,
  validateSalesOrder,
  validateBank,
  validateCompanyBank,
  validateInvoice,
  validateInvoiceProduct,
  validateInvoiceProductIn,
  validateTerms,
  validateShip,
  validateTrack,
  validateLoanAccount,
  validateFilesForChat,
} = require("../validation/validator");
const {
  addInvoice,
  getLocalInvoice,
  getIntraStateInvoice,
  getExportInvoice,
  editInvoice,
  deleteInvoice,
  getMInvoice,
  changeInvoiceStatus,
  batchDeleteInvoice,
  duplicateInvoiceHandler,
  getInvoiceById,
  getLatestInvoiceId,
  sendReminderInvoice,
  addInvoiceProduct,
  getInvoiceProduct,
  editInvoiceProduct,
  deleteInvoiceProduct,
  attachmentinNewInvoice,
  getInvoiceProductById,
  updateInvoiceIdInProduct,
  invoiceEmailWithTemplate,
  setInvoiceTemplateValue,
  sendInvoiceOnEmail,
  sendInvoiceWithPdf,
  getProductByCustomer,
} = require("../controllers/authControl/invoice");
const {
  addBill,
  getLocalBill,
  editBill,
  getIntraStateBill,
  getExportBill,
  deleteBill,
  getMBill,
  setBillTemplateValue,
  sendBillWithPdf,
} = require("../controllers/authControl/bill");
const {
  addFundTransfer,
  getFundTransfer,
  editFundTransfer,
  deleteFundTransfer,
} = require("../controllers/authControl/funds_transafer");
const {
  addCustomer,
  getCustmer,
  editCustomer,
  deleteCustomer,
  searchCustomer,
  getCustomerById,
} = require("../controllers/authControl/customer");
const {
  addVendor,
  getVendor,
  editVendor,
  deleteVendor,
} = require("../controllers/authControl/vendor");
const { getDashboard } = require("../controllers/authControl/dashboard");
const {
  getOrder,
  verification,
  capturePayment,
} = require("../handlers/pay_handle");
const {
  addPurchaseOrder,
  getPurchaseOrder,
  editPurchaseOrder,
  deletePurchaseOrder,
} = require("../controllers/authControl/purchase_order");
const {
  addSalesOrder,
  getSalesOrder,
  editSalesOrder,
  deleteSalesOrder,
} = require("../controllers/authControl/sales_order");
const {
  getProfitLoss,
  getBalanceSheet,
} = require("../controllers/authControl/profitLossAndBalance");
const {
  addTerms,
  getTerms,
  editTerms,
  deleteTerms,
} = require("../controllers/authControl/terms-list");
const {
  addShip,
  getShip,
  editShip,
  deleteShip,
  addTrack,
  getTrack,
  editTrack,
  deleteTrack,
  searchTrackUsers,
  uploadFilesForChat,
  getUserAlreadyChat,
  getChatForPerticularUser,
} = require("../controllers/authControl/ship&track");
const {
  addLoanAccount,
  getLoanAccount,
  editLoanAccount,
  deleteLoanAccount,
} = require("../controllers/authControl/loan_account");

const router = express.Router();
router.use(fileUpload());

//NOTE: All user routes
router.post("/user", validateAddUser, isRequestValidated, addUser);
router.get("/user", getUser);
router.put("/user/:id", validateEditUser, isRequestValidated, editUser);
router.delete("/user/:id", deleteUser);
router.get("/current-user", getCurrentUser);
router.post(
  "/change-password",
  validateChangePassword,
  isRequestValidated,
  changePassword
);

//NOTE: All branch route
router.post("/branch", validateAddBranch, isRequestValidated, addBranch);
router.get("/branch", getBranch);
router.put(
  "/branch/:id",
  validateUpdateBranch,
  isRequestValidated,
  updateBranch
);
router.delete("/branch/:id", deleteBranch);

//NOTE: All item route
router.post(
  "/item",
  validateAddItem,
  isRequestValidated,
  checkForPacketNumber,
  addItem
);
router.get("/item", getItem);
router.put("/item/:id", validateUpdateItem, isRequestValidated, updateItem);
router.delete("/item/:id", deleteItem);

//NOTE: All profile route
router.put(
  "/profile",
  validateEditProfile,
  isRequestValidated,
  checkAdminAndSuper,
  editProfile
);
router.post("/profile-img", editImage);

//NOTE: All invoice routes
router.post(
  "/invoice",
  validateInvoice,
  isRequestValidated,
  duplicateInvoiceHandler,
  addInvoice
);
router.post(
  "/send-invoice/:id",
  setInvoiceTemplateValue,
  invoiceEmailWithTemplate,
  sendInvoiceOnEmail
);
router.post("/pdf-invoice/:id", setInvoiceTemplateValue, sendInvoiceWithPdf);
router.post("/reminder-invoice", sendReminderInvoice);
router.post("/invoice-attach", attachmentinNewInvoice);
router.get("/invoice", getMInvoice);
router.get("/invoice/:id", getInvoiceById);
router.get("/latest-invoice/:branch_id", getLatestInvoiceId);
router.put("/invoice/:id", validateInvoice, isRequestValidated, editInvoice);
router.put("/status-invoice/:id", changeInvoiceStatus);
router.delete("/invoice/:id", deleteInvoice);
router.delete("/invoice", batchDeleteInvoice);

router.get("/local-invoice", getLocalInvoice);

router.get("/intra-state-invoice", getIntraStateInvoice);

router.get("/export-invoice", getExportInvoice);

//NOTE: All product Invoice routes
router.post(
  "/invoice-product",
  validateInvoiceProduct,
  isRequestValidated,
  addInvoiceProduct
);
router.get("/invoice-product", getInvoiceProduct);
router.get("/invoice-product/:id", getInvoiceProductById);
router.get("/invoice-customer-product/:id", getProductByCustomer);
router.put(
  "/invoice-product/:id",
  validateInvoiceProduct,
  isRequestValidated,
  editInvoiceProduct
);
router.put(
  "/invoice-product-in",
  validateInvoiceProductIn,
  isRequestValidated,
  updateInvoiceIdInProduct
);
router.delete("/invoice-product/:id", deleteInvoiceProduct);

//NOTE: All Bills Route
router.post("/local-bill", validateLocalBill, isRequestValidated, addBill);
router.get("/local-bill", getLocalBill);
router.put("/local-bill/:id", validateLocalBill, isRequestValidated, editBill);

router.post(
  "/intra-state-bill",
  validateInstraStateBill,
  isRequestValidated,
  addBill
);
router.get("/intra-state-bill", getIntraStateBill);
router.put(
  "/intra-state-bill/:id",
  validateInstraStateBill,
  isRequestValidated,
  editBill
);

router.post("/export-bill", validateExportBill, isRequestValidated, addBill);
router.get("/export-bill", getExportBill);
router.put(
  "/export-bill/:id",
  validateExportBill,
  isRequestValidated,
  editBill
);
router.post("/pdf-bill/:id", setBillTemplateValue, sendBillWithPdf);
router.get("/bill", getMBill);
router.delete("/bill/:id", deleteBill);

//NOTE: All Notification Route
router.get("/notification", getNotification);
router.get("/notification/:id", getNotificationById);

//NOTE: All company routes
router.post("/company", validateCompanyBank, isRequestValidated, addCompany);
router.post("/company_logo", onlyLogoUpload);
router.post("/bank/:company_id", validateBank, isRequestValidated, addBank);

router.get("/company", getCompany);
router.get("/company/:id", getOneCompany);

router.put("/company/:id", validateCompany, isRequestValidated, updateCompany);
router.put("/logo/:id", companyLogo);
router.put("/bank/:id", validateBank, isRequestValidated, updateBank);

router.delete("/company/:id", deleteCompany);
router.delete("/bank/:id", deleteBank);

//NOTE: All routes for inventory
router.post("/inventory", validateInventory, isRequestValidated, addInventory);
router.get("/inventory", getInventory);
router.put(
  "/inventory/:id",
  validateInventory,
  isRequestValidated,
  updateInventory
);
router.delete("/inventory/:id", deleteInventory);

// All routes for chart_of_account
router.post(
  "/chart-of-account",
  validateChartOfAccount,
  isRequestValidated,
  addChartOfAccount
);
router.get("/chart-of-account", getChartOfAccount);
router.put(
  "/chart-of-account/:id",
  validateChartOfAccount,
  isRequestValidated,
  updateChartOfAccount
);
router.delete("/chart-of-account/:id", deleteChartOfAccount);

//NOTE: All routes for transaction
router.post(
  "/transaction",
  validateTransaction,
  isRequestValidated,
  addTransaction
);
router.get("/transaction", getTransaction);
router.put(
  "/transaction/:id",
  validateTransaction,
  isRequestValidated,
  updateTransaction
);
router.delete("/transaction/:id", deleteTransaction);

//NOTE: All routes for funds transfer
router.post(
  "/fund-transfer",
  validateFundTransfer,
  isRequestValidated,
  addFundTransfer
);
router.get("/fund-transfer", getFundTransfer);
router.put(
  "/fund-transfer/:id",
  validateFundTransfer,
  isRequestValidated,
  editFundTransfer
);
router.delete("/fund-transfer/:id", deleteFundTransfer);

//NOTE: All routes for customer
router.post("/customer", validateCustomer, isRequestValidated, addCustomer);
router.get("/customer", getCustmer);
router.get("/customer/:id", getCustomerById);
router.get("/search-customer", searchCustomer);
router.put("/customer/:id", validateCustomer, isRequestValidated, editCustomer);
router.delete("/customer/:id", deleteCustomer);

//NOTE: All routes for vendor
router.post("/vendor", validateVendor, isRequestValidated, addVendor);
router.get("/vendor", getVendor);
router.put("/vendor/:id", validateVendor, isRequestValidated, editVendor);
router.delete("/vendor/:id", deleteVendor);

//NOTE: All dashboard routes
router.get("/dashboard", getDashboard);

//NOTE: All routes for razorpay
router.post("/order", validateOrder, isRequestValidated, getOrder);
router.post(
  "/capture/:paymentId",
  validateCapturePayment,
  isRequestValidated,
  capturePayment
);
router.post("/verification", verification);

//NOTE: All routes for purchase order
router.post(
  "/purchase-order",
  validatePurchaseOrder,
  isRequestValidated,
  addPurchaseOrder
);
router.get("/purchase-order", getPurchaseOrder);
router.put(
  "/purchase-order/:id",
  validatePurchaseOrder,
  isRequestValidated,
  editPurchaseOrder
);
router.delete("purchase-order/:id", deletePurchaseOrder);

//NOTE: All routes for sales order
router.post(
  "/sales-order",
  validateSalesOrder,
  isRequestValidated,
  addSalesOrder
);
router.get("/sales-order", getSalesOrder);
router.put(
  "/sales-order/:id",
  validateSalesOrder,
  isRequestValidated,
  editSalesOrder
);
router.delete("/sales-order/:id", deleteSalesOrder);

//NOTE: All routes for profit & loss
router.get("/profit-loss", getProfitLoss);

//NOTE: All routes for balance sheet
router.get("/balance-sheet", getBalanceSheet);

//NOTE: All routes for Terms
router.post("/terms", validateTerms, isRequestValidated, addTerms);
router.get("/terms", getTerms);
router.put("/terms/:id", validateTerms, isRequestValidated, editTerms);
router.delete("/terms/:id", deleteTerms);

//NOTE: All routes for Ship
router.post("/ship", validateShip, isRequestValidated, addShip);
router.get("/ship", getShip);
router.put("/ship/:id", validateShip, isRequestValidated, editShip);
router.delete("/ship/:id", deleteShip);

//note: All route for track
router.post("/track", validateTrack, isRequestValidated, addTrack);
router.get("/track", getTrack);
router.put("/track/:id", validateTrack, isRequestValidated, editTrack);
router.delete("/track/:id", deleteTrack);

//NOTE: All routes for track messaging
router.get("/search-users/:search", searchTrackUsers);
router.get("/user-chat", getUserAlreadyChat);
router.get("/user-chat/:id", getChatForPerticularUser);
router.post(
  "/chat-file",
  validateFilesForChat,
  isRequestValidated,
  uploadFilesForChat
);

//NOTE: All routes for loan Account
router.post(
  "/loan-account",
  validateLoanAccount,
  isRequestValidated,
  addLoanAccount
);
router.get("/loan-account", getLoanAccount);
router.put(
  "/loan-account/:id",
  validateLoanAccount,
  isRequestValidated,
  editLoanAccount
);
router.delete("/loan-account/:id", deleteLoanAccount);

//NOTE: logout routes
router.post("/logout/:id", validateLogout, isRequestValidated, logout);

module.exports = router;
