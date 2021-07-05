const url = "http://localhost:3000/api/cameras/";

// Fetch all cameras - function statement

async function getCameras() {
    try {

        return (await fetch(url)).json();

    } catch(error) {
        // console.log('Erreur dans le chargement des produits')
        alert('Erreur dans le chargement des produits... \n' + error)
        // const message = 'Erreur dans le chargement des produits...';
        // const errorClass = 'danger';
        // displayError(message, error, errorClass);
    }
}

export { getCameras }