// Test de l'API fetch
// response.json retourne une promesse, il faut donc enchainer les promesses

const getUsers = async function () {

    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/users')
    
        // On teste l'url
        if (response.ok) {
            let data = await response.json()
            console.log(data)
        } else {
            console.error('Retour du serveur : ', response.status)
        }

    } catch (e) {
        console.log(e)
    }
}

console.log('Users :')
getUsers()


// Méthode avec post

const insertPost = async function (data) {
    
    let request = new Request ('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    let response = await fetch(request)
    let responseData = await response.json()

    if (response.ok) {
        console.log('Id de votre enregistrement : ' + responseData.id)
    } else {
        console.log('Erreur dans l\'envoie des données !')
    }
}

insertPost ({
    name: 'Jean',
    age: 29
    }
)