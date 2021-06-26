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
        console.log('Articles présents dans localStorage ! (from cart.mjs)', local)
        const properties = Object.keys(local);
        //Nb d'articles dans le panier
        console.log('NB articles dans local : ', Object.keys(local).length)

        for (const propertie of properties) {
            let item = local[propertie];
            console.log('Dans local : ', item.name);
        }
        
    } else {
        console.log('Aucun articles dans localStorage cart.mjs !')
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

    //Change the cart.isEmpty value
    // console.log(typeof cart.items.length)
    if (cart.items.lenght < 1) {
        cart.isEmpty = true
        localStorage.setItem("cartIsEmpty", true)
    } else {
        cart.isEmpty = false
        localStorage.setItem("cartIsEmpty", false)
    }
}

addToCart("5be9c4471c9d440000a730e8", 2)
addToCart("5be1ed3f1c9d44000030b061", 1)
// addToCart("5be1ed3f1c9d44000030b061", 1)

// ********************************
// Compute the price amount to add
// ********************************
function computeTotalAmount(price, quantity) {
    let parsedPrice = parseInt(price, 10)
    if (isNaN(parsedPrice)) {
        return 0
    }
    let amountToAdd = parsedPrice * quantity
    return amountToAdd
}

export { cart }