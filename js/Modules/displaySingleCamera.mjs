function displaySingleCamera(camera) {
    
    const templateElement = document.getElementById('single-item-template')
    const cloneElement = document.importNode(templateElement.content, true)

    // console.log("J'affiche un model d'APN")
    // Display camera's lenses otpions
    const lensesOption = camera.lenses
    const lensesOptionLength = lensesOption.length
    for (let i = 0; i < lensesOptionLength; i++) {
        // const camera = cameras[i]
        // displayCamera(camera)
        console.log('Test boucle :', lensesOption[i])
        cloneElement.getElementById("lense-choice")
            .innerHTML += '<option value="' + lensesOption[i] + '">' + lensesOption[i] + '</option>'
    }

    // Product Name
    cloneElement.getElementById("item-name").textContent = camera.name
    
    // Prudct img src url
    cloneElement.getElementById("item-img_src").setAttribute("src", camera.imageUrl)
    
    // Product price
    const price = camera.price;
    cloneElement.getElementById("item-price").textContent = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price)
    
    // Product descriptions
    cloneElement.getElementById("item-description").textContent = camera.description
    
    // Product id
    cloneElement.getElementById("item-id").textContent = camera._id

    // Child clone injection in DOM
    document.getElementById("single-item").appendChild(cloneElement)

    //TODO: personnaliser la balise title avec le nom du produit.
}

export { displaySingleCamera }