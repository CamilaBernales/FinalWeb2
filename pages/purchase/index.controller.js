import { navbar } from "../../components/navbar.js";

const header = document.getElementById('header');
header.innerHTML = navbar();

const purchasesDiv = document.getElementById('purchases');
const btnBack = document.getElementById('btnBack');

let dni = localStorage.getItem('purchaseId');
dni = dni ? JSON.parse(dni) : null;

document.addEventListener('DOMContentLoaded', async () => {
    try {
       const response = await fetch(`http://localhost:3000/api/purchases/${dni}`);
        const purchases = await response.json();
        if (purchases.length === 0) {
            purchasesDiv.innerHTML = '<p>No hay compras registradas.</p>';
            return;
        }

        purchases.forEach(purchase => {
            const purchaseElement = `
                <div class="bg-purple-800 p-3 rounded-lg my-2">
                    <h2 class="text-lg font-bold">Hotel: ${purchase.hotel}</h2>
                    <p>Destino: ${purchase.city}</p>
                    <p>Huéspedes: ${purchase.cant}</p>
                    <p>Días: ${purchase.days}</p>
                    <p>Total: $${purchase.total}</p>
                    <p>Nombre: ${purchase.name} ${purchase.lastname}</p>
                    <p>Email: ${purchase.email}</p>
                    <p>Teléfono: ${purchase.phone}</p>
                    <p>Fecha de Compra: ${new Date(purchase.createdAt).toLocaleDateString()}</p>
                </div>
            `;
            purchasesDiv.innerHTML += purchaseElement;
        });
    } catch (error) {
        console.error('Error fetching purchases:', error);
        purchasesDiv.innerHTML = '<p>Error al cargar las compras.</p>';
    }
});

btnBack.addEventListener('click', () => {
    window.location.href = '/index.html';
});
