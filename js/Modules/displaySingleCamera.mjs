/**
 * Display the camera informations for one camera
 * in the html template.
 * 
 * @param {object} camera The camera object
 */
function displaySingleCamera(camera) {
    
    const templateElement = document.getElementById('single-item-template');
    const cloneElement = document.importNode(templateElement.content, true);

    // Display camera's lenses otpions
    const lensesOption = camera.lenses;
    for (let i = 0; i < lensesOption.length; i++) {
        cloneElement.getElementById("lense-choice")
            .innerHTML += '<option value="' + lensesOption[i] + '">' + lensesOption[i] + '</option>'
    }

    // Product Name
    cloneElement.getElementById("item-name").textContent = camera.name;
    
    // Product img src url
    cloneElement.getElementById("item-img_src").setAttribute("src", camera.imageUrl);
    
    // Product price
    const price = camera.price;
    cloneElement.getElementById("item-price").textContent = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
    
    // Product description
    cloneElement.getElementById("item-description").textContent = camera.description;
    
    // Add to Cart ID :
    cloneElement.getElementById("btn-addtocart").setAttribute("data-item-id", camera._id);

    // Product id
    cloneElement.getElementById("item-id").textContent = camera._id;

    // Child clone injection in DOM
    document.getElementById("single-item").appendChild(cloneElement);
}

export { displaySingleCamera }