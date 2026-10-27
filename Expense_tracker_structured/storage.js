// Saving and loading expenses from localStorage.

function loadExpenses() {
  try {
    // JSON.parse() converts a JSON string into a JavaScript value.
    const saved = JSON.parse(localStorage.getItem("expenses") || "[]");
    expenses = Array.isArray(saved) ? saved : [];
  } catch (error) {
    expenses = [];
  }
}

function saveExpenses() {
  try {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  } catch (error) {
    showMessage("Could not save expenses to this browser.", "danger");
  }
}
