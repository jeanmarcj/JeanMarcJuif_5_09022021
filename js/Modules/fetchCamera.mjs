// Get the item with th id given in the URI
let parsedUrl = new URL(window.location.href);
// console.log(parsedUrl.searchParams.get("id"));

const id = parsedUrl.searchParams.get("id");

// With the id, fetch one item on server

const url = "http://localhost:3000/api/cameras/" + id;

async function getCamera() {

    try {

        return fetch(url)
        .then(function(httpBodyResponse) {
            return httpBodyResponse.json()
        })

    } catch(error) {
        // console.log('Erreur dans le chargement des produits')
        alert('Erreur dans le chargement du produit... \n' + error)
    }
}

export { getCamera }