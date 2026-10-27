// Shared application state and DOM references.
// Loaded first so every other script can use these globals.

const form = document.getElementById("expenseForm");
const amountInput = document.getElementById("amount");
const descriptionInput = document.getElementById("description");
const categoryInput = document.getElementById("category");
const submitBtn = document.getElementById("submitBtn");
const expenseList = document.getElementById("expenseList");
const totalElement = document.getElementById("total");
const message = document.getElementById("message");

let expenses = [];
let editingId = null; // id of the expense being edited, or null when adding
