// Small UI helpers: status messages and form state.

function showMessage(text, type) {
  message.textContent = text;
  message.className = `mt-3 mb-0 msg-${type}`;
}

function resetForm() {
  editingId = null;
  form.reset();
  submitBtn.textContent = "Add Expense";
  submitBtn.className = "btn btn-primary w-100";
}

function categoryClass(category) {
  const known = ["movie", "food", "travel", "shopping"];
  const key = String(category).toLowerCase();
  return known.includes(key) ? key : "other";
}
