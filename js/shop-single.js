import { getCamera } from "./Modules/fetchCamera.mjs"
import { displaySingleCamera } from "./Modules/displaySingleCamera.mjs"

main()

async function main() {
    
    try {
        const camera = await getCamera()
        // console.log('Voici votre APN :', camera)
        // console.log(camera.name)
        displaySingleCamera(camera)

    } catch(error) {
        alert("Désolé, une erreur est intervenue : \n" + error)
        
    }
}