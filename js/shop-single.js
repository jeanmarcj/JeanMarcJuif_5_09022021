import { getCamera } from "./Modules/fetchCamera.mjs"
import { displaySingleCamera } from "./Modules/displaySingleCamera.mjs"
import { cart, addToCart, switchButton, buttonsIdList } from './Modules/cart.mjs';

main()
/**
 * Fetch and display one camera.
 * Disable buttons if there is no items in the cart.
 */
async function main() {
    
    try {
        const camera = await getCamera();

        displaySingleCamera(camera);

        //Add listerner for button add to cart
        const targetAddToCart = document.querySelectorAll(".btn-addtocart");
        
        for (const targetAddToCartElem of targetAddToCart) {
            targetAddToCartElem.addEventListener("click", addToCartAction);
        }
        
        if (cart.items.length === 0) {

            let buttonState = "off";
            for (let buttonId of buttonsIdList) {
                switchButton(buttonState, buttonId);
            }
        }

    } catch(error) {
        // alert("Désolé, une erreur est intervenue : \n" + error)
        let message = 'Désolé, une erreur est survenue : \n';
        const errorClass = 'danger';
        displayError(message, error, errorClass);
    }
}

/**
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
 * Add the item in the cart with the quantity of the input.
 */
async function addToCartAction() {
    let itemId = this.getAttribute("data-item-id");
    let quantity = parseInt(document.querySelector('#quantity-input').value);
    await addToCart(itemId, quantity);
}