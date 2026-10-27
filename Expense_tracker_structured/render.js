// Drawing the expense list and total on the page.

function renderExpenses() {
  // replaceChildren() clears old items so re-rendering never duplicates them.
  expenseList.replaceChildren();
  let total = 0;

  expenses.forEach(function (expense) {
    total += expense.amount;
    const cat = categoryClass(expense.category);

    const li = document.createElement("li");
    li.className = `list-group-item expense-item cat-${cat}-border d-flex justify-content-between align-items-center flex-wrap gap-2`;

    const details = document.createElement("div");

    const amount = document.createElement("span");
    amount.className = "expense-amount me-2";
    amount.textContent = `₹${expense.amount.toFixed(2)}`;

    const badge = document.createElement("span");
    badge.className = `category-badge cat-${cat}`;
    badge.textContent = expense.category;

    const desc = document.createElement("span");
    desc.className = "expense-desc";
    desc.textContent = expense.description;

    details.append(amount, badge, desc);

    const buttons = document.createElement("div");
    buttons.className = "d-flex gap-2";

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.className = "btn btn-sm btn-outline-primary";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", function () {
      startEdit(expense.id);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn btn-sm btn-outline-danger";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      deleteExpense(expense.id);
    });

    buttons.append(editBtn, deleteBtn);
    li.append(details, buttons);
    expenseList.appendChild(li);
  });

  totalElement.textContent = `Total: ₹${total.toFixed(2)}`;

  if (expenses.length === 0) {
    const empty = document.createElement("li");
    empty.className = "list-group-item text-secondary empty-state";
    empty.textContent = "No expenses added yet.";
    expenseList.appendChild(empty);
  }
}
