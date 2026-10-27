// Entry point: form submit handling and initial load.

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const amount = Number(amountInput.value);
  const description = descriptionInput.value.trim();
  const category = categoryInput.value;

  if (!Number.isFinite(amount) || amount <= 0 || !description) {
    showMessage("Enter a valid amount and description.", "danger");
    return;
  }

  if (editingId !== null) {
    updateExpense(editingId, amount, description, category);
  } else {
    addExpense(amount, description, category);
  }

  saveExpenses();
  renderExpenses();
  resetForm();
});

loadExpenses();
renderExpenses();
