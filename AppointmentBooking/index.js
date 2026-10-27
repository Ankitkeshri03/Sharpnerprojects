const BASE_URL =
  "https://crudcrud.com/api/d6f6b7e267ec431d8e1f68ad21ad424b/appointmentData";

function handleFormSubmit(event) {
  event.preventDefault();

  const userDetails = {
    username: event.target.username.value,
    email: event.target.email.value,
    phone: event.target.phone.value,
  };

  axios
    .post(BASE_URL, userDetails)
    .then((response) => {
      console.log("Saved to CRUDCRUD:", response.data);
      displayUserOnScreen(response.data);
    })
    .catch((error) => {
      console.error("Error saving appointment:", error);
    });

  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
}

function displayUserOnScreen(userDetails) {
  const userItem = document.createElement("li");

  userItem.textContent = `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`;

  document.querySelector("ul").appendChild(userItem);
}
