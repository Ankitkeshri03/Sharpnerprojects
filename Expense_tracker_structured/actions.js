// Add, edit, update and delete operations.

function addExpense(amount, description, category) {
  expenses.push({
    id: Date.now() + Math.random(),
    amount,
    description,
    category,
  });
  showMessage("Expense added successfully!", "success");
}

function updateExpense(id, amount, description, category) {
  expenses = expenses.map(function (expense) {
    if (expense.id === id) {
      return { ...expense, amount, description, category };
    }
    return expense;
  });
  showMessage("Expense updated successfully!", "success");
}

function startEdit(id) {
  const expense = expenses.find(function (item) {
    return item.id === id;
  });

  if (!expense) return;

  editingId = id;
  amountInput.value = expense.amount;
  descriptionInput.value = expense.description;
  categoryInput.value = expense.category;

  submitBtn.textContent = "Save Changes";
  submitBtn.className = "btn btn-success w-100";
  showMessage("Edit the fields and click Save Changes.", "info");
  amountInput.focus();
}

function deleteExpense(id) {
  expenses = expenses.filter(function (expense) {
    return expense.id !== id;
  });

  if (editingId === id) resetForm();

  saveExpenses();
  renderExpenses();
  showMessage("Expense deleted successfully!", "success");
}
