const url = "http://localhost:3000/api/cameras/";

/**
 * Fetch the cameras from the api url.
 * Return the object.
 * 
 * @returns {object} The cameras fetched object.
 */
async function getCameras() {
    
    try {
        return (await fetch(url)).json();
    } catch(error) {
        alert('Erreur dans le chargement des produits... \n' + error)
    }
}

export { getCameras }