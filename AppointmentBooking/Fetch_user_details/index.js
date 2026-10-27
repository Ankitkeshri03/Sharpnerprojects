// Fetch saved users when the page loads
document.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      "https://crudcrud.com/api/d6f6b7e267ec431d8e1f68ad21ad424b/appointmentData",
    )
    .then((response) => {
      response.data.forEach((userDetails) => {
        displayUserOnScreen(userDetails);
      });
    })
    .catch((error) => console.log(error));
});

// Do not touch the code below
module.exports = handleFormSubmit;
