/**
 * Fetch one camera by id.
 * 
 * @param {string} id The article id to fetch. 
 * @returns {object} The article fetched.
 */
async function getOneCamera(id) {

    const url = "http://localhost:3000/api/cameras/" + id;

    try {
        return (await fetch(url)).json();
    } catch(error) {
        // console.log('Erreur dans le chargement des produits')
        alert('Erreur, ce produit n\'existe pas... \n' + error)
    }
}

export { getOneCamera }