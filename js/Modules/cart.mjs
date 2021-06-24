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

// add item in the cart
function addToCart(itemId) {
    // Fetch the article
    // Create the object
    const itemToAdd = {
        id: itemId,
        name: "Zurss 50S",
        imgUrl: "img/vcam_1.jpg",
        quantity: 2,
        price: "49900"
    }
    
    //Add the item in the array
    cart.items.push(itemToAdd)
    console.log('Items in cart :', cart.items)
    
    //Compute the total amount to add
    const amountToAdd = computeTotalAmount(itemToAdd.price, itemToAdd.quantity)
    cart.subtotal += amountToAdd
    console.log("S/Total du panier : ", cart.subtotal)

    //Change the cart.isEmpty value
    cart.isEmpty = false
    localStorage.setItem("cartIsEmpty", false)
    
}

addToCart("220766")

//Compute the price amount to add
function computeTotalAmount(price, quantity) {
    let parsedPrice = parseInt(price, 10)
    if (isNaN(parsedPrice)) {
        return 0
    }
    let amountToAdd = parsedPrice * quantity
    return amountToAdd
}

export { cart }