// Get the item with the id given

async function getOneCamera(id) {

    const url = "http://localhost:3000/api/cameras/" + id;

    try {

        return fetch(url)
        .then(function(httpBodyResponse) {
            return httpBodyResponse.json()
        })

    } catch(error) {
        // console.log('Erreur dans le chargement des produits')
        alert('Erreur, ce produit n\'existe pas... \n' + error)
    }
}

export { getOneCamera }