const url = "http://localhost:3000/api/cameras/";
// const url = "https://jsonplaceholder.typicode.com/users"

// Fetch all cameras
// function statement
async function getCameras() {
    try{

        // const response = await fetch(url)
        return fetch(url)
        .then(function(httpBodyResponse) {
            return httpBodyResponse.json()
        })

        //Old code
        // Retourne une promise. Transforme le contenu JSON en objet
        // const data = await response.json()
        // return data

    } catch(error) {
        // console.log('Erreur dans le chargement des produits')
        alert('Erreur dans le chargement des produits... \n' + error)
    }
}

export { getCameras }