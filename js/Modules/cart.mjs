import { getOneCamera } from './fetchCameraById.mjs';

/**
 * Javascript Object declaration
 */
let cart = {
    name: 'Panier',
    items: [],
    subtotal: 0,
    taxPercentage: 20,
    shipping: 15,
    taxesToBePaid: 0,
    totalToBePaid: 0,
    isEmpty: true,
    customer: [],
    orderId: ''

}

let buttonsIdList = ["orderBtn", "clearCart"];

// Cart Initialization
/**
 * Check if there the cart is empty to update icon
 * Await for a click on the clear cart button to reset the cart
 * and disable all buttons
 */
function cartInitialization() {
        
    updateBadgeIcon(0);

    clearCart.onclick = () => {
        localStorage.clear();
        cart.items = [];
        cart.subtotal = 0;
        updateBadgeIcon(0);
        displayCartItems(cart);
        localStorage.setItem("cartIsEmpty", "true");
        cart.isEmpty = true;
        cart.customer = [];
        cart.orderId = "";

        for (let buttonId of buttonsIdList) {
            switchButton("off", buttonId);
        }
    }
}

cartInitialization();


/**
 * Fetch  the article to add into the cart
 * Update cart.items array
 * Sort the array to store the quantity
 * Update the cart number icon
 * Compute the sum
 * Display the item(s) with quantity
 * Update the localStorage
 * 
 * @param {string} itemId The item id
 * @param {int} quantity The quantity to order
 */

async function addToCart(itemId, quantity) {


    // Fetch the article
    const camera = await getOneCamera(itemId)
    
    // Create JSobject
    const itemToAdd = {
        id: itemId,
        name: camera.name,
        imgUrl: camera.imageUrl,
        quantity: quantity,
        price: camera.price
    }
    
    // Add item in cart.item array
    cart.items.push(itemToAdd)
    // console.log('Add Item : ', cart.items)

    // Sort and create an unique array items with quantities
    cart.items = sortCartArray(cart.items);

    // Print the item(s) number in the badge icon
    updateBadgeIcon(cart.items.map(item => item.quantity).reduce((accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue)));
    
    // Update cart.subtotal
    cart.subtotal = cart.items.map(item => item.quantity * item.price).reduce((accumulator, currentValue) => accumulator + currentValue);
    cart.taxesToBePaid = (cart.subtotal * cart.taxPercentage)/100;
    cart.totalToBePaid = cart.subtotal + cart.taxesToBePaid + cart.shipping;
    console.log(cart);
    // Print item(s) in the cart template
    displayCartItems(cart);

    // Save cart item in local Storage as object
    localStorage.setItem("items", JSON.stringify(cart.items))
    localStorage.setItem("cartIsEmpty", "false");
    cart.isEmpty = false;

    // Active buttons
    let buttonState = "on";
    for (let buttonId of buttonsIdList) {
        switchButton(buttonState, buttonId);
    }
    
}
/**
 * Change the item quantity on click
 * Update the cart array and print the result
 * Update the localStorage
 * 
 * @param {string} id the item id 
 * @returns {event} cart.subtotal, badge & local Storage are updated
 */

const changeQuantity = (id) => {
    
    return (event) => {
        cart.items.find(item => item.id === id).quantity = event.target.value;
        
        cart.subtotal = cart.items.map(item => item.quantity * item.price).reduce((accumulator, currentValue) => accumulator + currentValue);
        // console.log('Subtotal inside changeQuantity :', cart.subtotal);

        updateBadgeIcon(cart.items.map(item => item.quantity).reduce((accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue)));
        
        displayCartItems(cart);

        localStorage.setItem("items", JSON.stringify(cart.items));
    };
}

/**
 * Delete an item from the cart.
 * The item is identify by his id.
 * An event listener is attached to the icon.
 * The event return a function. 
 * 
 * @param {string} id Item's id to erase.
 * @returns {function} The return function to manage the cart.
 */
 const removeItems = (id) => {
    return () => {
        
        const indexOfItemToBeDeleted = cart.items.indexOf(cart.items.find(item => item.id === id));

        cart.items.splice(indexOfItemToBeDeleted, 1);

        cart.subtotal = cart.items.length > 0 ? cart.items.map(item => item.quantity * item.price).reduce((accumulator, currentValue) => accumulator + currentValue) : 0;
        
        updateBadgeIcon(cart.items.length > 0 ? cart.items.map(item => item.quantity).reduce((accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue)) : 0);

        displayCartItems(cart);

        if (cart.items.length > 0) {
            cart.isEmpty = false;
            localStorage.setItem("cartIsEmpty", "false");
        } else {
            // Disable all buttons
            let buttonState = "off";
            for (let buttonId of buttonsIdList) {
                switchButton(buttonState, buttonId);
            }
            cart.isEmpty = true;
            cart.taxesToBePaid = 0;
            cart.totalToBePaid = 0;
            localStorage.setItem("cartIsEmpty", "true");
            // window.location.assign("../index.html");
        }
        
        localStorage.setItem("items", JSON.stringify(cart.items));

    };
}

/**
 * Read the localStorage 'items' if exist
 * Update cart.items array after fetch & sort
 * Output on screen the results
 * Save the items array in localStorage
 */
 function localStorageManager() {
    
    // Check if there are items inside localStorage array
    const local = JSON.parse(localStorage.getItem("items"));

    if (local != null) {
        
        // 1?? Fetch items and update cart.items array
        fetchItemsInLocalStorage(local);
        localStorage.setItem("cartIsEmpty", "false");
        cart.isEmpty = false;
        
        // 2?? Sort and create an unique array items with quantities
        cart.items = sortCartArray(cart.items);

        // 3?? Update cart.subtotal
        cart.subtotal = cart.items.length > 0 ? cart.items.map(item => item.quantity * item.price).reduce((accumulator, currentValue) => accumulator + currentValue) : 0;

        // 4?? Print the item(s) number in the badge icon
        updateBadgeIcon(cart.items.length > 0 ? cart.items.map(item => item.quantity).reduce((accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue)) : 0);

        // 5?? Print item(s) in the cart template
        displayCartItems(cart);

        // 6?? Print total amount
        const formatedSubTotal = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(cart.subtotal);
        const totalWhithoutTaxes = document.querySelectorAll('.totalWithoutTaxes');
        for (const eltTotal of totalWhithoutTaxes) {
            eltTotal.textContent = formatedSubTotal;
        }

        // 7?? Save cart item in local Storage as object
        localStorage.setItem("items", JSON.stringify(cart.items));

    } else {
        // console.log('LocalManager : aucun article ?? g??rer !');
        updateBadgeIcon(0);
        localStorage.setItem("cartIsEmpty", "true");
        cart.isEmpty = true;
        let buttonState = "off";
        for (let buttonId of buttonsIdList) {
            switchButton(buttonState, buttonId);
        }
    }

    const orderId = localStorage.getItem("orderId");

    if (orderId != null) {
        cart.orderId = orderId;
        cart.customer = localStorage.getItem("customer");
    }

}

localStorageManager();


/**
 * Read localStorage & update cart.items array.
 * 
 * @param { array } localStorageItems Items stored in localStorage
 */

function fetchItemsInLocalStorage(localStorageItems) {

    // 1?? Get the items inside localStorage
    // Return an array of properties name inside the 'local' object (["0"], ["1"] ...)
    const properties = Object.keys(localStorageItems);

    // Create & Add items from the localStorage to the cart items array
    for (const propertie of properties) {
        let item = localStorageItems[propertie];
        
        // Create JSobject
        const itemToAdd = {
            id: item.id,
            name: item.name,
            imgUrl: item.imgUrl,
            quantity: item.quantity,
            price: item.price
        }

        cart.items.push(itemToAdd)

    }

}


/**
 * Print the number in the cart badge icon
 * 
 * @param { integer } totalItemInCart // The number to print
 */

function updateBadgeIcon(totalItemInCart) {
    
    document.getElementById("badge").textContent = totalItemInCart
}

// ********************************
// Sort and update cart array
// 
// ********************************

/**
 * Sort the array given by id,
 * The last element of each item's id inside the array store the total quantity
 * The result is the same array with the total quantity stored in the last element
 * Then remove the duplicate items inside the array.
 * Only the last entrie is stored in a new array.
 * Return an array with unique ID with the quantities computed before.
 * 
 * @param { array } itemsArray The array with the current cart items
 * @returns { array }
 */

function sortCartArray(itemsArray) {
    
    // Sort the given array by id
    itemsArray.sort(function compare(a, b) {
        if (a.id < b.id)
            return -1
        if (a.id > b.id)
            return 1;
        return 0;
    })
    
    // The last element of each item's id inside the array store the total quantity 
    // The result is the same array with the total quantity stored in the last element
    const properties = Object.keys(itemsArray);
    const totalItemInArray = Object.keys(itemsArray).length;

    for (const propertie of properties) {
        let item = itemsArray[propertie];
        let item1 = itemsArray[parseInt(propertie) + 1];
        let tempQuantity = parseInt(itemsArray[propertie].quantity);
        
        if (parseInt(propertie) + 1 < totalItemInArray && item.id === item1.id)  {
            tempQuantity += item1.quantity;
            item1.quantity = tempQuantity;
        } else {
            tempQuantity = parseInt(itemsArray[propertie].quantity);
        }
    }

    // Remove the duplicate items inside the array. Only the last entrie is stored in a new array
    // Return 'uniqueArray' with unique ID and good quantities computed before
    const uniqueItemsArray = [...new Map(itemsArray.map(item => [item["name"], item])).values()]
    
    return uniqueItemsArray;

}

/**
 * Add or remove 'disabled' in a button tag.
 * 
 * @param { string } buttonState The button state on or off
 * @param { string } buttonId The html dom button id
 */

function switchButton(buttonState, buttonId) {
    
    const buttonElt = document.getElementById(buttonId);
    let classes = buttonElt.classList;

    if (buttonState === "on") {
       
        classes.remove("disabled");
        
    } else {
        
        classes.add("disabled");
        
    }
}

// *************************************
// Display the item in the cart template
// *************************************

/**
 * Display the cart object given.
 * 
 * @param { object }cart The cart object 
 */

function displayCartItems(cart) {
    
    document.getElementById("cart-state").textContent = cart.items.length !== 0 ? cart.items.map(item => item.quantity).reduce((accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue)) + " article(s) dans votre panier" : "Votre panier Orinoco est vide.";

    const taxesToBePaidElt = document.getElementById("checkout-taxes");

    if (taxesToBePaidElt != undefined && taxesToBePaidElt != null) {
        
        let checkoutTaxes = (cart.subtotal * cart.taxPercentage)/100;
        
        cart.taxesToBePaid = checkoutTaxes;
        let checkoutTaxesFormated = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(cart.taxesToBePaid);
        document.getElementById("checkout-taxes").textContent = checkoutTaxesFormated;

        const formatedShipping = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(cart.shipping);
        document.getElementById("shipping").textContent = formatedShipping;

        const totalToBePaid = cart.subtotal + cart.taxesToBePaid + cart.shipping;
        const formatedTotalToBePaid = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalToBePaid);
        document.getElementById("totalToBePaid").textContent = formatedTotalToBePaid;

    }

    const htmlWrapper = document.getElementById("cart-item-wrapper");
    htmlWrapper.innerHTML = '';

    for (const propertie in cart.items) {
        let item = cart.items[propertie];

        //Update the cart template wrapper
        let singleItemUrl = "http://127.0.0.1:5500/templates/shop-single.html?id=" + item.id;
        let formatedPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(item.price);

        let htmlTemplate =
        `
        <div class="simplebar-content mb-3">
            <div class="d-flex align-items-center mb-3" id="${item.id}">
                <a href="${singleItemUrl}" title="Voir les informations du ${item.name}" class="d-block flex-shrink-0">
                    <img src="${item.imgUrl}" alt="Photo de l'appareil photo ${item.name}" class="rounded" width="60">
                </a>
                <div class="w-100 ps-2 ms-1">
                    <div class="d-flex align-items-center justify-content-between">
                        <!-- Name & Quantity -->
                        <div class="me-3">
                            <h4 class="nav-heading fs-md mb-1">
                                <a href="${singleItemUrl}" class="fw-medium" title="Voir les informations du ${item.name}">${item.name}</a>
                            </h4>
                            <div class="d-flex align-items-center fs-sm">
                                <span class="me-2">${formatedPrice}</span>
                                <span class="me-2">X</span>
                                <input
                                    type="number"
                                    class="form-control form-control-sm px-2 quantity-manager"
                                    min="1"
                                    max="10"
                                    value="${item.quantity}"
                                    data-item-id="${item.id}"
                                    index="${propertie}"
                                    data-change-quantity-id="${item.id}"
                                >
                            </div>
                        </div>
                        <!-- cancel btn -->
                        <div class="ps-3 border-start" id="cancel-btn">
                            <div
                                class="d-block text-danger text-decoration-none fs-xl   cancel-button"
                                data-bs-toggle="tooltip"
                                title="Retirer cet article"
                                data-bs-original-title="Retirer"
                                aria-label="Remove"
                                id="removeItem"
                                data-remove-id="${item.id}"
                            >
                                <i class="bi bi-x-circle"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    
        htmlWrapper.innerHTML += htmlTemplate;

    }

    // Update the total without taxes :
    const formatedSubTotal = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(cart.subtotal);
    const totalWhithoutTaxes = document.querySelectorAll('.totalWithoutTaxes');
    for (const eltTotal of totalWhithoutTaxes) {
        eltTotal.textContent = formatedSubTotal;
    }

    // Add listerners for quantity on change
    const quantityManagers = document.querySelectorAll('.quantity-manager');

    for (const inputQuantity of quantityManagers) {
        const idItem = inputQuantity.getAttribute('data-change-quantity-id');
        inputQuantity.addEventListener('change', changeQuantity(idItem));
    }

    // Add listerners for the cancel-button
    const cancelButtons = document.querySelectorAll('.cancel-button');

    for (const cancelButton of cancelButtons) {
        const idItem = cancelButton.getAttribute('data-remove-id');
        cancelButton.addEventListener('click', removeItems(idItem));
    }
}

export { cart, addToCart, switchButton, buttonsIdList, updateBadgeIcon, displayCartItems }