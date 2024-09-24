import { card } from "./components/card.js";
import { navbar } from "./components/navbar.js";

const cardContainer = document.getElementById("cardContainer");
const header = document.getElementById("header");
header.innerHTML = navbar();

document.addEventListener("DOMContentLoaded", async () => {
  try {
    if (localStorage.getItem("purchaseId")) {
      localStorage.removeItem("purchaseId");
    }
    const response = await fetch("http://localhost:3000/api/ciudades");
    const data = await response.json(); // Esperamos la respuesta

    cardContainer.innerHTML = "";
    data.forEach((place) => {
      cardContainer.innerHTML += card(
        place.city,
        place.desc,
        place.price,
        place._id,
        place.img
      );
    });

    const btnCity = document.getElementsByName("btnCity");
    Array.from(btnCity).forEach((button) => {
      button.addEventListener("click", (e) => {
        const city = e.target.dataset.city;
        localStorage.setItem("selectedCity", JSON.stringify(city));
        window.location.href = "./pages/info";
      });
    });
  } catch (error) {
    console.error("Error al cargar los datos:", error);
  }
});
