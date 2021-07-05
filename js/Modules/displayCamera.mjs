function displayCamera(camera) {

    const templateElement = document.getElementById('itemTemplate');
    const cloneElement = document.importNode(templateElement.content, true);

    // URL to get one product (with id)
    const singleItemlink = "http://127.0.0.1:5500/templates/shop-single.html?id=" + camera._id;
    
    // Image single link
    const imgLink = cloneElement.querySelectorAll('.card-single-link');
    for (const item of imgLink) {
        item.setAttribute("href", singleItemlink);
    }

    // Product img src url
    const imgSrc = cloneElement.querySelectorAll('.item-img_src');
    for (const item of imgSrc) {
        item.setAttribute("src", camera.imageUrl);
    }

    // Product Name & single link
    const itemsName = cloneElement.querySelectorAll('.item-name');
    for (const item of itemsName) {
        item.textContent = camera.name;
        item.setAttribute("href", singleItemlink);
    }
    
    // Product price
    const itemsPrice = cloneElement.querySelectorAll('.item-price');
    for (const item of itemsPrice) {
        item.textContent = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(camera.price);
    }
    
    // data-item-index -> item id
    // cloneElement.getElementById("addToCart").setAttribute("data-item-id", camera._id);
    const itemsId = cloneElement.querySelectorAll('.btn-addtocart');
    for (const item of itemsId) {
        item.setAttribute("data-item-id", camera._id);
    }



    // Child clone injection in DOM
    document.getElementById("shop-grid").appendChild(cloneElement)

    //TODO: personnaliser la balise title avec le nom du produit.
    
}

export { displayCamera }