import { getCameras } from './Modules/fetchCameras.mjs'
import { displayCamera } from './Modules/displayCamera.mjs'


main()

// Fonctionnalité principale de la page

async function main() {

    const cameras = await getCameras()
    console.log('Liste des APN :', cameras)
    const itemsInCollection = cameras.length
    console.log(itemsInCollection)

    // Display all cameras
    for (let i = 0; i < itemsInCollection; i++) {
        const camera = cameras[i]
        displayCamera(camera)
    }
    
}
