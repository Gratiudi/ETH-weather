function searchCities(event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");
  h1.innerHTML = document.querySelector("#city").value;
}
let search = document.querySelector("form");
search.addEventListener("submit", searchCities);
