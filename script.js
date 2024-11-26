let selectedCountry;

const countries = [
  { country: "argentina", image: "https://viewer.ipaper.io/ViewFile1948598.png" },
  { country: "uruguay", image: "https://viewer.ipaper.io/ViewFile1948596.png" },
  { country: "mexico", image: "https://viewer.ipaper.io/ViewFile1948595.png" },
  { country: "colombia", image: "https://viewer.ipaper.io/ViewFile1948597.png" }
];

//initiate jsAPI
const iframe = document.getElementById("Flipbook");
const instance = iPaperJsApi(iframe, 3);

//load country selector if needed
document.addEventListener("DOMContentLoaded", function () {
  const overlaySelector = document.getElementById("overlaySelector");
  const urlParams = new URLSearchParams(window.location.search);
  const countryFromQuery = urlParams.get("country");
  if (countryFromQuery) {
    // If the "country" query parameter exists, set the selectedCountry
    selectedCountry = countryFromQuery;
  } else if (overlaySelector) {
    // If no "country" query parameter, show the overlaySelector
    overlaySelector.classList.replace("hidden", "flex");
  }
});

//select your country
function setCountry(country) {
  selectedCountry = country;

  // Update the query string in the URL
  const url = new URL(window.location.href);
  url.searchParams.set("country", country);
  window.history.pushState({}, "", url);

  // Hide the overlaySelector
  document.getElementById("overlaySelector").classList.replace("flex", "hidden");
}



instance.basket.onProductAdd((product) => {
  const target = product.title
  const modalImages = document.getElementById("modalImages")
  modalImages.classList.replace("hidden", "flex");

  const targetIsSelected =  target === selectedCountry


  const selectedCountryImage = countries.find(c => c.country === selectedCountry)?.image || "";
  const targetCountryImage = countries.find(c => c.country === target)?.image || "";
  
  modalImages.querySelector("div").innerHTML = `
  ${!targetIsSelected && (`<img src="${selectedCountryImage}" alt="${selectedCountry} image" class="w-1/2" />`)}
    <img src="${targetCountryImage}" alt="${target} image" class="${targetIsSelected ? "w-full" : "w-1/2"}" />
  `

});

function closeModal(e) {
  if (e.target.id === "modalImages") {
    e.target.classList.replace("flex", "hidden");
  }
}