import { getCamera } from "./Modules/fetchCamera.mjs"
import { displaySingleCamera } from "./Modules/displaySingleCamera.mjs"
import { cart, addToCart, switchOrderButton, buttonsIdList } from './Modules/cart.mjs';

main()

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
                switchOrderButton(buttonState, buttonId);
            }
        }

    } catch(error) {
        // alert("Désolé, une erreur est intervenue : \n" + error)
        let message = 'Désolé, une erreur est survenue : \n';
        const errorClass = 'danger';
        displayError(message, error, errorClass);
        
    }
}

function displayError(message, error, errorClass) {
    // console.log(message, error, errorClass);
    
    errorClass = "alert-" + errorClass
    
    let elt = document.getElementById("error")
        .classList.add(errorClass);
    
    let errorMessageClass = document.getElementById("error-message")
        .classList.add("p-5");

    let errorMessage = document.getElementById("error-message")
        .textContent = message + error;

}

// ***********************************
// Call the function addToCart onclick
// ***********************************

async function addToCartAction() {
    let itemId = this.getAttribute("data-item-id");
    let quantity = parseInt(document.querySelector('#quantity-input').value);
    await addToCart(itemId, quantity);
}