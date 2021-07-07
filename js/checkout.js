import { getCamera } from "./Modules/fetchCamera.mjs"
import { displaySingleCamera } from "./Modules/displaySingleCamera.mjs"
import { cart, addToCart } from './Modules/cart.mjs';


console.log('Hello je suis dans checkout.js !');



async function printAmountsToPay() {
    console.log('Je suis dans printAmountsToPay() !');
    
    // console.log(cart.subtotal);
    // console.log(cart.taxPercentage);
    // console.log(cart.taxesToBePaid);

    // Print subtotal, taxes & total to paid if exist on page (for the checkout page)
    
    let checkoutTaxes = (cart.subtotal * cart.taxPercentage)/100;

    cart.taxesToBePaid = checkoutTaxes;
    let checkoutTaxesFormated = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(cart.taxesToBePaid);
    document.getElementById("checkout-taxes").textContent = checkoutTaxesFormated;
    
    const formatedShipping = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(cart.shipping);
    document.getElementById("shipping").textContent = formatedShipping;

    const totalToBePaid = cart.subtotal + cart.taxesToBePaid + cart.shipping;
    const formatedTotalToBePaid = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalToBePaid);
    // console.log('total : ', formatedTotalToBePaid);
    document.getElementById("totalToBePaid").textContent = formatedTotalToBePaid;
}

await printAmountsToPay();