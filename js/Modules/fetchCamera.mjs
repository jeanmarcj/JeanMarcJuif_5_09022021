
// Get the item with th id given in the URI
let parsedUrl = new URL(window.location.href);
const id = parsedUrl.searchParams.get("id");


const url = "http://localhost:3000/api/cameras/" + id;

/**
 * Get one camera with the id given in the url.
 * 
 * @returns {object} the camera fetched by id in the url.
 */
async function getCamera() {

    try {
        return (await fetch(url)).json();
    } catch(error) {
        // console.log('Erreur dans le chargement des produits')
        alert('Erreur dans le chargement du produit... \n' + error)
    }
}

export { getCamera }