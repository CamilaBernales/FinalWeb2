import { navbar } from "../../components/navbar.js";
const header = document.getElementById("header");
header.innerHTML = navbar();

const btn = document.getElementById("btnTravel");
const totalP = document.getElementById("total");
const hotelSelect = document.getElementById("hotel");
const inputCant = document.getElementById("cant");
const inputDays = document.getElementById("days");
const selectedCity = JSON.parse(localStorage.getItem("selectedCity"));
let city = [];

const getTotal = () => {
  const guests = parseInt(inputCant.value) || 1; 
  const days = parseInt(inputDays.value) || 1; 
  const selectedHotel = city.hotels.find((hotel) => hotel.name === hotelSelect.value);

  if (selectedHotel) {
    const basePrice = city.price;
    const hotelPrice = selectedHotel.price;
    
    const total = basePrice + (hotelPrice * guests * days);
    
    totalP.textContent = `$${total}`;
  } else {
    totalP.textContent = "Por favor selecciona un hotel";
  }
};

btn.addEventListener("click", () => {
  const data = {
    city: city,
    hotel: hotelSelect.value,
    cant: inputCant.value,
    days: inputDays.value,
    total: totalP.textContent,
  };
  localStorage.setItem("summary", JSON.stringify(data));
  window.location.href = "../summary/";
});

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch(`http://localhost:3000/api/ciudades/${selectedCity}`);
  const data = await response.json();
  city = data;

  totalP.textContent = `$${city.price}`;
  document.getElementById("title").textContent = `Calcula tu viaje a ${city.city}`;
  document.getElementById("img").src = city.img;
  document.getElementById("desc").textContent = city.desc;

  let hotels = ``;
  data.hotels.forEach((hotel) => {
    hotels += `<option>${hotel.name}</option>`;
  });

  hotelSelect.innerHTML = hotels;
});

inputCant.addEventListener("input", () => {
  getTotal();
});

inputDays.addEventListener("input", () => {
  getTotal();
});

hotelSelect.addEventListener("change", () => {
  getTotal();
});
