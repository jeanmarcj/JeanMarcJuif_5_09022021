import { getCameras } from './Modules/fetchCameras.mjs'
import { displayCamera } from './Modules/displayCamera.mjs'
import { cart } from './Modules/cart.mjs'


main()

// Fonctionnalité principale de la page

async function main() {
    
    try {
        const cameras = await getCameras()
        console.log('Liste des APN :', cameras)
        
        const itemsInCollection = cameras.length
        console.log(typeof(cameras))
        // Display all cameras
        for (let i = 0; i < itemsInCollection; i++) {
            const camera = cameras[i]
            displayCamera(camera)
        }

    } catch(error) {
        // alert("Erreur de connection avec le serveur ! \n" + error)
        const message = "Une erreur est intervenue !"
        const errorClass = "danger"
        displayError(message, error, errorClass)
    }

    //Cart management

    if (localStorage.getItem("cartIsEmpty") == "true") {
        console.log("Votre panier est vide")
        
        // Le badge de l'icone doit disparaître
        // La fenêtre du panier doit être vide
        // Le total du panier = 0

    } else {
        console.log("Votre Panier est rempli")
        console.log("Etat de l'objet panier : ", cart)
    }
}

function displayError(message, error, errorClass) {
    console.log(message, error, errorClass)
    
    errorClass = "alert-" + errorClass
    
    let elt = document.getElementById("error")
        .classList.add(errorClass)
    
    let errorMessageClass = document.getElementById("error-message")
        .classList.add("p-5")

    let errorMessage = document.getElementById("error-message")
        .textContent = message + error

}

// ********************************
// Clear cart
// ********************************
clearCart.onclick = () => {
    localStorage.clear()
    document.location.reload()
}