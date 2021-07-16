import { getCameras } from './Modules/fetchCameras.mjs';
import { displayCamera } from './Modules/displayCamera.mjs';
import { cart, addToCart, updateBadgeIcon, displayCartItems } from './Modules/cart.mjs';


main();

// Main function
/**
 * Get and display the cameras.
 * Add an event listener to add an item in the cart.
 */

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

        // Update cart object if an order exists
        const checkOrderId = localStorage.getItem("orderId");
        if (checkOrderId != null) {
            updateBadgeIcon(0);
            cart.items = [];
            localStorage.clear();
            localStorage.setItem("cartIsEmpty", "true");
            //Vider le panier via le button...
            displayCartItems(cart);
        }

    } catch(error) {
        // alert("Erreur de connection avec le serveur ! \n" + error)
        const message = "Une erreur est intervenue !";
        const errorClass = "danger";
        displayError(message, error, errorClass);
    }

    console.log("Etat de l'objet panier : ", cart);
}

/**
 * Display the error message
 * 
 * @param { string } message the message to be diplay to the user
 * @param { string } error error return by the api
 * @param { string } errorClass the class to be apply
 */
function displayError(message, error, errorClass) {
    
    errorClass = "alert-" + errorClass
    
    document.getElementById("error").classList.add(errorClass);
    document.getElementById("error-message").classList.add("p-5");
    document.getElementById("error-message").textContent = message + error;

}


/**
 * Read the id of an item and call the addToCart function with the quantity to add.
 * 
 */
async function addToCartAction() {
    let itemId = this.getAttribute("data-item-id");
    await addToCart(itemId, 1);
}