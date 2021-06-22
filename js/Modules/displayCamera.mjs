function displayCamera(camera) {
    
    const templateElement = document.getElementById('itemTemplate')
    const cloneElement = document.importNode(templateElement.content, true)

    // URL re-writing to get one product
    const singleItemlink = "http://127.0.0.1:5500/templates/shop-single.html?id=" + camera._id

    cloneElement.getElementById("item_single-link")
        .setAttribute("href", singleItemlink )

    // Product Name
    cloneElement.getElementById("item-name").textContent = camera.name
    // Prudct img src url
    cloneElement.getElementById("item-img_src").setAttribute("src", camera.imageUrl)
    // Product price
    cloneElement.getElementById("item-price").textContent = camera.price
    // Child clone injection in DOM
    document.getElementById("shop-grid").appendChild(cloneElement)
    
}

export { displayCamera }