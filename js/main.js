import { getCameras } from './Modules/fetchCameras.mjs'
import { displayCamera } from './Modules/displayCamera.mjs'


main()

// Fonctionnalité principale de la page

async function main() {
    
    try {
        const cameras = await getCameras()
        console.log('Liste des APN :', cameras)
        // console.log(itemsInCollection)
        const itemsInCollection = cameras.length
            // Display all cameras
        for (let i = 0; i < itemsInCollection; i++) {
            const camera = cameras[i]
            displayCamera(camera)
        }

    } catch(error) {
        // alert("Erreur de connection avec le serveur ! \n" + error)
        const message = "Erreur de connection avec le serveur !"
        const errorClass = "danger"
        displayError(message, error, errorClass)
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