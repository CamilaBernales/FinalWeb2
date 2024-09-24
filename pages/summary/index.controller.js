import { navbar } from "../../components/navbar.js";

const btnCancel = document.getElementById('btnCancel');
const btnTravel = document.getElementById('btnTravel');

document.addEventListener('DOMContentLoaded', async () => {
    const summary = JSON.parse(localStorage.getItem('summary'));
    const header = document.getElementById('header');
    header.innerHTML = navbar();

    document.getElementById('city').value = summary.city.city;
    document.getElementById('hotel').value = summary.hotel;
    document.getElementById('cant').value = summary.cant;
    document.getElementById('days').value = summary.days;
    document.getElementById('total').value = summary.total;

    const errorMessage = document.getElementById('error-message');

    const validateFields = () => {
        const name = document.getElementById('name').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const dni = document.getElementById('dni').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('tel').value.trim();

        const isFormValid = name && lastName && email && phone && dni;
        btnTravel.disabled = !isFormValid; 

        if (!isFormValid) {
            errorMessage.classList.remove('hidden');
        } else {
            errorMessage.classList.add('hidden');
        }
    };

    document.getElementById('name').addEventListener('input', validateFields);
    document.getElementById('lastName').addEventListener('input', validateFields);
    document.getElementById('dni').addEventListener('input', validateFields);
    document.getElementById('email').addEventListener('input', validateFields);
    document.getElementById('tel').addEventListener('input', validateFields);

    btnTravel.addEventListener('click', async (event) => {
        if (btnTravel.disabled) {
            event.preventDefault(); 
            return;
        }

        const totalValue = summary.total.replace('$', '').replace(',', '');
        const totalNumber = parseFloat(totalValue);

        const orderData = {
            city: summary.city.city,
            hotel: summary.hotel,
            cant: summary.cant,
            days: summary.days,
            total: totalNumber,
            name: document.getElementById('name').value,
            lastname: document.getElementById('lastName').value,
            dni: document.getElementById('dni').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('tel').value
        };

        const response = await fetch('http://localhost:3000/api/purchases', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        if (response.ok) {
            alert('Compra ejecutada con éxito');
            localStorage.removeItem('summary');
            localStorage.setItem("purchaseId", JSON.stringify(orderData.dni));
            window.location.href = "../purchase";
        } else {
            alert('Error al realizar la compra. Intente nuevamente.');
        }
    });
});

btnCancel.addEventListener('click', () => {
    localStorage.removeItem('summary');
    window.location.href = '../info';
});
