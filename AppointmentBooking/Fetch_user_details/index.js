document.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      "https://crudcrud.com/api/d6f6b7e267ec431d8e1f68ad21ad424b/appointmentData",
    )
    .then((response) => {
      console.log("Fetched data:", response.data);

      response.data.forEach((userDetails) => {
        displayUserOnScreen(userDetails);
      });
    })
    .catch((error) => {
      console.log("GET request failed:", error);
    });
});
function displayUserOnScreen(userDetails) {
  const userItem = document.createElement("li");

  userItem.textContent = `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`;

  document.querySelector("ul").appendChild(userItem);
}
