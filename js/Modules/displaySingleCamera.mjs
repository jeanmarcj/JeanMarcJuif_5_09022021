function displaySingleCamera(camera) {
    
    // console.log("J'affiche un model d'APN")
    const templateElement = document.getElementById('single-item-template')
    const cloneElement = document.importNode(templateElement.content, true)

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