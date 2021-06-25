// Get the item with the id given

function getOneCamera(id) {

    const url = "http://localhost:3000/api/cameras/" + id;

    return fetch(url)
        .then(function(response) {
            if(response.ok) {
                return response.json()
                .then(function(camera) {
                    return camera
                })
            } else {
                alert('Erreur, ce produit n\'existe pas... \n' + response.statusText)
            }
        })
}

export { getOneCamera }