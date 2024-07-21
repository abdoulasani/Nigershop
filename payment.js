// payment.js

document.addEventListener('DOMContentLoaded', function() {
    const phoneNumber = '+22799642302';
    const name = 'Ghissa Mohamed';
    let cart = [];
    let totalPrice = 0;

    // Function to display total price
    function updateTotalPrice() {
        document.getElementById('total-price').innerText = `Total: ${totalPrice} CFA`;
    }

    // Function to handle "Acheter" button click
    function handleBuyButtonClick(event) {
        const productElement = event.target.closest('.product-item');
        const price = parseFloat(productElement.querySelector('.price').innerText.replace('F', '').replace(',', ''));
        const productName = productElement.querySelector('.product-name').innerText;

        const quantity = prompt(`Enter quantity for ${productName}:`);

        if (quantity && !isNaN(quantity)) {
            const itemTotal = price * quantity;
            cart.push({ productName, quantity, itemTotal });
            totalPrice += itemTotal;
            updateTotalPrice();

            const action = confirm("Do you want to continue shopping or complete the order?");
            if (action) {
                // Continue shopping
                return;
            } else {
                // Complete the order
                showOrderForm();
            }
        }
    }

    // Function to show order form
    function showOrderForm() {
        const addressForm = document.getElementById('address-form');
        addressForm.style.display = 'block';

        // Handle form submission
        document.getElementById('submit-address').addEventListener('click', function() {
            const address = {
                nom: document.getElementById('nom').value,
                prenom: document.getElementById('prenom').value,
                pays: document.getElementById('pays').value,
                ville: document.getElementById('ville').value,
                quartier: document.getElementById('quartier').value,
                tel: document.getElementById('tel').value
            };

            showPaymentMethods(address);
        });
    }

    // Function to show payment methods
    function showPaymentMethods(address) {
        const paymentForm = document.getElementById('payment-form');
        paymentForm.style.display = 'block';

        document.getElementById('payment-method').addEventListener('change', function(event) {
            const paymentMethod = event.target.value;

            // Display payment details
            const paymentDetails = document.getElementById('payment-details');
            paymentDetails.innerHTML = `
                <p>Payez en utilisant le numero suivant:</p>
                <p>Numéro: ${phoneNumber}</p>
                <p>Nom: ${name}</p>
                <p>Mode de paiement: ${paymentMethod}</p>
                <p>En attente de paiement...</p>
                <button id="payment-done">Paiement Terminé</button>
            `;
            paymentDetails.style.display = 'block';

            document.getElementById('payment-done').addEventListener('click', function() {
                window.location.href = `https://wa.me/${phoneNumber}?text=Salut j'ai effectué le paiement pour les produits ${cart.map(item => item.productName).join(', ')}. Mon adresse de livraison: ${JSON.stringify(address)}. Je vous envoie le reçu de paiement pour votre confirmation.`;
            });
        });
    }

    // Attach event listeners to "Acheter" buttons
    document.querySelectorAll('.btn-buy').forEach(button => {
        button.addEventListener('click', handleBuyButtonClick);
    });
});
