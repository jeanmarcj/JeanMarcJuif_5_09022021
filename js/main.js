import { getCameras } from './Modules/fetchCameras.mjs';
import { displayCamera } from './Modules/displayCamera.mjs';
import { cart, addToCart, updateBadgeIcon } from './Modules/cart.mjs';


main();

// Fonctionnalité principale de la page

async function main() {
    
    try {
        const cameras = await getCameras();
        // console.log('Liste des APN :', cameras);
        
        // Display all cameras
        for (let i = 0; i < cameras.length; i++) {
            const camera = cameras[i];
            displayCamera(camera);
        }

        // Add event listener on icon add to cart
        const targetAddToCart = document.querySelectorAll(".btn-addtocart");
        
        for (const targetAddToCartElem of targetAddToCart) {
            targetAddToCartElem.addEventListener("click", addToCartAction);
        }

        // Check if an order exists
        const checkOrderId = localStorage.getItem("orderId");
        if (checkOrderId != null) {
            updateBadgeIcon(0);
            console.log("Une commande existe !");
            console.log("localStorage remis à zéro !");
            localStorage.clear();
            localStorage.setItem("cartIsEmpty", true);
        }

    } catch(error) {
        // alert("Erreur de connection avec le serveur ! \n" + error)
        const message = "Une erreur est intervenue !";
        const errorClass = "danger";
        displayError(message, error, errorClass);
    }

    //Cart management

    // if (localStorage.getItem("cartIsEmpty") === true) {
    //     console.log("Votre panier est vide");
       
    // } else {
    //     localStorage.setItem("cartIsEmpty", false);
    //     console.log("Vous avez des articles dans votre panier !");
    //     console.log("Etat de l'objet panier : ", cart);
    // }
    console.log("Etat de l'objet panier : ", cart);
}

function displayError(message, error, errorClass) {
    
    errorClass = "alert-" + errorClass
    
    let elt = document.getElementById("error")
        .classList.add(errorClass);
    
    let errorMessageClass = document.getElementById("error-message")
        .classList.add("p-5");

    let errorMessage = document.getElementById("error-message")
        .textContent = message + error;

}

// ********************************
// Call the function addToCart on
// ********************************

async function addToCartAction() {
    let itemId = this.getAttribute("data-item-id");
    addToCart(itemId, 1);
}