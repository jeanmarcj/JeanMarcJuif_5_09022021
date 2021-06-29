import { getOneCamera } from './fetchCameraById.mjs'
// JavaScript Object for the cart management

let cart = {
    name: 'Panier',
    items: [],
    subtotal: 0,
    taxPercentage: 20,
    Shipping: 15,
    totalToBePaid: 0,
    isEmpty: true,
}

// Cart Initialization
function cartInitialization () {
    localStorage.setItem("cartIsEmpty", true)
}

cartInitialization()

// ******************************
// check if items are in the cart
// ******************************

function fetchItemsInLocalStorage() {
    const local = JSON.parse(localStorage.getItem("items"))

    if (local != null) {
        
        // console.log('Articles présents dans localStorage ! (from cart.mjs)', local)
        // Return an array of properties name inside the 'local' object (["0"], ["1"] ...)
        const properties = Object.keys(local);
        
        // 1° Update the badge incon with the number of items in the cart
        // console.log('NB articles localStorage : ', Object.keys(local).length)
        const totalItemInCart = Object.keys(local).length
        updateBadgeIcon(totalItemInCart)

        // 2° Create & Add items from the localStorage to the cart items array

        for (const propertie of properties) {
            let item = local[propertie];
            // console.log('Dans local nom de l\'article : ', item.name);
            // console.log('Dans localStorage : ', JSON.stringify(item))
            
            // Create JSobject
            const itemToAdd = {
                id: item.id,
                name: item.name,
                imgUrl: item.imgUrl,
                quantity: item.quantity,
                price: item.price
            }

            // console.log('Dans localStorage, objet créé : ', itemToAdd)
            cart.items.push(itemToAdd)

            // 3° Print in cart template the items list
            displayCartItems(itemToAdd, totalItemInCart)

            // 4° Compute the total amount
            const amountToAdd = computeTotalAmount(itemToAdd.price, itemToAdd.quantity)
            cart.subtotal += amountToAdd
            let formatedPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(cart.subtotal)
            // console.log('Total HT du panier en cours :', cart.subtotal)
            document.getElementById("totalWhithoutTaxes").textContent = formatedPrice

        }

        // 3° Update cart isEmpty property
        localStorage.setItem("cartIsEmpty", false)
        cart.isEmpty = false
        
    } else {
        console.log('Aucun article dans localStorage cart.mjs !')
        
        // 1° Update the badge icon with number 0
        updateBadgeIcon(0)
        
        // 2° Afficher dans le template que le panier est vide.
    }
}

fetchItemsInLocalStorage()


// ********************
// add item in the cart
// ********************

async function addToCart(itemId, quantity) {

    // Fetch the article
    const camera = await getOneCamera(itemId)
    // console.log('Voici votre APN :', camera)

    // TODO:
    // Vérifier si l'id de l'article existe déjà dans le tableau
    
    // Create JSobject
    const itemToAdd = {
        id: itemId,
        name: camera.name,
        imgUrl: camera.imageUrl,
        quantity: quantity,
        price: camera.price
    }
    
    //Add the item in the array
    cart.items.push(itemToAdd)
    // console.log(cart.items.length, ' Article(s) dans votre panier')
    // console.log('Liste des articles dans votre panier :', cart.items)
    
    //Compute the total amount to add
    const amountToAdd = computeTotalAmount(itemToAdd.price, itemToAdd.quantity)
    cart.subtotal += amountToAdd
    // console.log("S/Total du panier : ", cart.subtotal)

    // **** Save cart item in local Storage as object ****
    localStorage.setItem("items", JSON.stringify(cart.items))

    // **** Change the cart.isEmpty value ***
    cart.isEmpty = false
    localStorage.setItem("cartIsEmpty", false)
}

// addToCart("5be9c4471c9d440000a730e8", 1)
// addToCart("5be1ed3f1c9d44000030b061", 2)
// addToCart("5be1ed3f1c9d44000030b061", 1)

// ********************************
// Compute the price amount to add
// Should be a module ?
// ********************************
function computeTotalAmount(price, quantity) {
    let parsedPrice = parseInt(price, 10)
    if (isNaN(parsedPrice)) {
        return 0
    }
    let amountToAdd = parsedPrice * quantity
    return amountToAdd
}

// ********************************
// Update the badge icon in nav bar
// Should be a module ?
// ********************************
function updateBadgeIcon(totalItemInCart) {
    // console.log('Update badge icon', itemInCart)
    document.getElementById("badge").textContent = totalItemInCart
}

// ********************************
// Display the item in the cart template
// Should be a module ?
// ********************************
function displayCartItems(itemToPrint, totalItemInCart) {
    // console.log(itemToPrint.imgUrl)
    
    document.getElementById("cart-state").textContent = totalItemInCart + " Article(s) dans votre panier"

    //Update the wrapper
    let singleItemUrl = "http://127.0.0.1:5500/templates/shop-single.html?id=" + itemToPrint.id
    let formatedPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(itemToPrint.price)
    
    let htmlWrapper = document.getElementById("cart-item-wrapper")

    let htmlTemplate =
        `<div class="d-flex align-items-center mb-3">
            <a href="${singleItemUrl}" class="d-block flex-shrink-0">
                <img src="${itemToPrint.imgUrl}" alt="Photo de l'appareil photo ${itemToPrint.name}" class="rounded" width="60">
            </a>
            <div class="w-100 ps-2 ms-1">
                <div class="d-flex align-items-center justify-content-between">
                    <!-- Name & Quantity -->
                    <div class="me-3">
                        <h4 class="nav-heading fs-md mb-1">
                            <a href="${singleItemUrl}" class="fw-medium">${itemToPrint.name}</a>
                        </h4>
                        <div class="d-flex align-items-center fs-sm">
                            <span class="me-2">${formatedPrice}</span>
                            <span class="me-2">X</span>
                            <input type="number" class="form-control form-control-sm px-2" min="1" value="${itemToPrint.quantity}">
                        </div>
                    </div>
                    <!-- cancel btn -->
                    <div class="ps-3 border-start">
                    <a  href="#"
                        class="d-block text-danger text-decoration-none fs-xl"
                        data-bs-toggle="tooltip"
                        title=""
                        data-bs-original-title="Retirer"
                        aria-label="Remove"
                    >
                      <i class="bi bi-x-circle"></i>
                    </a>
                  </div>
                </div>
            </div>
        </div>`
    
    htmlWrapper.innerHTML += htmlTemplate

}


export { cart }